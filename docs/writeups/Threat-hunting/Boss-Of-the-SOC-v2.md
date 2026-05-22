---
title: Boss Of the SOC v2
sidebar_position: 6
slug: /3577b0eb-61a4-80ca-ae0c-d11d81b59873
tags:
  - Malware Analysis
  - PowerShell
  - Ransomware
  - Splunk
  - Threat Hunting
---
<!-- notion-metadata-start -->
*📅 Published: 2026-05-05 20:44 | 🔄 Last Updated: 2026-05-16 02:32*
<!-- notion-metadata-end -->
---


[https://cyberdefenders.org/blueteam-ctf-challenges/16](https://cyberdefenders.org/blueteam-ctf-challenges/16)


### Q1: This is a simple question to get you familiar with submitting answers. What is the name of the company that makes the software that you are using for this competition? Answer guidance: A six-letter word with no punctuation. {#3577b0eb61a4801eb78ed8bd15c77f1e}


Splunk


### Q2: Amber Turing was hoping for Frothly to be acquired by a potential competitor who fell through, but they visited their website to find contact information for their executive team. What is the website domain that she visited? Answer guidance: Do not provide the FQDN. Answer example: [google.com](http://google.com/) {#3577b0eb61a480c3b034c5295e13ccb8}


### Q3: Amber found the executive contact information and sent him an email. What is the CEO's name? Provide the first and last name. {#3577b0eb61a480e19e85e2b8d6155c6f}


### Q4: After the initial contact with the CEO, Amber contacted another employee at this competitor. What is that employee's email address? {#3577b0eb61a4804292c1eece4bd6967b}


### Q5: What is the name of the file attachment that Amber sent to a contact at the competitor? {#3577b0eb61a4801399e5c4c88cb6f882}


### Q6: What is Amber's personal email address? {#3577b0eb61a480da8fa2da5b6d6ac69f}


### Q7: What version of TOR did Amber install to obfuscate her web browsing? Answer guidance: Numeric with one or more delimiters. {#3577b0eb61a480e19e0efe2493ae6339}


### Q8: What is the public IPv4 address of the server running [www.brewertalk.com](http://www.brewertalk.com/)? {#3577b0eb61a480e3a488e67112753c18}


### Q9: Provide the IP address of the system used to run a web vulnerability scan against [www.brewertalk.com](http://www.brewertalk.com/). {#3577b0eb61a480ec901ddd056165e58a}


### Q10: A likely different piece of software is also using the IP address from question 9 to attack a URI path. What is the URI path? Answer guidance: Include the leading forward slash in your answer. Do not include the query string or other parts of the URI. Answer example: /phpinfo.php {#3577b0eb61a480e6b768fe4324b08bd8}


### Q11: What SQL function is being abused on the URI path from question 10? {#3577b0eb61a4803ea8fce1b23e52dcc5}


### Q12: What is Frank Ester's password salt value on [www.brewertalk.com](http://www.brewertalk.com/)? {#3577b0eb61a480c2a737cc52bd5fe850}


### Q13: What is user btun's password on [brewertalk.com](http://brewertalk.com/)? {#3577b0eb61a48055a4b2d4313a567987}


### Q14: What are the characters displayed by the XSS probe? Answer guidance: Submit answer in the native language or character set. {#3577b0eb61a4808db812d96b778023c0}


### Q15: What was the value of the cookie that Kevin's browser transmitted to the malicious URL as part of an XSS attack? Answer guidance: All digits. Not the cookie name or symbols like an equal sign. {#3577b0eb61a4800a9dc9d3efc92bfd70}


### Q16: The [brewertalk.com](http://brewertalk.com/) website employed Cross-Site Request Forgery (CSRF) techniques. What was the value of the anti-CSRF token stolen from Kevin Lagerfield's computer and used to help create an unauthorized admin user on [brewertalk.com](http://brewertalk.com/)? {#3577b0eb61a480bf890ad5dd76362e9e}


### Q17: What was [brewertalk.com](http://brewertalk.com/) username maliciously created by a spearphishing attack? {#3577b0eb61a480e19cd8e303e4f08191}


### Q18: Considering the threat group associated with the suspect IP address 5.39.93.112 in Enterprise Security, and related data, what protocol often used for file transfer is actually responsible for the generated traffic? {#3577b0eb61a4803c943bca268f86292f}


### Q19: Mallory's critical PowerPoint presentation on her MacBook gets encrypted by ransomware on August 18. At what hour, minute, and second does this actually happen? Answer guidance: Provide the time in PDT. Use the 24h format HH:MM:SS, using leading zeroes if needed. Do not use Splunk's _time (index time). {#3577b0eb61a48006a525c062dea016f7}


### Q20: How many seconds elapsed when the ransomware executable was written to disk on MACLORY-AIR13 and the first local file encryption? Answer guidance: Use the index times (_time) instead of other timestamps in the events. {#3577b0eb61a480e7af55d5f1cf51a689}


### Q21: Kevin Lagerfield used a USB drive to move malware onto kutekitten, Mallory's personal MacBook. She ran the malware, which obfuscates itself during execution. Provide the vendor name of the USB drive Kevin likely used. Answer Guidance: Use time correlation to identify the USB drive. {#3577b0eb61a480e39ca4f67e06eebf17}


### Q22: What programming language is at least part of the malware from the question above written in? {#3577b0eb61a48044b525fc0b96dd8d33}


### Q23: The malware from the two questions above appears as a specific process name in the process table when it is running. What is it? {#3577b0eb61a480959190ce7b7d72f5b7}


### Q24: The malware infecting kutekitten uses dynamic DNS destinations to communicate with two C&C servers shortly after installation. What is the fully qualified domain name (FQDN) of the first (alphabetically) of these destinations? {#3577b0eb61a4808b86bafe257c82dafa}


### Q25: From the question above, what is the fully qualified domain name (FQDN) of the second (alphabetically) contacted C&C server? {#3577b0eb61a480c9a06ff554eaf41a46}


### Q26: A Federal law enforcement agency reports that Taedonggang often spear phishes its victims with zip files that have to be opened with a password. What is the name of the attachment sent to Frothly by a malicious Taedonggang actor? {#3577b0eb61a48096a49efbb333787d62}


### Q27: The Taedonggang APT group encrypts most of their traffic with SSL. What is the "SSL Issuer" that they use for the majority of their traffic? Answer guidance: Copy the field exactly, including spaces. {#3577b0eb61a480a0a7c0e55219b93343}


### Q28: Threat indicators for a specific file triggered notable events on two distinct workstations. What IP address did both workstations have a connection with? {#3577b0eb61a480abab96e8a1f8b009b4}


### Q29: Based on the IP address found in the question above, what domain of interest is associated with that IP address? {#3577b0eb61a480b6a575d2795397b1c5}


### Q30: What unusual file (for an American company) does winsys32.dll cause to be downloaded into the Frothly environment? {#3577b0eb61a4808da260c5f156ec2ffe}


### Q31: What is the first and last name of the poor innocent sap who was implicated in the metadata of the file that executed PowerShell Empire on the first victim's workstation? Answer example: John Smith {#3577b0eb61a480efb7bfdd6fea5c45b1}


### Q32: To maintain persistence in the Frothly network, Taedonggang APT configured several Scheduled Tasks to beacon back to their C2 server. What single webpage is most contacted by these Scheduled Tasks? Answer guidance: Remove the path and type a single value with an extension. Answer example: index.php or images.html {#3577b0eb61a480c0bb61e5fe018d68c0}


### Q33: Which HTTP user agent is associated with a fraudster who appears to be gaming the site by unsuccessfully testing multiple coupon codes? {#3577b0eb61a4803b86b1e3ef33fd5632}


### Q34: Individual clicks made by a user when interacting with a website are associated with each other using session identifiers. You can find session identifiers in the stream:http sourcetype. The Frothly store website session identifier is found in one of the stream:http fields and does not change throughout the user session. What session identifier is assigned to dberry398@mail.com when visiting the Frothly store for the very first time? Answer guidance: Provide the value of the field, not the field name. {#3577b0eb61a480a29dcceb83db7e043c}


### Q35: What is the domain name used in email addresses by someone creating multiple accounts on the Frothly store website (http://store.froth.ly) that appear to have machine-generated usernames? {#3577b0eb61a480d886a9d7513652289e}


### Q36: Which user ID experienced the most logins to their account from different IP addresses and user agent combinations? Answer guidance: The user ID is an email address. {#3577b0eb61a480099245c811353a08bd}


### Q37: Several user accounts sharing a common password are usually a precursor to an undesirable scenario orchestrated by a fraudster. Which password is being seen most often across users logging into http://store.froth.lyx. {#3577b0eb61a480618b2dd83fcc0bb9aa}

