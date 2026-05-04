import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function About() {
  return (
    <Layout title="About - Nguyen Sy Cuong">
      <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] pt-16 pb-12 px-4 transition-colors duration-300">
        <div className="container mx-auto max-w-3xl">
          <div className="glass-panel p-8 md:p-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
            
            {/* 1. Header & Summary */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Nguyen Sy Cuong</h1>
              <h2 className="text-base font-mono text-slate-500 dark:text-slate-400 mb-4">~/roles/soc-dfir-enthusiast</h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic border-l-4 border-slate-300 dark:border-slate-700 pl-4 py-1">
                "Those who actually understand how things work remain DFIRent, even in the age of AI."
              </p>
            </div>

            {/* 2. Links (Monochrome Terminal Style) */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm items-center">
              <p className="text-slate-700 dark:text-slate-300 m-0 mr-2">
                Find me at:
              </p>
              {/* Thêm link Resume vào đây */}
              <Link to="https://linkedin.com/in/mynameiscuong" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:underline hover:no-underline transition-colors">
                [ LinkedIn ]
              </Link>
              <Link to="https://tryhackme.com/p/cuongasd52?tab=yearly-activity" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:underline hover:no-underline transition-colors">
                [ TryHackMe ]
              </Link>
              <Link to="https://cyberdefenders.org/p/cuongns/" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:underline hover:no-underline transition-colors">
                [ CyberDefenders ]
              </Link>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}