<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  compact: {
    type: Boolean,
    default: false
  }
})

// Base values (what we've achieved so far)
const baseValues = {
  litersDelivered: 11400000, // 11.4M liters per year
  litersPerSecond: 11400000 / (365 * 24 * 60 * 60), // ~0.36 liters per second
  peopleServed: 5200,
  wellsOnline: 142,
  uptime: 99
}

// Live counters
const currentLiters = ref(baseValues.litersDelivered)
const displayLiters = ref(baseValues.litersDelivered)
let counterInterval = null
let visibilityHandler = null

// Animation reference for smooth counting
const animateValue = (start, end, duration, callback) => {
  const startTime = Date.now()
  const difference = end - start

  const step = () => {
    const now = Date.now()
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function for smooth animation
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = start + (difference * easeOut)

    callback(current)

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

// Format large numbers
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return Math.floor(num).toLocaleString()
}

// Start the live counter
const startLiveCounter = () => {
  // Simulate real-time water delivery
  if (counterInterval) {
    return
  }
  counterInterval = setInterval(() => {
    const increment = baseValues.litersPerSecond
    currentLiters.value += increment

    // Smoothly animate to new value
    animateValue(
      displayLiters.value,
      currentLiters.value,
      800,
      (val) => {
        displayLiters.value = val
      }
    )
  }, 1000) // Update every second
}

// Computed values for display
const formattedLiters = computed(() => formatNumber(displayLiters.value))
const formattedPeople = computed(() => baseValues.peopleServed.toLocaleString())
const formattedWells = computed(() => baseValues.wellsOnline.toLocaleString())

// Calculate liters delivered TODAY
const todayLiters = computed(() => {
  const litersPerDay = baseValues.litersDelivered / 365
  return formatNumber(litersPerDay)
})

// Recent activity (simulated)
const recentDonations = ref([
  { donor: 'Sarah M.', amount: 50, location: 'California', minutes: 2 },
  { donor: 'James K.', amount: 120, location: 'New York', minutes: 5 },
  { donor: 'Maria G.', amount: 40, location: 'Texas', minutes: 8 },
  { donor: 'David L.', amount: 500, location: 'Florida', minutes: 12 },
  { donor: 'Emma W.', amount: 25, location: 'Oregon', minutes: 15 }
])

// Progress toward next well
const progressToNextWell = computed(() => {
  const wellCost = 8500
  const currentProgress = 7200 // Mock current progress
  return {
    percentage: (currentProgress / wellCost * 100).toFixed(1),
    raised: currentProgress.toLocaleString(),
    goal: wellCost.toLocaleString(),
    remaining: (wellCost - currentProgress).toLocaleString(),
    donorsNeeded: Math.ceil((wellCost - currentProgress) / 40)
  }
})

onMounted(() => {
  startLiveCounter()
  visibilityHandler = () => {
    if (document.hidden) {
      if (counterInterval) {
        clearInterval(counterInterval)
        counterInterval = null
      }
    } else {
      startLiveCounter()
    }
  }
  document.addEventListener('visibilitychange', visibilityHandler)
})

onBeforeUnmount(() => {
  if (counterInterval) {
    clearInterval(counterInterval)
  }
  if (visibilityHandler) {
    document.removeEventListener('visibilitychange', visibilityHandler)
  }
})
</script>

<template>
  <section class="live-counter" :class="{ 'live-counter--compact': compact }">
    <div class="content-max">
      <!-- Main Live Stats -->
      <div class="live-header" data-reveal>
        <div class="live-pulse-indicator">
          <span class="pulse-dot"></span>
          <span class="pulse-text">LIVE</span>
        </div>
        <h2 class="live-title">Real-Time Impact</h2>
        <p class="live-subtitle">Every second, clean water flows to communities we serve</p>
      </div>

      <div class="counter-grid">
        <!-- Main Counter: Liters This Year -->
        <div class="counter-card counter-card--hero" data-reveal>
          <div class="counter-label">Total Liters Delivered This Year</div>
          <div class="counter-value counter-value--animated">
            {{ formattedLiters }}
            <span class="counter-unit">liters</span>
          </div>
          <div class="counter-detail">
            <span class="counter-highlight">{{ todayLiters }}</span> delivered today
          </div>
          <div class="counter-visual">
            <div class="water-flow-animation">
              <div class="flow-drop" v-for="n in 5" :key="n" :style="{ animationDelay: n * 0.3 + 's' }"></div>
            </div>
          </div>
        </div>

        <!-- Supporting Stats -->
        <div class="counter-card" data-reveal>
          <div class="counter-icon">👥</div>
          <div class="counter-value">{{ formattedPeople }}+</div>
          <div class="counter-label">Families Trained</div>
          <div class="counter-detail">Completed hygiene education</div>
        </div>

        <div class="counter-card" data-reveal>
          <div class="counter-icon">💧</div>
          <div class="counter-value">{{ formattedWells }}</div>
          <div class="counter-label">Wells Online</div>
          <div class="counter-detail">{{ baseValues.uptime }}% uptime this month</div>
        </div>

        <div class="counter-card" data-reveal>
          <div class="counter-icon">🌍</div>
          <div class="counter-value">31</div>
          <div class="counter-label">Communities Served</div>
          <div class="counter-detail">Across East Africa</div>
        </div>
      </div>

      <!-- Progress to Next Well -->
      <div class="progress-section" data-reveal>
        <div class="progress-card">
          <div class="progress-header">
            <h3 class="progress-title">🎯 Progress to Next Well</h3>
            <div class="progress-stats">
              <span class="progress-raised">${{ progressToNextWell.raised }}</span>
              <span class="progress-separator">/</span>
              <span class="progress-goal">${{ progressToNextWell.goal }}</span>
            </div>
          </div>

          <div class="progress-bar-container">
            <div class="progress-bar-track">
              <div
                class="progress-bar-fill"
                :style="{ width: progressToNextWell.percentage + '%' }"
              >
                <span class="progress-percentage">{{ progressToNextWell.percentage }}%</span>
              </div>
            </div>
          </div>

          <div class="progress-footer">
            <p class="progress-message">
              Only <strong>{{ progressToNextWell.donorsNeeded }} more donors at $40</strong> to reach our goal!
            </p>
            <p class="progress-urgency">Join them today and help us break ground next month</p>
          </div>
        </div>
      </div>

      <!-- Recent Donations Feed -->
      <div class="activity-feed" data-reveal>
        <h3 class="activity-title">
          <span class="activity-pulse"></span>
          Recent Contributions
        </h3>
        <div class="activity-list">
          <div
            v-for="(donation, index) in recentDonations"
            :key="index"
            class="activity-item"
            :style="{ animationDelay: index * 0.1 + 's' }"
          >
            <div class="activity-avatar">{{ donation.donor.charAt(0) }}</div>
            <div class="activity-details">
              <div class="activity-donor">
                <strong>{{ donation.donor }}</strong> from {{ donation.location }}
              </div>
              <div class="activity-amount">donated ${{ donation.amount }}</div>
            </div>
            <div class="activity-time">{{ donation.minutes }}m ago</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.live-counter {
  padding: 5rem 0;
  background: linear-gradient(180deg, #0f3558 0%, #1a4d7a 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.live-counter::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(circle at 20% 30%, rgba(11, 178, 212, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(73, 211, 145, 0.15) 0%, transparent 50%);
  pointer-events: none;
}

.live-header {
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.live-pulse-indicator {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1.2rem;
  border-radius: 999px;
  margin-bottom: 1rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.pulse-dot {
  width: 10px;
  height: 10px;
  background: #ff4444;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 68, 68, 0.7);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
    box-shadow: 0 0 0 10px rgba(255, 68, 68, 0);
  }
}

.pulse-text {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
}

.live-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #8be0ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.live-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.counter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.counter-card {
  background: var(--card-surface);
  color: var(--card-foreground);
  backdrop-filter: blur(24px);
  border-radius: var(--radius-large);
  padding: 2.5rem;
  border: 1px solid var(--card-border);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
  box-shadow: var(--card-shadow);
}

.counter-card:hover {
  transform: translateY(-5px);
  border-color: var(--card-border);
  box-shadow: 0 45px 80px -35px rgba(0, 0, 0, 0.85);
}

.counter-card--hero {
  grid-column: span 2;
  background: var(--card-surface-strong);
  border: 2px solid var(--card-border);
}

.counter-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2));
}

.counter-value {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 0.5rem;
  text-align: center;
}

.counter-value--animated {
  font-size: 5rem;
  background: linear-gradient(135deg, #ffffff 0%, #8be0ff 50%, #49d391 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% {
    filter: brightness(1) saturate(1);
  }
  50% {
    filter: brightness(1.2) saturate(1.3);
  }
}

.counter-unit {
  font-size: 1.5rem;
  opacity: 0.8;
  margin-left: 0.5rem;
  color: var(--card-muted);
}

.counter-label {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.counter-detail {
  font-size: 0.95rem;
  opacity: 0.85;
  text-align: center;
  color: var(--card-muted);
}

.counter-highlight {
  color: var(--clr-lime);
  font-weight: 700;
  font-size: 1.1rem;
}

.counter-visual {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 200px;
  opacity: 0.3;
  pointer-events: none;
}

.water-flow-animation {
  position: relative;
  width: 100%;
  height: 100%;
}

.flow-drop {
  position: absolute;
  left: 50%;
  top: -20px;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(139, 224, 255, 0.8) 0%, rgba(139, 224, 255, 0.3) 100%);
  border-radius: 50%;
  animation: flowDown 3s ease-in infinite;
}

@keyframes flowDown {
  0% {
    transform: translateY(0) translateX(-50%);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(200px) translateX(-50%);
    opacity: 0;
  }
}

.progress-section {
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.progress-card {
  background: var(--card-surface-strong);
  color: var(--card-foreground);
  backdrop-filter: blur(24px);
  border-radius: var(--radius-large);
  padding: 3rem;
  border: 2px solid var(--card-border);
  box-shadow: var(--card-shadow);
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.progress-title {
  font-size: 1.8rem;
  font-weight: 700;
}

.progress-stats {
  font-size: 2rem;
  font-weight: 700;
}

.progress-raised {
  color: var(--clr-lime);
}

.progress-separator {
  opacity: 0.5;
  margin: 0 0.5rem;
}

.progress-goal {
  opacity: 0.7;
}

.progress-bar-container {
  margin-bottom: 2rem;
}

.progress-bar-track {
  width: 100%;
  height: 40px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--clr-lime) 0%, var(--clr-accent) 100%);
  border-radius: 999px;
  transition: width 1s ease-out;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  position: relative;
  overflow: hidden;
}

.progress-bar-fill::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmerBar 2s ease-in-out infinite;
}

@keyframes shimmerBar {
  0% {
    left: -100%;
  }
  100% {
    left: 200%;
  }
}

.progress-percentage {
  font-weight: 700;
  font-size: 1.1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.progress-footer {
  text-align: center;
}

.progress-message {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.progress-urgency {
  font-size: 1rem;
  opacity: 0.8;
}

.activity-feed {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-large);
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
}

.activity-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.activity-pulse {
  width: 12px;
  height: 12px;
  background: var(--clr-lime);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  animation: slideIn 0.5s ease-out backwards;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.activity-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--clr-accent), var(--clr-lime));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.3rem;
  flex-shrink: 0;
}

.activity-details {
  flex: 1;
}

.activity-donor {
  font-size: 1.05rem;
  margin-bottom: 0.2rem;
}

.activity-amount {
  font-size: 0.95rem;
  opacity: 0.8;
}

.activity-time {
  font-size: 0.9rem;
  opacity: 0.6;
  white-space: nowrap;
}

@media (max-width: 968px) {
  .counter-card--hero {
    grid-column: span 1;
  }

  .live-title {
    font-size: 2.2rem;
  }

  .counter-value {
    font-size: 2.5rem;
  }

  .counter-value--animated {
    font-size: 3.5rem;
  }

  .progress-header {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .activity-item {
    flex-wrap: wrap;
  }

  .activity-time {
    width: 100%;
    text-align: right;
    margin-top: 0.5rem;
  }
}
</style>
