<script setup>
import SiteFooter from '@/components/SiteFooter.vue'
import SiteLogo from '@/components/SiteLogo.vue'
import { useReveal } from '@/composables/useReveal'
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Hygiene', to: '/education' },
  { label: 'Sanitation', to: '/sanitation' },
  { label: 'Impact', to: '/impact' },
  { label: 'Gallery', to: '/gallery' },
]

const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
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
          <RouterLink v-for="link in navLinks" :key="link.to" class="site-nav__link" :to="link.to" :aria-label="`Navigate to ${link.label} page`">
            {{ link.label }}
          </RouterLink>
          <RouterLink class="btn btn--small" to="/donate" aria-label="Navigate to donation page">
            <span>Donate</span>
          </RouterLink>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          class="mobile-menu-toggle"
          :class="{ 'mobile-menu-toggle--active': mobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle mobile menu"
          aria-expanded="mobileMenuOpen"
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
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink
            class="btn-modern btn-modern--primary mobile-nav__donate"
            to="/donate"
            aria-label="Navigate to donation page"
            @click="closeMobileMenu"
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
