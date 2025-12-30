<script setup>
import SiteFooter from '@/components/SiteFooter.vue'
import SiteLogo from '@/components/SiteLogo.vue'
import { useReveal } from '@/composables/useReveal'
import { useRoutePrefetch } from '@/composables/useRoutePrefetch'
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const navLinks = [
  { label: 'Home', to: '/', name: 'home' },
  { label: 'About', to: '/about', name: 'about' },
  { label: 'Projects', to: '/projects', name: 'projects' },
  { label: 'Hygiene', to: '/education', name: 'education' },
  { label: 'Sanitation', to: '/sanitation', name: 'sanitation' },
  { label: 'Impact', to: '/impact', name: 'impact' },
  { label: 'Gallery', to: '/gallery', name: 'gallery' },
]

const mobileMenuOpen = ref(false)
const { prefetchRoute } = useRoutePrefetch()

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleRoutePrefetch = (routeName) => {
  prefetchRoute(routeName)
}

useReveal()
</script>

<template>
  <div class="app-shell">
    <a class="skip-link" href="#main-content">Skip to main content</a>

    <!-- Header -->
    <header class="site-header">
      <div class="content-max site-header__inner">
        <SiteLogo size="lg" />

        <!-- Desktop Navigation -->
        <nav class="site-nav site-nav--desktop" aria-label="Primary navigation">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            class="site-nav__link"
            :to="link.to"
            :aria-label="`Navigate to ${link.label} page`"
            @mouseenter="handleRoutePrefetch(link.name)"
            @focus="handleRoutePrefetch(link.name)"
            @touchstart.passive="handleRoutePrefetch(link.name)"
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink
            class="btn btn--small"
            to="/donate"
            aria-label="Navigate to donation page"
            @mouseenter="handleRoutePrefetch('donate')"
            @focus="handleRoutePrefetch('donate')"
            @touchstart.passive="handleRoutePrefetch('donate')"
          >
            <span>Donate</span>
          </RouterLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          type="button"
          class="mobile-menu-toggle"
          :class="{ 'mobile-menu-toggle--active': mobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle mobile menu"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-navigation"
        >
          <span class="mobile-menu-toggle__line"></span>
          <span class="mobile-menu-toggle__line"></span>
          <span class="mobile-menu-toggle__line"></span>
        </button>
      </div>
    </header>

    <!-- Mobile Navigation Drawer -->
    <Transition name="mobile-menu">
      <nav
        v-if="mobileMenuOpen"
        class="mobile-nav"
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        <div class="mobile-nav__content">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            class="mobile-nav__link"
            :to="link.to"
            :aria-label="`Navigate to ${link.label} page`"
            @click="closeMobileMenu"
            @mouseenter="handleRoutePrefetch(link.name)"
            @focus="handleRoutePrefetch(link.name)"
            @touchstart.passive="handleRoutePrefetch(link.name)"
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink
            class="btn-modern btn-modern--primary mobile-nav__donate"
            to="/donate"
            aria-label="Navigate to donation page"
            @click="closeMobileMenu"
            @mouseenter="handleRoutePrefetch('donate')"
            @focus="handleRoutePrefetch('donate')"
            @touchstart.passive="handleRoutePrefetch('donate')"
          >
            <span>Donate</span>
          </RouterLink>
        </div>
      </nav>
    </Transition>

    <!-- Mobile Menu Backdrop -->
    <Transition name="backdrop">
      <div
        v-if="mobileMenuOpen"
        class="mobile-menu-backdrop"
        @click="closeMobileMenu"
        aria-hidden="true"
      ></div>
    </Transition>

    <!-- Main Content -->
    <main id="main-content" class="route-shell">
      <RouterView v-slot="{ Component }">
        <Transition name="route" mode="out-in">
          <component :is="Component" class="route-view" />
        </Transition>
      </RouterView>
    </main>

    <SiteFooter />
  </div>
</template>
