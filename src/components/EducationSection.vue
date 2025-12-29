<script setup>
import { educationFocus } from '@/data/content'
</script>

<template>
  <section id="education" class="screen screen--education" aria-labelledby="education-heading">
    <div class="content-max">
      <div class="content-section content-section--alt">
        <div class="section-heading" data-reveal>
          <p class="eyebrow">Hygiene education</p>
          <h2 id="education-heading">Learning that sticks for every age group</h2>
          <p>
            Coaches co-design lessons with schools and mothers circles, turning daily hygiene into celebrated rituals.
            We track adoption through on-site surveys, SMS nudges, and classroom audits.
          </p>
        </div>
        <div class="timeline">
          <article v-for="topic in educationFocus" :key="topic.title" class="timeline__item" data-reveal>
            <div class="timeline__stat">{{ topic.stat }}</div>
            <div>
              <h3>{{ topic.title }}</h3>
              <p>{{ topic.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>
