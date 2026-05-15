---
title: Weekly Roadmap
sidebar_position: 0
slug: /3617b0eb-61a4-804e-ae04-ce8eb48f453a
---



---


## Project Implementation Roadmap {#3617b0eb61a480c088c2e54a3be22d3c}


**Week 1: Establishing the Foundation (Virtual Infrastructure)**

- **Objective:** Deploy a functional LAN and SIEM environment, ensuring network visibility and connectivity between virtual machines.
- **Tasks:**
	- Configure VMnet2 (LAN) and VMnet3 (SIEM) using the VMware Virtual Network Editor.
	- Install pfSense: Configure three interfaces (WAN, LAN, and SIEM). Establish baseline Firewall Rules to permit log forwarding from the LAN to the SIEM.
	- Install Base Operating Systems: Windows Server 2022 (for DC01) and Windows 10/11 (for WS01).

### **Week 2: Active Directory Deployment & Logging Hardening** {#3617b0eb61a480169633f5ef87bd75d8}

- **Objective:** Transition from standalone machines to a centrally managed enterprise environment.
- **Tasks:**
	- Promote DC01 to a Domain Controller and join WS01 to the domain.
	- Configure Group Policy Objects (GPO): Enable advanced logging capabilities, including Command Line Auditing and PowerShell Script Block Logging.
	- Deploy Sysmon on both Windows machines utilizing a standardized configuration template (e.g., SwiftOnSecurity or Sysmon-modular by Olaf Hartong).

### **Week 3: Log Pipeline Configuration (The Heart of the SOC)** {#3617b0eb61a48013b36dcfce0703b289}

- **Objective:** Ensure Windows telemetry is successfully ingested and visualized on the Splunk dashboard.
- **Tasks:**
	- Deploy the Splunk Server (running Splunk via Docker on an Ubuntu VM is recommended to conserve RAM).
	- Install the Splunk Universal Forwarder (SUF) on both DC01 and WS01.
	- Configure `inputs.conf` to forward Sysmon and Windows Event logs to Splunk via port 9997.
	- Verify data ingestion within Splunk using basic SPL (Search Processing Language) queries.

### **Week 4: Network Security & IDS (Intrusion Detection System)** {#3617b0eb61a48031b181e7d926627f91}

- **Objective:** Monitor and analyze network traffic traversing different network segments.
- **Tasks:**
	- Install the Suricata package on pfSense and configure it to inspect traffic on the LAN interface.
	- Configure log forwarding from pfSense to Splunk (utilizing Syslog or a dedicated Splunk Add-on).
	- **Validation:** Execute test commands to simulate malicious activity and verify that Suricata alerts are successfully indexed in Splunk.
	- Configure OpenVPN on pfSense to establish a secure connection for the SOC analyst's machine.

### **Week 5: Attack Execution Phase** {#3617b0eb61a48012a0addc1f525e2675}

- **Objective:** Successfully execute all 11 steps of the attack playbook and gather forensic evidence.
- **Tasks:**
	- Deploy a Command and Control (C2) Server (e.g., Caldera) on a Kali Linux instance.
	- Sequentially execute the 11-step attack playbook: ranging from initial Phishing delivery -> Privilege Escalation -> Lateral Movement -> Ransomware deployment.
	- **Critical Step:** After executing each stage of the attack, pause and pivot to Splunk to identify the newly generated logs. Capture screenshots of these logs to serve as documented forensic evidence.

### **Week 6: Analysis & Final DFIR Report Formulation** {#3617b0eb61a480728be6e1e3e2b545db}

- **Objective:** Translate raw telemetry into a cohesive, presentable forensic investigation project.
- **Tasks:**
	- **Conduct Investigation:** Analyze Windows Event logs (e.g., Event IDs 4624, 7045, 4698, 4104) and Sysmon telemetry for threat hunting. Perform RAM and disk memory dumps, utilizing tools like Volatility 2/3, FTK Imager, and the Eric Zimmerman (EZ) Tools suite for deep forensic analysis.
	- **Build Splunk Dashboards:** Create visualizations highlighting key indicators of compromise, such as failed logon spikes and suspicious PowerShell process executions.
	- **Draft the DFIR Report:** Map each phase of the attack lifecycle to the MITRE ATT&CK framework, providing detailed explanations of the detection methodology based on the acquired logs.
	- Record a brief video demonstration showcasing the attack detection and analysis process.

### **Week 7: Detection Engineering** {#3617b0eb61a480b18952e60066c5512d}

- **Objective:** Develop and implement proactive detection rules to identify and prevent future attacks exhibiting similar behavioral patterns.
- **Tasks:**
	- Write Sigma rules.
	- Develop advanced SPL detection queries.
	- Configure Correlation rules within the SIEM environment.
