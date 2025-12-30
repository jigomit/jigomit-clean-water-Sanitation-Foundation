<script setup>
import { useRoute, RouterLink } from 'vue-router'
import { getBlogPostBySlug } from '@/data/blog'
import { computed, watch, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const post = computed(() => getBlogPostBySlug(route.params.slug))

if (!post.value) {
  // Handle 404 - redirect to blog
  window.location.href = '/blog'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// SEO Meta Tags Management
const updateMetaTags = () => {
  if (!post.value) return

  // Update title
  document.title = `${post.value.title} | LifeSpring Water Foundation`

  // Update or create meta tags
  const updateMeta = (name, content, isProperty = false) => {
    const attr = isProperty ? 'property' : 'name'
    let meta = document.querySelector(`meta[${attr}="${name}"]`)
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute(attr, name)
      document.head.appendChild(meta)
    }
    meta.setAttribute('content', content)
  }

  updateMeta('description', post.value.excerpt)
  updateMeta('keywords', post.value.seoKeywords)
  updateMeta('og:title', post.value.title, true)
  updateMeta('og:description', post.value.excerpt, true)
  updateMeta('og:image', post.value.image, true)
  updateMeta('og:type', 'article', true)
  updateMeta('og:url', window.location.href, true)
  updateMeta('article:published_time', post.value.date)
  updateMeta('article:author', post.value.author)
  updateMeta('article:section', post.value.category)

  // Add structured data (JSON-LD)
  let script = document.querySelector('script[type="application/ld+json"][data-blog-post]')
  if (script) {
    script.remove()
  }
  
  script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-blog-post', 'true')
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.value.title,
    description: post.value.excerpt,
    image: post.value.image,
    datePublished: post.value.date,
    dateModified: post.value.date,
    author: {
      '@type': 'Organization',
      name: post.value.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'LifeSpring Water Foundation',
      logo: {
        '@type': 'ImageObject',
        url: window.location.origin + '/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': window.location.href
    },
    keywords: post.value.seoKeywords
  })
  document.head.appendChild(script)
}

onMounted(() => {
  updateMetaTags()
})

watch(() => route.params.slug, () => {
  updateMetaTags()
})
</script>

<template>
  <div v-if="post" class="blog-detail-view">
    <!-- Back Button -->
    <section class="blog-detail__nav">
      <div class="content-max">
        <RouterLink to="/blog" class="blog-detail__back">
          ← Back to Blog
        </RouterLink>
      </div>
    </section>

    <!-- Article Header -->
    <article class="blog-detail__article">
      <div class="content-max">
        <header class="blog-detail__header">
          <div class="blog-detail__meta">
            <span class="blog-detail__category">{{ post.category }}</span>
            <span class="blog-detail__date">{{ formatDate(post.date) }}</span>
            <span class="blog-detail__author">By {{ post.author }}</span>
          </div>
          <h1 class="blog-detail__title">{{ post.title }}</h1>
        </header>

        <!-- Featured Image -->
        <div class="blog-detail__image-wrapper">
          <img
            :src="post.image"
            :alt="post.title"
            class="blog-detail__image"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </div>

        <!-- Article Content -->
        <div class="blog-detail__content" v-html="post.content"></div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.blog-detail-view {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%);
  width: 100%;
}

.blog-detail__nav {
  padding: clamp(1.75rem, 3.5vw, 2.5rem) 0 clamp(1rem, 2vw, 1.5rem);
  background: #ffffff;
  border-bottom: 2px solid rgba(11, 178, 212, 0.1);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(15, 53, 88, 0.05);
}

.blog-detail__nav .content-max {
  width: 100%;
  max-width: min(1650px, 100% - clamp(1rem, 4vw, 6.5rem));
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;
}

.blog-detail__back {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  font-size: clamp(1rem, 2vw, 1.1rem);
  font-weight: 600;
  color: #0bb2d4;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  background: rgba(11, 178, 212, 0.08);
  border: 1px solid rgba(11, 178, 212, 0.2);
}

.blog-detail__back:hover {
  color: #0f76d6;
  background: rgba(11, 178, 212, 0.15);
  transform: translateX(-6px);
  border-color: rgba(11, 178, 212, 0.3);
}

.blog-detail__article {
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(4rem, 8vw, 6rem);
  width: 100%;
}

.blog-detail__article .content-max {
  width: 100%;
  max-width: min(1650px, 100% - clamp(1rem, 4vw, 6.5rem));
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;
}

.blog-detail__header {
  margin-bottom: clamp(3rem, 6vw, 4rem);
  max-width: 950px;
  margin-left: auto;
  margin-right: auto;
  padding: clamp(2rem, 4vw, 3rem);
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(15, 53, 88, 0.08);
  border: 1px solid rgba(11, 178, 212, 0.1);
}

.blog-detail__meta {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 1.5rem);
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.blog-detail__category {
  font-size: clamp(0.85rem, 1.6vw, 0.95rem);
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.6rem 1.25rem;
  background: linear-gradient(135deg, #0bb2d4 0%, #0f76d6 100%);
  border-radius: 10px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.3);
}

.blog-detail__date,
.blog-detail__author {
  font-size: clamp(0.95rem, 1.9vw, 1rem);
  color: rgba(15, 53, 88, 0.7);
  white-space: nowrap;
  font-weight: 500;
}

.blog-detail__title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  color: #0f3558;
  line-height: 1.2;
  margin: 0;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #0f3558 0%, #0bb2d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.blog-detail__image-wrapper {
  width: 100%;
  max-width: 100%;
  height: clamp(350px, 45vw, 600px);
  margin: 0 0 clamp(3rem, 6vw, 4rem);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 12px 48px rgba(15, 53, 88, 0.15),
    0 6px 24px rgba(15, 53, 88, 0.1);
  position: relative;
}

.blog-detail__image-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(15, 53, 88, 0.03) 100%);
  pointer-events: none;
  z-index: 1;
}

.blog-detail__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blog-detail__content {
  max-width: 900px;
  margin: 0 auto;
  font-size: clamp(1.05rem, 2.1vw, 1.2rem);
  line-height: 1.9;
  color: rgba(15, 53, 88, 0.9);
  width: 100%;
  background: #ffffff;
  padding: clamp(2.5rem, 5vw, 4rem);
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(15, 53, 88, 0.08);
  border: 1px solid rgba(11, 178, 212, 0.08);
}

.blog-detail__content :deep(h2) {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #0f3558;
  margin: clamp(3rem, 6vw, 4rem) 0 2rem;
  line-height: 1.3;
  letter-spacing: -0.015em;
  padding-top: 1.5rem;
  border-top: 3px solid rgba(11, 178, 212, 0.2);
  position: relative;
}

.blog-detail__content :deep(h2:first-of-type) {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.blog-detail__content :deep(h2::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #0bb2d4, #49d391);
  border-radius: 2px;
}

.blog-detail__content :deep(h3) {
  font-size: clamp(1.5rem, 3vw, 1.9rem);
  font-weight: 600;
  color: #0f3558;
  margin: clamp(2.5rem, 5vw, 3rem) 0 1.25rem;
  line-height: 1.4;
  position: relative;
  padding-left: 1.5rem;
}

.blog-detail__content :deep(h3::before) {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 4px;
  height: 1.2em;
  background: linear-gradient(180deg, #0bb2d4, #49d391);
  border-radius: 2px;
}

.blog-detail__content :deep(p) {
  margin: 0 0 2rem;
  line-height: 1.9;
  font-weight: 400;
}

.blog-detail__content :deep(ul),
.blog-detail__content :deep(ol) {
  margin: 0 0 2.5rem;
  padding-left: 2.5rem;
  background: rgba(11, 178, 212, 0.03);
  padding: 1.5rem 2rem 1.5rem 2.5rem;
  border-radius: 12px;
  border-left: 4px solid #0bb2d4;
}

.blog-detail__content :deep(li) {
  margin: 1rem 0;
  line-height: 1.85;
  padding-left: 0.5rem;
}

.blog-detail__content :deep(ul li) {
  list-style-type: disc;
}

.blog-detail__content :deep(ol li) {
  list-style-type: decimal;
}

.blog-detail__content :deep(strong) {
  font-weight: 600;
  color: #0f3558;
  background: linear-gradient(135deg, rgba(11, 178, 212, 0.1) 0%, rgba(73, 211, 145, 0.1) 100%);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
}

.blog-detail__content :deep(a) {
  color: #0bb2d4;
  text-decoration: none;
  border-bottom: 2px solid rgba(11, 178, 212, 0.3);
  transition: all 0.3s ease;
  font-weight: 600;
  padding: 0 0.2rem;
}

.blog-detail__content :deep(a:hover) {
  color: #0f76d6;
  border-bottom-color: #0f76d6;
  background: rgba(11, 178, 212, 0.1);
  border-radius: 4px;
}


/* Tablet */
@media (max-width: 1024px) {
  .blog-detail__content {
    font-size: 1.15rem;
    padding: 2.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .blog-detail__nav {
    padding: 1.5rem 0 1rem;
  }

  .blog-detail__back {
    padding: 0.65rem 1.25rem;
    font-size: 0.95rem;
  }

  .blog-detail__article {
    padding: 2.5rem 0 3.5rem;
  }

  .blog-detail__header {
    margin-bottom: 2.5rem;
    padding: 2rem;
    border-radius: 16px;
  }

  .blog-detail__meta {
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .blog-detail__image-wrapper {
    height: 320px;
    margin-bottom: 2.5rem;
    border-radius: 16px;
  }

  .blog-detail__content {
    font-size: 1.1rem;
    line-height: 1.8;
    padding: 2rem;
    border-radius: 16px;
  }

  .blog-detail__content :deep(h2) {
    margin: 2.5rem 0 1.5rem;
    font-size: 1.9rem;
  }

  .blog-detail__content :deep(h3) {
    margin: 2rem 0 1.25rem;
    font-size: 1.5rem;
    padding-left: 1.25rem;
  }

  .blog-detail__content :deep(ul),
  .blog-detail__content :deep(ol) {
    padding: 1.25rem 1.5rem 1.25rem 2rem;
    margin: 0 0 2rem;
  }

}

/* Small Mobile */
@media (max-width: 480px) {
  .blog-detail__nav .content-max,
  .blog-detail__article .content-max {
    padding: 0 1rem;
  }

  .blog-detail__header {
    padding: 1.5rem;
  }

  .blog-detail__image-wrapper {
    height: 280px;
    border-radius: 14px;
  }

  .blog-detail__content {
    font-size: 1.05rem;
    line-height: 1.75;
    padding: 1.75rem;
  }

  .blog-detail__content :deep(p) {
    margin: 0 0 1.75rem;
  }

  .blog-detail__content :deep(ul),
  .blog-detail__content :deep(ol) {
    padding: 1rem 1.25rem 1rem 1.75rem;
    margin: 0 0 1.75rem;
  }

  .blog-detail__content :deep(li) {
    margin: 0.875rem 0;
  }

}

/* Extra Small */
@media (max-width: 360px) {
  .blog-detail__image-wrapper {
    height: 240px;
  }

  .blog-detail__content {
    font-size: 1rem;
    padding: 1.5rem;
  }
}
</style>

