import { onBeforeUnmount, onMounted } from 'vue'

export function useReveal() {
  let intersectionObserver
  let mutationObserver
  let reduceMotion = false

  const activate = (elements) => {
    elements.forEach((element) => element.classList.add('is-visible'))
  }

  const observeTargets = () => {
    const targets = document.querySelectorAll('[data-reveal]:not(.is-visible)')
    if (!targets.length) return
    if (reduceMotion || !intersectionObserver) {
      activate(targets)
      return
    }
    targets.forEach((element) => intersectionObserver.observe(element))
  }

  onMounted(() => {
    reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!reduceMotion) {
      intersectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible')
              intersectionObserver.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
      )
    }

    mutationObserver = new MutationObserver(() => {
      observeTargets()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    observeTargets()
  })

  onBeforeUnmount(() => {
    intersectionObserver?.disconnect()
    mutationObserver?.disconnect()
  })
}
