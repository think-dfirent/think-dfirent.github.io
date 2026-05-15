import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

const recentWriteups = [
  {
    title: "LockBit Ransomware Investigation",
    excerpt: "Analyzing disk artifacts and execution flows of the LockBit ransomware.",
    tags: ["Disk Forensics", "Ransomware", "Malware Analysis"],
    link: "/docs/3487b0eb-61a4-80ec-ac7a-f3dbb9979601",
  },
  {
    title: "Boss of the SOC v1",
    excerpt: "Threat hunting using Splunk to uncover APT activity and lateral movement.",
    tags: ["Threat Hunting", "Splunk", "APT"],
    link: "/docs/3557b0eb-61a4-8014-a7a8-dc2e81d66086",
  },
  {
    title: "Hafnium APT Lab",
    excerpt: "Investigating Microsoft Exchange Server vulnerabilities and web shell deployments.",
    tags: ["Incident Response", "Web Shell", "Windows Event Logs"],
    link: "/docs/3537b0eb-61a4-80ae-863a-c7b31d2ff397",
  }
];

const homelabPosts = [
  {
    title: "Architecture Design",
    excerpt: "Detailed architectural overview of the Proxmox-based cybersecurity homelab.",
    tags: ["Splunk", "pfSense", "OpenVPN"],
    link: "/docs/homelab",
  },
  {
    title: "SOC Environment Setup",
    excerpt: "Step-by-step guide on provisioning Splunk, setting up Windows Event logs and Sysmon for enterprise log analysis.",
    tags: ["Splunk", "Windows Event Logs", "Sysmon"],
    link: "/docs/33f7b0eb-61a4-80d9-95fc-fbee8ffdc131",
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