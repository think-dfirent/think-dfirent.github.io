---
title: Attack Playbook
sidebar_position: 0
slug: /3557b0eb-61a4-80fd-b01d-ccc51592a484
---



---


:::tip

Before starting any attack step, remember to take a snapshot on all of the host to make sure all actions are reversible, and save you from any trouble

:::




### **Phase 1: Initial Access, Execution & C2** {#3677b0eb61a480d1834eec8bba4b25c6}


**Objective:** Gain a foothold on the target workstation (WS01) and establish a stable Command & Control channel.


| Step  | Phase (Tactic)    | Technique ID            | Technique Name                | Lab Action (Procedure)                                                                                               | Expected Log Source / Event ID (Splunk)                                                                                                            |
| ----- | ----------------- | ----------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | Initial Access    | T1566.002               | Spearphishing Link            | User "Jim" accesses a web link and downloads the `Annual_Report_2026.ps1` payload.                                   | **pfSense / Suricata:** HTTP/HTTPS request downloading the `.ps1` file.                                                                            |
| **2** | Execution         | T1204.002<br/>T1059.001 | User Execution<br/>PowerShell | User executes the `.ps1` file. The script downloads the agent and saves it as `winupdate.exe` in the TEMP directory. | **Sysmon EID 1:** `powershell.exe` spawns.<br/>**Sysmon EID 11:** `winupdate.exe` file is created.                                                 |
| **3** | Command & Control | T1071.001               | Web Protocols                 | The Caldera agent successfully establishes C2, beaconing back to the Kali server over standard HTTP (port 80).       | **Suricata IDS / pfSense:** Continuous, regular interval traffic (beaconing).<br/>**Sysmon EID 3:** `winupdate.exe` initiates network connections. |


### **Phase 2: Local Enumeration & Privilege Escalation** {#3677b0eb61a480ba94f5dfc10357a8e4}


**Objective:** Establish immediate persistence, map the local system and domain, and elevate privileges on WS01.


| Step  | Phase (Tactic)       | Technique ID        | Technique Name                                             | Lab Action (Procedure via Caldera)                                                                                                                           | Expected Log Source / Event ID (Splunk)                                                                                                   |
| ----- | -------------------- | ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| **4** | Persistence          | T1547.001           | Registry Run Keys / Startup Folder                         | Writes the path of `winupdate.exe` into the `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` registry key named `WindowsUpdateManager`.                  | **Sysmon EID 12, 13, 14:** Registry value creation and modification for the Run key.                                                      |
| **5** | Discovery            | T1082<br/>T1087.001 | System Information Discovery<br/>Account Discovery: Domain | Runs OS commands (`whoami`, `systeminfo`, `netstat`) to map the host. Downloads PowerView via PowerShell to enumerate AD domain admins and target computers. | **Sysmon EID 1:** Rapid execution of enumeration binaries.<br/>**WinEvent 4104 (PowerShell):** Captures PowerView script block execution. |
| **6** | Privilege Escalation | T1548.002           | Bypass User Account Control                                | Modifies `ms-settings` registry keys to exploit the `fodhelper.exe` auto-elevation mechanism, spawning a new elevated agent.                                 | **Sysmon EID 13:** Modification of `DelegateExecute`.<br/>**Sysmon EID 1:** `fodhelper.exe` spawns a child process.                       |


### **Phase 3: Credential Access & Exfiltration** {#3677b0eb61a4800d85f5e3a89982d201}


**Objective:** Extract high-value credentials from system memory and securely transfer them out of the network.


| Step  | Phase (Tactic)    | Technique ID | Technique Name                      | Lab Action (Procedure via Caldera)                                                                             | Expected Log Source / Event ID (Splunk)                                                                                                      |
| ----- | ----------------- | ------------ | ----------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **7** | Credential Access | T1003.001    | OS Credential Dumping: LSASS Memory | Uses `rundll32.exe` to execute `comsvcs.dll`, dumping LSASS memory to a file named `lsass.dmp`.                | **Sysmon EID 10:** `rundll32.exe` requests GrantedAccess to `lsass.exe`.<br/>**Sysmon EID 11:** `lsass.dmp` is created.                      |
| **8** | Exfiltration      | T1041        | Exfiltration Over C2 Channel        | Uses `curl.exe` to POST the `lsass.dmp` file out of the network over an HTTPS C2 channel to the Kali receiver. | **Sysmon EID 1 / 3:** `curl.exe` execution and outbound network connection.<br/>**Suricata:** Anomalous outbound data transfer (large POST). |


### **Phase 4: Lateral Pivot & Target Acquisition** {#3677b0eb61a48026bc19eea1dc6a6b7a}


**Objective:** Utilize offline-cracked credentials to pivot to the Domain Controller (DC01) and locate sensitive files.


| Step   | Phase (Tactic)   | Technique ID | Technique Name               | Lab Action (Procedure via Caldera)                                                                                             | Expected Log Source / Event ID (Splunk)                                                                       |
| ------ | ---------------- | ------------ | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **9**  | Lateral Movement | T1570        | Lateral Tool Transfer        | Uploads and executes `PsExec64.exe` using compromised Domain Admin credentials to spawn a detached, elevated C2 agent on DC01. | **WinEvent 4624 (DC01):** Logon Type 3 (Network).<br/>**WinEvent 7045 (DC01):** `PSEXESVC` service installed. |
| **10** | Discovery        | T1083        | File and Directory Discovery | Executes legacy command-line utilities (`dir /c`) on DC01 to locate sensitive data within `C:\c-suite-docs`.                   | **Sysmon EID 1 (DC01):** `cmd.exe` executing directory enumeration, spawned by an unknown binary.             |


### **Phase 5: Actions on Objectives (Collection, Impact & Stealth)** {#3677b0eb61a4804886aaedc42abceafa}


**Objective:** Steal sensitive documents, solidify deep persistence, disable telemetry, and execute disruptive ransom payloads.


| Step   | Phase (Tactic)            | Technique ID        | Technique Name                               | Lab Action (Procedure via Caldera)                                                                                                                                       | Expected Log Source / Event ID (Splunk)                                                                                                     |
| ------ | ------------------------- | ------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **11** | Collection & Exfiltration | T1560.001<br/>T1041 | Archive via Utility<br/>Exfiltration Over C2 | Uses `Compress-Archive` to package targeted PDFs into `loot.zip`, exfiltrates it via `System.Net.WebClient`, and deletes the archive.                                    | **WinEvent 4104 (DC01):** PowerShell script block logging the `Compress-Archive` cmdlet.<br/>**Sysmon EID 11 (DC01):** `loot.zip` creation. |
| **12** | Persistence               | T1546.003           | WMI Event Subscription                       | Deploys a stealthy WMI `CommandLineEventConsumer` (named "updater") that triggers payload execution based on system uptime on DC01.                                      | **Sysmon EID 19, 20, 21 (DC01):** `WmiEventFilter`, `WmiEventConsumer`, and `WmiEventConsumerToFilter` activity detected.                   |
| **13** | Defense Impairment        | T1685               | Disable or Modify Tools                      | Executes `fltmc.exe unload SysmonDrv` from an administrative command prompt to unload the Sysmon filter and halt logging on DC01.                                        | **Sysmon EID 1 (DC01):** `fltmc.exe` execution. (Note: Visibility drops immediately after this step).                                       |
| **14** | Impact                    | T1490               | Inhibit System Recovery                      | Executes `vssadmin.exe delete shadows /all /quiet` to destroy all Volume Shadow Copies and hinder incident recovery.                                                     | _Blind spot (Sysmon unloaded)_. Alternative: **WinEvent 4688 (DC01):** `vssadmin.exe` execution if enabled.                                 |
| **15** | Impact                    | T1486               | Data Encrypted for Impact                    | Executes a PowerShell loop to simulate ransomware by appending a `.ransom` extension to all PDF files in the target directory.                                           | _Blind spot (Sysmon unloaded)_. Alternative: **File Server Auditing (WinEvent 4663):** Massive file modification events.                    |
| **16** | Stealth                   | T1070.006           | Indicator Removal on Host: Timestomp         | Uses PowerShell to modify the `$STANDARD_INFORMATION` timestamps (`CreationTime`, `LastWriteTime`, `LastAccessTime`) of the payload and `.ransom` files to `01/01/2010`. | _Blind spot (Sysmon unloaded)_.                                                                                                             |
| **17** | Impact                    | T1491.001           | Defacement: Internal Defacement              | Downloads `ransom.jpg` to the Public folder and utilizes C# `SystemParametersInfo` via PowerShell to change the DC01 wallpaper to a ransom note.                         | _Blind spot (Sysmon unloaded)_. Alternative: **WinEvent 4657 (DC01):** Modification of Desktop Wallpaper registry keys.                     |

