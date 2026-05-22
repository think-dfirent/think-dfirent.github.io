---
title: Basic SPL
sidebar_position: 3
slug: /3557b0eb-61a4-8008-8059-e13182e4d14f
tags:
  - Cheat Sheets
  - ELK
  - Linux
  - Malware Analysis
  - PowerShell
  - Splunk
  - Windows
---
<!-- notion-metadata-start -->
*📅 Published: 2026-05-03 18:57 | 🔄 Last Updated: 2026-05-07 14:42*
<!-- notion-metadata-end -->
---


### 1. Splunk core anchors {#3557b0eb61a480cbbe32f586b6eea2ef}


| **Splunk Concept**          | **Description**                                                                         | **SPL Example (KQL Equivalent)**                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **index**                   | Similar to dataview in ELK                                                              | `index=windows` or `index=linux_servers`                                                                               |
| **sourcetype**              | The log format (highly critical). It tells Splunk how to parse and read the file.       | `sourcetype="WinEventLog:Security"`<br/>`sourcetype="linux_audit"`<br/>`sourcetype="pan:traffic"` (Palo Alto Firewall) |
| **source**                  | The original physical file path that generated the log.                                 | `source="/var/log/auth.log"`                                                                                           |
| **Wildcards (****`*`****)** | If you can't remember an exact field name or value in Splunk, use asterisks everywhere. | `index=* sourcetype=*wineventlog*`                                                                                     |


### 2. Splunk CIM {#3557b0eb61a480f5b3f3c3b6b29ee1bd}


| **ELK (ECS)**                    | **Splunk (CIM)**     | **SPL Search Example**                                                |
| -------------------------------- | -------------------- | --------------------------------------------------------------------- |
| `event.category: process`        | `tag=process`        | `index=* tag=process action=created` (Find newly created processes)   |
| `event.category: network`        | `tag=network`        | `index=* tag=network tag=communicate` (Find network connection logs)  |
| `event.category: authentication` | `tag=authentication` | `index=* tag=authentication action=failure` (Failed logins)           |
| `event.category: malware`        | `tag=malware`        | `index=* tag=malware action=allowed` (Malware that bypassed defenses) |


---


### 3. Process & Execution {#3557b0eb61a48020bf8ed90e288a344e}


| **Hunt Objective**                                | **SPL via CIM (Normalized)**                | **SPL via Raw Log (Most Common)**                                        |
| ------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------ |
| **Find a specific process** (e.g., PowerShell)    | `tag=process process_name="powershell.exe"` | `sourcetype="*Security" EventCode=4688 NewProcessName="*powershell.exe"` |
| **Find command-line execution content**           | **`tag=process process="*bypass*"`**        | `sourcetype="*Security" EventCode=4688 CommandLine="*bypass*"`           |
| **Find parent process**                           | `tag=process parent_process_name="cmd.exe"` | `sourcetype="*Security" EventCode=4688 ParentProcessName="*cmd.exe"`     |
| **Linux: Find executed commands** (Auditd/Syslog) | `tag=process process_name="wget"`           | `sourcetype=linux_audit type=EXECVE a0="wget"`                           |


---


### 4. Network & Web/HTTP {#3557b0eb61a4800daa21f0179158eaca}


| **Hunt Objective**                 | **Target Splunk Fields**                      | **SPL Example**                                             |
| ---------------------------------- | --------------------------------------------- | ----------------------------------------------------------- |
| **Find Source / Dest IP**          | `src_ip` (or `src`)<br/>`dest_ip` (or `dest`) | `index=* sourcetype=pan:traffic dest_ip="10.10.10.5"`       |
| **Find Network Port**              | `dest_port`                                   | `index=* tag=network dest_port=3389` (Find RDP connections) |
| **Find HTTP POST Queries**         | `http_method`                                 |                                                             |
| **Find Malicious URLs / Domains**  | `url` or `site`                               | `index=* sourcetype=proxy url="*pastebin.com*"`             |
| **Find Anomalous DNS Connections** | `query` (Domain name)                         | `index=* sourcetype=stream:dns query="ngrok.io"`            |


---


### 5. Basic Authentication & Logon Hunting {#3557b0eb61a4801db8f5ee93fd088a95}


| **Hunt Objective**              | **SPL via CIM**                                | **SPL via Raw Windows Log**                                        |
| ------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------ |
| **Failed Logins** (Brute-force) | `tag=authentication action=failure`            | `sourcetype="*Security" EventCode=4625 user="admin"`               |
| **Successful Logins**           | `tag=authentication action=success`            | `sourcetype="*Security" EventCode=4624 user="admin"`               |
| **RDP Logins** (Logon Type 10)  | `tag=authentication signature_id=4624 app=rdp` | `sourcetype="*Security" EventCode=4624 Logon_Type=10`              |
| **Linux: SSH Logins**           | `tag=authentication app=sshd`                  | `sourcetype=linux_secure "Accepted password" OR "Failed password"` |


---


## 6. Splunk Piping {#3597b0eb61a4800dbd0fcf0072b59026}


In ELK, Kibana automatically draws tables and charts as you type KQL. In Splunk, after filtering with keywords, you must use the pipe character (`|`) to call drawing or statistical commands.


Memorize these three essential "finishing" commands: 

1. **Count & Statistics** (Like 'Visualize' in ELK): `... | stats count by src_ip` _(Counts occurrences per IP)_
2. **Filter & Format Tables** (Like choosing columns in ELK Discover): `... | table _time, user, process_name, CommandLine` _(Displays only these 4 columns for readability)_
3. **Sorting:** `... | sort -_time` _(Sorts by time from newest to oldest)_

**Example of a complete RDP Brute-force hunt in Splunk:** 


Splunk SPL


```powershell
index=windows sourcetype="WinEventLog:Security" EventCode=4625 Logon_Type=10 
| stats count by src_ip, user 
| where count > 10 
| sort -count 
```

