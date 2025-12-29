<script setup>
import { blogPosts } from '@/data/blog'
import { RouterLink } from 'vue-router'
import { computed, onMounted } from 'vue'

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const sortedPosts = computed(() => {
  return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
})

// SEO Meta Tags
onMounted(() => {
  document.title = 'Blog | LifeSpring Water Foundation'
  
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

  updateMeta('description', 'Read our blog for insights on clean water access, sanitation solutions, and hygiene education programs in East Africa.')
  updateMeta('keywords', 'clean water blog, sanitation solutions, WASH programs, water infrastructure, hygiene education, sustainable water access')
  updateMeta('og:title', 'Blog | LifeSpring Water Foundation', true)
  updateMeta('og:description', 'Insights, guides, and stories about sustainable water access, sanitation solutions, and hygiene education programs.', true)
  updateMeta('og:type', 'website', true)

  // Add structured data for Blog
  let script = document.querySelector('script[type="application/ld+json"][data-blog-page]')
  if (script) {
    script.remove()
  }
  
  script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-blog-page', 'true')
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'LifeSpring Water Foundation Blog',
    description: 'Insights, guides, and stories about sustainable water access, sanitation solutions, and hygiene education programs.',
    url: window.location.href,
    publisher: {
      '@type': 'Organization',
      name: 'LifeSpring Water Foundation',
      logo: {
        '@type': 'ImageObject',
        url: window.location.origin + '/logo.png'
      }
    }
  })
  document.head.appendChild(script)
})
</script>

<template>
  <div class="blog-view">
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="content-max">
        <h1 class="blog-hero__title">Blog</h1>
        <p class="blog-hero__subtitle">Clean Water & Sanitation Foundation</p>
        <p class="blog-hero__description">
          Insights, guides, and stories about sustainable water access, sanitation solutions, and hygiene education programs.
        </p>
      </div>
    </section>

    <!-- Blog Posts Grid -->
    <section class="blog-posts">
      <div class="content-max">
        <div class="blog-posts__grid">
          <article
            v-for="post in sortedPosts"
            :key="post.id"
            class="blog-card"
          >
            <RouterLink :to="`/blog/${post.slug}`" class="blog-card__link">
              <div class="blog-card__image-wrapper">
                <img
                  :src="post.image"
                  :alt="post.title"
                  class="blog-card__image"
                  loading="lazy"
                />
              </div>
              <div class="blog-card__content">
                <div class="blog-card__meta">
                  <span class="blog-card__category">{{ post.category }}</span>
                  <span class="blog-card__date">{{ formatDate(post.date) }}</span>
                </div>
                <h2 class="blog-card__title">{{ post.title }}</h2>
                <p class="blog-card__excerpt">{{ post.excerpt }}</p>
                <span class="blog-card__read-more">Read More →</span>
              </div>
            </RouterLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.blog-view {
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f8fafc 100%);
  width: 100%;
  position: relative;
  display: block;
}

.blog-hero {
  padding: clamp(4rem, 8vw, 6rem) 0 clamp(3rem, 6vw, 5rem);
  background: linear-gradient(135deg, #0f3558 0%, #0a2540 50%, #0f3558 100%);
  position: relative;
  overflow: hidden;
  width: 100%;
}

.blog-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 50%, rgba(11, 178, 212, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(73, 211, 145, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.blog-hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.02) 10px, rgba(255, 255, 255, 0.02) 20px);
  pointer-events: none;
}

.blog-hero .content-max {
  width: 100%;
  max-width: min(1650px, 100% - clamp(1rem, 4vw, 6.5rem));
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.blog-hero__title {
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 0.75rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.blog-hero__subtitle {
  font-size: clamp(1.35rem, 3vw, 2rem);
  font-weight: 600;
  color: #0bb2d4;
  margin: 0 0 1.25rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.blog-hero__description {
  font-size: clamp(1.1rem, 2.2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.75;
  max-width: 800px;
  margin: 0;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.blog-posts {
  padding: clamp(4rem, 8vw, 6rem) 0;
  width: 100%;
  position: relative;
}

.blog-posts::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(11, 178, 212, 0.3), transparent);
}

.blog-posts .content-max {
  width: 100%;
  max-width: min(1650px, 100% - clamp(1rem, 4vw, 6.5rem));
  margin: 0 auto;
  padding: 0 clamp(1rem, 4vw, 2rem);
  box-sizing: border-box;
}

.blog-posts__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 380px), 1fr));
  gap: clamp(2rem, 4vw, 3rem);
  width: 100%;
}

.blog-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    0 4px 20px rgba(15, 53, 88, 0.08),
    0 8px 40px rgba(15, 53, 88, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(15, 53, 88, 0.06);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.blog-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #0bb2d4, #49d391, #0bb2d4);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.blog-card:hover::before {
  opacity: 1;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.blog-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 
    0 12px 48px rgba(11, 178, 212, 0.15),
    0 20px 60px rgba(15, 53, 88, 0.1);
  border-color: rgba(11, 178, 212, 0.3);
}

.blog-card__link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.blog-card__image-wrapper {
  width: 100%;
  height: clamp(220px, 28vw, 280px);
  overflow: hidden;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%);
  position: relative;
}

.blog-card__image-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(15, 53, 88, 0.05) 100%);
  pointer-events: none;
  transition: opacity 0.4s ease;
}

.blog-card:hover .blog-card__image-wrapper::after {
  opacity: 0;
}

.blog-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-card:hover .blog-card__image {
  transform: scale(1.12);
}

.blog-card__content {
  padding: clamp(1.5rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #ffffff;
}

.blog-card__meta {
  display: flex;
  align-items: center;
  gap: clamp(0.75rem, 1.5vw, 1rem);
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}

.blog-card__category {
  font-size: clamp(0.75rem, 1.5vw, 0.85rem);
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #0bb2d4 0%, #0f76d6 100%);
  border-radius: 8px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(11, 178, 212, 0.3);
}

.blog-card__date {
  font-size: clamp(0.85rem, 1.5vw, 0.9rem);
  color: rgba(15, 53, 88, 0.6);
  white-space: nowrap;
  font-weight: 500;
}

.blog-card__title {
  font-size: clamp(1.35rem, 2.8vw, 1.65rem);
  font-weight: 700;
  color: #0f3558;
  margin: 0 0 1.25rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.015em;
  transition: color 0.3s ease;
}

.blog-card:hover .blog-card__title {
  color: #0bb2d4;
}

.blog-card__excerpt {
  font-size: clamp(0.95rem, 1.9vw, 1.05rem);
  color: rgba(15, 53, 88, 0.75);
  line-height: 1.7;
  margin: 0 0 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.blog-card__read-more {
  font-size: clamp(0.95rem, 1.9vw, 1rem);
  font-weight: 600;
  color: #0bb2d4;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  margin-top: auto;
  padding-top: 0.5rem;
}

.blog-card__read-more::after {
  content: '→';
  font-size: 1.2em;
  transition: transform 0.3s ease;
}

.blog-card:hover .blog-card__read-more {
  color: #0f76d6;
  transform: translateX(6px);
}

.blog-card:hover .blog-card__read-more::after {
  transform: translateX(4px);
}

/* Tablet */
@media (max-width: 1024px) {
  .blog-posts__grid {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
    gap: 2.5rem;
  }
}

/* Mobile */
@media (max-width: 768px) {
  .blog-hero {
    padding: 3.5rem 0 2.5rem;
  }

  .blog-posts {
    padding: 3.5rem 0;
  }

  .blog-posts__grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .blog-card {
    border-radius: 16px;
  }

  .blog-card__image-wrapper {
    height: 240px;
  }

  .blog-card__content {
    padding: 1.75rem;
  }
}

/* Small Mobile */
@media (max-width: 480px) {
  .blog-hero {
    padding: 3rem 0 2rem;
  }

  .blog-hero .content-max,
  .blog-posts .content-max {
    padding: 0 1rem;
  }

  .blog-posts {
    padding: 3rem 0;
  }

  .blog-posts__grid {
    gap: 2rem;
  }

  .blog-card__image-wrapper {
    height: 220px;
  }

  .blog-card__content {
    padding: 1.5rem;
  }

  .blog-card__meta {
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .blog-card__category {
    padding: 0.4rem 0.85rem;
    font-size: 0.75rem;
  }
}

/* Extra Small */
@media (max-width: 360px) {
  .blog-card__image-wrapper {
    height: 200px;
  }

  .blog-card__content {
    padding: 1.25rem;
  }
}
</style>

