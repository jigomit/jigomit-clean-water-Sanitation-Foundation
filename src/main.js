import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Load CSS - Vite handles code splitting automatically
// CSS is loaded asynchronously in production builds
import './style.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
