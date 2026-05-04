// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Think DFIRent',
  tagline: 'Cyber Security & DFIR',
  favicon: 'img/myfavicon.png',

  url: 'https://think-dfirent.github.io',
  baseUrl: '/',
  organizationName: 'think-dfirent',
  projectName: 'think-dfirent.github.io',
  
  plugins: [
    './src/plugins/tailwind-plugin',
    'docusaurus-plugin-image-zoom'
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      zoom: {
        selector: '.markdown :not(em) > img',
        background: {
          light: 'rgba(255, 255, 255, 0.9)',
          dark: 'rgba(20, 20, 20, 0.9)',
        },
      },
      navbar: {
        title: 'Think DFIRent',
        logo: {
          src: 'img/myfavicon.png',
        },
        items: [
          {
            to: '/docs/writeups/Disk-forensics/LockBit',
            label: 'Investigation Write-ups',
            position: 'right',
          },
          {
            to: '/docs/homelab/architecture-design',
            label: 'Homelab',
            position: 'right',
          },
          {
            to: '/about',
            label: 'About',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Think DFIRent. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
    }),
};

export default config;