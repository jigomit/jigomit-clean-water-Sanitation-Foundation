<script setup>
import { projectHighlights } from '@/data/content'
</script>

<template>
  <section id="projects" class="screen screen--projects" aria-labelledby="projects-heading">
    <div class="content-max">
      <div class="content-section">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">Wells &amp; filtration portfolio</p>
          <h2 id="projects-heading">High-performance systems for remote villages</h2>
          <p>
            Drawing from World Bank and WaterAid playbooks, each build combines resilient engineering with community
            governance—ensuring uptime, clean monitoring data, and the confidence to manage local repairs.
          </p>
        </div>
        <div class="card-grid">
          <article v-for="project in projectHighlights" :key="project.title" class="info-card" data-reveal>
            <span class="info-card__icon" :data-icon="project.icon" aria-hidden="true"></span>
            <div>
              <h3>{{ project.title }}</h3>
              <p>{{ project.description }}</p>
            </div>
            <p class="badge">{{ project.stat }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
