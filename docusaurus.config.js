// @ts-check
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

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
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: ['./src/css/custom.css', './css/docu-notion-styles.css'],
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV',
      crossorigin: 'anonymous',
    },
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
            to: '/docs/writeups',
            label: 'Write-ups',
            position: 'left',
          },
          {
            to: '/docs/homelab',
            label: 'Homelab',
            position: 'left',
          },
          {
            to: '/docs/cheatsheets',
            label: 'Cheat sheets',
            position: 'left',
          },
          {
            to: '/docs/others',
            label: 'Others',
            position: 'left',
          },
          {
            to: '/about',
            label: 'About',
            position: 'left',
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

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
        language: ["en"],
        searchBarShortcut: false,
      },
    ],
  ],
};

export default config;