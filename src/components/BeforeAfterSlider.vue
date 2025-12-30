<script setup>
import { ref } from 'vue'

const sliderPosition = ref(50)
const isDragging = ref(false)

const comparisons = [
  {
    id: 1,
    title: 'Lura Village Water Access',
    location: 'Lura, Kenya',
    year: '2021',
    before: {
      image: '🏜️',
      caption: 'Before: 6km walk to nearest water source',
      description: 'Women and children spent 4+ hours daily collecting water from contaminated streams'
    },
    after: {
      image: '💧',
      caption: 'After: Community well with solar pump',
      description: '22,000 liters daily serving 480 people with 99% uptime'
    },
    metrics: [
      { label: 'Time saved daily', value: '3.5 hours' },
      { label: 'Disease reduction', value: '74%' },
      { label: 'School attendance', value: '+89%' }
    ]
  },
  {
    id: 2,
    title: 'Kitui School Sanitation',
    location: 'Kitui, Kenya',
    year: '2022',
    before: {
      image: '🏚️',
      caption: 'Before: No handwashing facilities',
      description: 'Students shared 2 latrines with no water for 400 children'
    },
    after: {
      image: '🚰',
      caption: 'After: Dignity suites with handwashing stations',
      description: 'Gender-separated facilities with running water serve all students'
    },
    metrics: [
      { label: 'Girl attendance', value: '+92%' },
      { label: 'Illness rate drop', value: '67%' },
      { label: 'Hygiene compliance', value: '98%' }
    ]
  },
  {
    id: 3,
    title: 'Ngara Filtration System',
    location: 'Ngara, Tanzania',
    year: '2023',
    before: {
      image: '⚠️',
      caption: 'Before: Contaminated surface water',
      description: 'Community relied on river water with high bacterial count'
    },
    after: {
      image: '🔬',
      caption: 'After: WHO-grade filtration system',
      description: '0.2-micron filtration serving 200 people daily'
    },
    metrics: [
      { label: 'Water quality', value: 'WHO standard' },
      { label: 'Waterborne illness', value: '-81%' },
      { label: 'Community satisfaction', value: '100%' }
    ]
  }
]

const currentComparison = ref(0)

const handleSliderInput = (event) => {
  sliderPosition.value = event.target.value
}

const handleMouseMove = (event) => {
  if (!isDragging.value) return

  const container = event.currentTarget
  const rect = container.getBoundingClientRect()
  const x = event.clientX - rect.left
  const percentage = (x / rect.width) * 100

  sliderPosition.value = Math.max(0, Math.min(100, percentage))
}

const handleTouchMove = (event) => {
  if (!isDragging.value) return

  const container = event.currentTarget
  const rect = container.getBoundingClientRect()
  const x = event.touches[0].clientX - rect.left
  const percentage = (x / rect.width) * 100

  sliderPosition.value = Math.max(0, Math.min(100, percentage))
}

const startDrag = () => {
  isDragging.value = true
}

const stopDrag = () => {
  isDragging.value = false
}

const nextComparison = () => {
  currentComparison.value = (currentComparison.value + 1) % comparisons.length
  sliderPosition.value = 50 // Reset slider
}

const prevComparison = () => {
  currentComparison.value = currentComparison.value === 0 ? comparisons.length - 1 : currentComparison.value - 1
  sliderPosition.value = 50 // Reset slider
}
</script>

<template>
  <section class="before-after-section" aria-labelledby="comparison-heading">
    <div class="content-max">
      <div class="section-header" data-reveal>
        <p class="eyebrow-modern">Transformation Stories</p>
        <h2 id="comparison-heading" class="section-title-modern">
          See the Difference We Make Together
        </h2>
        <p class="section-subtitle">
          Drag the slider to reveal the transformation in communities we serve
        </p>
      </div>

      <div class="comparison-wrapper" data-reveal>
        <!-- Comparison Selector -->
        <div class="comparison-selector">
          <button
            v-for="(comparison, index) in comparisons"
            :key="comparison.id"
            class="selector-button"
            :class="{ 'selector-button--active': currentComparison === index }"
            type="button"
            @click="currentComparison = index; sliderPosition = 50"
          >
            <div class="selector-title">{{ comparison.title }}</div>
            <div class="selector-location">{{ comparison.location }}</div>
          </button>
        </div>

        <!-- Main Comparison -->
        <div class="comparison-card">
          <div class="comparison-info">
            <h3 class="comparison-title">{{ comparisons[currentComparison].title }}</h3>
            <div class="comparison-meta">
              📍 {{ comparisons[currentComparison].location }} •
              📅 Completed {{ comparisons[currentComparison].year }}
            </div>
          </div>

          <!-- Interactive Slider -->
          <div
            class="slider-container"
            @mousemove="handleMouseMove"
            @touchmove.prevent="handleTouchMove"
            @mouseup="stopDrag"
            @mouseleave="stopDrag"
            @touchend="stopDrag"
          >
            <!-- Before Image -->
            <div class="image-side image-side--before">
              <div class="image-placeholder image-placeholder--before">
                <span class="image-icon">{{ comparisons[currentComparison].before.image }}</span>
              </div>
              <div class="image-overlay">
                <div class="overlay-badge overlay-badge--before">BEFORE</div>
                <p class="overlay-caption">{{ comparisons[currentComparison].before.caption }}</p>
              </div>
            </div>

            <!-- After Image (clipped) -->
            <div class="image-side image-side--after" :style="{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }">
              <div class="image-placeholder image-placeholder--after">
                <span class="image-icon">{{ comparisons[currentComparison].after.image }}</span>
              </div>
              <div class="image-overlay">
                <div class="overlay-badge overlay-badge--after">AFTER</div>
                <p class="overlay-caption">{{ comparisons[currentComparison].after.caption }}</p>
              </div>
            </div>

            <!-- Slider Handle -->
            <div
              class="slider-handle"
              :style="{ left: `${sliderPosition}%` }"
              @mousedown="startDrag"
              @touchstart="startDrag"
            >
              <div class="handle-line"></div>
              <div class="handle-circle">
                <span class="handle-arrows">⟨ ⟩</span>
              </div>
            </div>
          </div>

          <!-- Descriptions -->
          <div class="descriptions-grid">
            <div class="description-card description-card--before">
              <h4 class="description-title">Before Our Work</h4>
              <p class="description-text">{{ comparisons[currentComparison].before.description }}</p>
            </div>
            <div class="description-card description-card--after">
              <h4 class="description-title">After Our Work</h4>
              <p class="description-text">{{ comparisons[currentComparison].after.description }}</p>
            </div>
          </div>

          <!-- Metrics -->
          <div class="metrics-grid">
            <div
              v-for="(metric, index) in comparisons[currentComparison].metrics"
              :key="index"
              class="metric-card"
            >
              <div class="metric-value">{{ metric.value }}</div>
              <div class="metric-label">{{ metric.label }}</div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="comparison-nav">
            <button type="button" class="nav-button nav-button--prev" @click="prevComparison" aria-label="Previous comparison">
              ← Previous
            </button>
            <div class="nav-indicator">
              {{ currentComparison + 1 }} of {{ comparisons.length }}
            </div>
            <button type="button" class="nav-button nav-button--next" @click="nextComparison" aria-label="Next comparison">
              Next →
            </button>
          </div>
        </div>

        <!-- Range Slider Control -->
        <div class="slider-control" data-reveal>
          <label for="comparison-slider" class="slider-label">
            Or use the slider below:
          </label>
          <input
            id="comparison-slider"
            type="range"
            min="0"
            max="100"
            v-model="sliderPosition"
            @input="handleSliderInput"
            class="range-slider"
          />
          <div class="slider-labels">
            <span>Before</span>
            <span>{{ sliderPosition }}%</span>
            <span>After</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.before-after-section {
  padding: 6rem 0;
  background: linear-gradient(180deg, #e8f5ff 0%, #f4fffe 100%);
}

.section-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--clr-muted);
  margin-top: 1rem;
}

.comparison-wrapper {
  max-width: 1000px;
  margin: 0 auto;
}

.comparison-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
}

.selector-button {
  padding: 1.5rem;
  background: white;
  border: 3px solid transparent;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.selector-button:hover {
  border-color: rgba(11, 178, 212, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(11, 178, 212, 0.15);
}

.selector-button--active {
  border-color: var(--clr-accent);
  background: linear-gradient(135deg, rgba(11, 178, 212, 0.05), rgba(73, 211, 145, 0.05));
}

.selector-title {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--clr-deep);
  margin-bottom: 0.3rem;
}

.selector-location {
  font-size: 0.9rem;
  color: var(--clr-muted);
}

.comparison-card {
  background: white;
  border-radius: var(--radius-large);
  padding: 3rem;
  box-shadow: 0 25px 60px -20px rgba(15, 53, 88, 0.25);
  border: 1px solid rgba(11, 178, 212, 0.1);
}

.comparison-info {
  text-align: center;
  margin-bottom: 2rem;
}

.comparison-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--clr-deep);
  margin-bottom: 0.5rem;
}

.comparison-meta {
  font-size: 1.05rem;
  color: var(--clr-muted);
}

.slider-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 20px;
  margin-bottom: 2rem;
  cursor: ew-resize;
  user-select: none;
}

.image-side {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-side--after {
  clip-path: inset(0 0 0 50%);
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.image-placeholder--before {
  background: linear-gradient(135deg, #8b7355 0%, #a89080 100%);
}

.image-placeholder--after {
  background: linear-gradient(135deg, #0bb2d4 0%, #49d391 100%);
}

.image-icon {
  font-size: 10rem;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.3));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}

.image-overlay {
  position: absolute;
  top: 2rem;
  left: 2rem;
  color: white;
}

.overlay-badge {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  margin-bottom: 0.8rem;
}

.overlay-badge--before {
  background: rgba(0, 0, 0, 0.5);
}

.overlay-badge--after {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.overlay-caption {
  font-size: 1.1rem;
  font-weight: 600;
  max-width: 300px;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  transform: translateX(-50%);
  cursor: ew-resize;
  z-index: 10;
  transition: left 0.1s ease-out;
}

.handle-line {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.handle-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  border: 3px solid var(--clr-accent);
}

.handle-arrows {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--clr-accent);
  letter-spacing: -5px;
}

.descriptions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.description-card {
  padding: 1.5rem;
  border-radius: 16px;
  border: 2px solid;
}

.description-card--before {
  background: rgba(139, 115, 85, 0.05);
  border-color: rgba(139, 115, 85, 0.3);
}

.description-card--after {
  background: rgba(11, 178, 212, 0.05);
  border-color: var(--clr-accent);
}

.description-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--clr-deep);
  margin-bottom: 0.8rem;
}

.description-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--clr-muted);
  margin: 0;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(11, 178, 212, 0.05), rgba(73, 211, 145, 0.05));
  border-radius: 16px;
}

.metric-card {
  text-align: center;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--clr-accent);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.metric-label {
  font-size: 0.95rem;
  color: var(--clr-muted);
  font-weight: 500;
}

.comparison-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.nav-button {
  padding: 1rem 2rem;
  background: white;
  border: 2px solid var(--clr-accent);
  color: var(--clr-accent);
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background: var(--clr-accent);
  color: white;
  transform: translateY(-2px);
}

.nav-indicator {
  font-weight: 700;
  color: var(--clr-muted);
  font-size: 1.1rem;
}

.slider-control {
  margin-top: 3rem;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px -10px rgba(15, 53, 88, 0.15);
}

.slider-label {
  display: block;
  text-align: center;
  font-weight: 600;
  color: var(--clr-deep);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.range-slider {
  width: 100%;
  height: 12px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, #8b7355 0%, var(--clr-lime) 100%);
  border-radius: 999px;
  outline: none;
  margin-bottom: 0.8rem;
}

.range-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 28px;
  height: 28px;
  background: white;
  border: 3px solid var(--clr-accent);
  border-radius: 50%;
  cursor: grab;
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.4);
}

.range-slider::-webkit-slider-thumb:active {
  cursor: grabbing;
}

.range-slider::-moz-range-thumb {
  width: 28px;
  height: 28px;
  background: white;
  border: 3px solid var(--clr-accent);
  border-radius: 50%;
  cursor: grab;
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.4);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: var(--clr-muted);
  font-weight: 600;
}

.slider-labels span:nth-child(2) {
  color: var(--clr-accent);
  font-weight: 700;
}

@media (max-width: 968px) {
  .comparison-selector {
    grid-template-columns: 1fr;
  }

  .comparison-card {
    padding: 2rem 1.5rem;
  }

  .descriptions-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .comparison-nav {
    flex-direction: column;
  }

  .nav-button {
    width: 100%;
  }

  .image-icon {
    font-size: 6rem;
  }

  .overlay-caption {
    font-size: 0.95rem;
  }
}

@media (max-width: 640px) {
  .handle-circle {
    width: 50px;
    height: 50px;
  }

  .handle-arrows {
    font-size: 1.2rem;
  }

  .slider-container {
    aspect-ratio: 4 / 3;
  }
}
</style>
