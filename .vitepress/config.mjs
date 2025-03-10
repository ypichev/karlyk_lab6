import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FlexForm",
  description: "none",
  base: '/repo/',
  outDir: '.vitepress/dist',

  themeConfig: {
    nav: [
      { text: "Головна", link: "/" },
      { text: "Зміст", link: "/repo/zmist" },
      { text: "Автори", link: "/repo/autors" },
    ],

    sidebar: [
      { text: 'Головна', link: '/' },
      { text: 'Зміст', link: '/repo/zmist' },
      { text: 'Аналіз предметної області', link: '/repo/analysis' },
      { text: 'Призначення розроблюваної системи', link: '/repo/appointment' },
      { text: 'Аналіз зацікавлених осіб для системи організації та управління опитуваннями експертів', link: '/repo/interested_parties' },
      { text: 'Автори', link: '/repo/autors' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/varshavskiy05/db_lab1.git' }
    ]
  }
})
