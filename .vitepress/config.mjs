import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FlexForm",
  description: "none",
  base: '/repo/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Головна", link: "/" },
      { text: "Зміст", link: "/zmist" },
      { text: "Автори", link: "/autors" },
    ],

    sidebar: [
      { text: 'Головна', link: '/' },
      { text: 'Зміст', link: '/zmist' },
      { text: 'Аналіз предметної області', link: '/analysis.md' },
      { text: 'Призначення розроблюваної системи', link: '/appointment' },
      { text: 'Аналіз зацікавлених осіб для системи організації та управління опитуваннями експертів', link: '/interested_parties.md' },
      { text: 'Автори', link: '/autors' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
