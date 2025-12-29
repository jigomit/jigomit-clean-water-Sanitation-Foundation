import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/views/HomeView.vue') },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') },
  { path: '/projects', name: 'projects', component: () => import('@/views/ProjectsView.vue') },
  { path: '/education', name: 'education', component: () => import('@/views/EducationView.vue') },
  { path: '/sanitation', name: 'sanitation', component: () => import('@/views/SanitationView.vue') },
  { path: '/impact', name: 'impact', component: () => import('@/views/ImpactView.vue') },
  { path: '/gallery', name: 'gallery', component: () => import('@/views/GalleryView.vue') },
  { path: '/donate', name: 'donate', component: () => import('@/views/DonateView.vue') },
  { path: '/blog', name: 'blog', component: () => import('@/views/BlogView.vue') },
  { path: '/blog/:slug', name: 'blog-detail', component: () => import('@/views/BlogDetailView.vue') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
