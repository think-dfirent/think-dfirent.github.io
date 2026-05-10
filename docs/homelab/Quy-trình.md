---
title: Quy trình
sidebar_position: 3
slug: /33f7b0eb-61a4-80d9-95fc-fbee8ffdc131
---



### Lộ trình thực hiện dự án (Roadmap) {#33f7b0eb61a48073b3c0d848a6658568}


### Tuần 1: Xây dựng nền tảng (Virtual Infrastructure) {#33f7b0eb61a480588c08ea2668d953eb}

- **Mục tiêu:** Có mạng LAN và SIEM hoạt động, các máy ảo có thể nhìn thấy nhau.
- **Công việc:**
	- Thiết lập **VMnet2 (LAN)** và **VMnet3 (SIEM)** trong VMware Virtual Network Editor.
	- Cài đặt **pfSense**: Cấu hình 3 interface (WAN, LAN, SIEM). Thiết lập Firewall Rules cơ bản để LAN có thể đẩy dữ liệu sang SIEM.
	- Cài đặt hệ điều hành gốc (Base OS): Windows Server 2022 (cho DC01) và Windows 10/11 (cho WS01).

### Tuần 2: Active Directory & Logging Hardening {#33f7b0eb61a480cb8bccdf0396aa7596}

- **Mục tiêu:** Chuyển từ máy đơn lẻ sang môi trường doanh nghiệp có quản lý.
- **Công việc:**
	- Nâng cấp DC01 thành **Domain Controller**. Join máy WS1 vào Domain.
	- Cấu hình **GPO (Group Policy)**: Bật tính năng Logging nâng cao (Command line logging, PowerShell Script Block Logging).
	- Cài đặt **Sysmon** trên cả 2 máy Windows với một bộ cấu hình chuẩn (ví dụ: SwiftOnSecurity, Sysmon-modular (Olaf Hartong)).

### Tuần 3: Log Pipeline (Trái tim của SOC) {#33f7b0eb61a4807fbb66c80758747c86}

- **Mục tiêu:** Log từ Windows phải xuất hiện trên bảng điều khiển Splunk.
- **Công việc:**
	- Dựng **Splunk Server** (Khuyên dùng Docker trên một máy ảo Ubuntu để tiết kiệm RAM).
	- Cài đặt **Splunk Universal Forwarder (SUF)** trên DC01 và WS1.
	- Cấu hình `inputs.conf` để đẩy log Sysmon và WinEvent về Splunk qua Port 9997. Kiểm tra dữ liệu trên Splunk bằng các câu lệnh SPL cơ bản.

### Tuần 4: Network Security & IDS {#33f7b0eb61a4803ba52ad13b0cfadb58}

- **Công việc:**
	- Cài đặt gói **Suricata** trên pfSense. Cấu hình để nó soi quét traffic ở cổng LAN.
	- Thiết lập **Log Forwarding** từ pfSense về Splunk (sử dụng Syslog hoặc Splunk Add-on).
		- **Mục tiêu:** Giám sát các gói tin di chuyển giữa các vùng mạng.
	- Kiểm tra: Thử thực hiện lệnh kiểm tra và xem pfSense/Suricata có cảnh báo trên Splunk không.
	- Thiết lập OpenVPN trên pfSense và máy của SOC analyst

### Tuần 5: Thực thi Tấn công (Execution Phase) {#33f7b0eb61a480aa8f14f1d69084ec0a}

- **Mục tiêu:** Chạy trọn vẹn 11 bước trong Playbook và thu thập bằng chứng.
- **Công việc:**
	- Thiết lập **C2 Server (Mythic hoặc Sliver)** trên máy Kali.
	- Thực hiện tuần tự 11 bước: Từ gửi link Phishing -> Leo quyền -> Lateral Movement -> Ransomware.
	- **Quan trọng:** Sau mỗi bước tấn công, bạn phải dừng lại, sang máy Splunk tìm xem Log nào vừa được sinh ra. Chụp ảnh màn hình làm bằng chứng (Evidence).

### Tuần 6: Phân tích & Hoàn thiện báo cáo (Final DFIR Report) {#33f7b0eb61a48076a992c12102d366fb}

- **Mục tiêu:** Biến dữ liệu thành một dự án có thể trình chiếu.
- **Công việc:**
	- Xây dựng **Dashboard trên Splunk**: Biểu đồ hóa các lần đăng nhập sai, các tiến trình PowerShell đáng ngờ.
	- Viết báo cáo DFIR: Ánh xạ từng bước tấn công vào MITRE ATT&CK, giải thích cách bạn đã phát hiện ra chúng bằng log nào.
	- Quay video demo ngắn về quá trình phát hiện tấn công.

### Tuần 7:  Viết detection rule {#3427b0eb61a48065bd90c9ea2dcb4001}


Mục tiêu: thiết lập rule để phòng ngừa tấn công sau với pattern tương tự:

	- Sigma rule
	- SPL detection
	- correlation rule
