<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  size: {
    type: String,
    default: 'md', // sm, md, lg, xl
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value),
  },
  stacked: {
    type: Boolean,
    default: false,
  },
  inverted: {
    type: Boolean,
    default: false,
  },
})

const logoSrc = '/logo.png'
</script>

<template>
  <RouterLink
    to="/"
    class="site-logo"
    :class="[`site-logo--${props.size}`, { 'site-logo--stacked': props.stacked, 'site-logo--inverted': props.inverted }]"
    aria-label="LifeSpring Water Foundation home"
  >
    <span class="site-logo__badge" role="img" aria-label="Water droplet logo icon">
      <img 
        :src="logoSrc" 
        alt="LifeSpring Water Foundation Logo - Water droplet with green leaves" 
        decoding="async"
        loading="eager"
        fetchpriority="high"
      />
    </span>
    <span class="site-logo__text">
      <span class="site-logo__eyebrow">LifeSpring</span>
      <span class="site-logo__name">Water Foundation</span>
    </span>
  </RouterLink>
</template>

<style scoped>
.site-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  min-width: 0;
}

.site-logo__badge {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  border-radius: 10px;
  overflow: visible;
  background: transparent;
  z-index: 1;
}

.site-logo__badge img {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center center;
  display: block;
  margin: 0;
  padding: 0;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  image-rendering: auto;
  transition: transform 0.3s ease;
  vertical-align: middle;
}

.site-logo:hover .site-logo__badge img {
  transform: scale(1.05);
}

.site-logo__text {
  display: inline-flex;
  flex-direction: column;
  gap: 0.1rem;
}

.site-logo__eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.72rem;
  font-weight: 600;
  color: #0bb2d4;
  transition: color 0.3s ease;
}

.site-logo__name {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #0f3558;
  line-height: 1.2;
}

.site-logo--sm .site-logo__badge {
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 8px;
}

.site-logo--sm .site-logo__badge img {
  width: 40px;
  height: 40px;
}

.site-logo--md .site-logo__badge {
  width: 56px;
  height: 56px;
  min-width: 56px;
  min-height: 56px;
  border-radius: 10px;
}

.site-logo--md .site-logo__badge img {
  width: 56px;
  height: 56px;
}

.site-logo--lg .site-logo__badge {
  width: 72px;
  height: 72px;
  min-width: 72px;
  min-height: 72px;
  border-radius: 12px;
}

.site-logo--lg .site-logo__badge img {
  width: 72px;
  height: 72px;
}

.site-logo--xl .site-logo__badge {
  width: 100px;
  height: 100px;
  min-width: 100px;
  min-height: 100px;
  border-radius: 14px;
}

.site-logo--xl .site-logo__badge img {
  width: 100px;
  height: 100px;
}

.site-logo--xl .site-logo__eyebrow {
  font-size: 0.9rem;
}

.site-logo--xl .site-logo__name {
  font-size: 1.8rem;
}

.site-logo--inverted .site-logo__eyebrow {
  color: #0bb2d4;
}

.site-logo--inverted .site-logo__name {
  color: #ffffff;
}

.site-logo--stacked {
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.site-logo--stacked .site-logo__text {
  align-items: flex-start;
}

@media (max-width: 768px) {
  .site-logo {
    gap: 0.6rem;
  }

  .site-logo__badge {
    width: 52px;
    height: 52px;
    min-width: 52px;
    min-height: 52px;
  }

  .site-logo__name {
    font-size: 1rem;
  }

  .site-logo--xl .site-logo__badge {
    width: 80px;
    height: 80px;
    min-width: 80px;
    min-height: 80px;
  }
}

@media (max-width: 480px) {
  .site-logo {
    gap: 0.45rem;
  }

  .site-logo__badge {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }

  .site-logo__name {
    font-size: 0.9rem;
  }

  .site-logo--xl .site-logo__badge {
    width: 70px;
    height: 70px;
    min-width: 70px;
    min-height: 70px;
  }

  .site-logo--stacked {
    gap: 0.75rem;
  }
}
</style>
