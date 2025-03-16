import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "FlexForm",
  description: "none",
  base: '/db_lab/',

  themeConfig: {
    nav: [
      { text: "Головна", link: "/" },
      { text: "Зміст", link: "/zmist" },
      { text: "Автори", link: "/autors" },
    ],

    sidebar: [
      { text: 'Головна', link: '/' },
      { text: 'Зміст', link: '/zmist' },
      { text: 'Аналіз предметної області', link: '/analysis' },
      { text: 'Призначення розроблюваної системи', link: '/appointment' },
      { text: 'Аналіз зацікавлених осіб для системи організації та управління опитуваннями експертів', link: '/interested_parties' },
      { text: 'Автори', link: '/autors' },
      { text: 'UseCase', link: '/useCase'},
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/varshavskiy05/db_lab.git' }
    ]
  }
})
