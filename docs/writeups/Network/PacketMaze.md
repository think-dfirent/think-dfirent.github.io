---
title: PacketMaze
sidebar_position: 6
slug: /3467b0eb-61a4-8092-aa89-fbaac15f6c05
---



| 192.168.1.26 | 172.67.162.206  | 172.67.162.206 [dfir.science]                                                          |
| ------------ | --------------- | -------------------------------------------------------------------------------------- |
|              | 192.168.1.20    |                                                                                        |
|              | 185.70.41.130   | 185.70.41.130 [[mail.protonmail.com](http://mail.protonmail.com/)]                     |
|              | 23.51.191.35    | 23.51.191.35 [[e10370.g.akamaiedge.net](http://e10370.g.akamaiedge.net/)]              |
|              | 185.70.41.35    | 185.70.41.35 [[protonmail.com](http://protonmail.com/)]                                |
|              | 142.250.190.132 | 142.250.190.132 [[www.google.com](http://www.google.com/)]                             |
|              | 159.65.89.65    | 159.65.89.65 [[www.7-zip.org](http://www.7-zip.org/)] [[7-zip.org](http://7-zip.org/)] |


![](./3467b0eb-61a4-8092-aa89-fbaac15f6c05.3467b0eb-61a4-80d8-b876-eaf09359575a.png)


23.51.191.35 [[e10370.g.akamaiedge.net](http://e10370.g.akamaiedge.net/)] [[kv501.prod.do.dsp.mp.microsoft.com.edgekey.net](http://kv501.prod.do.dsp.mp.microsoft.com.edgekey.net/)] [[kv501.prod.do.dsp.mp.microsoft.com](http://kv501.prod.do.dsp.mp.microsoft.com/)] [[cp501-prod.do.dsp.mp.microsoft.com](http://cp501-prod.do.dsp.mp.microsoft.com/)] [[cp501.prod.do.dsp.mp.microsoft.com.edgekey.net](http://cp501.prod.do.dsp.mp.microsoft.com.edgekey.net/)] [[cp501.prod.do.dsp.mp.microsoft.com](http://cp501.prod.do.dsp.mp.microsoft.com/)] [[disc501.prod.do.dsp.mp.microsoft.com.edgekey.net](http://disc501.prod.do.dsp.mp.microsoft.com.edgekey.net/)] [[disc501.prod.do.dsp.mp.microsoft.com](http://disc501.prod.do.dsp.mp.microsoft.com/)] [[geover.prod.do.dsp.mp.microsoft.com.edgekey.net](http://geover.prod.do.dsp.mp.microsoft.com.edgekey.net/)] [[geover.prod.do.dsp.mp.microsoft.com](http://geover.prod.do.dsp.mp.microsoft.com/)]


### Q1 What is the FTP password? {#3467b0eb61a48019b11cde938075911c}


192.168.1.26	192.168.1.26	192.168.1.20	FTP	kali	AfricaCTF2021	Unknown	2021-04-30 01:01:26 UTC+00


### Q2 What is the IPv6 address of the DNS server used by `192.168.1.26`? {#3467b0eb61a480729911f7a36e9f454e}


Ta tìm ra được dns server là 192.168.1.10 và lấy địa chỉ mac đi tìm
`eth.addr == ca:0b:ad:ad:20:ba && ipv6`


![](./3467b0eb-61a4-8092-aa89-fbaac15f6c05.3467b0eb-61a4-80b0-9dda-fc0e70e34db4.png)


fe80::c80b:adff:feaa:1db7


### Q3 What domain is the user looking up in packet `15174`? {#3467b0eb61a48026a165f2b944d0d998}


www.7-zip.org: type A, class IN


### Q4 How many UDP packets were sent from `192.168.1.26` to `24.39.217.246`? {#3467b0eb61a48032ad17f21de195e089}


ip.src == 192.168.1.26 && ip.dst==24.39.217.246


![](./3467b0eb-61a4-8092-aa89-fbaac15f6c05.3467b0eb-61a4-8049-9be4-d941fb906216.png)


### Q5 What is the MAC address of the system under investigation in the PCAP file? {#3467b0eb61a480bcb8edc54b8645f32f}


Ethernet II, Src: ca:0b:ad:ad:20:ba (ca:0b:ad:ad:20:ba), Dst: Intel_57:47:93 (c8:09:a8:57:47:93)


### Q6 What was the camera model name used to take picture `20210429_152157.jpg`? {#3467b0eb61a4805996dafa5b1722f7bf}


### Q7 What is the ephemeral public key provided by the server during the TLS handshake in the session with the session ID: `da4a0000342e4b73459d7360b4bea971cc303ac18d29b99067e46d16cc07f4ff`? {#3467b0eb61a480a9a03de2c2dedaaabc}


tls.handshake.session_id == da4a0000342e4b73459d7360b4bea971cc303ac18d29b99067e46d16cc07f4ff



Bạn tìm gói tin có cột Info ghi là **`Server Key Exchange`**. Đây chính là nơi Server gửi các tham số thuật toán Diffie-Hellman (ECDHE) bao gồm cả Public Key tạm thời.



![](./3467b0eb-61a4-8092-aa89-fbaac15f6c05.3467b0eb-61a4-8011-81b8-e37d65c1e288.png)


Pubkey: 04edcc123af7b13e90ce101a31c2f996f471a7c8f48a1b81d765085f548059a550f3f4f62ca1f0e8f74d727053074a37bceb2cbdc7ce2a8994dcd76dd6834eefc5438c3b6da929321f3a1366bd14c877cc83e5d0731b7f80a6b80916efd4a23a4d


### Q8 What is the first `TLS 1.3` client random that was used to establish a connection with `protonmail.com`? {#3467b0eb61a48016b790e5050bb40b55}

- **TLS 1.3:** `tls.handshake.version == 0x0304` or `tls.version == 0x0304`
- **TLS 1.2:** `tls.handshake.version == 0x0303` or `tls.version == 0x0303`
- _ws.col.protocol == "TLSv1.3”
- _ws.col.protocol == "TLSv1.3" && tls.handshake.type==1 && tls contains "[protonmail.com](http://protonmail.com/)"

![](./3467b0eb-61a4-8092-aa89-fbaac15f6c05.3467b0eb-61a4-8009-90df-d8426827eb87.png)


24e92513b97a0348f733d16996929a79be21b0b1400cd7e2862a732ce7775b70


### Q9 Which country is the manufacturer of the `FTP server’s MAC` address registered in? {#3467b0eb61a480e6ac35fd640a7cc0db}


192.168.1.20 FTP server


![](./3467b0eb-61a4-8092-aa89-fbaac15f6c05.3467b0eb-61a4-8026-8247-f5850ab11571.png)

- **Hãng:** **Oracle Corporation**
- **Tiền tố (OUI):** `08:00:27`
- **Ứng dụng cụ thể:** Đây là dải địa chỉ MAC mặc định dành riêng cho các máy ảo chạy trên **VirtualBox**.

### Q10 What time was a `non-standard folder` created on the FTP server on the 20th of April? {#3467b0eb61a4800bb7fafe10e6cfdd93}


![](./3467b0eb-61a4-8092-aa89-fbaac15f6c05.3467b0eb-61a4-8052-a04e-f217e63b8f0f.png)


### Q11 What URL was visited by the user and connected to the IP address `104.21.89.171`? {#3467b0eb61a4802cb30ed95979bc9a90}


[http://dfir.science/](http://dfir.science/)

