const routePrefetchers = {
  about: () => import('@/views/AboutView.vue'),
  projects: () => import('@/views/ProjectsView.vue'),
  education: () => import('@/views/EducationView.vue'),
  sanitation: () => import('@/views/SanitationView.vue'),
  impact: () => import('@/views/ImpactView.vue'),
  gallery: () => import('@/views/GalleryView.vue'),
  donate: () => import('@/views/DonateView.vue'),
  blog: () => import('@/views/BlogView.vue'),
  'blog-detail': () => import('@/views/BlogDetailView.vue'),
}

const prefetchedRoutes = new Set()

const getConnection = () => {
  if (typeof navigator === 'undefined') return null
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection
}

const hasDataSaver = () => {
  const connection = getConnection()
  if (!connection) return false
  if (connection.saveData) return true
  const effectiveType = connection.effectiveType || ''
  return effectiveType.includes('2g')
}

const scheduleImport = (importFn, routeName) => {
  const run = () =>
    importFn().catch(() => {
      prefetchedRoutes.delete(routeName)
    })

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(run, { timeout: 2000 })
  } else {
    window.setTimeout(run, 200)
  }
}

export function useRoutePrefetch() {
  const prefetchRoute = (routeName) => {
    if (typeof window === 'undefined') return
    if (!routeName || prefetchedRoutes.has(routeName)) return
    if (hasDataSaver()) return
    const importer = routePrefetchers[routeName]
    if (!importer) return
    prefetchedRoutes.add(routeName)
    scheduleImport(importer, routeName)
  }

  const prefetchRoutes = (routeNames = []) => {
    routeNames.forEach(prefetchRoute)
  }

  return {
    prefetchRoute,
    prefetchRoutes,
  }
}
