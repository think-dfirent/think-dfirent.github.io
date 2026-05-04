import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

// Đã cập nhật lại nội dung và tags cho sát với lộ trình SOC/DFIR của bạn
const recentWriteups = [
  {
    title: "LockBit Ransomware Investigation",
    excerpt: "Analyzing disk artifacts and execution flows of the LockBit ransomware.",
    tags: ["Disk Forensics", "Ransomware", "Malware Analysis"],
    link: "/docs/writeups/Disk-forensics/LockBit",
  },
  {
    title: "Boss of the SOC v1",
    excerpt: "Threat hunting using Splunk to uncover APT activity and lateral movement.",
    tags: ["Threat Hunting", "Splunk", "APT"],
    link: "/docs/writeups/Threat-hunting/Boss-Of-The-SOC-v1",
  },
  {
    title: "Hafnium APT Lab",
    excerpt: "Investigating Microsoft Exchange Server vulnerabilities and web shell deployments.",
    tags: ["Incident Response", "Web Shell", "Windows Event Logs"],
    link: "/docs/writeups/Threat-hunting/Hafnium-APT-lab",
  }
];

const homelabPosts = [
  {
    title: "Homelab Architecture Design",
    excerpt: "Detailed architectural overview of the Proxmox-based cybersecurity homelab.",
    tags: ["Splunk", "pfSense", "OpenVPN"],
    link: "/docs/homelab/architecture-design",
  },
  {
    title: "SOC Environment Setup",
    excerpt: "Step-by-step guide on provisioning Elastic Stack and Wazuh for enterprise log analysis.",
    tags: ["Elastic Stack", "Wazuh", "SIEM"],
    link: "/docs/homelab/setup-process",
  }
];

function LogCard({ item }) {
  return (
    <Link 
      to={item.link} 
      /* Thêm hover:no-underline để chặn gạch chân toàn khối của Docusaurus */
      className="block group transition-all duration-300 hover:no-underline cursor-pointer"
    >
      <div className="glass-panel p-6 h-full flex flex-col justify-between hover:-translate-y-1 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl">
        <div>
          {/* Thêm group-hover:underline để chỉ gạch chân tiêu đề khi di chuột vào thẻ */}
          <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:underline transition-colors">
            {item.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 leading-relaxed">
            {item.excerpt}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {item.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-blue-300 rounded-md font-medium">
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
      title="Platform"
      description="Think DFIRent - Cybersecurity Portfolio & Documentation">
      <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-300">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>

        {/* Top glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-blue-500/10 dark:bg-blue-900/20 blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 pt-16 pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 relative">
              {/* Vertical Divider for Desktop */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2">
                <div className="absolute top-1/4 bottom-1/4 left-1/2 -translate-x-1/2 w-[2px] bg-blue-500/50 dark:bg-blue-400/50 blur-[2px]"></div>
              </div>

              {/* Investigation Logs Section */}
              <section className="lg:pr-4">
                <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h2 className="text-xl font-mono text-slate-800 dark:text-slate-100 m-0 tracking-wide uppercase">Investigation Logs</h2>
                </div>
                <div className="space-y-6">
                  {recentWriteups.map((item, idx) => (
                    <LogCard key={idx} item={item} />
                  ))}
                </div>
              </section>

              {/* Mobile Divider */}
              <div className="lg:hidden w-full h-px bg-slate-200 dark:bg-slate-800 my-2 relative">
                <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-[2px] bg-blue-500/50 dark:bg-blue-400/50 blur-[2px]"></div>
              </div>

              {/* Homelab Architecture Section */}
              <section className="lg:pl-4">
                <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h2 className="text-xl font-mono text-slate-800 dark:text-slate-100 m-0 tracking-wide uppercase">Architecture Deployments</h2>
                </div>
                <div className="space-y-6">
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