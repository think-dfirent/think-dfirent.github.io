---
title: Chapter 4- Social engineering and password attack
sidebar_position: 5
slug: /2b77b0eb-61a4-8055-b065-efd05e346789
tags:
  - CompTIA Security+
  - Linux
  - Malware Analysis
  - Windows
---
<!-- notion-metadata-start -->
*📅 Published: 2025-11-26 17:47 | 🔄 Last Updated: 2026-05-08 13:03*
<!-- notion-metadata-end -->
# THE COMPTIA SECURITY+ EXAM OBJECTIVES COVERED IN THIS CHAPTER INCLUDE: {#2b77b0eb61a480dbb97cce7b7d6388dd}


## Domain 2.0: Threats, Vulnerabilities, and Mitigations {#2b77b0eb61a480eca42ac2816d8868fa}


2.2. Explain common threat vectors and attack surfaces.

- Human vectors/social engineering (Phishing, Vishing, Smishing, Misinformation/disinformation, Impersonation, Business email compromise, Pretexting, Watering hole, Brand impersonation, Typosquatting).

2.4. Given a scenario, analyze indicators of malicious activity. 

- Password attacks (Spraying, Brute force)

## Social Engineering and Human Vectors {#2b77b0eb61a48073bca9fe6ae0d3e5e7}


Social engineering là hành vi thao túng con người để thực hiện các hành động mong muốn. Lợi dụng tâm lý con người thay vì tấn công trực tiếp vào kĩ thuật


Các nguyên tắc cốt lõi thường bị lợi dụng:

- Authority:
	- Con người vâng lời người có thẩm quyền
	- Ví dụ: kẻ tấn công giả danh là giám đốc, quan chức chính phủ
- Intimidation:
	- Dùng nỗi sợ để bắt nạn nhân làm theo
- Consensus: social proof
	- Lợi dụng tâm lý đám đông: “Mọi người đều làm thế”
	- Vd: kẻ tấn công nói rằng tất cả mọi người trong phòng ban đều đã click vào link này rồi đưa ra các đánh giá giả mạo
- Scarcity: khan hiếm
	- Tạo cảm giác một cái gì đó sắp hết hoặc khan hiếm để làm nó trở nên hấp dẫn hơn
	- Vd: chỉ còn một suất cuối cùng, ưu đãi hết hạn trong 5 phút
- Familarity: Sự quen thuộc
	- Dựa trên việc bạn thích hoặc quen biết người trong tổ chức đó
	- Kẻ tấn công cố gắng tỏ ra thân thiện hoặc đại diện cho tổ chưcs mà bạn tin tưởng
- Trust:
	- Xây dựng quan hệ với nạn nhân
	- Kẻ tấn công làm cho mọi thứ trông bình thường, an toàn để nạn nhân mất cảnh giác
- Urgency:
	- Tạo cảm giác khẩn cấp cần làm ngay
	- Mục đích: khiến nạn nhân hành động theo bản năng thay vì suy nghĩ thấu đáo

:::tip

Exam note: 
Trong thực tế, một cuộc tấn công thường kết hợp nhiều nguyên tắc (ví dụ: Giả làm sếp - _Authority_, yêu cầu chuyển tiền gấp - _Urgency_, nếu không sẽ bị đuổi việc - _Intimidation_). Đề thi không bắt bạn phân loại cứng nhắc, nhưng bạn cần hiểu các nguyên tắc này để phân tích tại sao cuộc tấn công thành công.

:::




## Social engineering techniques {#2b77b0eb61a480e9827ee35d26ac91e0}


### Phishing and variations {#2b77b0eb61a4804898f2e64dfd7b2744}


**Phishing** là thuật ngữ chung chỉ việc lừa đảo để lấy thông tin nhạy cảm (như username, password, thẻ tín dụng). Sách phân loại các hình thức cụ thể:

- **Phishing (cơ bản):** Thường thực hiện qua email, gửi cho số lượng lớn người dùng không xác định.
	- **Spear Phishing:**
		- Tấn công có mục tiêu cụ thể (_specific individuals or groups_).
		- Kẻ tấn công đã nghiên cứu trước về nạn nhân để nội dung email đáng tin hơn.
	- **Whaling:**
		- Giống _Spear phishing_ nhưng nhắm vào **nhân sự cấp cao** (_senior employees_) như CEO, CFO.
		- Mục tiêu là những "con cá lớn" (_big fish_).
- **Vishing (Voice Phishing):**
	- Phishing qua điện thoại hoặc tin nhắn thoại (_voice/voicemail_).
	- Thường lợi dụng sự khẩn cấp (ví dụ: giả danh sở thuế, công an đe dọa bắt giữ) để nạn nhân chuyển tiền hoặc cung cấp thông tin cá nhân.
- **Smishing (SMS Phishing):**
	- Phishing qua tin nhắn văn bản (SMS).
	- Thường chứa đường link độc hại dẫn đến trang web giả mạo hoặc yêu cầu tải malware.
	- _Ví dụ:_ Tin nhắn yêu cầu mã MFA hoặc thông báo trúng thưởng.

### Misinformation vs. Disinformation (Thông tin sai lệch) {#2b77b0eb61a48063b7ddd72408a34126}


Đây là các chiến dịch gây ảnh hưởng (_influence campaigns_) thường thấy trong chiến tranh mạng hoặc chính trị - MDM

- **Misinformation:** Thông tin sai lệch do **nhầm lẫn** (_mistake_). Người chia sẻ tin rằng nó đúng, nhưng thực tế là sai (_getting facts wrong_). Không nhất thiết có ác ý.
- **Disinformation:** Thông tin sai lệch **có chủ đích** (_intentionally false_). Được tạo ra để phục vụ mục đích xấu của cá nhân hoặc tổ chức.
- **Malinformation (Sidebar note):** Thông tin có thể là sự thật nhưng được sử dụng để gây hại (ví dụ: lộ bí mật đời tư để tống tiền).

> Mô hình TRUST của CISA: Để chống lại các chiến dịch này, CISA (Cơ quan An ninh mạng và Cơ sở hạ tầng Mỹ) khuyến nghị quy trình 5 bước:

	1. Tell your story.
	2. Ready your team.
	3. Understand and assess MDM (Mis/Dis/Mal-information).
	4. Strategize response.
	5. Track outcomes.

### Impersonation and Identity Attacks (Mạo danh và Tấn công danh tính) {#2b77b0eb61a48072ae31c086299ccc85}

- **Impersonation (Mạo danh):**
	- Giả vờ là người khác (_pretending to be someone else_).
	- Có thể giả làm nhân viên giao hàng, nhân viên sửa chữa để vào tòa nhà, hoặc giả làm nhân viên IT để lấy mật khẩu.
- **Identity Fraud / Identity Theft:** Sử dụng danh tính người khác vì mục đích tài chính (_financial gain_).
- **Business Email Compromise (BEC):**
	- Còn gọi là _Email Account Compromise (EAC)_.
	- Kẻ tấn công xâm nhập hoặc giả mạo email doanh nghiệp hợp pháp để lừa đảo.
	- _Ví dụ:_ Gửi hóa đơn giả (_invoice scams_), lừa nhân viên mua thẻ quà tặng (_gift card scams_), hoặc yêu cầu kế toán chuyển tiền gấp.
	- _Kỹ thuật:_ Dùng tài khoản bị lộ (_compromised accounts_) hoặc giả mạo email (_spoofed emails_).

	Impersonation: thường giả mạo con người hoặc chức danh nào đó


	Brand impersonation: giả mạo brand, sử dụng logo, màu sắc, font chữ,…


	BEC: bối cảnh xảy ra trong môi trường doanh nghiệp, giả vờ làm CEO, sếp để gửi mail chuyển tiền, thiệt hại tài chính nhất

		- **Điểm khác biệt "chết người":** BEC thường **KHÔNG** chứa link độc hại hay file virus (để tránh bị bộ lọc email chặn). Nó thuần túy là một email giao tiếp bằng văn bản (_text-based_) dựa vào uy quyền (_Authority_) và sự khẩn cấp (_Urgency_) để lừa chuyển tiền.

		| **Đặc điểm**       | **Impersonation (Mạo danh)**                       | **Brand Impersonation (Giả thương hiệu)**   | **BEC (Thỏa hiệp email DN)**                                       |
		| ------------------ | -------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------ |
		| **Giả làm ai?**    | Một người (IT, thợ điện) hoặc vai trò chung chung. | Một công ty lớn (Microsoft, Google, FedEx). | **Sếp/Đồng nghiệp** hoặc **Đối tác kinh doanh**.                   |
		| **Mục tiêu chính** | Vào tòa nhà, lấy thông tin nhỏ lẻ.                 | Lấy **Username/Password** (Credentials).    | Lừa **Chuyển tiền (Wire Transfer)** hoặc thanh toán hóa đơn giả.   |
		| **Dấu hiệu**       | "Tôi là nhân viên mới", "Tôi quên thẻ".            | Email chứa Logo, Link "Reset Password".     | Email từ "Sếp" yêu cầu chuyển khoản gấp, thường **không có link**. |
		| **Kỹ thuật**       | Social Engineering trực tiếp/qua điện thoại.       | Phishing, Web giả mạo.                      | Hack tài khoản thật, Spoofing email tinh vi.                       |


### Specific Social Engineering Techniques (Các kỹ thuật cụ thể khác) {#2b77b0eb61a480488f4be8910ba127ec}

- **Pretexting (Tạo cớ/Kịch bản):**
	- Tạo ra một kịch bản bịa đặt (_made-up scenario_) để biện minh cho việc tại sao kẻ tấn công lại cần thông tin từ bạn.
	- Pretexting thường là bước chuẩn bị để cuộc tấn công _Impersonation_ trở nên đáng tin hơn.
	- Pretexting liên quan đến context để tạo câu chuyện
	- Impersonation là chiếc mặt nạ mà attacker đóng vai trong câu chuyện đó.

	| **Tiêu chí**     | **Impersonation**                         | **Pretexting**                                                                                                       |
	| ---------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
	| **Bản chất**     | Là cái **Vỏ** (Who).                      | Là cái **Ruột** (Why/Context).                                                                                       |
	| **Yếu tố chính** | Đồng phục, thẻ đeo, giọng nói, chức danh. | Kịch bản, lời nói dối, tình huống bịa đặt.                                                                           |
	| **Độ phức tạp**  | Thường đơn giản (Chỉ cần giả dạng).       | Phức tạp hơn (Cần chuẩn bị thông tin, nghiên cứu nạn nhân để bịa chuyện cho khớp).                                   |
	| **Ví dụ ngắn**   | "Tôi là cảnh sát."                        | "Tôi là cảnh sát, chúng tôi đang điều tra vụ trộm thẻ tín dụng liên quan đến tài khoản của ông, cần ông xác minh..." |

- **Watering Hole Attacks:**
	- Lấy cảm hứng từ tự nhiên (động vật đợi con mồi ở hố nước).
	- Kẻ tấn công xác định các trang web mà nạn nhân **thường xuyên truy cập** (_targets frequent_).
	- Họ tấn công trang web đó (cài malware) và đợi nạn nhân truy cập vào để bị nhiễm.
- **Brand Impersonation:**
	- Giả mạo các thương hiệu lớn, hợp pháp (như PayPal, Microsoft, Bank) để gửi email lừa đảo.
	- Mục đích: Lợi dụng sự nhận diện thương hiệu để lừa người dùng đăng nhập hoặc tải file.
- **Typosquatting (URL Hijacking):**
	- Đăng ký các tên miền bị viết sai chính tả (_misspelled URLs_) gần giống với trang web thật.
	- _Ví dụ:_ `amason.com` thay vì `amazon.com`.
	- Dựa vào việc người dùng gõ nhầm địa chỉ để dẫn họ đến trang web độc hại hoặc quảng cáo.

	Typosquatting is hard to prevent, but organizations often register the most common typos for their domains if they're concerned about it. You can see an example of this by visiting amason.com, which redirects to Amazon.com

- **Pharming:**
	- Một dạng tấn công điều hướng người dùng đến trang web giả mạo, nhưng tinh vi hơn Typosquatting.
	- **Cơ chế:**
		1. Thay đổi file **hosts** trên máy tính nạn nhân.
		2. Hoặc tấn công **DNS poisoning** (đầu độc DNS).
	- _Khác biệt:_ Người dùng gõ **đúng** địa chỉ web, nhưng vẫn bị chuyển hướng sang trang web giả.

	**Cách 1: Tấn công vào File Hosts (Trên máy tính cá nhân)**


	Mỗi máy tính (Windows, Mac, Linux) đều có một file văn bản nhỏ tên là `hosts`. File này giống như một "danh bạ điện thoại cá nhân", máy tính sẽ tra cứu nó trước khi hỏi DNS Server.

	- **Kịch bản:**
		1. Máy tính bạn bị nhiễm Malware (do tải phần mềm lậu chẳng hạn).
		2. Malware âm thầm sửa file `hosts` trên máy bạn.
		3. Nó thêm dòng: `1.2.3.4 www.facebook.com` (Trong đó `1.2.3.4` là IP server giả của hacker).
		4. Lần sau bạn mở trình duyệt, gõ `facebook.com`. Máy tính đọc file `hosts`, thấy IP `1.2.3.4` và đưa bạn thẳng đến web giả.

	**Cách 2: DNS Poisoning (Đầu độc DNS Server - Cấp độ mạng)**


	Đây là cấp độ nguy hiểm hơn vì nó ảnh hưởng đến nhiều người cùng lúc (ví dụ: cả công ty hoặc cả quán cafe).

	- **Kịch bản:**
		1. Hacker tấn công vào Router Wifi hoặc DNS Server của nhà mạng/công ty.
		2. Hacker làm hỏng bộ nhớ đệm (Cache) của DNS Server đó (gọi là _DNS Cache Poisoning_).
		3. Bất kỳ ai kết nối vào mạng Wifi đó và gõ `www.bank.com`, DNS Server bị nhiễm độc sẽ chỉ đường cho họ đến server giả của hacker.

### Tóm tắt nhanh để bạn dễ nhớ khi thi: {#2b77b0eb61a48044ad62e94ba99e5e8e}

- Thấy **"Urgency + Authority"** (Sếp bắt làm gấp) -&gt; Nghĩ ngay đến **Social Engineering**.
- Thấy **"SMS"** -&gt; Chọn **Smishing**.
- Thấy **"Phone call/Voice"** -&gt; Chọn **Vishing**.
- Thấy **"Targeted CEO/CFO"** -&gt; Chọn **Whaling**.
- Thấy **"Infecting a site user visits often"** -&gt; Chọn **Watering Hole**.
- Thấy **"Misspelled URL"** -&gt; Chọn **Typosquatting**.
- Thấy **"Redirect traffic / Hosts file"** -&gt; Chọn **Pharming**.
- Thấy **"Fake Scenario"** -&gt; Chọn **Pretexting**.

## Password Attacks {#2b77b0eb61a480f4b76dc9274f4a3b1d}


Mật khẩu có thể bị tấn công bằng nhiều cách, dưới đây là một số cách phổ biến


### Brute-force {#2b77b0eb61a48069bdcad70bd1e8fc7f}

- Cơ chế: thử liên tục các mật khẩu có thể đến khi tìm ra cái đúng
- Cách thức:
	- Không chỉ thử ngẫu nhiên, mà thường dùng danh sách mật khẩu phổ biến
	- Sử dụng quy tắc sửa đổi (modification rules) để đoán mật khẩu phức tạp. Ví dụ: thay a bằng @, thay e bằng 3
- Bản chất: là quá trình thử mọi biến thể cho đến khi thành công

### Spraying attack {#2b77b0eb61a4806fa462c52095d2662c}

- Khác biệt với brute-force:
	- Thử 1000 mật khẩu trên 1 tài khoản ⇒ dễ bị khóa tài khoản
	- Spraying sử dụng 1 mật khẩu yếu (ví dụ: password) trên 1000 tài khoản khác nhau
	- Cũng là một dạng brute-force (tính iterate)
- Ưu điểm: tránh được việc khóa tài khoản
- Mục tiêu: rất hiệu quả nếu biết mục tiêu dùng mật khẩu mặc định hoặc fan của đội bóng nào đó, hoặc liên quan tới công ty, hệ thống camera,…

### Dictionary attack {#2b77b0eb61a48085b331eefaa5bae40e}

- Cơ chế: sử dụng một danh sách các từ có nghĩa (wordlist/dictionary) để thử
- Công cụ: John the Ripper là công cụ bẻ khóa mật khẩu mã nguồn mở nổi tiếng, có sẵn danh sách từ điển tích hợp
- Cũng là brute-force
- Cách chống:
	- salt + key stretching + mật khẩu phức tạp
	- Thuật toán băm chậm

### Rainbow table {#2b77b0eb61a480fa8328e5db045962e9}

- Công cụ dùng cho tấn công offline
- Tính toán hàm băm cho hàng tỷ mật khẩu rất mất thời gian, rainbow table là một csdl ánh xạ mật khẩu thường thấy - mã hash tương ứng
- Cách dùng:
	- Hacker trộm được file hash mật khẩu
	- Thay vì ngồi hash từ đầu, tra cứu hash trong rainbow table
- Nhanh hơn brute-force
- Khác biệt với dictionary attack: dictionary băm ngay khi thực hiện tra cứu từ điển từ tốn CPU, còn rainbow là sử dụng bảng đã có sẵn

Cách chống: salt

	- Do bảng rainbow chỉ lưu hash những mật khẩu (thêm salt nữa thì thua)

---


Ngoài ra còn có shoulder surfing attack: attacker xem lén người dùng nhập mật khẩu, username


On-path attack: ngăn chặn data truyền qua một mạng, dạng MITM


## Offline vs. Online Password Attacks {#2b77b0eb61a480eeac2ffc2a5e7ba5e5}


Sách phân biệt rõ hai môi trường tấn công:

1. **Online:** Tấn công vào hệ thống đang chạy (Live system).
	- Rủi ro: Dễ bị Firewall chặn hoặc bị khóa tài khoản.
2. **Offline:** Tấn công vào một file chứa mật khẩu đã bị đánh cắp (_captured password store_).
	- Lợi thế: Không lo bị khóa, có thể dùng máy tính mạnh để thử hàng tỷ lần mỗi giây.

## Password Cracking Tools (Công cụ bẻ khóa) {#2b77b0eb61a4804e89f9e0c45b6de7ee}

- **John the Ripper:**
	- Công cụ dòng lệnh (_command line_) mạnh mẽ (Xem Figure 4.2).
	- Hỗ trợ cả Brute-force, Dictionary và Rainbow tables.
	- Có thể dùng để kiểm tra độ mạnh mật khẩu của tổ chức (_password assessment tool_).

## Defenses (Phòng thủ) {#2b77b0eb61a480b18d62f993409ec028}


Làm sao để chống lại các cuộc tấn công này?

1. **Complex Passwords:** Yêu cầu mật khẩu dài và phức tạp.
2. **Salt and Pepper:**
	- **Salt (Muối):** Thêm một chuỗi ngẫu nhiên vào mật khẩu trước khi băm. Mỗi user có một Salt riêng. -> **Vô hiệu hóa Rainbow Tables** (vì hash tạo ra sẽ khác nhau dù mật khẩu giống nhau).
	- **Pepper (Tiêu):** Giống Salt nhưng bí mật và dùng chung cho toàn bộ hệ thống.
3. **MFA (Multifactor Authentication):** Xác thực đa yếu tố. Kể cả lộ mật khẩu cũng không vào được.
4. **Strong Hashing Algorithms:** Dùng thuật toán băm chậm và mạnh (như bcrypt, Argon2) thay vì MD5 hay SHA-1 nhanh nhưng yếu.
5. Với password reuse giữa tài khoản công ty và tài khoản cá nhân (mxh) của người dùng:
	- Dùng password expiration policies: để người dùng phải đổi mật khẩu trong công ty thường xuyên hơn, tránh trùng với tài khoản bên ngoài
	- hoặc nếu có bị lộ bên ngoài, sau một khoảng thời gian hacker mới được biết mật khẩu (vì không tung lên mạng liền), khi hacker tiếp cận và sử dụng mật khẩu để dò thì mật khẩu đó đã hết hạn và bị thay đổi
- Cách chống password reuse của NIST:
	- Blocklist mật khẩu bị lộ (have i been pwned), chặn tận gốc mật khẩu
	- sử dụng password manager

	:::tip
	
	Trong kỷ nguyên mới theo gợi ý của NIST
	1. Mật khẩu dài > Mật khẩu phức tạp.
	
	2. Không hết hạn định kỳ.
	
	3. Không dùng gợi ý.
	
	4. Luôn bật MFA.
	
	:::
	
	


## Summary & Exam Essentials (Tổng kết) {#2b77b0eb61a4802889bae52b55708d26}


### **Social Engineering Summary:** {#2b77b0eb61a4805a93bacc6bdcdbfd56}

- Tập trung vào tâm lý con người (_human psychology_) để lấy thông tin.
- Kỹ thuật đa dạng: _Phishing, Vishing, Smishing, Pretexting, Watering hole..._
- **Misinformation** (sai lệch vô tình) vs. **Disinformation** (sai lệch cố ý).

### **Password Attacks Summary:** {#2b77b0eb61a480acad66ed72ddd863f3}

- **Online vs. Offline:** Phân biệt môi trường tấn công.
- **Spraying:** Thử 1 pass cho nhiều user (tránh lockout).
- **Brute-force:** Thử mọi khả năng (chậm nhưng chắc chắn ra nếu đủ thời gian).
- **Dictionary:** Thử từ có nghĩa.
- **Rainbow Tables:** Tra cứu hash tính sẵn (nhanh, dùng cho offline).
- **Defense:** Salt, Pepper, MFA, Hashing mạnh.
