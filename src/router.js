import { createRouter, createWebHashHistory } from 'vue-router'
import Article from '@/ArticlePage.vue'
import Home from '@/HomePage.vue'
import Contact from '@/ContactPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: Article,
    props: true,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
