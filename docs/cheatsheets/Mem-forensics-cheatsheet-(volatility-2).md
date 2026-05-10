---
title: Mem forensics cheatsheet (volatility 2)
sidebar_position: 0
slug: /3317b0eb-61a4-80d7-914f-ee500b37e3ae
---



:::tip

Though Vol2 is an EOL (end-of-life) product and replaced with Volatility 3 (which is much faster and more convenient to use), it remains an indispensable tool for older system (windows 10 or earlier). It is valuable for those who are learning windows internals by forcing analyst to manually navigate deep Windows Internals—like KDBGs (kernel debugger block) and `EPROCESS` blocks.
And decades of community devotion from all the professionals have created a massive ecosystem of plugins that cover almost everything about memory forensics. 
Based on what is going with windows 11 (poor Microslop), i suppose Windows 10 would still persist for many years to come. So vol2 is a good “starter pack” for those who want to master Mem forensics

:::




## 1. System Profiling {#3317b0eb61a480b68c47c3c745cc1060}


**Base Command Setup:**


```text
[VOL] = python vol.py -f <memory_dump> --profile=<profile>
```


_(Note: Use_ _`imageinfo`_ _or_ _`kdbgscan`_ _first to identify the correct profile)._


## 2. Processess analysis {#3317b0eb61a480ccbe2ad8ce11c75403}


| **What to look for?**                                                                                                                                                                                         | **Plugin** | **Command line**         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------------------ |
| **Processes list**                                                                                                                                                                                            | `pslist`   | `[VOL] pslist`           |
| **Processes' Parent-child relationship**                                                                                                                                                                      | `pstree`   | `[VOL] pstree`           |
| **Hidden Processes (Cross-references multiple process lists to detect hidden/unlinked processes)**                                                                                                            | `psxview`  | `[VOL] psxview`          |
| **Examining Process Details (custom plugin)**                                                                                                                                                                 | `psinfo`   | `[VOL] psinfo -p <PID>`  |
| **Process privilege**                                                                                                                                                                                         | `getsids`  | `[VOL] getsids -p <PID>` |
| Locates processes by pool-scanning memory for `EPROCESS` allocation tags. **Crucial for detecting hidden processes (DKOM)** that unlinked themselves from `pslist`, as well as recently terminated processes. | `psscan`   | `[VOL] psscan`           |


## 3. Network connections {#3317b0eb61a480fe8160f3f5f2aac49e}


| What to look for        | **Plugin** | Command line     |
| ----------------------- | ---------- | ---------------- |
| **Network connections** | `netscan`  | `[VOL] netscan`  |


## 4. Persistence techniques {#3317b0eb61a4807ca3f8cc6782e3029f}


| What to look for                                           | **Plugin**  | **Command line**                |
| ---------------------------------------------------------- | ----------- | ------------------------------- |
| **Registry keys and values**                               | `printkey`  | `[VOL] printkey -K <key_path>`  |
| **Looking for all persistence techniques** (custom plugin) | `winesap`   | `[VOL] winesap`                 |


The following list represents the most common persistence-related keys:

- [<u>**Run Keys**</u>](https://pentestlab.blog/2019/10/01/persistence-registry-run-keys/): in Software and NTuser.dat hives
- [**RunOnce Keys**](https://pentestlab.blog/2019/10/01/persistence-registry-run-keys/)
- [**Services Keys**](https://pentestlab.blog/2019/10/07/persistence-new-service/)
- [**AppInit_DLLs Key**](https://pentestlab.blog/2020/01/07/persistence-appinit-dlls/)
- [**Winlogon Keys**](https://pentestlab.blog/2020/01/14/persistence-winlogon-helper-dll/)

If you have trouble finding the hive, use: `[VOL]hivelist`  to find the virtual offset. Then use the offset to find the key in that corresponding hive


`[VOL] -o <hive_virtual_offset> -K <key_path>` 


## 5. Filesystem {#3317b0eb61a480b5bb2cc4e5f764e525}


| Tìm gì                     | Plguin             | Cmd                                                                            |
| -------------------------- | ------------------ | ------------------------------------------------------------------------------ |
| Parse MFT entries          | `mftparser —match` | `Python vol.py -f <memory_dump> –profile=<profile> -g <kdbg_address>mftparser` |
| Visualize memoryfilesystem | rstudio            |                                                                                |


## 6. Other useful plugins {#34f7b0eb61a48042adcbc9f413f6c792}


### **6.1. NTFS Artifacts & File Extraction** {#3597b0eb61a48099aae1c5928a6eae5a}


| **Plugin**    | **Command Line**                       | **Purpose**                                                                                 |
| ------------- | -------------------------------------- | ------------------------------------------------------------------------------------------- |
| **filescan**  | `[VOL] filescan`                       | Locates `FILE_OBJECT` structures to find open files, including those deleted from the disk. |
| **dumpfiles** | `[VOL] dumpfiles -Q <offset> -D <dir>` | Extracts cached/mapped files (e.g., `.pdf`, `$MFT`) from RAM to a local directory.          |
| **mftparser** | `[VOL] mftparser > mft.txt`            | Parses MFT entries directly from memory.                                                    |


### 6.2. Advanced Malware & Artifact Hunting {#3597b0eb61a4804588b8d25d96b24152}


| **Category**            | **Plugin**                     | **Command Line**                    | **Purpose**                                                                            |
| ----------------------- | ------------------------------ | ----------------------------------- | -------------------------------------------------------------------------------------- |
| **Malware & Injection** | **malfind**                    | `[VOL] malfind -p <PID> -D <dir>`   | Detects injected code (`PAGE_EXECUTE_READWRITE`) lacking a PE file on disk.            |
|                         | **hollowfind (custom plugin)** | `[VOL] hollowfind`                  | Detects Process Hollowing techniques.                                                  |
|                         | **yarascan**                   | `[VOL] yarascan -Y "<rule/string>"` | Scans RAM or specific processes using YARA rules.<br/>Return the exact virtual address |
| **Credentials & Keys**  | **hashdump**                   | `[VOL] hashdump`                    | Extracts NTLM hashes directly from registry/memory.                                    |
|                         | **lsadump**                    | `[VOL] lsadump`                     | Extracts clear-text LSA secrets from `lsass.exe`.                                      |
|                         | **bitlocker**                  | `[VOL] bitlocker`                   | Extracts master encryption keys for disk decryption.                                   |
| **Execution & Traces**  | **cmdline**                    | `[VOL] cmdline`                     | Retrieves exact command-line executions & parameters.                                  |
|                         | **envars**                     | `[VOL] envars -p <PID>`             | Displays environment variables for processes.                                          |
|                         | **cmdscan**                    | `[VOL] cmdscan`                     | Extracts execution history from `conhost.exe`.                                         |
|                         | **consoles**                   | `[VOL] consoles`                    | Extracts command output/display from `conhost.exe`.                                    |
|                         | **clipboard**                  | `[VOL] clipboard`                   | Displays recently copied/pasted content.                                               |
|                         | **shellbags**                  | `[VOL] shellbags`                   | Recovers accessed folders history (including offline drives).                          |
|                         | amcache                        | `[VOL] amcache`                     | Proof of execution (and hashes)                                                        |
|                         | userassis                      | `[VOL] userassist`                  | how many time user click to a file, and focus time (GUI only)                          |


### **6.3. Process Analysis** {#3597b0eb61a480728e5adcbe5ae79214}


| **Plugin**     | **Command Line**                                                | **Purpose & Deep Dive**                                                                                                                                                                 |
| -------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **dlllist**    | `[VOL] dlllist -p <PID>`                                        | Lists DLLs loaded via PEB. Highly useful for detecting DLL Sideloading or DLL Hijacking.                                                                                                |
| **ldrmodules** | `[VOL] ldrmodules -p <PID>`                                     | Detects hidden DLLs (Unhooking/Hollowing). Compares 3 PEB linked lists (InLoad, InMemory, InInit). If a mapped DLL exists on disk but returns 'False' here, it is intentionally hiding. |
| **handles**    | `[VOL] handles -p <PID>`<br/>`[VOL] handles -p <PID> -t mutant` | Displays objects (files, registries, mutexes) opened by a process. Used to find malicious persistence keys, sensitive accessed files, or malware signature mutants.                     |
| **vadinfo**    | `[VOL] vadinfo -p <PID>`                                        | Analyzes Virtual Address Descriptor (VAD) regions. Crucial for spotting `PAGE_EXECUTE_READWRITE` protections (indicators of code injection).                                            |
| **vaddump**    | `[VOL] vaddump -p <PID> -D <dir>`                               | Extracts VAD memory regions for reverse engineering.                                                                                                                                    |


### 6.4. Stealth & Rootkit Hunting {#3597b0eb61a48030819adb3bbc29f0cd}


| **Plugin**          | **Command Line**        | **Purpose**                                                             |
| ------------------- | ----------------------- | ----------------------------------------------------------------------- |
| **ssdt**            | `[VOL] ssdt`            | Detects hooks in the System Service Descriptor Table (Kernel rootkits). |
| **callbacks**       | `[VOL] callbacks`       | Identifies registered OS callbacks used for system monitoring.          |
| **unloadedmodules** | `[VOL] unloadedmodules` | Finds malicious drivers that were loaded and then hidden/unloaded.      |
| **apihooks**        | `[VOL] apihooks`        | Deep-scans for inline API hooks (modified starting bytes).              |


### 6.5. Network, C2 Discovery & Timeline {#3597b0eb61a48027b12de60f810a17e1}


| **Plugin**     | **Command Line**                 | **Purpose**                                                                             |
| -------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| **connscan**   | `[VOL] connscan`                 | Finds active/closed TCP connections via pool scanning (often older version like WinXP). |
| **sockscan**   | `[VOL] sockscan`                 | Finds open sockets.                                                                     |
| **mutantscan** | `[VOL] mutantscan`               | Scans for Mutexes created by malware (High-value IOCs).                                 |
| **timeliner**  | `[VOL] timeliner > timeline.csv` | Aggregates timestamps from all sources into a master super-timeline.                    |


### 6.6. Triage & Dumping Plugins Comparison {#3597b0eb61a480c382cdd8ce4611d157}


| **Plugin**    | **Command Line**                       | **Target Output**    | **Best Used For**                                                                |
| ------------- | -------------------------------------- | -------------------- | -------------------------------------------------------------------------------- |
| **procdump**  | `[VOL] procdump -p <PID> -D <dir>`     | Executable (`.exe`)  | Rebuilding running PE files to reverse engineer in IDA Pro/Ghidra.               |
| **memdump**   | `[VOL] memdump -p <PID> -D <dir>`      | Raw Data (`.dmp`)    | Extracting entire process memory to run `strings` or `yara` for clear-text data. |
| **dumpfiles** | `[VOL] dumpfiles -Q <offset> -D <dir>` | Original File Format | Recovering opened documents, deleted files, or locked system logs.               |


You can also dump windows event logs from RAM, could be useful in some specific cases:


`[VOL] --regex="\.evtx$" --ignore-case --dump-dir <dir> -n`


Extracted files often append `.vacb` or `.dat`. Use this powershell command to rename them:


```powershell
 Get-ChildItem -Filter *.dat | Rename-Item -NewName { $_.Name -replace '\.dat$',''}_
 Get-ChildItem -Filter *.vacb | Rename-Item -NewName { $_.Name -replace '\.vacb$','' }
```


### 6.7. Volshell {#3597b0eb61a4801291d1f4d1390b50a3}


[https://volatility3.readthedocs.io/en/latest/volshell.html](https://volatility3.readthedocs.io/en/latest/volshell.html)


Volshell is an interactive python shell embedded within the Volatility framework. It allows analysts to directly interact with raw memory, traverse windows kernel structures.


| **Command**         | **Syntax / Example**         | **Purpose**                                                                                                                                                      |
| ------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Change Context**  | `cc(pid=1234)`               | Switches your current working context to the virtual address space of a specific process.                                                                        |
| **Display Type**    | `dt("_EPROCESS", <address>)` | Casts a specific memory address into a Windows kernel structure format. Essential for manually parsing headers (e.g., `_PEB`, `_POOL_HEADER`, `_OBJECT_HEADER`). |
| **Display Bytes**   | `db(<address>, length=64)`   | Dumps raw memory at a given address in both Hex and ASCII formats.  Use for visually hunting for hidden strings, keys, or payloads in memory.                    |
| **Display Dwords**  | `dd(<address>)`              | Displays memory in 4-byte (DWORD) chunks. Highly useful when looking for memory pointers, offsets, or IPv4 addresses.                                            |
| **Current Process** | `proc()`                     | Returns the `_EPROCESS` object of the current context. You can chain this to traverse structures (e.g., `proc().Peb.ProcessHeaps.dereference()`).                |


## 7. Basic triage process {#3597b0eb61a48090a874f2d9a229e067}

- pslist/pstree/netscan/pxview → malfind/hollowfind → filescan/dumpfiles -Q

Phase 1: Broad Reconnaissance (The "Lay of the Land")

- `pslist`:  This provides a baseline of all currently active process by traversing the doubly-linked list `(EPRCESS blocks)`
- `pstree`: process genealogy - visualizing the parent-child lineagem, is often employed to spot malicious processes.
	- often used with the `-v  (verbose)` flag:
		- Audit: derived from EPROCESS struture (hard for attackers to tamper)
		- Path: Extracted from PEB (process environment block) struture located in user mode, which makes it easily modified or spoofed by malware.
		- The verbose flag also provides the process command line, without resorting to cmdline plugin.
- `netscan`: Correlates active processes with network activity. If a suspicious process identified in `pstree` has an established external connection to a suspicious IP:port, it immediately becomes a high-priority target for C2, exfiltration activities
- `psxview`: Sophisticated malware often unlinks itself from the standard process list to evade detection (Direct Kernel Object Manipulation - DKOM). `psxview` cross-references multiple internal memory structures to expose these hidden processes. It effectively answers the question: _"What is the OS failing to report?"_

Phase 2: Deep Process Inspection (Hunting for Injections/hollowing)

- `malfind`: Once suspicious or hidden processes are isolated, `malfind` inspects their Virtual Address Descriptors (VADs). It specifically hunts for `PAGE_EXECUTE_READWRITE` memory protections that lack a backing PE file on the disk, exposing fileless malware and injected shellcode.
- `hollowfind`: While `malfind` primarily hunts for injected code, `hollowfind` is a custom plugin explicitly designed to detect Process Hollowing. It counters attackers who evade `malfind` by modifying memory protections from `PAGE_EXECUTE_READWRITE` to `PAGE_EXECUTE_WRITECOPY`."

Phase 3: Evidence Recovery & Artifact Extraction

- `filescan`: After mapping the attack execution flow, the focus shifts to the filesystem footprint. `filescan` hunts for `FILE_OBJECT` structures in RAM, revealing recently accessed documents, dropped payloads, or tools that the attacker may have already deleted from the physical disk.
- `dumpfiles`: to dump the file you’ve detected with filescan. Often used with -Q flag (filescan use physical address instead of virtual address), and -n flag (to maintain the file’s original name)
