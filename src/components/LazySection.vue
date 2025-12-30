<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  /**
   * HTML tag to render for the wrapper element.
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * IntersectionObserver root margin to control when hydration kicks in.
   */
  rootMargin: {
    type: String,
    default: '0px 0px 200px 0px',
  },
  /**
   * Ensures layout stability while waiting for the slot to hydrate.
   */
  minHeight: {
    type: [Number, String],
    default: null,
  },
  /**
    * Render content immediately without waiting for the observer.
    */
  eager: {
    type: Boolean,
    default: false,
  },
})

const wrapperRef = ref(null)
const isVisible = ref(false)
let observer = null

const wrapperStyle = computed(() => {
  if (props.minHeight === null || props.minHeight === undefined || props.minHeight === '') {
    return undefined
  }
  const minHeightValue = typeof props.minHeight === 'number' ? `${props.minHeight}px` : props.minHeight
  return { minHeight: minHeightValue }
})

const reveal = () => {
  if (isVisible.value) return
  isVisible.value = true
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

onMounted(() => {
  if (props.eager || typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    reveal()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          reveal()
        }
      })
    },
    {
      rootMargin: props.rootMargin,
      threshold: 0.1,
    }
  )

  if (wrapperRef.value) {
    observer.observe(wrapperRef.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <component
    :is="tag"
    ref="wrapperRef"
    :style="wrapperStyle"
    :aria-busy="!isVisible"
  >
    <slot v-if="isVisible" />
    <div v-else class="lazy-section__placeholder" aria-hidden="true"></div>
  </component>
</template>

<style scoped>
.lazy-section__placeholder {
  width: 100%;
  height: 100%;
}
</style>
