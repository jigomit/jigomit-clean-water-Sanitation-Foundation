<script setup>
import ProjectsSection from '@/components/ProjectsSection.vue'
import { wellTypes, filtrationTechnology, communityStories } from '@/data/content'
</script>

<template>
  <div class="view-stack">
    <ProjectsSection />

    <!-- Well Types Section -->
    <section class="screen screen--well-types" aria-labelledby="well-types-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Well construction methods</p>
            <h2 id="well-types-heading">Engineered solutions for every hydrogeology</h2>
            <p>
              We select well types based on aquifer depth, water table stability, community size, and local geology.
              Each installation includes quality testing, community training, and long-term maintenance planning.
            </p>
          </div>
          <div class="well-types-grid">
            <article v-for="well in wellTypes" :key="well.title" class="well-type-card" data-reveal>
              <div class="well-type-card__header">
                <h3>{{ well.title }}</h3>
                <div class="well-type-card__meta">
                  <span class="badge badge--cost">{{ well.cost }}</span>
                  <span class="badge badge--lifespan">{{ well.lifespan }}</span>
                </div>
              </div>
              <p class="well-type-card__description">{{ well.description }}</p>
              <ul class="well-type-card__features">
                <li v-for="feature in well.features" :key="feature">{{ feature }}</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Filtration Technology Section -->
    <section class="screen screen--filtration" aria-labelledby="filtration-heading">
      <div class="content-max">
        <div class="content-section content-section--alt">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Water treatment systems</p>
            <h2 id="filtration-heading">WHO-compliant filtration for safe drinking water</h2>
            <p>
              Multi-barrier filtration removes sediment, bacteria, viruses, and chemical contaminants to deliver
              water that meets or exceeds World Health Organization drinking water standards.
            </p>
          </div>
          <div class="filtration-grid">
            <article v-for="tech in filtrationTechnology" :key="tech.title" class="filtration-card" data-reveal>
              <h3>{{ tech.title }}</h3>
              <p class="filtration-card__description">{{ tech.description }}</p>
              <div class="filtration-card__stages">
                <h4>Process Stages:</h4>
                <ol>
                  <li v-for="stage in tech.stages" :key="stage">{{ stage }}</li>
                </ol>
              </div>
              <div class="filtration-card__specs">
                <div class="spec-item">
                  <strong>Flow Rate:</strong>
                  <span>{{ tech.flowRate }}</span>
                </div>
                <div class="spec-item">
                  <strong>Maintenance:</strong>
                  <span>{{ tech.maintenance }}</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Solar Infrastructure Section -->
    <section class="screen screen--solar" aria-labelledby="solar-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="content-section--split">
            <div class="section-text" data-reveal>
              <p class="eyebrow">Solar pumping systems</p>
              <h2 id="solar-heading">Clean energy for sustainable water access</h2>
              <p>
                Our solar pump installations eliminate diesel dependency, reduce operating costs to near zero,
                and avoid 48 tons of CO₂ emissions annually across 87 installations.
              </p>
              <ul class="checklist">
                <li>High-efficiency photovoltaic panels (300-600W per well)</li>
                <li>Submersible DC pumps with variable frequency drives</li>
                <li>Battery backup for cloudy days (2-3 day capacity)</li>
                <li>Remote monitoring with real-time performance alerts</li>
                <li>20+ year lifespan with minimal maintenance</li>
              </ul>
            </div>
            <div class="section-card" data-reveal>
              <h3>Solar Impact by the Numbers</h3>
              <dl class="stats-pair">
                <div>
                  <dt>Solar pumps installed</dt>
                  <dd>87</dd>
                </div>
                <div>
                  <dt>CO₂ emissions avoided</dt>
                  <dd>48 tons/year</dd>
                </div>
                <div>
                  <dt>Operating cost reduction</dt>
                  <dd>95%</dd>
                </div>
                <div>
                  <dt>System uptime</dt>
                  <dd>99.2%</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Success Stories -->
    <section class="screen screen--stories" aria-labelledby="stories-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Community impact stories</p>
            <h2 id="stories-heading">Real communities, measurable transformation</h2>
            <p>
              Every project we complete creates ripple effects—improved health, increased school attendance,
              new economic opportunities, and restored dignity for entire communities.
            </p>
          </div>
          <div class="stories-grid">
            <article v-for="story in communityStories" :key="story.community" class="story-card" data-reveal>
              <div class="story-card__header">
                <h3>{{ story.community }}</h3>
                <div class="story-card__meta">
                  <span class="badge">{{ story.population.toLocaleString() }} people</span>
                  <span class="badge">{{ story.year }}</span>
                </div>
              </div>
              <div class="story-card__challenge">
                <h4>The Challenge</h4>
                <p>{{ story.challenge }}</p>
              </div>
              <div class="story-card__solution">
                <h4>Our Solution</h4>
                <p>{{ story.solution }}</p>
              </div>
              <div class="story-card__results">
                <h4>Results</h4>
                <ul>
                  <li v-for="result in story.results" :key="result">{{ result }}</li>
                </ul>
              </div>
              <blockquote class="story-card__quote">
                {{ story.quote }}
              </blockquote>
            </article>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
