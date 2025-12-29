<script setup>
import { sanitationTracks } from '@/data/content'
</script>

<template>
  <section id="sanitation" class="screen screen--sanitation" aria-labelledby="sanitation-heading">
    <div class="content-max">
      <div class="content-section">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">Village sanitation development</p>
          <h2 id="sanitation-heading">Safe sanitation loops protect soil and waterways</h2>
          <p>
            Resilient sanitation plans eliminate open defecation, introduce circular waste solutions, and stabilize
            stormwater. We align each upgrade to WHO sanitation safety plans and community aspirations.
          </p>
        </div>
        <div class="list-cards">
          <article v-for="track in sanitationTracks" :key="track.title" class="list-card" data-reveal>
            <h3>{{ track.title }}</h3>
            <p>{{ track.description }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
