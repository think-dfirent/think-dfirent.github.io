---
title: Volatility 3 cheat sheet
sidebar_position: 1
slug: /3677b0eb-61a4-80b7-a205-d5854fc92a39
tags:
  - Cheat Sheets
  - Credential Access
  - Digital Forensics
  - Malware Analysis
  - Memory Forensics
  - Registry
  - Volatility
  - Windows
---
<!-- notion-metadata-start -->
*📅 Published: 2026-05-21 15:59 | 🔄 Last Updated: 2026-05-21 16:08*
<!-- notion-metadata-end -->
:::tip

I asked Gemini to synthesize the equivalent vol3 version and here is what it delivered:

:::




### 1. System Profiling {#3677b0eb61a4800f98c9f41bfd8d8278}


**Base Command Setup:**

- `[VOL3] = python3 vol.py -f <memory_dump>`
- `[VOL3_OUT] = python3 vol.py -f <memory_dump> -o <output_dir>` _(Used when dumping files or memory)_

_(Note: You no longer need_ _`imageinfo`_ _or_ _`kdbgscan`_ _to identify the correct profile. Volatility 3 handles this automatically. To view system characteristics, you can use_ _`[VOL3] windows.info`_ _instead)._


### 2. Processes Analysis {#3677b0eb61a480108fc1f192ddbe14fc}


| What to look for?                                                                                                                                                                                     | Plugin      | Command line                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------- |
| Processes list                                                                                                                                                                                        | **pslist**  | `[VOL3] windows.pslist`                     |
| Processes' Parent-child relationship                                                                                                                                                                  | **pstree**  | `[VOL3] windows.pstree`                     |
| Hidden Processes (Cross-references multiple process lists to detect hidden/unlinked processes)                                                                                                        | **psxview** | `[VOL3] windows.psxview`                    |
| Examining Process Details                                                                                                                                                                             | **info**    | `[VOL3] windows.info` _(psinfo deprecated)_ |
| Process privilege                                                                                                                                                                                     | **getsids** | `[VOL3] windows.getsids --pid <PID>`        |
| Locates processes by pool-scanning memory for EPROCESS allocation tags. Crucial for detecting hidden processes (DKOM) that unlinked themselves from pslist, as well as recently terminated processes. | **psscan**  | `[VOL3] windows.psscan`                     |


### 3. Network Connections {#3677b0eb61a4804394dcf8c12f66dd38}


| What to look for    | Plugin                    | Command line                                          |
| ------------------- | ------------------------- | ----------------------------------------------------- |
| Network connections | **netscan** / **netstat** | `[VOL3] windows.netscan`<br/>`[VOL3] windows.netstat` |


### 4. Persistence Techniques {#3677b0eb61a480d7a129c6a17083124c}


| What to look for                       | Plugin       | Command line                                        |
| -------------------------------------- | ------------ | --------------------------------------------------- |
| Registry keys and values               | **printkey** | `[VOL3] windows.registry.printkey --key <key_path>` |
| Looking for all persistence techniques | **winesap**  | _(Custom plugin—check Vol3 community plugins)_      |


The following list represents the most common persistence-related keys:

- **Run Keys:** in Software and NTuser.dat hives
- **RunOnce Keys**
- **Services Keys**
- **AppInit_DLLs Key**
- **Winlogon Keys**

If you have trouble finding the hive, use `[VOL3] windows.registry.hivelist` to find the virtual offset. Then use the offset to find the key in that corresponding hive:
`[VOL3] windows.registry.printkey --offset <hive_virtual_offset> --key <key_path>`


### 5. Filesystem {#3677b0eb61a480fca2b0c072cd8f2304}


| What to look for            | Plugin      | Command Line                       |
| --------------------------- | ----------- | ---------------------------------- |
| Parse MFT entries           | **mftscan** | `[VOL3] windows.mftscan > mft.txt` |
| Visualize memory filesystem | **rstudio** | _(Custom plugin)_                  |


### 6. Other Useful Plugins {#3677b0eb61a480a8b94cdc8af8c66c5e}


### 6.1. NTFS Artifacts & File Extraction {#3677b0eb61a480929d1fc31d4deee919}


| Plugin        | Command Line                                       | Purpose                                                                                   |
| ------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **filescan**  | `[VOL3] windows.filescan`                          | Locates FILE OBJECT structures to find open files, including those deleted from the disk. |
| **dumpfiles** | `[VOL3_OUT] windows.dumpfiles --physaddr <offset>` | Extracts cached/mapped files (e.g., .pdf, SMFT) from RAM to a local directory.            |
| **mftscan**   | `[VOL3] windows.mftscan`                           | Parses MFT entries directly from memory. _(Replaces mftparser)_                           |


### 6.2. Advanced Malware & Artifact Hunting {#3677b0eb61a480a7b164d471f10f6c97}


| Category                | Plugin                     | Command Line                                           | Purpose                                                                                        |
| ----------------------- | -------------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| **Malware & Injection** | **malfind**                | `[VOL3_OUT] windows.malfind --pid <PID> --dump`        | Detects injected code (PAGE EXECUTE READWRITE) lacking a PE file on disk.                      |
|                         | **hollowprocesses**        | `[VOL3] windows.hollowprocesses`                       | Detects Process Hollowing techniques. _(Replaces hollowfind)_                                  |
|                         | **yarascan**               | `[VOL3] windows.vadyarascan --yara-rules <rule>`       | Scans RAM or specific processes using YARA rules. Return the exact virtual address.            |
| **Credentials & Keys**  | **hashdump**               | `[VOL3] windows.hashdump`                              | Extracts NTLM hashes directly from registry/memory.                                            |
|                         | **lsadump**                | `[VOL3] windows.lsadump`                               | Extracts clear-text LSA secrets from lsass.exe.                                                |
|                         | **bitlocker**              | _(Community plugin / TrueCrypt)_                       | Extracts master encryption keys for disk decryption.                                           |
| **Execution & Traces**  | **cmdline**                | `[VOL3] windows.cmdline`                               | Retrieves exact command-line executions & parameters.                                          |
|                         | **envars**                 | `[VOL3] windows.envars --pid <PID>`                    | Displays environment variables for processes.                                                  |
|                         | **cmdscan** / **consoles** | `[VOL3] windows.cmdscan`<br/>`[VOL3] windows.consoles` | Extracts execution history from conhost.exe. Extracts command output/display from conhost.exe. |
|                         | **clipboard**              | _(Not officially ported)_                              | Displays recently copied/pasted content.                                                       |
|                         | **shellbags**              | _(Community plugin)_                                   | Recovers accessed folders history (including offline drives).                                  |
|                         | **amcache**                | `[VOL3] windows.registry.amcache`                      | Proof of execution (and hashes)                                                                |
|                         | **userassist**             | `[VOL3] windows.registry.userassist`                   | how many time user click to a file, and focus time (GUI only)                                  |


### 6.3. Process Analysis {#3677b0eb61a48080ab3dcd0dd745422b}


| Plugin         | Command Line                                    | Purpose & Deep Dive                                                                                                                                                                     |
| -------------- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **dlllist**    | `[VOL3] windows.dlllist --pid <PID>`            | Lists DLLs loaded via PEB. Highly useful for detecting DLL Sideloading or DLL Hijacking.                                                                                                |
| **ldrmodules** | `[VOL3] windows.ldrmodules --pid <PID>`         | Detects hidden DLLs (Unhooking/Hollowing). Compares 3 PEB linked lists (InLoad, InMemory, InInit). If a mapped DLL exists on disk but returns 'False' here, it is intentionally hiding. |
| **handles**    | `[VOL3] windows.handles --pid <PID>`            | Displays objects (files, registries, mutexes) opened by a process. Used to find malicious persistence keys, sensitive accessed files, or malware signature mutants.                     |
| **vadinfo**    | `[VOL3] windows.vadinfo --pid <PID>`            | Analyzes Virtual Address Descriptor (VAD) regions. Crucial for spotting PAGE EXECUTE READWRITE protections (indicators of code injection).                                              |
| **vaddump**    | `[VOL3_OUT] windows.vadinfo --dump --pid <PID>` | Extracts VAD memory regions for reverse engineering. _(Replaces vaddump)_                                                                                                               |


### 6.4. Stealth & Rootkit Hunting {#3677b0eb61a4808a994fdd079a4136e2}


| Plugin        | Command Line               | Purpose                                                                                         |
| ------------- | -------------------------- | ----------------------------------------------------------------------------------------------- |
| **ssdt**      | `[VOL3] windows.ssdt`      | Detects hooks in the System Service Descriptor Table (Kernel rootkits).                         |
| **callbacks** | `[VOL3] windows.callbacks` | Identifies registered OS callbacks used for system monitoring.                                  |
| **modules**   | `[VOL3] windows.modules`   | Finds malicious drivers that were loaded and then hidden/unloaded. _(Replaces unloadedmodules)_ |
| **apihooks**  | _(Community plugin)_       | Deep-scans for inline API hooks (modified starting bytes).                                      |


### 6.5. Network, C2 Discovery & Timeline {#3677b0eb61a480fab128e163b0b29bf9}


| Plugin                      | Command Line                           | Purpose                                                                    |
| --------------------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| **connscan** / **sockscan** | _(Use_ _`windows.netscan`__)_          | Finds active/closed TCP connections via pool scanning. Finds open sockets. |
| **mutantscan**              | `[VOL3] windows.mutantscan`            | Scans for Mutexes created by malware (High-value IOCs).                    |
| **timeliner**               | `[VOL3] timeliner.Timeliner > out.csv` | Aggregates timestamps from all sources into a master super-timeline.       |


### 6.6. Triage & Dumping Plugins Comparison {#3677b0eb61a48092a6d5ce4fa813035a}


| Plugin        | Command Line                                       | Target Output        | Best Used For                                                                |
| ------------- | -------------------------------------------------- | -------------------- | ---------------------------------------------------------------------------- |
| **procdump**  | `[VOL3_OUT] windows.dumpfiles --pid <PID>`         | Executable (.exe)    | Rebuilding running PE files to reverse engineer in IDA Pro/Ghidra.           |
| **memdump**   | `[VOL3_OUT] windows.memmap --dump --pid <PID>`     | Raw Data (.dmp)      | Extracting entire process memory to run strings or yara for clear-text data. |
| **dumpfiles** | `[VOL3_OUT] windows.dumpfiles --physaddr <offset>` | Original File Format | Recovering opened documents, deleted files, or locked system logs.           |


### 6.7. Volshell {#3677b0eb61a480659320f07e87931726}


Volshell is an interactive python shell embedded within the Volatility framework. It allows analysts to directly interact with raw memory, traverse windows kernel structures.
Documentation: [https://volatility3.readthedocs.io/en/latest/volshell.html](https://volatility3.readthedocs.io/en/latest/volshell.html)


| Command             | Syntax / Example             | Purpose                                                                                                                                                   |
| ------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Change Context**  | `cc(pid=1234)`               | Switches your current working context to the virtual address space of a specific process.                                                                 |
| **Display Type**    | `dt("_EPROCESS", <address>)` | Casts a specific memory address into a Windows kernel structure format. Essential for manually parsing headers (e.g., PEB, _POOL_HEADER, _OBJECT_HEADER). |
| **Display Bytes**   | `db(<address>, length=64)`   | Dumps raw memory at a given address in both Hex and ASCII formats. Use for visually hunting for hidden strings, keys, or payloads in memory.              |
| **Display Dwords**  | `dd(<address>)`              | Displays memory in 4-byte (DWORD) chunks. Highly useful when looking for memory pointers, offsets, or IPv4 addresses.                                     |
| **Current Process** | `proc()`                     | Returns the _EPROCESS object of the current context. You can chain this to traverse structures (e.g., `proc().Peb.ProcessHeaps.dereference()`).           |


### 7. Basic Triage Process {#3677b0eb61a480dbb45afec040cd182d}


### Phase 1: Broad Reconnaissance (The "Lay of the Land") {#3677b0eb61a4800f971fd25b475a1e2e}

- **windows.pslist:** This provides a baseline of all currently active process by traversing the doubly-linked list (EPROCESS blocks).
	- _Audit:_ derived from EPROCESS structure (hard for attackers to tamper).
	- _Path:_ Extracted from PEB (process environment block) structure located in user mode, which makes it easily modified or spoofed by malware. Volatility 3 typically outputs these natively without needing verbose flags.
- **windows.pstree:** process genealogy - visualizing the parent-child lineage, is often employed to spot malicious processes.
- **windows.netscan:** Correlates active processes with network activity. If a suspicious process identified in pstree has an established external connection to a suspicious IP:port, it immediately becomes a high-priority target for C2, exfiltration activities.
- **windows.psxview:** Sophisticated malware often unlinks itself from the standard process list to evade detection (Direct Kernel Object Manipulation - DKOM). psxview cross-references multiple internal memory structures to expose these hidden processes. It effectively answers the question: "What is the OS failing to report?".

### Phase 2: Deep Process Inspection (Hunting for Injections/Hollowing) {#3677b0eb61a4803881a4f0299472aefd}

- **windows.malfind:** Once suspicious or hidden processes are isolated, malfind inspects their Virtual Address Descriptors (VADs). It specifically hunts for `PAGE_EXECUTE_READWRITE` memory protections that lack a backing PE file on the disk, exposing fileless malware and injected shellcode.
- **windows.hollowprocesses:** While malfind primarily hunts for injected code, hollowprocesses is explicitly designed to detect Process Hollowing. It counters attackers who evade malfind by modifying memory protections from `PAGE_EXECUTE_READWRITE` to `PAGE_EXECUTE_WRITECOPY`.

### Phase 3: Evidence Recovery & Artifact Extraction {#3677b0eb61a4805b878ce20198388270}

- **windows.filescan:** After mapping the attack execution flow, the focus shifts to the filesystem footprint. filescan hunts for FILE_OBJECT structures in RAM, revealing recently accessed documents, dropped payloads, or tools that the attacker may have already deleted from the physical disk.
- **windows.dumpfiles:** to dump the file you've detected with filescan. Often used with `-physaddr` flag (since filescan uses physical address instead of virtual address).
