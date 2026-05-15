---
title: Homelab Architecture
sidebar_position: 1
slug: /33e7b0eb-61a4-8059-988d-fda1462ed560
---



---


## Infrastructure {#3617b0eb61a4802bad45e18780112415}


**Firewall:**

- Utilizing **pfSense** to act as a DHCP server and handle network segmentation.
- **Suricata** is deployed to function as an Intrusion Detection System (IDS).
- **OpenVPN** is configured to establish a secure tunnel for management traffic.

**LAN:**

- **1 Windows Server Core (DC01):** Manages the Active Directory domain and simultaneously functions as a file server.
- **1 Windows 10 (IT Workstation - WS01):** Represents a standard corporate endpoint.

**Blue Team:**

- **Splunk Server** (Containerized deployment).

**Internet Zone:**

- **1 Kali Linux Machine:** Configured with tools like Atomic Red Team or Caldera (Mythic C2) to launch external payloads and manage the attack.

### Physical diagram {#3437b0eb61a480e789a4d3c36ca339c0}


![](./33e7b0eb-61a4-8059-988d-fda1462ed560.3417b0eb-61a4-80df-8eac-cde1867e644d.png)


### Logical diagram {#3437b0eb61a480b2b40df968fb856a21}


![](./33e7b0eb-61a4-8059-988d-fda1462ed560.3417b0eb-61a4-809a-a465-efdeee9a8b0f.png)

