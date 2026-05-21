---
title: Incident Report
sidebar_position: 3
slug: /3647b0eb-61a4-8029-9f70-cd6cfb1157ca
tags:
  - Active Directory
  - Adversary Emulation
  - Caldera
  - Credential Access
  - DFIR
  - Defense Evasion
  - Digital Forensics
  - Homelab
  - Impact
  - Incident Response
  - Lateral Movement
  - MITRE ATT&CK
  - Malware Analysis
  - PowerShell
  - Privilege Escalation
  - PsExec
  - Ransomware
  - Registry
  - Sysmon
  - UAC Bypass
  - WMI
  - Windows
  - Windows Event Logs
---



---


# Case Study: Sandcat Agent Leads to Rapid Ransomware Deployment and Defacement {#3677b0eb61a4807e92ffebaea2c7e134}


## Case Summary {#3677b0eb61a4809aa1a7d40b6698cd22}


On May 19 2026, a threat actor gained initial access to a workstation (WS01) via a malicious PowerShell script disguised as a financial report. The script deployed a Caldera Sandcat agent, establishing a Command and Control (C2) channel. Within five minutes of initial access, the adversary successfully bypassed User Account Control (UAC) via `fodhelper.exe` to achieve elevated privileges, and utilized `comsvcs.dll` to dump LSASS memory for credential harvesting.


Leveraging the stolen Administrator credentials, the threat actor utilized PsExec to move laterally to the Domain Controller (DC01). Once on the DC, the adversary established WMI persistence, impaired system defenses by disabling Sysmon, and exfiltrated sensitive executive documents. The intrusion culminated in the deletion of Volume Shadow Copies, encryption of target files, appending a `.ransom` extension, and the deployment of a ransom note as the desktop wallpaper. The entire attack chain, from initial access to ransomware deployment, took approximately 30 minutes.


## Analysis {#3677b0eb61a480f68465df455eb2927b}


### Initial Access & Execution {#3677b0eb61a480a4a24df01662105da3}


The intrusion began on WS01 when a user named `jim` downloaded and executed a file named `Annual_Report_2026.ps1`. The presence of a `Zone.Identifier` (Mark-of-the-Web) confirmed the payload was acquired externally. The user initially opened the file via Notepad before executing it using PowerShell 7 (`pwsh.exe`).


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-80d6-a2cd-fcce0fc7fb32.png)


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-80c7-b2c6-e7e0810d582a.png)


This script acted as a dropper, contacting the threat actor's infrastructure at `http://192.168.253.128:80` to download a Caldera Sandcat agent named `sandcat.go`, which was subsequently written to disk and executed from `C:\Users\jim\AppData\Local\Temp\winupdate.exe`.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-80b8-850e-e680a79cb28e.png)


### Command & Control {#3677b0eb61a480b8b976edf049a4ffb4}


Over the course of the intrusion the threat actor relied on `http://192.168.253.128:80` to remotely execute commands.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-802a-9614-d813a747f031.png)


### Privilege Escalation {#3677b0eb61a480f7bdefe4780009b1ac}


To elevate privileges from a Medium to High integrity level, the adversary abused `fodhelper.exe`, a legitimate Windows binary that auto-elevates without prompting the user. The threat actor modified the `HKCU\Software\Classes\ms-settings\Shell\open\command` registry key, inserting a `DelegateExecute` value pointing to the Sandcat payload. After gaining elevated privileges, the registry modifications were immediately deleted. 


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-803f-96a9-e2d8f5ca1e8e.png)


Disk forensics confirmed this activity by parsing the user's `UsrClass.dat` hive, which successfully recovered the deleted `DelegateExecute` key and its malicious payload.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-80bf-963e-c750c9895e4e.png)


### Discovery {#3677b0eb61a480eb8b6de4571aa4d146}


Initially, the adversary engaged in heavy discovery using native living-off-the-land binaries (LOLBins) including `whoami`, `systeminfo`, `net localgroup`, and `netstat`. The output of these commands was concatenated into a single string for rapid exfiltration.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-806c-95ac-f3c4d5b9d29c.png)


 With elevated privileges, , the attacker then executed `PowerView.ps1` filelessly in memory to map the Active Directory environment.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-8025-ae4a-f6c5b5e8adf1.png)


### Credential Access {#3677b0eb61a4804c896bdbbcf8935919}


Following discovery, the adversary accessed the `lsass.exe` process using the `comsvcs.dll` MiniDump function via `rundll32.exe`. The resulting memory dump was temporarily stored at `C:\Users\jim\AppData\Local\Temp\lsass.dmp`


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-80e8-b2cd-fe6cd59f5c66.png)


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-802b-974f-d83ae00b8685.png)


### Exfiltration {#3677b0eb61a48035aa89f94a5f391ee6}


Threat actor then exfiltrated the dump to the C2 server via HTTPs using `curl.exe` and remove the `lsass.dmp` on WS01.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-809b-ad7c-e45d2aeff09f.png)


### Lateral Movement {#3677b0eb61a4803db6abf2f189b81c07}


Using the credentials harvested from WS01, the attacker moved laterally to DC01 utilizing PsExec (`PSEXESVC.exe`) over SMB (port 445). A new service (`PSEXESVC`) was installed


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-800b-8a13-fcefeeb243f8.png)


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-8005-9fa7-db751139d107.png)


 And the Sandcat agent (`winupdate.exe`) was successfully dropped and executed with `NT AUTHORITY\SYSTEM` privileges.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-802b-8455-e27bb3c6a433.png)


###  Persistence {#3677b0eb61a4808b9fdad3bd9b1ac9e9}


The adversary established persistence mechanisms on both hosts:

- **WS01:** A registry Run key named `WindowsUpdateManager` was created, executing the payload upon logon. This was verified via `NTUSER.DAT` analysis.

![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-800f-b816-ff84f82681f6.png)

- **DC01:** A sophisticated WMI Event Subscription was created. An event filter named `updater` monitored system uptime, binding to a `CommandLineEventConsumer` configured to launch `winupdate.exe`.

![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-8036-8b69-d0112e0ffc65.png)


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-80a7-b017-f06956e2b51e.png)


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-8028-8297-de1ff4121291.png)

- Parsing the `OBJECTS.DATA` WMI repository during disk forensics confirmed this fileless persistence mechanism.

![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-8080-83d1-c6dd41c56336.png)


### Defense Impairment {#3677b0eb61a48019bc83fb36fca069f2}


Prior to final impact operations on DC01, the adversary unloaded the Sysmon filter driver (`fltmc.exe unload SysmonDrv`) to blind telemetry.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-809e-a3e3-e45afa2aac5b.png)


 Amcache and Prefetch analysis were required to reconstruct subsequent executions.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-8071-95b9-d9d7049184ff.png)


### Stealth {#3677b0eb61a480a99051deeac2e60604}


To further hinder investigation, the adversary utilized PowerShell to timestomp the encrypted files, changing their `$STANDARD_INFORMATION` timestamps to `01/01/2010`. Disk forensics via MFT analysis bypassed this evasion tactic by observing the immutable `$FILE_NAME` timestamps.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-8032-8b57-cc057addcb5a.png)


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-8095-ba6f-f23b015520c4.png)


###  Impact {#3677b0eb61a48093abd7cc83084b2bee}


The attacker compressed sensitive PDF files in `C:\c-suite-docs\` into a zip archive (`loot.zip`) and exfiltrated them via a PowerShell web request. To inhibit system recovery, Volume Shadow Copies were deleted using `vssadmin.exe`.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-800c-995d-fb5242112434.png)


A PowerShell script appended a `.ransom` extension to the target documents. 


An inspection of the UsnJrnl logs also indicates that a `.ransom` extension was appended to the PDF files.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-802c-8a00-e7f37e337d8b.png)


 Finally, the adversary downloaded `ransom.jpg` and executed C# code to change the desktop wallpaper, concluding the attack with internal defacement.


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-80d0-9657-faf6cc865a20.png)


![](./3647b0eb-61a4-8029-9f70-cd6cfb1157ca.3677b0eb-61a4-80f4-9c47-c620da88e03b.png)


## Indicators of Compromise (IOCs) {#3677b0eb61a4802bb935f951916309ef}


### Network {#3677b0eb61a480ff8417d9d0e2c962fa}

- **192.168.253[.]128:80** - Command and Control (Sandcat HTTP Beacon)
- **192.168.253[.]128:443** - Exfiltration Destination (LSASS dump, Stolen Data, Ransom Note Download)

### Host Artifacts {#3677b0eb61a480b69b52f3b6e721282f}

- **File:** `C:\Users\jim\Downloads\Annual_Report_2026.ps1` (Initial Payload)
	- SHA256: 8F3D61584F3E73FAC46A3E126860B9E4025C4C829477FB57626C2791317677D9
- **File:** `C:\Users\jim\AppData\Local\Temp\winupdate.exe` (Sandcat Agent WS01)
	- SHA256: BBE9707328838688DD88F50C147619D429582E742040056ACADA0F00E78DB351
- **File:** `C:\Windows\Temp\winupdate.exe` (Sandcat Agent DC01)
	- SHA256: 297483A434E51A85CF592A4F6ABB2A504D6C6EBD8FCA6E7D891D4E8DB27D5EAE
- **File:** `C:\Users\jim\AppData\Local\Temp\lsass.dmp` (Credential Dump)
- **File:** `C:\Users\Public\ransom.jpg` (Defacement Wallpaper)
	- SHA256: F54BAE9B17E56E46224E1F448A2ED3296ACA217F7F2565EF999E91C9140315FB
- **Memory Mutex:** `\Sessions\1\BaseNamedObjects\SMO pid:12012 WilStaging_02`

### Registry & WMI {#3677b0eb61a48091bc0ad51de6e0457a}

- **Registry Key:** `HKCU\Software\Microsoft\Windows\CurrentVersion\Run\WindowsUpdateManager`
- **Registry Key:** `HKCU\Software\Classes\ms-settings\Shell\open\command\DelegateExecute`
- **WMI Filter:** `updater` (Query: `SELECT * FROM __InstanceModificationEvent WITHIN 60 WHERE TargetInstance ISA 'Win32_PerfFormattedData_PerfOS_System' AND TargetInstance.SystemUpTime >= 240 AND TargetInstance.SystemUpTime < 325`)

## Timeline (UTC+7:00) {#3677b0eb61a4808fb42ed5328ce93e1b}

1. 18:30:01 - Initial Access: User executes `Annual_Report_2026.ps1` on WS01.
2. 18:31:03 - Execution: `winupdate.exe` executes and initiates C2 beaconing.
3. 18:33:32 - Persistence: Run Key `WindowsUpdateManager` created on WS01.
4. 18:34:25 - Discovery: Automated system enumeration scripts executed on WS01.
5. 18:35:25 - Privilege Escalation: UAC bypassed using `fodhelper.exe`.
6. 18:36:26 - Discovery: PowerView utilized for Active Directory enumeration.
7. 18:37:58 - Credential Access: LSASS dumped via `comsvcs.dll` (`lsass.dmp`).
8. 18:38:37 - Exfiltration: `lsass.dmp` exfiltrated via `curl.exe`.
9. 18:40:05 - Lateral Movement: Lateral movement to DC01 via PsExec.
10. 18:41:59 - Discovery: File and folder discovery using cmd  on DC01.
11. 18:44:40 - Exfiltration: PDF documents staged into `loot.zip` and exfiltrated from DC01.
12. 18:44:41 - Persistence: WMI Event Subscription created on DC01.
13. 18:52:04 - Defense Impairment: Sysmon driver unloaded on DC01.
14. 18:54:44 - Impact: Shadow Copies deleted and PDF files encrypted.
15. 18:54:44 - Impact: Encrypted all PDFs into the `.ransom` extension.
16. 19:00:13 - Stealth: Altered the Standard Information timestamps of PDF files.
17. 19:00:13 - Impact:  Internal wallpaper defacement.

## MITRE ATT&CK {#3677b0eb61a480729f49e95be93e3279}


| No | Tactic (Lifecycle Phase) | Technique/Sub-technique                                               | MITRE ID  |
| -- | ------------------------ | --------------------------------------------------------------------- | --------- |
| 1  | **Initial Access**       | Phishing: Spearphishing Link                                          | T1566.002 |
| 2  | **Execution**            | User Execution: Malicious File                                        | T1204.002 |
| 3  | **Persistence**          | Boot or Logon Autostart Execution: Registry Run Keys / Startup Folder | T1547.001 |
| 4  |                          | Event Triggered Execution: WMI Event Subscription                     | T1546.003 |
| 5  | **Privilege Escalation** | Abuse Elevation Control Mechanism: Bypass User Account Control        | T1548.002 |
| 6  | **Defense Impairment**   | Disable or Modify Tools                                               | T1685     |
| 7  | **Stealth**              | Indicator Removal on Host: Timestomp                                  | T1070.006 |
| 8  | **Credential Access**    | OS Credential Dumping: LSASS Memory                                   | T1003.001 |
| 9  | **Discovery**            | System Information Discovery                                          | T1082     |
| 10 |                          | Account Discovery: Domain Account                                     | T1087.002 |
| 11 |                          | File and Directory Discovery                                          | T1083     |
| 12 | **Lateral Movement**     | Lateral Tool Transfer                                                 | T1570     |
| 13 | **Command & Control**    | Application Layer Protocol: Web Protocols                             | T1071.001 |
| 14 | **Exfiltration**         | Exfiltration Over C2 Channel                                          | T1041     |
| 15 | **Impact**               | Inhibit System Recovery                                               | T1490     |
| 16 |                          | Data Encrypted for Impact                                             | T1486     |
| 17 |                          | Defacement: Internal Defacement                                       | T1491.001 |


## **Remediation and Recommendations** {#3677b0eb61a48086b4ded6a020bf9493}


### **Containment & Eradication** {#3677b0eb61a480c48377cf3b4769c601}

- **Host Isolation:** Immediately isolate WS01 and DC01 from the production network to sever the active Sandcat C2 connection over port 80.
- **Credential Revocation:** Force a global password reset for all compromised accounts, specifically the Domain Admin credentials harvested from WS01. Purge all active Kerberos tickets (Golden/Silver ticket prevention).
- **Eradicate Persistence Mechanisms:**
	- Delete the `WindowsUpdateManager` Run key on WS01.
	- Remove the malicious WMI Event Subscription (`updater`) and its associated `CommandLineEventConsumer` on DC01.
- **System Rebuild:** Due to the deployment of ransomware and intentional defense impairment , both WS01 and DC01 should be wiped and rebuilt from known-good, immutable backups prior to the May 19, 2026 intrusion date.

### **System Hardening & Prevention** {#3677b0eb61a48033a0a7dc27238adcc4}


To prevent recurrence of the tactics, techniques, and procedures (TTPs) utilized by this threat actor, the following architectural and policy controls are recommended:

- **Mitigate Privilege Escalation (UAC Bypass):** The adversary abused `fodhelper.exe` via registry modifications to elevate privileges.
	- _Recommendation:_ Enforce the "Always Notify" UAC setting. Standardize Least Privilege User Accounts (LUA) so standard users (like `jim`) lack the permissions required to modify sensitive HKCU registry keys.
- **Prevent Credential Dumping:** The attacker used `comsvcs.dll` via `rundll32.exe` to dump LSASS memory.
	- _Recommendation:_ Enable Microsoft Defender Credential Guard and configure LSA Protection (RunAsPPL) to block unauthorized processes from reading `lsass.exe` memory.
- **Restrict Lateral Movement:** The threat actor utilized stolen Administrator credentials and PsExec over SMB to move laterally to the Domain Controller.
	- _Recommendation:_ Implement Windows Local Administrator Password Solution (LAPS) to randomize local admin passwords and prevent lateral movement. Network segmentation should also be enforced to strictly limit workstation-to-workstation SMB (port 445) communication.
- **PowerShell Execution Controls:** The attack relied heavily on PowerShell for initial payload execution, C2 staging, and timestomping.
	- _Recommendation:_ Enforce PowerShell Constrained Language Mode (CLM) and implement stricter Execution Policies across the domain to block unsigned, external scripts.
- **Defense Impairment Protections:** The adversary successfully unloaded the Sysmon filter driver (`fltmc.exe unload SysmonDrv`) to blind telemetry.
	- _Recommendation:_ Enable Tamper Protection on all endpoint detection and response (EDR) and logging agents to prevent administrative disabling or driver unloading.
