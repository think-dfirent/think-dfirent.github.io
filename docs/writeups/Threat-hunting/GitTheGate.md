---
title: GitTheGate
sidebar_position: 4
slug: /3547b0eb-61a4-8042-b479-e3236244f5e9
tags:
  - Digital Forensics
  - ELK
  - Linux
  - Network Analysis
  - Sysmon
  - Threat Hunting
  - Windows
  - Windows Event Logs
---



---


[https://cyberdefenders.org/blueteam-ctf-challenges/gitthegate/](https://cyberdefenders.org/blueteam-ctf-challenges/gitthegate/)


The attack appears to have taken place on the 25th of May between 9 am and 11:30 am

- **.alerts-security.alerts-default...**: Đây là kho chứa **kết quả cảnh báo**. Khi hệ thống Elastic Security phát hiện ra mã độc hoặc hành vi đáng ngờ (dựa trên các rule được cài đặt), nó sẽ sinh ra một "Alert" và lưu vào đây. Bạn đang thấy dấu chấm `.` ở đầu tên, điều này ám chỉ đây là _System Index_ (kho dữ liệu hệ thống ẩn, thường không nên chỉnh sửa tay).
- **auditbeat-**: Chứa dữ liệu thu thập từ **Auditbeat**. Đây là một phần mềm (agent) chuyên dùng để giám sát tính toàn vẹn của file (FIM) và các tiến trình (process) đang chạy trên hệ thống, đặc biệt phổ biến trong môi trường Linux.
	- Hook vào kernel của linux, thông qua linux audit framework lấy thông tin mạng, process rất tốt
- **filebeat-**: Chứa dữ liệu từ **Filebeat**. Đây là "người vận chuyển" log phổ biến nhất. Nhiệm vụ của nó là đọc các file text (như log của web server Nginx, Apache, Syslog của Linux) rồi đóng gói gửi về ELK.
	- đọc file txt trên ổ cứng mà thôi
- **kibana_sample_data_logs**: Đây là **dữ liệu giả (Mock data)** do chính Kibana tạo sẵn. Khi bạn mới cài ELK và chưa có dữ liệu thật, Kibana cho phép bạn add một bộ dữ liệu mô phỏng log của một trang web thương mại điện tử để bạn "vọc vạch", tập viết query và vẽ biểu đồ.
- 1. Filebeat: "Người giao báo" (Chỉ đọc File text)
- 

### Q1: Using the "View Surrounding Documents" option, find the ID of the document that is 14 documents before (older) the id GDQOB3IBwJHf9VOW-r0Y? {#3547b0eb61a480b49f29f92a2d61a1b3}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-807e-82c9-fed48749f3d5.png)


### Q2: Using the "View Surrounding Documents" option, find the IP of the document that is 16 documents after (newer) the id vDQOB3IBwJHf9VOW-Lyd? {#3547b0eb61a480de898dfcd4d6381bb7}


191.189.39.130


### Q3: How many requests have come from the IP address 2.49.53.218 between the 6th of May and the 13th of May? (time is in UTC) {#3547b0eb61a480cfa316fc1d7b795a0e}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-8046-8f25-dde35d7ec1e4.png)


### Q4: What percentage of logs are from windows 8 machines on the 11th of May? (time is in UTC) {#3547b0eb61a48077a8b4f646871e36df}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-80f7-b5de-fad2a87453da.png)


21.74%


### Q5: How many 503 errors were there on the 8th of May? (time is in UTC) {#3547b0eb61a4803eb876c3fe9bf9fde8}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-8083-a299-d6faebdfece3.png)


### Q6: How many connections to the host "www.elastic.co" were made on the 12th of May? (time is in UTC) {#3547b0eb61a4805a8993f4f79d68db50}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-800b-8f9b-fb20dc5e6dc6.png)


### Q7: What is the second most common extension of files being accessed on the 12th of May? (time is in UTC) {#3547b0eb61a480a78412d2fe19f501a2}


.gz


### Q8: Find the first IP address to connect to the host [elastic-elastic-elastic.org](http://elastic-elastic-elastic.org/) on the 12th of May. (time is in UTC) {#3547b0eb61a480188e89c4afc4590086}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-807c-97bf-f76bd8ee480a.png)


### Q9: What was the username used that failed to log in on the 15th of May at 10:44 pm? (time is in UTC) {#3547b0eb61a48074b134fb4c3cec2194}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-80c8-b354-cf7988ac0be1.png)


### Q10: According to the logs, which vulnerable version of Kibana was identified as running in the stack? {#3547b0eb61a480f89a07f41e809aecca}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-8072-a7a5-d2d4b6f9d6ad.png)


### Q11: Using current data in the auditbeat index, what is the name of the elasticsearch node? (one word) {#3547b0eb61a4800db63feb0fa6964f11}


elkstack


ta dùng agent.hostname


### Q12: What is the name of the beat to collect windows logs? (one word) {#3547b0eb61a4804d8108c3387e558cd9}


winlogbeat


### Q13: What is the name of the beat that sends network data? (one word) {#3547b0eb61a4804fbf41edb6649481a2}


packetbeat


### Q14: How many fields are in the auditbeat-* index pattern? {#3547b0eb61a4802f8ee5e14b126d6386}


Navigate to Management &gt; Kibana &gt; Data view, and select the **`auditbeat-*`** pattern to view the number of fields.

437


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-804e-a15f-ddf627a409f4.png)


### Q15: On the 14th of May, how many failed authentication attempts did the host server receive? (time is in UTC) {#3547b0eb61a4805fb459fd0d44cd90eb}


Chỉ có 2 server


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-809c-a6b2-fe149aca702c.png)


SSH port open to the web and a second server behind it running an old Elastic Stack


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-8041-92a1-d67ac5850a26.png)


### Q16: On the 13th and 14th of May, how many bytes were received by the source IP 159.89.203.214 (time is in UTC) {#3547b0eb61a4805cb43ec95e8b0e5800}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3547b0eb-61a4-80c3-b927-f15b8d7b19b6.png)


### Q17: What username did they crack? {#3547b0eb61a480468514fc59f0963e54}


ta dùng event.outcome: failed and event.action: user-auth


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-809a-ba28-e130791b064e.png)


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-806a-bceb-dff603cca51e.png)


sau đó thì thành công


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-80f2-bea1-ea546fcda952.png)

- **Điểm quan trọng:** `user_login` là hành động ở cấp độ cao hơn. Nó thường là kết quả của một hoặc nhiều hành động `user_auth` trước đó.

### Q18: What host was attacked? {#3547b0eb61a480ec981fd2a61a6e8110}


sshbox


### Q19: How many were failed attempts made on the machine? {#3547b0eb61a4807eb456f1ffdf128da8}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-8086-9da5-e163a62701e3.png)


### Q20: What time was the last failed attempted login? {#3547b0eb61a480a8a0cfcc2519fd627f}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-804d-be4d-e1057aa05137.png)


### Q21: What time did the attacker successfully login? {#3547b0eb61a48087be1dd77abdc9324f}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-80df-8764-f1caa631e11f.png)


11:50:13


### Q22: What tool did the attacker use to get the exploit onto the machine? {#3547b0eb61a4802f8cf1e8312515b1c6}


134.122.125.130


Ta tìm timestamp sau thời gian hacker vào đượ máy


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-8032-bf94-cd259a995825.png)


git


1. CVE-2019-7609 là gì?

- **Mục tiêu:** Kibana (một phần của hệ sinh thái Elastic Stack - ELK).
- **Phiên bản bị ảnh hưởng:** Các phiên bản Kibana trước 5.6.15 và 6.6.1.
- **Loại lỗ hổng:** Thực thi mã từ xa (Remote Code Execution - RCE).
- **Nguyên nhân:** Lỗ hổng nằm trong phần tính năng "Timelion" của Kibana. Hacker có thể gửi các đoạn mã JavaScript độc hại vào tính năng này. Do việc xử lý không an toàn (Prototype Pollution), đoạn mã này có thể thoát khỏi môi trường bảo vệ và chạy trực tiếp trên máy chủ chứa Kibana.

2. Công cụ "LandGrey/CVE-2019-7609"


Đường dẫn `[https://github.com/LandGrey/CVE-2019-7609.git](https://github.com/LandGrey/CVE-2019-7609.git)` trỏ đến một công cụ mã nguồn mở do nhà nghiên cứu bảo mật (hoặc hacker mũ trắng) có nickname là **LandGrey** viết ra.

- **Chức năng:** Đây là một mã khai thác (Exploit Code / PoC - Proof of Concept) viết bằng Python. Nó được thiết kế để tự động hóa việc khai thác lỗ hổng CVE-2019-7609.
- **Cách hoạt động:**
	1. Người dùng (người kiểm thử bảo mật) chạy script Python này và trỏ nó vào một máy chủ Kibana có lỗ hổng.
	2. Script sẽ tự động tạo ra một đoạn mã độc hại (payload).
	3. Nó gửi payload đó vào tính năng Timelion của máy chủ mục tiêu.
	4. Nếu thành công, máy chủ Kibana sẽ thực thi một lệnh Reverse Shell, cho phép người tấn công chiếm quyền điều khiển (lấy được command line) của máy chủ đó từ xa.

### Q23: Shortly after getting the exploit on the machine, the attacker used vim to create a file. What is the name of that file? {#3547b0eb61a4808bbefee7ebb55159aa}


ElasticCTFisFun!


### Q24: What is the filename of the exploit that was run? {#3547b0eb61a48009ac4af10527b21f92}


Dùng query tương tự với câu 22


process.args: exist and host.name: sshbox and @timestamp &gt; "2020-05-25T11:50:00Z”


CVE-2019-7609-kibana-rce.py


### Q25: What is the first ID of the log that shows the exploit being run? {#3547b0eb61a480a9a1a8fae2c9c4739c}

- execve là execute with arguments and environments - system call cốt lõi của linux
	- Khidùng lệnh, script, kernel Linux sẽ sử dụng lệnh execve để khởi chạy → tương đương eventID 1/4688
- proctitle: tiêu đề tiến trình - bản ghi đi kèm
	- ghi lại toàn bộ command line của
	- `execve` sẽ ghi nhận: Chạy file `/usr/bin/python2`.
	- `proctitle` sẽ ghi nhận nguyên văn cả đoạn: `python2 CVE-2019... -u http..`

Tức là ta phải đi tìm event.action: protitle bao gồm cái thông tin CVE-2019-7609-kibana-rce.py


_SHbS3IBCEolQs9lAD3z


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-8036-bc0a-f6d1f3d61277.png)


_SHbS3IBCEolQs9lAD3z rồi tìm id


### Q26: What parameter turned the script from testing to exploiting? {#3547b0eb61a480d0990fced0530f096c}


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-80cc-bbe8-da69cb08c73f.png)


### Q27: Determining the destination IP is key to tracing the attacker’s actions. What is the destination IP address where the malicious shell was sent? {#3547b0eb61a4803f8125f023f8aea09f}


Ta thấy có nc [nc, -lvp, 8888]


xem ip là biết


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-801b-a621-ebea0002cd02.png)


hoặc tìm bằng cái script


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-802c-85ae-caf2bee5ec90.png)


### Q28: Identifying new users is vital to uncovering unauthorized access. What was the name of the user they created? {#3547b0eb61a4809188b6fddca9f16e58}


Thanks4Playing


dùng process.arge: useradd


![](./3547b0eb-61a4-8042-b479-e3236244f5e9.3557b0eb-61a4-806e-9bde-f5b3c93b3f5d.png)


# Nói thêm về linux forensics {#3557b0eb61a48023b480de4ded636d8b}


## Tại sao `process.name: useradd` lại khả thi {#3557b0eb61a48062ad7fef89998194b4}

- Trong linux mọi thứ đều là file, mỗi câu lệnh lại là một process
- Các `ls`, `cat`, `grep`, `chmod`, hay `useradd` trên terminal, chúng không phải là tính năng được tích hợp sẵn bên trong cái vỏ terminal (như bash shell).
- Thực chất, chúng là những file thực thi độc lập (ELF binaries) nằm rải rác ở các thư mục như `/bin/`, `/usr/bin/`, `/sbin/`. (Ví dụ: `/usr/sbin/useradd`).
- Do đó, khi hacker (hoặc admin) gõ lệnh `useradd hacker`, nhân Linux sẽ gọi System Call `execve` để chạy cái file `/usr/sbin/useradd` đó. Lúc này, hệ thống ghi nhận `useradd` chính là `process.name`!

## Các “eventID” trên linux {#3557b0eb61a480e5a6edd2b32157767f}


### A. Mỏ neo Tiến trình (Tương đương Event ID 4688 / Sysmon 1) {#3557b0eb61a480a2805fece769862906}


Bạn muốn tìm tất cả các lệnh/chương trình vừa được thực thi:

- **KQL:** `event.category: "process" AND event.type: "start"`
- **Hoặc KQL:** `event.action: "execve"` _(Nếu dùng Auditbeat)_
- **Cách Hunt:** Kết hợp với `process.name` (ví dụ: `bash`, `python`, `wget`, `curl`) hoặc tìm trong `process.args` (chứa toàn bộ nội dung lệnh như bạn đã biết).

### B. Mỏ neo Mạng (Tương đương Event ID 5156 / Sysmon 3) {#3557b0eb61a480f690c0d184b1dfbd6e}


Bạn muốn tìm xem tiến trình nào đang kết nối ra Internet:

- **KQL:** `event.category: "network" AND event.type: "connection"`
- **Hoặc KQL:** `event.action: "network_flow"`
- **Cách Hunt:** Từ đây, bạn nhìn vào `destination.ip`, `destination.port` và quan trọng nhất là `process.name` để xem file nào đang gọi mạng (như bài lab trước là `python2` gọi C2 server).

### C. Mỏ neo Đăng nhập (Tương đương Event ID 4624 / 4625) {#3557b0eb61a480dda899e7798234b5e5}


Bạn muốn tìm dấu vết SSH hoặc đăng nhập cục bộ:

- **KQL Đăng nhập thành công (4624):** `event.category: "authentication" AND event.outcome: "success"`
- **KQL Đăng nhập thất bại / Brute-force (4625):** `event.category: "authentication" AND event.outcome: "failure"`
- **KQL chi tiết hơn:** Có thể dùng `event.action: "ssh_login"` hoặc `event.action: "user_login"`.

### D. Mỏ neo Tác động File (Tương đương Sysmon 11 / Object Access) {#3557b0eb61a48076a9c8d276326ff74e}


Bạn muốn biết file cấu hình nhạy cảm (như `/etc/passwd` hay `/etc/shadow`) có bị sửa đổi hay không:

- **KQL Tạo file:** `event.category: "file" AND event.type: "creation"`
- **KQL Sửa đổi file:** `event.category: "file" AND event.type: "change"`
- **Cách Hunt:** Lọc thêm `file.path` để theo dõi các thư mục trọng yếu.

### 3. Tóm lại: Cách lắp ghép các khối Lego ECS {#3557b0eb61a480b4aec7ed53e262c7ad}


Để không bao giờ bị lạc lối trong log Linux, hãy nhớ công thức tư duy này khi gõ KQL:

1. Tôi đang tìm loại hoạt động gì? `👉 event.category` (process, network, file, authentication).
2. Hành động cụ thể là gì? `👉 event.action` (execve, ssh_login, network_flow).
3. Nó thành công hay thất bại? `👉 event.outcome` (success, failure).
