const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, 'docs');

const tagRules = [
  // Directory specific tags
  { pathContains: 'Disk-forensics', tag: 'Disk Forensics' },
  { pathContains: 'Mem-forensics', tag: 'Memory Forensics' },
  { pathContains: 'Network', tag: 'Network Analysis' },
  { pathContains: 'Threat-hunting', tag: 'Threat Hunting' },
  { pathContains: 'cheatsheets', tag: 'Cheat Sheets' },
  { pathContains: 'homelab', tag: 'Homelab' },
  { pathContains: 'CompTIA-Sec', tag: 'CompTIA Security+' },
  { pathContains: 'Investigation-and-reporting', tag: 'DFIR' },

  // Content specific tags
  { keyword: 'dfir', tag: 'DFIR' },
  { keyword: 'lockbit', tag: 'LockBit' },
  { keyword: 'ransomware', tag: 'Ransomware' },
  { keyword: 'malware', tag: 'Malware Analysis' },
  { keyword: 'splunk', tag: 'Splunk' },
  { keyword: 'elastic', tag: 'ELK' },
  { keyword: 'kibana', tag: 'ELK' },
  { keyword: 'wireshark', tag: 'Wireshark' },
  { keyword: 'pcap', tag: 'Network Analysis' },
  { keyword: 'packet', tag: 'Network Analysis' },
  { keyword: 'volatility', tag: 'Volatility' },
  { keyword: 'caldera', tag: 'Caldera' },
  { keyword: 'sandcat', tag: 'Caldera' },
  { keyword: 'mitre', tag: 'MITRE ATT&CK' },
  { keyword: 'active directory', tag: 'Active Directory' },
  { keyword: 'domain controller', tag: 'Active Directory' },
  { keyword: 'kerberoast', tag: 'Active Directory' },
  { keyword: 'powershell', tag: 'PowerShell' },
  { keyword: 'sysmon', tag: 'Sysmon' },
  { keyword: 'pfsense', tag: 'pfSense' },
  { keyword: 'openvpn', tag: 'OpenVPN' },
  { keyword: 'suricata', tag: 'Suricata' },
  { keyword: 'log4j', tag: 'Log4j' },
  { keyword: 'windows event log', tag: 'Windows Event Logs' },
  { keyword: 'registry', tag: 'Registry' },
  { keyword: 'lsass', tag: 'Credential Access' },
  { keyword: 'uac bypass', tag: 'UAC Bypass' },
  { keyword: 'fodhelper', tag: 'UAC Bypass' },
  { keyword: 'wmi', tag: 'WMI' },
  { keyword: 'psexec', tag: 'PsExec' },
  { keyword: 'timestomp', tag: 'Defense Evasion' },
  { keyword: 'shadow copy', tag: 'Inhibit System Recovery' },
  { keyword: 'defacement', tag: 'Impact' },
  { keyword: 'nukethebrowser', tag: 'NukeTheBrowser' },
  { keyword: 'fortinet', tag: 'Fortinet' },
  { keyword: 'proxmox', tag: 'Proxmox' },
  { keyword: 'linux', tag: 'Linux' },
  { keyword: 'windows', tag: 'Windows' },
  { keyword: 'incident report', tag: 'Incident Response' },
  { keyword: 'forensics', tag: 'Digital Forensics' }
];

const tagImplications = {
  'LockBit': ['Ransomware', 'Malware Analysis'],
  'Ransomware': ['Malware Analysis'],
  'Volatility': ['Memory Forensics'],
  'Wireshark': ['Network Analysis'],
  'Caldera': ['Adversary Emulation'],
  'UAC Bypass': ['Privilege Escalation'],
  'PsExec': ['Lateral Movement'],
  'Sysmon': ['Windows Event Logs']
};

function parseFrontmatterText(text) {
  const lines = text.split(/\r?\n/);
  const data = {};
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const val = line.slice(colonIndex + 1).trim();
      if (!val.startsWith('[') && !val.startsWith('-')) {
        data[key] = val.replace(/^['"]|['"]$/g, '');
      }
    }
  }
  return data;
}

function updateFrontmatterTags(frontmatterText, tags) {
  const lines = frontmatterText.split(/\r?\n/);
  const newLines = [];
  let skipMode = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('tags:')) {
      skipMode = true;
      continue;
    }
    if (skipMode) {
      if (trimmed.startsWith('-') || trimmed === '' || trimmed.startsWith('[') || (trimmed.indexOf(':') === -1 && trimmed.startsWith(' '))) {
        continue;
      } else {
        skipMode = false;
      }
    }
    newLines.push(line);
  }

  // Append new tags
  if (tags && tags.length > 0) {
    newLines.push('tags:');
    for (const tag of tags) {
      newLines.push(`  - ${tag}`);
    }
  }

  return newLines.join('\n');
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return;
  }

  const frontmatterText = match[1];
  const bodyText = match[2];
  const frontmatterData = parseFrontmatterText(frontmatterText);

  // Generate tags based on content rules
  const lowerContent = content.toLowerCase();
  const lowerTitle = (frontmatterData.title || '').toLowerCase();
  const lowerPath = filePath.toLowerCase();

  const matchedTags = new Set();

  for (const rule of tagRules) {
    if (rule.pathContains && lowerPath.includes(rule.pathContains.toLowerCase())) {
      matchedTags.add(rule.tag);
    }
    if (rule.keyword) {
      const keywordLower = rule.keyword.toLowerCase();
      if (lowerContent.includes(keywordLower) || lowerTitle.includes(keywordLower)) {
        matchedTags.add(rule.tag);
      }
    }
  }

  // Apply implications
  for (const tag of Array.from(matchedTags)) {
    if (tagImplications[tag]) {
      for (const implied of tagImplications[tag]) {
        matchedTags.add(implied);
      }
    }
  }

  const tagList = Array.from(matchedTags).sort();

  if (tagList.length > 0) {
    const newFrontmatterText = updateFrontmatterTags(frontmatterText, tagList);
    const newContent = `---\n${newFrontmatterText}\n---\n${bodyText}`;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`[+] Added tags to ${path.relative(__dirname, filePath)}: ${tagList.join(', ')}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.md') && file !== 'README.md') {
      processFile(fullPath);
    }
  }
}

console.log('Starting document tag generation...');
walkDir(targetDir);
console.log('Document tag generation complete.');
