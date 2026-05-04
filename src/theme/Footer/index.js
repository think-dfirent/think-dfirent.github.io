import React from 'react';

const GithubIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function FooterWrapper() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0a0a0a] py-10 relative z-20 transition-colors duration-300">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm mb-1">
            © {new Date().getFullYear()} Think DFIRent.
          </p>
          <span className="text-slate-400 dark:text-slate-600 font-mono text-xs flex items-center">
            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
            All systems operational.
          </span>
        </div>
        <div className="flex space-x-6">
          <a href="https://github.com/think-dfirent" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" aria-label="GitHub">
            <GithubIcon className="w-[22px] h-[22px]" />
          </a>
          <a href="https://linkedin.com/in/mynameiscuong" target="_blank" rel="noopener noreferrer" className="text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors" aria-label="LinkedIn">
            <LinkedinIcon className="w-[22px] h-[22px]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
