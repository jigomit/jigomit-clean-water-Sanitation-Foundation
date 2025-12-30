<script setup>
import { galleryImages } from '@/data/gallery'
</script>

<template>
  <section id="gallery" class="screen screen--gallery" aria-labelledby="gallery-heading">
    <div class="content-max">
      <div class="content-section">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">Image gallery</p>
          <h2 id="gallery-heading">Local teams, locally imagined</h2>
          <p>All visuals are crafted in-house to illustrate real field work without slowing the site with heavy media.</p>
        </div>
        <div class="gallery-grid">
          <figure v-for="(image, index) in galleryImages" :key="image.caption" class="gallery-tile" data-reveal>
            <div class="gallery-media">
              <img 
                :src="image.src" 
                :alt="image.alt" 
                loading="lazy" 
                decoding="async" 
                :fetchpriority="index < 2 ? 'high' : 'low'"
                width="800"
                height="600"
                style="aspect-ratio: 4/3;"
              />
            </div>
            <figcaption class="gallery-caption">
              <p class="gallery-caption__title">{{ image.caption }}</p>
              <p class="gallery-caption__meta">{{ image.meta || image.alt }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
