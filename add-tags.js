const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

const targetDir = path.join(__dirname, 'docs');
const token = process.env.NOTION_TOKEN;

// Path to metadata cache
const cachePath = path.join(__dirname, 'notion-metadata-cache.json');
let metadataCache = {};

if (fs.existsSync(cachePath)) {
  try {
    metadataCache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch (err) {
    console.error('[-] Error reading notion-metadata-cache.json:', err.message);
  }
}

function saveCache() {
  try {
    fs.writeFileSync(cachePath, JSON.stringify(metadataCache, null, 2), 'utf8');
  } catch (err) {
    console.error('[-] Error writing notion-metadata-cache.json:', err.message);
  }
}

const tagRules = [
  // Directory specific tags (case-insensitive checks)
  { pathContains: 'disk-forensics', tag: 'Disk Forensics' },
  { pathContains: 'mem-forensics', tag: 'Memory Forensics' },
  { pathContains: 'network', tag: 'Network Analysis' },
  { pathContains: 'threat-hunting', tag: 'Threat Hunting' },
  { pathContains: 'cheatsheets', tag: 'Cheat Sheets' },
  { pathContains: 'homelab', tag: 'Homelab' },
  { pathContains: 'comptia-sec', tag: 'CompTIA Security+' },
  { pathContains: 'investigation-and-reporting', tag: 'DFIR' },

  // Content specific tags (case-insensitive keyword matching)
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

function parseMarkdownFile(content) {
  if (!content.startsWith('---')) {
    return null;
  }
  const lfIndex = content.indexOf('\n---');
  if (lfIndex === -1) {
    return null;
  }
  const closingBoundaryStart = lfIndex + 1;
  const nextLf = content.indexOf('\n', closingBoundaryStart + 3);
  if (nextLf === -1) {
    const frontmatterText = content.slice(3, closingBoundaryStart).trim();
    return { frontmatterText, bodyText: '' };
  } else {
    const frontmatterText = content.slice(3, closingBoundaryStart).trim();
    const bodyText = content.slice(nextLf + 1);
    return { frontmatterText, bodyText };
  }
}

function stripTags(frontmatterText) {
  const lines = frontmatterText.split(/\r?\n/);
  const newLines = [];
  let inTags = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith('tags:')) {
      inTags = true;
      if (trimmed !== 'tags:' && (trimmed.includes('[') || trimmed.includes('{'))) {
        inTags = false;
      }
      continue;
    }
    if (inTags) {
      if (trimmed === '' || trimmed.startsWith('-') || trimmed.startsWith('[') || (line.startsWith(' ') && !line.includes(':'))) {
        continue;
      } else {
        inTags = false;
      }
    }
    newLines.push(line);
  }
  return newLines.join('\n');
}

function getTitleFromFrontmatter(frontmatterText) {
  const lines = frontmatterText.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('title:')) {
      const val = trimmed.slice(6).trim();
      return val.replace(/^['"]|['"]$/g, '');
    }
  }
  return '';
}

function getPageIdFromFrontmatter(frontmatterText) {
  const lines = frontmatterText.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('slug:')) {
      const val = trimmed.slice(5).trim();
      const slugVal = val.replace(/^\/|^\'\/|^\'|\'$/g, '');
      return slugVal;
    }
  }
  return '';
}

function fetchPageMetadata(pageId, token) {
  return new Promise((resolve, reject) => {
    const normalizedId = pageId.replace(/-/g, '').toLowerCase();
    const options = {
      hostname: 'api.notion.com',
      path: `/v1/pages/${normalizedId}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const parsed = JSON.parse(data);
            resolve({
              created_time: parsed.created_time,
              last_edited_time: parsed.last_edited_time
            });
          } catch (err) {
            reject(new Error(`Failed to parse response: ${err.message}`));
          }
        } else {
          reject(new Error(`Notion API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => { reject(err); });
    req.end();
  });
}

function updateBodyMetadata(bodyText, createdTime, lastEditedTime) {
  const startTag = '<!-- notion-metadata-start -->';
  const endTag = '<!-- notion-metadata-end -->';
  
  const startIndex = bodyText.indexOf(startTag);
  const endIndex = bodyText.indexOf(endTag);
  
  let cleanedBody = bodyText;
  if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
    cleanedBody = bodyText.slice(0, startIndex) + bodyText.slice(endIndex + endTag.length);
  }
  
  const formatTime = (timeStr) => {
    const d = new Date(timeStr);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const createdStr = formatTime(createdTime);
  const updatedStr = formatTime(lastEditedTime);
  
  const metadataBlock = `${startTag}\n*📅 Published: ${createdStr} | 🔄 Last Updated: ${updatedStr}*\n${endTag}\n`;
  
  return metadataBlock + cleanedBody.trimStart();
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const parsed = parseMarkdownFile(content);
  if (!parsed) {
    return;
  }

  const { frontmatterText, bodyText } = parsed;
  const title = getTitleFromFrontmatter(frontmatterText);
  const pageId = getPageIdFromFrontmatter(frontmatterText);

  // Generate tags based on content rules
  const lowerContent = content.toLowerCase();
  const lowerTitle = title.toLowerCase();
  const lowerPath = filePath.toLowerCase().replace(/\\/g, '/');

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
  const cleanedFrontmatter = stripTags(frontmatterText);
  let newFrontmatter = cleanedFrontmatter.trim();

  if (tagList.length > 0) {
    newFrontmatter += '\ntags:\n' + tagList.map(t => `  - ${t}`).join('\n');
  }

  // Handle Notion Created & Last Edited Date/Time
  let finalBodyText = bodyText;
  if (pageId && token) {
    const hasMetadataBlock = bodyText.includes('<!-- notion-metadata-start -->');
    const normalizedPageId = pageId.replace(/-/g, '').toLowerCase();
    
    let dates = metadataCache[normalizedPageId];
    
    if (!hasMetadataBlock || !dates) {
      try {
        console.log(`[~] Fetching date metadata from Notion for page: ${title || pageId}`);
        dates = await fetchPageMetadata(normalizedPageId, token);
        metadataCache[normalizedPageId] = dates;
        await sleep(350); // Respect Notion API rate limit (3 req/sec)
      } catch (err) {
        console.warn(`[!] Warning: Failed to fetch metadata for ${title || pageId}: ${err.message}`);
      }
    }
    
    if (dates) {
      finalBodyText = updateBodyMetadata(bodyText, dates.created_time, dates.last_edited_time);
    }
  }

  const newContent = `---\n${newFrontmatter}\n---\n${finalBodyText}`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  
  if (tagList.length > 0) {
    console.log(`[+] Processed ${path.relative(targetDir, filePath)}: tags=[${tagList.join(', ')}]`);
  } else {
    console.log(`[+] Processed ${path.relative(targetDir, filePath)}: (no tags matching)`);
  }
}

function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getMarkdownFiles(fullPath, fileList);
    } else if (file.endsWith('.md') && file !== 'README.md') {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

async function main() {
  console.log('Starting document tag and metadata generation...');
  const files = getMarkdownFiles(targetDir);
  
  for (const filePath of files) {
    try {
      await processFile(filePath);
    } catch (err) {
      console.error(`[-] Error processing file ${filePath}:`, err.message);
    }
  }
  
  saveCache();
  console.log('Document tag and metadata generation complete.');
}

main().catch(err => {
  console.error('[-] Critical error in main:', err);
});
