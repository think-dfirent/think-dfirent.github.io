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
              <h2 className="text-base font-mono text-gray-500 dark:text-gray-400 mb-4">~/roles/soc-dfir-enthusiast</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium italic border-l-4 border-gray-300 dark:border-[#333] pl-4 py-1">
                "Those who actually understand how things work remain DFIRent, even in the age of AI."
              </p>
            </div>

            {/* 2. Links (Monochrome Terminal Style) */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm items-center">
              <p className="text-gray-700 dark:text-gray-300 m-0 mr-2">
                Find me at:
              </p>
              {/* Thêm link Resume vào đây */}
              <Link to="https://linkedin.com/in/mynameiscuong" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline hover:no-underline transition-colors">
                [ LinkedIn ]
              </Link>
              <Link to="https://tryhackme.com/p/cuongasd52?tab=yearly-activity" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline hover:no-underline transition-colors">
                [ TryHackMe ]
              </Link>
              <Link to="https://cyberdefenders.org/p/cuongns/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:underline hover:no-underline transition-colors">
                [ CyberDefenders ]
              </Link>
            </div>

          </div>
        </div>
      </main>
    </Layout>
  );
}