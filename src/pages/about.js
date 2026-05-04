import React from 'react';
import Layout from '@theme/Layout';

export default function About() {
  return (
    <Layout title="About">
      <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] pt-20 pb-12 px-4 transition-colors duration-300">
        <div className="container mx-auto max-w-3xl">
          <div className="glass-panel p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            <h1 className="text-3xl font-mono text-emerald-600 dark:text-emerald-400 mb-6">whoami</h1>
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
              <p className="text-lg">
                I am a Digital Forensics and Incident Response (DFIR) Analyst specializing in advanced threat hunting, malware analysis, and enterprise security architecture.
              </p>
              <p>
                This portfolio serves as a technical log of my ongoing research, architectural implementations, and active investigations in the field of cybersecurity.
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
