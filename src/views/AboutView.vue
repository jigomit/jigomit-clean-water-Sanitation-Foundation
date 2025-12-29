<script setup>
import AboutSection from '@/components/AboutSection.vue'
import { teamMembers, milestones, footerData } from '@/data/content'
</script>

<template>
  <div class="view-stack">
    <AboutSection />

    <!-- Mission & Vision Section -->
    <section class="screen screen--mission" aria-labelledby="mission-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="mission-vision-grid">
            <div class="mission-card" data-reveal>
              <p class="eyebrow">Our Mission</p>
              <h2 id="mission-heading">{{ footerData.organization.mission }}</h2>
              <p class="lead-text">
                We deliver sustainable water infrastructure, hygiene education, and sanitation solutions across East Africa.
                Every project is built with community ownership, technical excellence, and long-term resilience at its core.
              </p>
            </div>
            <div class="vision-card" data-reveal>
              <p class="eyebrow">Our Vision</p>
              <h3>Every community with clean water, dignity, and health</h3>
              <p>
                We envision a future where no child misses school to fetch water, where preventable waterborne diseases
                are eliminated, and where thriving communities control their own water security with local expertise and governance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="screen screen--team" aria-labelledby="team-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Meet our team</p>
            <h2 id="team-heading">Expert leadership driving sustainable change</h2>
            <p>
              Our multidisciplinary team combines hydrogeology, public health, engineering, and community development
              expertise to deliver water security solutions that last.
            </p>
          </div>
          <div class="team-grid">
            <article v-for="member in teamMembers" :key="member.name" class="team-card" data-reveal>
              <div class="team-card__info">
                <h3>{{ member.name }}</h3>
                <p class="team-card__role">{{ member.role }}</p>
                <p class="team-card__bio">{{ member.bio }}</p>
                <p class="team-card__expertise">
                  <strong>Expertise:</strong> {{ member.expertise }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Milestones Timeline -->
    <section class="screen screen--milestones" aria-labelledby="milestones-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Our journey</p>
            <h2 id="milestones-heading">A decade of impact and growth</h2>
            <p>
              Since our founding in 2015, we've grown from 5 wells serving 2,500 people to 142 wells serving
              over 50,000 people daily across three nations.
            </p>
          </div>
          <div class="timeline">
            <article v-for="milestone in milestones" :key="milestone.year" class="timeline-item" data-reveal>
              <div class="timeline-item__year">{{ milestone.year }}</div>
              <div class="timeline-item__content">
                <h3>{{ milestone.title }}</h3>
                <p>{{ milestone.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Partners Section -->
    <section class="screen screen--partners" aria-labelledby="partners-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Strategic partnerships</p>
            <h2 id="partners-heading">Working alongside global leaders</h2>
            <p>
              We align our methodologies to international WASH standards and collaborate with leading organizations
              to amplify our impact and share best practices.
            </p>
          </div>
          <div class="partners-grid" data-reveal>
            <div v-for="partner in footerData.partners" :key="partner" class="partner-card">
              <div class="partner-card__logo" aria-hidden="true">
                <span class="partner-card__icon">🤝</span>
              </div>
              <h3>{{ partner }}</h3>
            </div>
          </div>
          <div class="partnership-details" data-reveal>
            <div class="partnership-item">
              <h4>Technical Standards</h4>
              <p>All infrastructure meets WHO water quality guidelines and UN WASH sustainability criteria</p>
            </div>
            <div class="partnership-item">
              <h4>Knowledge Sharing</h4>
              <p>Regular participation in global WASH forums, contributing learnings from 31 communities</p>
            </div>
            <div class="partnership-item">
              <h4>Funding Collaboration</h4>
              <p>Joint grant applications and co-funding arrangements amplify resources for maximum impact</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
