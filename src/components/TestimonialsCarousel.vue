<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentSlide = ref(0)
const isAutoPlaying = ref(true)
let autoPlayInterval = null

const testimonials = [
  {
    id: 1,
    type: 'community',
    name: 'Grace Wanjiru',
    role: 'Village Council Leader',
    location: 'Lura, Kenya',
    photo: '👩🏾',
    quote: 'Before the well, our daughters walked 6 kilometers every morning for water. Now they attend school full-time. Three have graduated to university.',
    impact: 'Well installed: March 2021',
    metric: '22,000 liters daily',
    communitySize: '480 people served'
  },
  {
    id: 2,
    type: 'donor',
    name: 'Sarah Mitchell',
    role: 'Monthly Donor',
    location: 'San Francisco, USA',
    photo: '👩🏼',
    quote: 'I love the transparency. I get quarterly videos showing the exact well my donations maintain. It\'s not charity - it\'s partnership.',
    impact: 'Supporting since: 2022',
    metric: '$50/month contribution',
    communitySize: 'Sponsor of Ngara well'
  },
  {
    id: 3,
    type: 'student',
    name: 'Emmanuel Kimani',
    role: 'Student Hygiene Champion',
    location: 'Kitui, Kenya',
    photo: '👨🏿‍🎓',
    quote: 'I teach 200 classmates about handwashing and water safety. My school\'s disease rate dropped by 67% last year. I want to be a water engineer.',
    impact: 'Trained students: 320+',
    metric: '12 workshops led',
    communitySize: '3 schools reached'
  },
  {
    id: 4,
    type: 'engineer',
    name: 'David Omondi',
    role: 'Solar Pump Technician',
    location: 'Mombasa, Kenya',
    photo: '👨🏾‍🔧',
    quote: 'This foundation trained me for 6 months. Now I maintain 27 solar pumps across 8 villages. I support my family and serve my community - both at once.',
    impact: 'Systems maintained: 27',
    metric: '99.2% uptime rate',
    communitySize: '180+ local crew jobs'
  },
  {
    id: 5,
    type: 'mother',
    name: 'Amina Hassan',
    role: 'Mothers Circle Coordinator',
    location: 'Garissa, Kenya',
    photo: '👩🏾‍🦱',
    quote: 'Our hygiene circle makes soap and teaches sanitation. We\'ve started 14 small businesses. Clean water didn\'t just save lives - it created livelihoods.',
    impact: 'Businesses launched: 14',
    metric: '54 active circles',
    communitySize: '$2,400 avg annual income'
  },
  {
    id: 6,
    type: 'volunteer',
    name: 'James Martinez',
    role: 'Corporate Sponsor',
    location: 'Austin, USA',
    photo: '👨🏻',
    quote: 'Our company sponsored a complete filtration system. The dedication ceremony was the most meaningful moment of my career. Real impact, real people.',
    impact: 'System sponsored: 2023',
    metric: '$2,500 filtration system',
    communitySize: '200 people daily'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % testimonials.length
}

const previousSlide = () => {
  currentSlide.value = currentSlide.value === 0 ? testimonials.length - 1 : currentSlide.value - 1
}

const goToSlide = (index) => {
  currentSlide.value = index
  pauseAutoPlay()
}

const pauseAutoPlay = () => {
  isAutoPlaying.value = false
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
    autoPlayInterval = null
  }
}

const resumeAutoPlay = () => {
  isAutoPlaying.value = true
  startAutoPlay()
}

const startAutoPlay = () => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
  autoPlayInterval = setInterval(() => {
    if (isAutoPlaying.value) {
      nextSlide()
    }
  }, 6000) // Change slide every 6 seconds
}

onMounted(() => {
  startAutoPlay()
})

onBeforeUnmount(() => {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval)
  }
})
</script>

<template>
  <section class="testimonials-carousel" aria-labelledby="testimonials-heading">
    <div class="content-max">
      <div class="carousel-header" data-reveal>
        <p class="eyebrow-modern">Stories from the Field</p>
        <h2 id="testimonials-heading" class="section-title-modern">
          Real People, Real Impact
        </h2>
        <p class="carousel-subtitle">
          Hear from the communities we serve, the donors who make it possible, and the local champions leading change
        </p>
      </div>

      <div class="carousel-wrapper" data-reveal>
        <!-- Main Carousel -->
        <div
          class="carousel-container"
          @mouseenter="pauseAutoPlay"
          @mouseleave="resumeAutoPlay"
        >
          <Transition name="slide" mode="out-in">
            <div :key="currentSlide" class="carousel-slide">
              <div class="slide-content">
                <!-- Photo/Avatar Section -->
                <div class="slide-photo">
                  <div class="photo-circle">
                    <span class="photo-avatar">{{ testimonials[currentSlide].photo }}</span>
                  </div>
                  <div class="photo-badge" :data-type="testimonials[currentSlide].type">
                    {{ testimonials[currentSlide].type }}
                  </div>
                </div>

                <!-- Quote Section -->
                <div class="slide-quote-section">
                  <div class="quote-mark">"</div>
                  <blockquote class="slide-quote">
                    {{ testimonials[currentSlide].quote }}
                  </blockquote>

                  <div class="slide-author">
                    <div class="author-name">{{ testimonials[currentSlide].name }}</div>
                    <div class="author-role">{{ testimonials[currentSlide].role }}</div>
                    <div class="author-location">📍 {{ testimonials[currentSlide].location }}</div>
                  </div>
                </div>
              </div>

              <!-- Impact Metrics -->
              <div class="slide-metrics">
                <div class="metric-item">
                  <div class="metric-label">{{ testimonials[currentSlide].impact }}</div>
                </div>
                <div class="metric-item">
                  <div class="metric-value">{{ testimonials[currentSlide].metric }}</div>
                </div>
                <div class="metric-item">
                  <div class="metric-community">{{ testimonials[currentSlide].communitySize }}</div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Navigation Arrows -->
          <button
            class="carousel-arrow carousel-arrow--prev"
            type="button"
            @click="previousSlide"
            aria-label="Previous testimonial"
          >
            ←
          </button>
          <button
            class="carousel-arrow carousel-arrow--next"
            type="button"
            @click="nextSlide"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>

        <!-- Dots Navigation -->
        <div class="carousel-dots">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="testimonial.id"
            class="carousel-dot"
            type="button"
            :class="{ 'carousel-dot--active': currentSlide === index }"
            @click="goToSlide(index)"
            :aria-label="`Go to testimonial ${index + 1}`"
          >
            <span class="dot-avatar">{{ testimonial.photo }}</span>
          </button>
        </div>

        <!-- Auto-play Toggle -->
        <div class="carousel-controls">
          <button
            class="autoplay-toggle"
            type="button"
            @click="isAutoPlaying ? pauseAutoPlay() : resumeAutoPlay()"
            :aria-label="isAutoPlaying ? 'Pause auto-play' : 'Resume auto-play'"
          >
            {{ isAutoPlaying ? '⏸' : '▶️' }} {{ isAutoPlaying ? 'Pause' : 'Play' }}
          </button>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="carousel-cta" data-reveal>
        <p class="cta-text">
          Want to share your impact story?
          <a href="mailto:hello@lifespringwater.org?subject=My Impact Story" class="cta-link">
            Tell us how you're making a difference →
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonials-carousel {
  padding: 6rem 0;
  background: linear-gradient(180deg, #f4fffe 0%, #e8f5ff 100%);
  overflow: hidden;
}

.carousel-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.carousel-subtitle {
  font-size: 1.1rem;
  color: var(--clr-muted);
  margin-top: 1rem;
}

.carousel-wrapper {
  max-width: 900px;
  margin: 0 auto;
}

.carousel-container {
  position: relative;
  background: white;
  border-radius: var(--radius-large);
  padding: 4rem 3rem;
  box-shadow: 0 25px 60px -20px rgba(15, 53, 88, 0.25);
  margin-bottom: 2rem;
  min-height: 500px;
  display: flex;
  align-items: center;
}

.carousel-slide {
  width: 100%;
}

.slide-content {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 3rem;
  align-items: center;
  margin-bottom: 2rem;
}

.slide-photo {
  text-align: center;
}

.photo-circle {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--clr-accent), var(--clr-lime));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: 0 20px 40px -15px rgba(11, 178, 212, 0.4);
  position: relative;
}

.photo-circle::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--clr-accent), var(--clr-lime));
  opacity: 0.3;
  z-index: -1;
  animation: photoPulse 3s ease-in-out infinite;
}

@keyframes photoPulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.15;
  }
}

.photo-avatar {
  font-size: 6rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

.photo-badge {
  display: inline-block;
  padding: 0.5rem 1.2rem;
  background: rgba(11, 178, 212, 0.1);
  color: var(--clr-accent);
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.85rem;
  text-transform: capitalize;
  border: 2px solid var(--clr-accent);
}

.photo-badge[data-type="community"] {
  background: rgba(73, 211, 145, 0.1);
  color: var(--clr-lime);
  border-color: var(--clr-lime);
}

.photo-badge[data-type="donor"] {
  background: rgba(21, 121, 212, 0.1);
  color: #1579d4;
  border-color: #1579d4;
}

.slide-quote-section {
  position: relative;
}

.quote-mark {
  font-size: 8rem;
  line-height: 0.5;
  color: rgba(11, 178, 212, 0.15);
  font-family: Georgia, serif;
  margin-bottom: 1rem;
}

.slide-quote {
  font-size: 1.4rem;
  line-height: 1.7;
  color: var(--clr-deep);
  font-style: italic;
  margin: 0 0 2rem;
  position: relative;
}

.slide-author {
  border-top: 2px solid rgba(11, 178, 212, 0.2);
  padding-top: 1.5rem;
}

.author-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--clr-deep);
  margin-bottom: 0.5rem;
}

.author-role {
  font-size: 1.1rem;
  color: var(--clr-accent);
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.author-location {
  font-size: 1rem;
  color: var(--clr-muted);
}

.slide-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(11, 178, 212, 0.05), rgba(73, 211, 145, 0.05));
  border-radius: 20px;
  border: 1px solid rgba(11, 178, 212, 0.15);
}

.metric-item {
  text-align: center;
}

.metric-label,
.metric-value,
.metric-community {
  font-size: 1.05rem;
  color: var(--clr-deep);
  font-weight: 600;
}

.metric-value {
  color: var(--clr-accent);
  font-weight: 700;
  font-size: 1.2rem;
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--clr-accent);
  color: var(--clr-accent);
  font-size: 1.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(15, 53, 88, 0.15);
  z-index: 2;
}

.carousel-arrow:hover {
  background: var(--clr-accent);
  color: white;
  transform: translateY(-50%) scale(1.1);
}

.carousel-arrow--prev {
  left: -30px;
}

.carousel-arrow--next {
  right: -30px;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.carousel-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid transparent;
  background: rgba(11, 178, 212, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0;
}

.carousel-dot:hover {
  border-color: rgba(11, 178, 212, 0.5);
  transform: scale(1.1);
}

.carousel-dot--active {
  border-color: var(--clr-accent);
  background: white;
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.3);
}

.dot-avatar {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.carousel-dot--active .dot-avatar {
  filter: grayscale(0%);
}

.carousel-controls {
  text-align: center;
}

.autoplay-toggle {
  padding: 0.8rem 1.5rem;
  background: rgba(11, 178, 212, 0.1);
  color: var(--clr-accent);
  border: 2px solid var(--clr-accent);
  border-radius: 999px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.autoplay-toggle:hover {
  background: var(--clr-accent);
  color: white;
}

.carousel-cta {
  text-align: center;
  margin-top: 3rem;
}

.cta-text {
  font-size: 1.2rem;
  color: var(--clr-muted);
}

.cta-link {
  color: var(--clr-accent);
  font-weight: 700;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.cta-link:hover {
  color: var(--clr-lime);
}

/* Slide Transitions */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

@media (max-width: 968px) {
  .slide-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .photo-circle {
    width: 150px;
    height: 150px;
  }

  .photo-avatar {
    font-size: 5rem;
  }

  .slide-quote {
    font-size: 1.2rem;
  }

  .carousel-arrow {
    width: 50px;
    height: 50px;
    font-size: 1.5rem;
  }

  .carousel-arrow--prev {
    left: -20px;
  }

  .carousel-arrow--next {
    right: -20px;
  }

  .slide-metrics {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 640px) {
  .carousel-container {
    padding: 2.5rem 1.5rem;
    min-height: 600px;
  }

  .carousel-arrow--prev {
    left: 5px;
  }

  .carousel-arrow--next {
    right: 5px;
  }

  .quote-mark {
    font-size: 5rem;
  }

  .carousel-dots {
    gap: 0.5rem;
  }

  .carousel-dot {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
}
</style>
