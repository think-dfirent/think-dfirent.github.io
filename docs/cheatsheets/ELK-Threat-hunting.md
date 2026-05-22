---
title: ELK Threat hunting
sidebar_position: 4
slug: /3597b0eb-61a4-8000-96ba-c4d3cf3e97dd
tags:
  - Cheat Sheets
  - ELK
  - Lateral Movement
  - Malware Analysis
  - PowerShell
  - PsExec
  - Ransomware
  - Threat Hunting
  - Windows
---
<!-- notion-metadata-start -->
*📅 Published: 2026-05-07 13:49 | 🔄 Last Updated: 2026-05-07 14:36*
<!-- notion-metadata-end -->
---


## 1. Elastic Common Schema (ECS) Fundamentals {#3597b0eb61a48003a94ff5db1d582c29}


Understanding ECS is crucial for effective threat hunting in ELK. It normalizes data from various sources into a standard format.


| Field              | Description                                                                                                                             | KQL Examples                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **event.category** | It looks for similar events from various data sources that can be grouped together for viewing or analysis.                             | `event.category: authentication`<br/>`event.category: process`<br/>`event.category: network`<br/>`event.category: (malware or intrusion_detection)` |
| **event.type**     | It serves as a sub-categorization that, when combined with the `event.category` field, allows for filtering events to a specific level. | `event.type: start`<br/>`event.type: creation`<br/>`event.type: access`<br/>`event.type: deletion`                                                  |
| **event.outcome**  | It indicates whether the event represents a successful or a failed outcome.                                                             | `event.outcome: success`<br/>`event.outcome: failure`                                                                                               |


## 2. Common Search Fields & Time Filtering {#3597b0eb61a480e784f3c7de88c99c94}


| Field          | KQL Examples                                                | Output / Purpose                                                        |
| -------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| **@timestamp** | `@timestamp: "2023-01-26"`                                  | Events that happened exactly on the 26th.                               |
|                | `@timestamp <= "2023-01-25"`                                | Events that happened with a date less than or equal to the 25th of Jan. |
|                | `@timestamp >= "2023-01-26" and @timestamp <= "2023-01-27"` | Events that happened between the 26th and the 27th of Jan.              |
| **agent.name** | `agent.name: DESKTOP-*`                                     | Look for events from an agent name that starts with DESKTOP.            |
| **message**    | `message: *powershell*`                                     | Look for any log message containing the word powershell.                |


## 3. Process Related Fields {#3597b0eb61a48065b3dae8a3c55520dd}


| Field                    | KQL Examples                                                                                                                 | Output / Purpose                                                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **process.name**         | `event.category: process and process.name: "powershell.exe"`                                                                 | Look for `powershell.exe` executing as a process.                                                                                  |
| **process.command_line** | `event.category: process and process.command_line.text: *whoami*`                                                            | Look for a command line execution that has `whoami` in it.                                                                         |
| **process.pid**          | `event.category: process and process.pid: 6360`                                                                              | Look for a specific process ID: 6360.                                                                                              |
| **process.parent.name**  | `event.category: process and process.parent.name: "cmd.exe"`                                                                 | Looks for `cmd.exe` acting as a parent process.                                                                                    |
| **process.parent.pid**   | `host.name: DESKTOP-* and event.category: process and process.command_line.text: *powershell* and process.parent.pid: 12620` | Looks for a process command line containing `powershell` where the parent process ID is 12620 on a hostname starting with DESKTOP. |


## 4. Network Related Fields {#3597b0eb61a480c19bcbcd94efda7245}


| Field                            | KQL Examples                             | Output / Purpose                                                                 |
| -------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| **source.ip**                    | `source.ip: 127.0.0.1`                   | Looks for any logs originated from the loopback IP address.                      |
| **destination.ip**               | `destination.ip: 23.194.192.66`          | Looks for any logs originating to the IP 23.194.192.66.                          |
| **destination.port**             | `destination.port: 443`                  | Looks for any network logs targeting port 443.                                   |
| **dns.question.name**            | `dns.question.name: "www.youtube.com"`   | Look for any DNS resolution towards [www.youtube.com](https://www.youtube.com/). |
| **dns.response_code**            | `dns.response_code: "NXDOMAIN"`          | Looks for DNS traffic towards non-existing domain names.                         |
| **destination.geo.country_name** | `destination.geo.country_name: "Canada"` | Looks for any outbound traffic toward Canada.                                    |


## 5. Authentication Related Fields {#3597b0eb61a480cd9a27c864637f52be}


| Field                                            | KQL Examples                                                                                                                                                                                                               | Output / Purpose                                                                                                                 |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **user.name**                                    | `event.category: "authentication" and user.name: "administrator" and event.outcome: "failure"`                                                                                                                             | Looks for failed login attempts targeting the username administrator.                                                            |
| **winlog.logon.type**                            | `event.category: "authentication" and winlog.logon.type: "Network"`                                                                                                                                                        | Look for authentication that happened over the network.                                                                          |
|                                                  | `event.category: "authentication" and winlog.logon.type: "RemoteInteractive"`                                                                                                                                              | Look for RDP (Remote Desktop) authentication.                                                                                    |
| **winlog.event_data. AuthenticationPackageName** | `event.category: "authentication" and event.action: "logged-in" and winlog.logon.type: "Network" and user.name.text: "administrator" and event.outcome: "success" and winlog.event_data.AuthenticationPackageName: "NTLM"` | Look for successful network authentication events against the user administrator, where the authentication package used is NTLM. |


## 6. Web & Application Layer (HTTP / TLS) {#3597b0eb61a48045b061c9b1faa79550}


| Field                         | KQL Examples                                                                          | Output / Purpose                                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **network.application**       | `network.application: "http"`<br/>`network.application: "tls"`                        | Looks for traffic specifically identified as HTTP or TLS (HTTPS), regardless of the port used.                                                           |
| **http.request.method**       | `event.category: "network" and http.request.method: "POST"`                           | Looks for HTTP POST requests (often investigated for data exfiltration, uploading malware, or C2 beacons).                                               |
| **url.domain**                | `url.domain: "*pastebin.com*"`<br/>`url.domain: "*ngrok.io*"`                         | Looks for traffic heading to a specific domain. Wildcards (*) are useful for catching subdomains used by threat actors.                                  |
| **url.path**                  | `url.path: "/login.php"`<br/>`url.path: *cmd=*`                                       | Looks for requests targeting a specific file path or containing suspicious parameters in the URI.                                                        |
| **http.response.status_code** | `http.response.status_code: 200`<br/>`http.response.status_code: (401 or 403 or 404)` | Looks for successful HTTP transactions (200), or errors like unauthorized (401/403) and not found (404), which can indicate web directory brute-forcing. |


## 7. Lateral Movement & Advanced DNS {#3597b0eb61a480ada748f450d0c607a0}


| Field                                | KQL Examples                                                                          | Output / Purpose                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **network.application (SMB)**        | `network.application: "smb"`<br/>`destination.port: 445 and network.transport: "tcp"` | Looks for Server Message Block (SMB) traffic. Crucial for detecting internal lateral movement (e.g., PsExec, passing the hash, ransomware spreading). |
| **file.path (over Network)**         | `network.application: "smb" and file.path: *C$\Windows\System32*`                     | Looks for files being accessed or transferred over SMB targeting administrative shares (C$).                                                          |
| **dns.question.type**                | `dns.question.type: "TXT"`<br/>`dns.question.type: "MX"`                              | Looks for specific DNS queries. TXT records are highly suspicious and frequently used by malware for DNS Tunneling or C2 communication.               |
| **dns.question.name (Long queries)** | `dns.question.name: /.{50,}\.com/` _(Using Regex)_                                    | Looks for unusually long DNS queries (over 50 characters), a strong indicator of data exfiltration via DNS.                                           |

