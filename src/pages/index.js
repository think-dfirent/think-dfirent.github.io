import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { Terminal, Shield, Server, FileTerminal, ArrowRight, Activity } from 'lucide-react';

function TerminalHero() {
  return (
    <div className="flex justify-center items-center py-20 px-4">
      <div className="glass-panel w-full max-w-4xl rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="bg-slate-100 dark:bg-slate-900/80 px-4 py-3 flex items-center border-b border-slate-200 dark:border-slate-800">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-green-500/80"></div>
          </div>
          <div className="mx-auto terminal-text text-sm opacity-80 flex items-center text-slate-500 dark:text-blue-400">
            <Terminal className="w-4 h-4 mr-2" /> identity@ai.core:~
          </div>
        </div>
        <div className="p-6 md:p-8 bg-white dark:bg-[#050505]/95 font-mono text-sm md:text-base h-72 flex flex-col justify-end">
          <div className="text-slate-400 mb-2">$ ./init_analytics_engine.sh</div>
          <div className="text-blue-600 dark:text-blue-400 mb-1 leading-relaxed">[+] Initializing AI Threat Analytics...</div>
          <div className="text-blue-600 dark:text-blue-400 mb-1 leading-relaxed">[+] Processing structural telemetry...</div>
          <div className="text-blue-600 dark:text-blue-400 mb-6 leading-relaxed">[+] Synthesizing SOC architecture models...</div>
          <div className="flex items-center text-slate-700 dark:text-slate-300">
            <span className="text-indigo-500 dark:text-indigo-400 mr-3">voodoo@think-dfirent:~$</span>
            <span className="blinking-cursor"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

const recentWriteups = [
  {
    title: "LockBit Ransomware Investigation",
    excerpt: "Analyzing disk artifacts and execution flows of the LockBit ransomware.",
    date: "2024-05-01 10:00:00 UTC",
    tags: ["Disk Forensics", "Ransomware", "LockBit"],
    link: "/docs/writeups/Disk-forensics/LockBit",
    icon: <Activity className="w-5 h-5 text-indigo-500" />
  },
  {
    title: "Boss of the SOC v1",
    excerpt: "Threat hunting using Splunk to uncover APT activity and lateral movement.",
    date: "2024-04-15 14:22:05 UTC",
    tags: ["Threat Hunting", "Splunk", "APT"],
    link: "/docs/writeups/Threat-hunting/Boss-Of-The-SOC-v1",
    icon: <Shield className="w-5 h-5 text-blue-500" />
  }
];

const homelabPosts = [
  {
    title: "Homelab Architecture Design",
    excerpt: "Detailed architectural overview of the proxmox-based cybersecurity homelab.",
    date: "2024-03-10 08:30:00 UTC",
    tags: ["Homelab", "Architecture", "Design"],
    link: "/docs/homelab/architecture-design",
    icon: <Server className="w-5 h-5 text-indigo-400" />
  },
  {
    title: "Homelab Setup Process",
    excerpt: "Step-by-step guide on provisioning and configuring the lab environment.",
    date: "2024-02-22 18:15:45 UTC",
    tags: ["Proxmox", "Configuration", "Deployment"],
    link: "/docs/homelab/setup-process",
    icon: <FileTerminal className="w-5 h-5 text-blue-400" />
  }
];

function LogCard({ item }) {
  return (
    <Link to={item.link} className="block group transition-all duration-300">
      <div className="glass-panel p-6 h-full flex flex-col justify-between hover:-translate-y-1 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-xl">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                {item.icon}
              </div>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">{item.date}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-500 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-slate-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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

        <div className="relative z-10 pt-4 pb-24">
          <TerminalHero />

          <div className="container mx-auto px-4 lg:px-8 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 relative">
              {/* Vertical Divider for Desktop */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2">
                <div className="absolute top-1/4 bottom-1/4 left-1/2 -translate-x-1/2 w-[2px] bg-blue-500/50 dark:bg-blue-400/50 blur-[2px]"></div>
              </div>

              {/* Investigation Logs Section */}
              <section className="lg:pr-4">
                <div className="flex items-center space-x-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Shield className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
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
                <div className="flex items-center space-x-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <Server className="w-5 h-5 text-blue-500 dark:text-blue-400" />
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
