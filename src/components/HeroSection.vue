<script setup>
import { heroHighlights } from '@/data/content'
</script>

<template>
  <section class="screen screen--hero" aria-labelledby="hero-heading">
    <div class="content-max">
      <div class="hero">
        <div class="hero__animation" aria-hidden="true">
          <span class="hero__blob hero__blob--one"></span>
          <span class="hero__blob hero__blob--two"></span>
          <span class="hero__blob hero__blob--three"></span>
        </div>
        <div class="hero__content" data-reveal>
          <p class="eyebrow">Clean Water &amp; Sanitation Foundation</p>
          <h1 id="hero-heading">Pure water infrastructure backed by trusted educators</h1>
          <p class="intro">
            From telemetry-equipped wells to soap entrepreneurship bootcamps, our teams deploy proven WASH strategies so
            that every family gains dignified, long-term access to safe water.
          </p>
          <div class="hero__actions">
            <a class="btn" href="#donate">
              <span>Donate today</span>
            </a>
            <a class="btn btn--ghost" href="#projects">
              <span>Explore initiatives</span>
            </a>
          </div>
          <ul class="hero__highlights">
            <li v-for="item in heroHighlights" :key="item.title" data-reveal>
              <h3>{{ item.title }}</h3>
              <p>{{ item.detail }}</p>
            </li>
          </ul>
        </div>
        <div class="hero__visual" aria-hidden="true">
          <div class="wave wave--one"></div>
          <div class="wave wave--two"></div>
          <div class="wave wave--three"></div>
          <svg class="wave__mask" viewBox="0 0 400 400" focusable="false">
            <defs>
              <linearGradient id="droplet" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#8be0ff" />
                <stop offset="100%" stop-color="#1579d4" />
              </linearGradient>
            </defs>
            <path class="droplet" d="M200 40 Q260 140 200 230 Q140 140 200 40Z" fill="url(#droplet)" />
            <circle class="ripple ripple--one" cx="200" cy="260" r="60" />
            <circle class="ripple ripple--two" cx="200" cy="260" r="90" />
            <circle class="ripple ripple--three" cx="200" cy="260" r="120" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
