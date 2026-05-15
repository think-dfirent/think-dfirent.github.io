---
title: Attack Phase Playbook
sidebar_position: 1
slug: /3557b0eb-61a4-80fd-b01d-ccc51592a484
---



---


## **Phase 1: Initial Access & Execution** **Assumption:**  {#3617b0eb61a480078519c616b13e9d40}


An IT employee (WS1) is tricked into executing an email attachment containing the Sandcat PowerShell payload. 


| Step  | Phase (Tactic) | Technique ID | Technique Name                                | Lab Action (Procedure via Caldera)                                                                                                                                                             | Expected Log Source / Event ID (Splunk)                                                                                                                                                               |
| ----- | -------------- | ------------ | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | Initial Access | T1204.002    | User Execution: Malicious File                | User Jim accesses an email/web link, downloads the `paycheck.rar` file, extracts it, and double-clicks the decoy file `paycheck.pdf.lnk`.                                                      | **pfSense / Suricata:** HTTP request downloading the `.rar` file. <br/>**Sysmon EID 1:** The LNK file triggers `explorer.exe` to call `powershell.exe`.                                               |
| **2** | Execution      | T1059.001    | Command and Scripting Interpreter: PowerShell | Hidden code within the LNK file executes a command to download the `sandcat.go` payload from the Kali machine (port 80) into the `TEMP` directory as `winupdate.exe` and executes it covertly. | **Sysmon EID 11:** The file `winupdate.exe` is created. <br/>**Sysmon EID 1:** The `winupdate.exe` process is launched. <br/>**WinEvent 4104:** Captures the entire script used to download the file. |


---


## **Phase 2: Persistence & Command and Control (C2)** **Objective:** {#3617b0eb61a4804c8485db6a4ce3a8ed}


Establish communication bypassing the pfSense firewall and ensure the Sandcat agent survives a system reboot. 


| Step  | Phase (Tactic)    | Technique ID | Technique Name    | Lab Action (Procedure via Caldera)                                                                                                                      | Expected Log Source / Event ID (Splunk)                                                                                                                                    |
| ----- | ----------------- | ------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **3** | Command & Control | T1071.001    | Web Protocols     | The `winupdate.exe` process on WS01 continuously beacons back to the Caldera Server (Kali) via port 80.                                                 | **Suricata IDS / pfSense:** Traffic is permitted because it utilizes port 80. <br/>**Sysmon EID 3:** `winupdate.exe` initiates continuous network connections (Beaconing). |
| **4** | Persistence       | T1547.001    | Registry Run Keys | Caldera automatically writes the executable path of `winupdate.exe` into the Registry Run key to ensure it executes automatically upon Windows startup. | **Sysmon EID 12, 13, 14:** Value creation or modification events detected in the `HKCU\Software\Microsoft\Windows\CurrentVersion\Run` registry key.                        |


## **Phase 3: Privilege Escalation & Credential Access** **Objective:** {#3617b0eb61a4809ea5f6ea4b40a5a95a}


Exploit local service misconfigurations to escalate to maximum privileges and steal NTLM hashes. 


| Step  | Phase (Tactic)       | Technique ID | Technique Name                      | Lab Action (Procedure via Caldera)                                                                                                    | Expected Log Source / Event ID (Splunk)                                                                                         |
| ----- | -------------------- | ------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **5** | Privilege Escalation | T1548.002    | Bypass UAC                          | Utilize Caldera's "Bypass UAC" ability to escalate from standard User privileges to Administrator.                                    | **Sysmon EID 1:** Execution of common UAC bypass binaries (e.g., `fodhelper.exe`, `computerdefaults.exe`).                      |
| **6** | Credential Access    | T1003.001    | OS Credential Dumping: LSASS Memory | Utilize a Caldera ability (executing Mimikatz/Procdump in-memory) to read the LSASS process and extract the Domain Admin's NTLM Hash. | **Sysmon EID 10 (Process Access):** An anomalous process (or PowerShell) requests `GrantedAccess 0x1010/0x1410` to `lsass.exe`. |


## **Phase 4: Lateral Movement & Collection** **Objective** {#3617b0eb61a4807cbff3f6f88d78fd81}


Identify the high-value target (DC01), seize control, and aggregate sensitive data. 


| Step      | Phase (Tactic)                | Technique ID  | Technique Name                                                      | Lab Action (Procedure via Caldera)                                                                                                                                                                                                                                     | Expected Log Source / Event ID (Splunk)                                                                                                                                                                                              |
| --------- | ----------------------------- | ------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **7**     | Discovery                     | T1135         | Network Share Discovery                                             | Operating from WS01, Caldera automatically runs discovery commands (`net`, `nltest`, `net share`) to scan the infrastructure and locate DC01 (10.10.10.10).                                                                                                            | **Sysmon EID 1:** Commands such as `net.exe`, `ping.exe`, and `nltest.exe` are executed continuously within a short timeframe.                                                                                                       |
| **8 & 9** | Lateral Movement & Collection | T1047 & T1039 | Windows Management Instrumentation & Data from Network Shared Drive | Using the stolen hash (Pass-the-Hash), Caldera executes WMI/SMB commands to copy and activate the `winupdate.exe` agent on the DC01 server. <br/>The agent on DC01 scans for sensitive files (`.docx`, `.pdf`) and compresses them into an archive named `backup.zip`. | **WinEvent 4624:** Logon Type 3 (Network) on DC01. <br/>**Sysmon EID 1 (on DC01):** `WmiPrvSE.exe` calls the malicious process. <br/>**Sysmon EID 11 (on DC01):** The `backup.zip` file is created in the Temp or Desktop directory. |


## **Phase 5: Exfiltration & Impact** **Objective** {#3617b0eb61a480c08e50de2837bd206c}


Exfiltrate the gathered data out of the network and cripple the target system. 


| Step   | Phase (Tactic) | Technique ID | Technique Name               | Lab Action (Procedure via Caldera)                                                                                                                             | Expected Log Source / Event ID (Splunk)                                                                                                                                                                               |
| ------ | -------------- | ------------ | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **10** | Exfiltration   | T1041        | Exfiltration Over C2 Channel | The `backup.zip` file is chunked and transmitted back to the Kali machine via the existing Caldera tunnel on port 80.                                          | **Suricata IDS / Splunk Network Logs:** Alerts triggered by anomalous outbound Data Transfer traffic (large POST requests).                                                                                           |
| **11** | Impact         | T1486        | Data Encrypted for Impact    | Execute Caldera's Ransomware ability: Delete Shadow Copies to prevent system recovery, mass-encrypt files (altering their extensions), and drop a ransom note. | **Sysmon EID 1:** Execution of the command `vssadmin.exe delete shadows /all /quiet`. <br/>**Sysmon EID 11:** A massive volume of file deletions (Delete) and creations (Create) featuring encrypted file extensions. |

