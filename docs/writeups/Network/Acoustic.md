---
title: Acoustic
sidebar_position: 8
slug: /3477b0eb-61a4-8093-b7ef-c62076ecfb01
---



SIPVicious là công cụ bảo mật được viết bằng python để kiểm tra và tấn công các hệ thống tổng đài điện thoại sử dụng giao thức SIP. Là công cụ bị lạm dụng nhiều nhất để tự động rà quét và bẻ khóa các tổng đài VoIP trên toàn cầu nhằm mục dích trộm cước viễn thông hoặc nghe lén


Gồm 5 module chính:

- svmap: quét mạng để tìm kiếm thiết bị hoặc máy chủ SIP đang hoạt động. Gửi SIP options đi khắp nới và phân tích phản hồi để lập bản đồ mục tiêu
- svwar dùng để liệt kê. Sau khi thấy tổng đài thì nó sẽ dò quét để tìm số máy lẻ (extension) hoặc tên đăng nhập hợp lệ tồn tại trên hệ thống đó
- svcrack: brute-force khóa mật khẩu. Gửi liên tục gói SIP register
- svreport: trích xuất và định dạng lại kết quả từ quá trình quết và bẻ khoa ra một tệp báo cáo
- sccrash: gửi các gói tin SIP cố tình bị malformed để DoS. Có thể dùng để hacker phản công hệ thống phân tích mã độc bẫy chúng

Các phát hiện:

- User-agent: friendly-scanner hoặc SIPVicious. Hacker có thể đổi tên được
- **Hành vi mạng bất thường (Network Anomalies):** Hãy theo dõi sự gia tăng đột biến của lưu lượng UDP trên Port 5060 hoặc 5061. Một cuộc tấn công bằng `svcrack` sẽ tạo ra một "cơn bão" các yêu cầu `REGISTER` bị từ chối (trả về mã lỗi HTTP/SIP `401 Unauthorized` hoặc `403 Forbidden`) từ cùng một địa chỉ IP.
- **Log trên hệ thống tổng đài:** Nếu phân tích log trên các tổng đài như Asterisk, FreePBX hay 3CX, sự xuất hiện của hàng loạt nỗ lực xác thực vào các dải user mang tính tuần tự (ví dụ: quét liên tục từ extension 1000 đến 1999) là minh chứng rõ ràng cho hoạt động của `svwar`

```c++
-------------------------
Source: 210.184.X.Y:5209
Datetime: 2010-05-02 01:49:56.063150

Message:

REGISTER sip:honey.pot.IP.removed SIP/2.0
Via: SIP/2.0/UDP 127.0.0.1:5089;branch=z9hG4bK-149719434;rport
Content-Length: 0
From: "102" <sip:102@honey.pot.IP.removed>
Accept: application/sdp
User-Agent: friendly-scanner
To: "102" <sip:102@honey.pot.IP.removed>
Contact: sip:123@1.1.1.1
CSeq: 1 REGISTER
Call-ID: 3489261283
Max-Forwards: 70




-------------------------
Source: 210.184.X.Y:5209
Datetime: 2010-05-02 01:49:56.693011

Message:

REGISTER sip:honey.pot.IP.removed SIP/2.0
Via: SIP/2.0/UDP 127.0.0.1:5089;branch=z9hG4bK-2386985930;rport
Content-Length: 0
From: "102" <sip:102@honey.pot.IP.removed>; tag=X_removed
Accept: application/sdp
User-Agent: friendly-scanner
To: "102" <sip:102@honey.pot.IP.removed>
Contact: sip:123@1.1.1.1
CSeq: 2 REGISTER
Call-ID: 680412875
Max-Forwards: 70
Authorization: Digest username="102",realm="localhost",nonce="2932135223",uri="sip:honey.pot.IP.removed",response="MD5_hash_removedXXXXXXXXXXXXXXXX",algorithm=MD5


```


Đây là ví dụ 2 gói tin hacker gửi liên tiếp, gói 1 gửi để server phản ứng, 


server trả lời lại bằng lỗi 401 unauthorized chẳng hạn


gói 2 hacker dùng brute force:  Công cụ đã lấy cái chuỗi `nonce` ở trên, kết hợp với một **mật khẩu mà nó tự đoán** (lấy từ từ điển của hacker), rồi băm tất cả ra bằng thuật toán MD5 để tạo thành mã `response` gửi lên server.




| 172.25.105.3          | 172.25.105.40             |   |
| --------------------- | ------------------------- | - |
| 172.25.105.43 (Linux) | 172.25.105.40 (honey pot) |   |
|                       |                           |   |


maint:password


172.25.105.43 (Linux)


ip.src==172.25.105.43 && http


Q1 What is the transport protocol being used?


UDP


Q2 The attacker used a bunch of scanning tools that belong to the same suite. Provide the name of the suite.


SIPVicious


Q3


What is the User-Agent of the victim system?


Asterisk PBX 1.6.0.10-FONCORE-r40


**SIPVicious** 


Q4 Which tool was only used against the following extensions: 100,101,102,103, and 111?


[svcrack.py](http://svcrack.py/)


Q5 Which extension on the honeypot does NOT require authentication?


100 Q6 How many extensions were scanned in total?


```c++
REGISTER sip:9994@honey.pot.IP.removed SIP/2.0
                                                                                                                                  
┌──(cuong_nguyen㉿Kali)-[~/Desktop/cyberdefenders.org/temp_extract_dir/Acoustic]
└─$ grep -Ei "REGISTER sip:" log.txt | grep -v "sip:honey.pot" | wc -l
2652

```


Q7 There is a trace for a real SIP client. What is the corresponding user-agent? (two words, once space in between)


Zoiper rev.6751


└─$ grep -Ei "User-agent" log.txt| uniq
User-Agent: friendly-scanner
User-Agent: Zoiper rev.6751


Q8 Multiple real-world phone numbers were dialed. What was the most recent 11-digit number dialed from extension 101?


```c++
└─$ grep -Ei 'From: "Unknown"<sip:101' log.txt -B8 | grep INVITE
INVITE sip:900114382089XXXX@honey.pot.IP.removed;transport=UDP SIP/2.0
INVITE sip:00112322228XXXX@honey.pot.IP.removed;transport=UDP SIP/2.0
INVITE sip:00112524021XXXX@honey.pot.IP.removed;transport=UDP SIP/2.0

```


**`-B8`**  Viết tắt của **Before 8**. Tham số này ra lệnh: "Khi tìm thấy dòng khớp với điều kiện, đừng chỉ in nguyên dòng đó, hãy in thêm **8 dòng nằm ngay phía trên nó**".


Q9


What are the default credentials used in the attempted basic authentication? (format is username:password)


Q10


Which codec does the RTP stream use? (3 words, 2 spaces in between)


PT=ITU-T G.711 PCMU

- **ITU-T:** Liên minh Viễn thông Quốc tế (Cơ quan ban hành chuẩn này).
- **G.711:** Tên mã của chuẩn mã hóa âm thanh (Audio Codec) dành cho giọng nói con người.
- **PCM (Pulse Code Modulation):** Kỹ thuật điều chế mã xung. Nó biến đổi sóng âm thanh analog (tự nhiên) thành tín hiệu số (digital) dạng 0 và 1.
- **U (µ-law hay Mu-law):** Đây là thuật toán nén đặc biệt (companding).
	- _Lưu ý nhỏ:_ Trên thế giới có 2 phiên bản G.711 là **PCMU** (µ-law, dùng chủ yếu ở Bắc Mỹ và Nhật Bản) và **PCMA** (A-law, dùng ở Châu Âu và các nước khác).
- **Tần số lấy mẫu (Sample Rate):** 8,000 Hz (8kHz). Nó chỉ lấy mẫu trong dải tần số giọng nói của con người (từ 300Hz đến 3400Hz) để tiết kiệm băng thông.
- **Tốc độ bit (Bitrate):** **64 kbps**.
- **Chất lượng:** Nó không nén file giống như MP3, nên chất lượng âm thanh không bị suy hao (lossless đối với giọng nói), nghe rất rõ ràng giống như bạn đang gọi điện thoại bàn. Tuy nhiên, nó lại tốn khá nhiều băng thông mạng so với các codec hiện đại (như G.729 hay Opus).

Q11 How long is the sampling time (in milliseconds)?


**Tần số lấy mẫu (Frequency / Sample Rate):** G.711 PCMU sử dụng tần số là $8,000$ Hz (tức là $8,000$ mẫu được lấy trong 1 giây).**Thời gian lấy mẫu (Sampling Time / Period):** Là khoảng thời gian để lấy 1 mẫu. Công thức vật lý cơ bản là $T = \frac{1}{f}.$


Q12 What was the password for the account with username 555?


Hệ thống tổng đài như asterisk, freePBX cần tải file cấu hình từ máy chủ để biết mang số máy nhánh bao nhiều và mật khẩu là gì. Thường sẽ truyền qua FTP hoặc HTTP. 


Lỗ hổng là máy chủ cho phép tải file conf mà không cần xác thực. Hacker đi tìm các file này và có thể lấy mật khẩu:

- sip_custom.conf
- http.request.uri contains "sip_custom.conf”

![](./3477b0eb-61a4-8093-b7ef-c62076ecfb01.3477b0eb-61a4-801b-b779-ddbb25d612fb.png)


Q13 Which RTP packet header field can be used to reorder out of sync RTP packets in the correct sequence?


timestamp


Q14 The trace includes a secret hidden message. Can you hear it?


mexico

