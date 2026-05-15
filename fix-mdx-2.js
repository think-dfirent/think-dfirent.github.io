const fs = require('fs');
let f = fs.readFileSync('docs/writeups/Network/Malware-Traffic-Analysis-1.md', 'utf8');

// Reset to a clean state by replacing all weird backticks around domain names
f = f.replace(/`www\.ciniholland\[\.\]nl`/g, 'www.ciniholland[.]nl');
f = f.replace(/`24corp-shop\[\.\]com`/g, '24corp-shop[.]com');
f = f.replace(/`adultbiz\[\.\]in`/g, 'adultbiz[.]in');
f = f.replace(/`stand\.trustandprobaterealty\.com`/g, 'stand.trustandprobaterealty.com');
f = f.replace(/``http:\/\/24corp-shop\[\.\]com\/``/g, 'http://24corp-shop[.]com/');
f = f.replace(/`stand\.trustandprobaterealty\[\.\]com`/g, 'stand.trustandprobaterealty[.]com');
f = f.replace(/`www\.ciniholland\.nl`/g, 'www.ciniholland.nl');

// also clean up any double backticks created accidentally
f = f.replace(/``/g, '`');

// Now, to fix the MDX error "Can't parse URL http://www.ciniholland[.]nl",
// Docusaurus remark-gfm auto-links domain names. If we break the domain name with an invisible character
// or an HTML tag, it won't be auto-linked! Let's just use `<span>.</span>` instead of `.` for defanging,
// or just wrap the whole thing in <code>...</code> tags which skips markdown parsing!

f = f.replace(/www\.ciniholland\[\.\]nl/g, '<code>www.ciniholland[.]nl</code>');
f = f.replace(/24corp-shop\[\.\]com/g, '<code>24corp-shop[.]com</code>');
f = f.replace(/adultbiz\[\.\]in/g, '<code>adultbiz[.]in</code>');
f = f.replace(/stand\.trustandprobaterealty\.com/g, '<code>stand.trustandprobaterealty.com</code>');
f = f.replace(/http:\/\/24corp-shop\[\.\]com\//g, '<code>http://24corp-shop[.]com/</code>');
f = f.replace(/stand\.trustandprobaterealty\[\.\]com/g, '<code>stand.trustandprobaterealty[.]com</code>');
f = f.replace(/www\.ciniholland\.nl/g, '<code>www.ciniholland.nl</code>');

fs.writeFileSync('docs/writeups/Network/Malware-Traffic-Analysis-1.md', f);
