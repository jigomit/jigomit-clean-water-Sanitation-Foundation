<script setup>
import { heroHighlights, impactStats } from '@/data/content'
import { useReveal } from '@/composables/useReveal'
import LiveImpactCounter from '@/components/LiveImpactCounter.vue'
import TestimonialsCarousel from '@/components/TestimonialsCarousel.vue'
import BeforeAfterSlider from '@/components/BeforeAfterSlider.vue'

useReveal()
</script>

<template>
  <div class="fullscreen-home">
    <!-- Hero Section - Professional NGO Design -->
    <section id="hero" class="hero-ngo">
      <!-- Animated Background Layers -->
      <div class="hero-ngo__background">
        <!-- Gradient Background -->
        <div class="hero-bg-gradient"></div>

        <!-- Flowing Water Waves -->
        <div class="hero-water-waves">
          <svg class="wave-layer wave-layer--1" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,60 C300,100 600,20 900,60 C1050,85 1125,85 1200,60 L1200,120 L0,120 Z" fill="rgba(11, 178, 212, 0.15)"/>
          </svg>
          <svg class="wave-layer wave-layer--2" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,40 C300,80 600,0 900,40 C1050,65 1125,65 1200,40 L1200,120 L0,120 Z" fill="rgba(73, 211, 145, 0.1)"/>
          </svg>
          <svg class="wave-layer wave-layer--3" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,80 C300,120 600,40 900,80 C1050,105 1125,105 1200,80 L1200,120 L0,120 Z" fill="rgba(15, 118, 214, 0.08)"/>
          </svg>
        </div>

        <!-- Floating Water Droplets -->
        <div class="hero-droplets" aria-hidden="true">
          <div class="droplet" style="left: 10%; animation-delay: 0s; animation-duration: 12s;"></div>
          <div class="droplet" style="left: 20%; animation-delay: 2s; animation-duration: 10s;"></div>
          <div class="droplet" style="left: 30%; animation-delay: 4s; animation-duration: 14s;"></div>
          <div class="droplet" style="left: 40%; animation-delay: 1s; animation-duration: 11s;"></div>
          <div class="droplet" style="left: 50%; animation-delay: 3s; animation-duration: 13s;"></div>
          <div class="droplet" style="left: 60%; animation-delay: 5s; animation-duration: 9s;"></div>
          <div class="droplet" style="left: 70%; animation-delay: 2.5s; animation-duration: 12s;"></div>
          <div class="droplet" style="left: 80%; animation-delay: 4.5s; animation-duration: 10.5s;"></div>
          <div class="droplet" style="left: 90%; animation-delay: 1.5s; animation-duration: 11.5s;"></div>
          <div class="droplet" style="left: 15%; animation-delay: 3.5s; animation-duration: 13.5s;"></div>
          <div class="droplet" style="left: 25%; animation-delay: 5.5s; animation-duration: 9.5s;"></div>
          <div class="droplet" style="left: 35%; animation-delay: 0.5s; animation-duration: 12.5s;"></div>
          <div class="droplet" style="left: 45%; animation-delay: 2.8s; animation-duration: 10.8s;"></div>
          <div class="droplet" style="left: 55%; animation-delay: 4.2s; animation-duration: 14.2s;"></div>
          <div class="droplet" style="left: 65%; animation-delay: 1.8s; animation-duration: 11.2s;"></div>
          <div class="droplet" style="left: 75%; animation-delay: 3.2s; animation-duration: 13.2s;"></div>
          <div class="droplet" style="left: 85%; animation-delay: 5.2s; animation-duration: 9.2s;"></div>
          <div class="droplet" style="left: 95%; animation-delay: 0.8s; animation-duration: 12.2s;"></div>
        </div>

        <!-- Shimmer/Light Rays -->
        <div class="hero-shimmer"></div>

        <!-- Ripple Effects -->
        <div class="hero-ripples" aria-hidden="true">
          <div class="ripple ripple--1"></div>
          <div class="ripple ripple--2"></div>
          <div class="ripple ripple--3"></div>
        </div>
      </div>

      <!-- Hero Content -->
      <div class="hero-ngo__content">
        <div class="hero-ngo__container">
          <!-- Animated Title -->
          <h1 class="hero-ngo__title">
            <span class="title-line title-line--1">Clean Water.</span>
            <span class="title-line title-line--2">Healthy Lives.</span>
            <span class="title-line title-line--3">Sustainable Futures.</span>
          </h1>

          <!-- Subtitle -->
          <p class="hero-ngo__subtitle">
            Building wells, empowering communities, and ensuring access to safe water and sanitation for all.
          </p>

          <!-- Call-to-Action Buttons -->
          <div class="hero-ngo__actions">
            <a href="/donate" class="btn-ngo btn-ngo--primary">
              <span>Donate Now</span>
              <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 3C10 3 4 6.5 4 10.5C4 13.5 6.5 16 10 16C13.5 16 16 13.5 16 10.5C16 6.5 10 3 10 3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
            <a href="/about" class="btn-ngo btn-ngo--secondary">
              <span>Get Involved</span>
            </a>
          </div>

          <!-- Impact Stats -->
          <div class="hero-ngo__impact">
            <div class="impact-stat">
              <span class="impact-stat__icon">🌍</span>
              <span class="impact-stat__text">Serving 31 communities</span>
            </div>
            <div class="impact-divider">•</div>
            <div class="impact-stat">
              <span class="impact-stat__icon">💧</span>
              <span class="impact-stat__text">11.4M liters delivered</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section id="mission" class="fullscreen-section fullscreen-section--mission">
      <div class="content-max">
        <div class="mission-grid">
          <div class="mission-content" data-reveal>
            <p class="eyebrow-modern">Our Mission</p>
            <h2 class="section-title-modern">Engineering water security with local leadership</h2>
            <p class="mission-text">
              Inspired by the most effective WASH initiatives across East Africa, our teams co-design wells, smart
              filtration, and latrine upgrades alongside village councils. Each build layers in digital monitoring,
              governance training, and women-led hygiene circles so that water keeps flowing and public health improves
              year after year.
            </p>
            <ul class="feature-list">
              <li v-for="item in heroHighlights" :key="item.title" data-reveal>
                <div class="feature-icon"></div>
                <div>
                  <h3 class="feature-title">{{ item.title }}</h3>
                  <p class="feature-detail">{{ item.detail }}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="mission-visual" data-reveal>
            <div class="glass-card">
              <h3>How we work</h3>
              <p>
                We align to UN WASH and UNICEF Clean Futures benchmarks: assessing aquifers, financing builds, training
                hygiene coaches, and keeping a 24-hour maintenance hotline active. Our telemetry detects anomalies quickly,
                so our partners never wait long for a fix.
              </p>
              <div class="stat-badges">
                <div class="stat-badge">
                  <div class="stat-badge__value">180+</div>
                  <div class="stat-badge__label">Local crew jobs</div>
                </div>
                <div class="stat-badge">
                  <div class="stat-badge__value">520</div>
                  <div class="stat-badge__label">Maintenance tickets</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Section -->
    <section id="impact" class="fullscreen-section fullscreen-section--impact">
      <div class="content-max">
        <div class="impact-wrapper">
          <div class="impact-header" data-reveal>
            <p class="eyebrow-modern">Impact Metrics</p>
            <h2 class="section-title-modern">Transparent metrics from live monitoring</h2>
            <p class="impact-subtitle">Every indicator streams from sensors, school scorecards, or verified partner data and refreshes weekly.</p>
          </div>
          <div class="impact-stats-grid">
            <div v-for="stat in impactStats" :key="stat.label" class="impact-stat-card" data-reveal>
              <div class="impact-stat-card__value">
                {{ stat.value }}<span class="impact-stat-card__suffix">{{ stat.suffix }}</span>
              </div>
              <div class="impact-stat-card__label">{{ stat.label }}</div>
              <p class="impact-stat-card__desc">{{ stat.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Live Impact Counter -->
    <LiveImpactCounter />

    <!-- Testimonials Section -->
    <TestimonialsCarousel />

    <!-- Before/After Transformations -->
    <BeforeAfterSlider />

    <!-- CTA Section -->
    <section id="cta" class="fullscreen-section fullscreen-section--cta">
      <div class="content-max">
        <div class="cta-modern" data-reveal>
          <div class="cta-modern__content">
            <p class="eyebrow-modern">Make an Impact</p>
            <h2 class="cta-modern__title">Fuel the next community build</h2>
            <p class="cta-modern__text">
              100% of online gifts go straight into the field for well construction, sanitation upgrades, and hygiene
              education materials. Corporate sponsors can underwrite telemetry hubs or training labs.
            </p>
            <div class="cta-modern__actions">
              <a class="btn-modern btn-modern--primary btn-modern--large" href="mailto:hello@lifespringwater.org?subject=LifeSpring%20Water%20Donation">
                <span>Give monthly</span>
              </a>
              <a class="btn-modern btn-modern--ghost btn-modern--large" href="mailto:hello@lifespringwater.org?subject=Volunteer%20Inquiry">
                <span>Partner with us</span>
              </a>
            </div>
          </div>
          <div class="cta-modern__visual" aria-hidden="true">
            <div class="floating-droplet floating-droplet--1"></div>
            <div class="floating-droplet floating-droplet--2"></div>
            <div class="floating-droplet floating-droplet--3"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
