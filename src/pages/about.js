import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function About() {
  return (
    <Layout title="About - Nguyen Sy Cuong">
      <main className="min-h-screen bg-[#fafafa] dark:bg-[#121212] pt-16 pb-12 px-4 transition-colors duration-300">
        <div className="container mx-auto max-w-3xl">
          <div className="p-8 md:p-10 bg-white dark:bg-[#1a1a1a] border border-gray-100 dark:border-[#2a2a2a] rounded-xl shadow-sm">
            
            {/* 1. Header & Summary */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Nguyen Sy Cuong</h1>
              <h2 className="text-base font-mono text-gray-500 dark:text-gray-400 mb-4">~/roles/4n6-enthusiast</h2>

            </div>


            {/* 2. Bio & Welcome */}
            <div className="mb-8 text-gray-700 dark:text-gray-300 leading-relaxed font-sans space-y-4">
              <p className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                 Welcome to my page
              </p>
              <p>
                I am an aspiring SOC Analyst transitioning from a disciplined professional background into the SOC&DFIR domain. I focus on understanding the "how" and "why" behind security events, combining an analytical mindset with a passion for continuous technical growth. 
                
              </p>
            </div>

            {/* 3. Technical Capabilities */}
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-950 dark:text-gray-50 mb-6 font-sans">
                Technical Capabilities
              </h3>
              <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-[#3f3f3f] shadow-sm">
                <table className="w-full border-collapse text-left text-sm text-gray-700 dark:text-gray-300 m-0">
                  <thead className="bg-gray-50 dark:bg-[#1e1e1e] text-gray-900 dark:text-gray-100 font-sans border-b border-gray-300 dark:border-[#3f3f3f]">
                    <tr>
                      <th className="px-5 py-3.5 font-bold text-xs uppercase tracking-wider w-1/3 border-r border-gray-300 dark:border-[#3f3f3f]">DOMAIN</th>
                      <th className="px-5 py-3.5 font-bold text-xs uppercase tracking-wider">SKILLS & KEY TOOLS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-300 dark:divide-[#3f3f3f]">
                    <tr className="hover:bg-gray-50/30 dark:hover:bg-[#1f1f1f]/20 transition-colors duration-150">
                      <td className="px-5 py-4 align-top font-bold text-gray-950 dark:text-gray-100 font-sans whitespace-nowrap border-r border-gray-300 dark:border-[#3f3f3f]">
                        SOC & SIEM
                      </td>
                      <td className="px-5 py-4 align-top font-sans leading-relaxed text-gray-600 dark:text-gray-400">
                        Alert Triage and Phishing Email Analysis. Proficient in event correlation and log analysis using SIEM (Splunk, ELK) to hunt threats across Windows Event Logs and Sysmon.
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/30 dark:hover:bg-[#1f1f1f]/20 transition-colors duration-150">
                      <td className="px-5 py-4 align-top font-bold text-gray-950 dark:text-gray-100 font-sans whitespace-nowrap border-r border-gray-300 dark:border-[#3f3f3f]">
                        Digital Forensics
                      </td>
                      <td className="px-5 py-4 align-top font-sans leading-relaxed text-gray-600 dark:text-gray-400">
                        Endpoint & Disk Forensics (KAPE, FTK Imager, Eric Zimmerman's Tools), Memory Forensics (Volatility 2 & 3), Network Traffic Analysis (Wireshark, Zui, NetworkMiner).
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/30 dark:hover:bg-[#1f1f1f]/20 transition-colors duration-150">
                      <td className="px-5 py-4 align-top font-bold text-gray-950 dark:text-gray-100 font-sans whitespace-nowrap border-r border-gray-300 dark:border-[#3f3f3f]">
                        Threat Hunting & Detection
                      </td>
                      <td className="px-5 py-4 align-top font-sans leading-relaxed text-gray-600 dark:text-gray-400">
                        Hypothesis-driven Hunting and MITRE ATT&CK framework mapping. Practical Detection Engineering (authoring Sigma rules, YARA rules, and Splunk SPL correlation queries).
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/30 dark:hover:bg-[#1f1f1f]/20 transition-colors duration-150">
                      <td className="px-5 py-4 align-top font-bold text-gray-950 dark:text-gray-100 font-sans whitespace-nowrap border-r border-gray-300 dark:border-[#3f3f3f]">
                        Malware Triage
                      </td>
                      <td className="px-5 py-4 align-top font-sans leading-relaxed text-gray-600 dark:text-gray-400">
                        Basic Static & Dynamic Analysis within isolated environments (FlareVM, Sysinternals, Didier Stevens suite) for IOC and IOA extraction.
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50/30 dark:hover:bg-[#1f1f1f]/20 transition-colors duration-150">
                      <td className="px-5 py-4 align-top font-bold text-gray-950 dark:text-gray-100 font-sans whitespace-nowrap border-r border-gray-300 dark:border-[#3f3f3f]">
                        OS & Scripting
                      </td>
                      <td className="px-5 py-4 align-top font-sans leading-relaxed text-gray-600 dark:text-gray-400">
                        Basic understanding of Windows Internals. Capable of using Python, CLI utilities, and Regex for log parsing and task automation.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. Certifications*/}
            <div className="mb-10">
              <h3 className="flex items-center gap-2 text-lg font-bold text-gray-950 dark:text-gray-50 mb-4 font-sans">
                Certifications
              </h3>
              <ul className="space-y-3 pl-0 list-none font-sans text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1 select-none text-xs">◆</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="text-gray-950 dark:text-gray-100">CompTIA Security+: </strong> Jan 2026
                  </span>
                
                </li>
                
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1 select-none text-xs">◆</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong className="text-gray-950 dark:text-gray-100 font-medium">Certified CyberDefenders Level 2:</strong> May 2026
                  </span>
                </li>
              </ul>
            </div>

            {/* 5. Links (Monochrome Terminal Style) */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm items-center border-t border-gray-100 dark:border-[#2a2a2a] pt-6 mt-8">
              <p className="text-gray-700 dark:text-gray-300 m-0 mr-2">
                Find me at:
              </p>
              <Link to="https://linkedin.com/in/mynameiscuong" className="text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-50 hover:underline hover:no-underline transition-colors">
                [ LinkedIn ]
              </Link>
              <Link to="https://tryhackme.com/p/cuongasd52?tab=yearly-activity" className="text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-50 hover:underline hover:no-underline transition-colors">
                [ TryHackMe ]
              </Link>
              <Link to="https://cyberdefenders.org/p/cuongns/" className="text-gray-600 dark:text-gray-400 hover:text-gray-950 dark:hover:text-gray-50 hover:underline hover:no-underline transition-colors">
                [ CyberDefenders ]
              </Link>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}