import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const recentWriteups = [
  {
    title: "LockBit",
    excerpt: "Analyzing disk artifacts and execution flows of the LockBit ransomware.",
    tags: ["Disk Forensics", "Ransomware", "Malware Analysis"],
    link: "/docs/3487b0eb-61a4-80ec-ac7a-f3dbb9979601",
  },
  {
    title: "NukeTheBrowser",
    excerpt: "Analyzing malicious network traffic to uncover malware delivery and exploitation.",
    tags: ["Network Analysis", "Wireshark", "Malware Analysis"],
    link: "/docs/3477b0eb-61a4-8049-b232-e093c0f8c839",
  },
  {
    title: "Kerberoasted",
    excerpt: "Investigating a Kerberoasting attack, analyzing Windows Event Logs and WMI persistence mechanisms.",
    tags: ["Threat Hunting", "Active Directory", "Windows Event Logs"],
    link: "/docs/3537b0eb-61a4-80b0-b775-c83f078d17ab",
  }
];

const homelabPosts = [
  {
    title: "Homelab Architecture",
    excerpt: "Detailed architectural overview of the Proxmox-based cybersecurity homelab.",
    tags: ["Splunk", "pfSense", "OpenVPN"],
    link: "/docs/33e7b0eb-61a4-8059-988d-fda1462ed560",
  },
  {
    title: "Homelab Infrastructure Deployment",
    excerpt: "Step-by-step guide on provisioning Splunk, setting up Windows Event logs and Sysmon for enterprise log analysis.",
    tags: ["Splunk", "Windows Event Logs", "Sysmon"],
    link: "/docs/category/homelab-infrastructure-deployment",
  }
];

function LogCard({ item }) {
  return (
    <Link
      to={item.link}
      className="block group transition-all duration-300 hover:no-underline cursor-pointer"
    >
      <div className="p-6 h-full flex flex-col justify-between bg-white dark:bg-[#1a1a1a] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-[#2a2a2a] rounded-xl transition-all duration-300">
        <div>
          <h3 className="font-sans text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 leading-relaxed font-sans">
            {item.excerpt}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-gray-50 dark:bg-[#222] text-xs font-sans text-gray-600 dark:text-gray-300 rounded-md font-medium border border-gray-200 dark:border-[#333] transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <Layout
      title="Home"
      description="Think DFIRent - Cybersecurity Portfolio & Documentation">
      <main className="min-h-screen bg-[#fafafa] dark:bg-[#121212] relative overflow-hidden transition-colors duration-300">
        <div className="relative z-10 pt-16 pb-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            {/* Flexbox Layout mimicking docu-notion's natural flow */}
            <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">

              {/* Investigation Logs Section */}
              <section className="flex-1 flex flex-col">
                <div className="mb-6">
                  <h2 className="text-xl font-sans font-bold text-gray-900 dark:text-gray-100 m-0 tracking-tight">FEATURE WRITEUPS</h2>
                </div>
                <div className="flex flex-col gap-6">
                  {recentWriteups.map((item, idx) => (
                    <LogCard key={idx} item={item} />
                  ))}
                </div>
              </section>

              {/* Architecture Deployments Section */}
              <section className="flex-1 flex flex-col">
                <div className="mb-6">
                  <h2 className="text-xl font-sans font-bold text-gray-900 dark:text-gray-100 m-0 tracking-tight">HOMELAB DEPLOYMENTS</h2>
                </div>
                <div className="flex flex-col gap-6">
                  {homelabPosts.map((item, idx) => (
                    <LogCard key={idx} item={item} />
                  ))}
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}