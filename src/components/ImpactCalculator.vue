<script setup>
import { ref, computed } from 'vue'

const donationAmount = ref(40)
const selectedFrequency = ref('monthly')

const frequencies = [
  { id: 'once', label: 'One-time', multiplier: 1 },
  { id: 'monthly', label: 'Monthly', multiplier: 12 },
  { id: 'yearly', label: 'Yearly', multiplier: 1 }
]

// Impact calculations based on real costs
const impactData = {
  litersPerDollar: 200, // $1 = 200 liters over the year
  hygieneWorkshopCost: 120, // $120 for one complete workshop
  wellMaintenancePerMonth: 85, // $85/month for solar pump maintenance
  fullWellCost: 8500, // Complete well installation
  filtrationSystemCost: 2500, // Complete filtration system
  peoplePerLiterDaily: 0.01, // How many people served per liter/day
}

// Calculate yearly impact based on frequency
const yearlyAmount = computed(() => {
  const freq = frequencies.find(f => f.id === selectedFrequency.value)
  return donationAmount.value * (freq?.multiplier || 1)
})

// Calculated impacts
const impacts = computed(() => {
  const amount = yearlyAmount.value

  return {
    liters: Math.floor(amount * impactData.litersPerDollar),
    people: Math.floor((amount * impactData.litersPerDollar) / 365 * impactData.peoplePerLiterDaily),
    workshops: Math.floor(amount / impactData.hygieneWorkshopCost),
    monthsOfMaintenance: Math.floor(amount / impactData.wellMaintenancePerMonth),
    percentOfWell: ((amount / impactData.fullWellCost) * 100).toFixed(1),
    percentOfFilter: ((amount / impactData.filtrationSystemCost) * 100).toFixed(1),
    familiesForMonth: Math.floor(amount / 40), // $40 serves 1 family for a month
    soapKits: Math.floor(amount / 15), // $15 per soap-making kit
    handwashingStations: Math.floor(amount / 75), // $75 per handwashing station
  }
})

// Generate visual impact items
const visualImpacts = computed(() => {
  const items = []
  const amount = yearlyAmount.value

  // Primary impacts
  items.push({
    icon: '💧',
    value: impacts.value.liters.toLocaleString(),
    label: 'Liters of clean water',
    highlight: true
  })

  items.push({
    icon: '👥',
    value: impacts.value.people.toLocaleString(),
    label: 'People served daily',
    highlight: true
  })

  // Secondary impacts based on amount
  if (amount >= 120) {
    items.push({
      icon: '📚',
      value: impacts.value.workshops,
      label: 'Hygiene workshops funded'
    })
  }

  if (amount >= 85) {
    items.push({
      icon: '☀️',
      value: impacts.value.monthsOfMaintenance,
      label: 'Months of solar pump operation'
    })
  }

  if (amount >= 75) {
    items.push({
      icon: '🚰',
      value: impacts.value.handwashingStations,
      label: 'Handwashing stations'
    })
  }

  if (amount >= 40) {
    items.push({
      icon: '👨‍👩‍👧',
      value: impacts.value.familiesForMonth,
      label: 'Families served for a month'
    })
  }

  if (amount >= 15) {
    items.push({
      icon: '🧼',
      value: impacts.value.soapKits,
      label: 'Soap-making kits'
    })
  }

  return items
})

// Progress bars for big-ticket items
const bigTicketProgress = computed(() => {
  return [
    {
      name: 'Complete Well',
      cost: impactData.fullWellCost,
      percentage: Math.min(100, parseFloat(impacts.value.percentOfWell)),
      icon: '🏗️'
    },
    {
      name: 'Filtration System',
      cost: impactData.filtrationSystemCost,
      percentage: Math.min(100, parseFloat(impacts.value.percentOfFilter)),
      icon: '🔬'
    }
  ]
})

const isSubmitted = ref(false)

const handleDonate = () => {
  const amount = donationAmount.value
  const freq = selectedFrequency.value
  // Show success view
  isSubmitted.value = true
  // In production, this would redirect to payment processor
  // window.location.href = `mailto:hello@lifespringwater.org?subject=Donation - $${amount} ${freq}&body=I would like to donate $${amount} ${freq} to LifeSpring Water Foundation.`
}
</script>

<template>
  <section class="impact-calculator" aria-labelledby="calculator-heading">
    <div class="content-max">
      <div class="calculator-header" data-reveal>
        <p class="eyebrow-modern">Impact Calculator</p>
        <h2 id="calculator-heading" class="section-title-modern">
          See Your Impact in Real-Time
        </h2>
        <p class="calculator-subtitle">
          Drag the slider to explore what your contribution can achieve
        </p>
      </div>

      <div class="calculator-container" data-reveal>
        <!-- Success View -->
        <div v-if="isSubmitted" class="calculator-card calculator-card--success">
          <div class="success-content">
            <div class="success-icon">✓</div>
            <h2 class="success-title">Thank You for Your Donation!</h2>
            <p class="success-message">
              Your contribution of <strong>${{ donationAmount }} {{ selectedFrequency }}</strong> will make a real difference in providing clean water and sanitation to communities in need.
            </p>
            <div class="success-impact">
              <h3>Your Impact:</h3>
              <ul class="success-impact-list">
                <li>💧 {{ impacts.liters.toLocaleString() }} liters of clean water</li>
                <li>👥 {{ impacts.people.toLocaleString() }} people served daily</li>
                <li v-if="yearlyAmount >= 120">📚 {{ impacts.workshops }} hygiene workshops</li>
                <li v-if="yearlyAmount >= 85">☀️ {{ impacts.monthsOfMaintenance }} months of solar pump operation</li>
              </ul>
            </div>
            <p class="success-next">
              You will receive a confirmation email shortly with details about your donation and how to track your impact.
            </p>
            <button class="btn-modern btn-modern--primary" @click="isSubmitted = false">
              <span>Make Another Donation</span>
            </button>
          </div>
        </div>

        <!-- Form View -->
        <div v-else class="calculator-card">
          <!-- Amount Slider -->
          <div class="calculator-input-section">
            <div class="amount-display">
              <span class="currency">$</span>
              <input
                v-model.number="donationAmount"
                type="number"
                min="5"
                max="10000"
                step="5"
                class="amount-input"
              />
            </div>

            <input
              v-model.number="donationAmount"
              type="range"
              min="5"
              max="1000"
              step="5"
              class="amount-slider"
            />

            <div class="slider-labels">
              <span>$5</span>
              <span>$500</span>
              <span>$1,000+</span>
            </div>

            <!-- Frequency Selector -->
            <div class="frequency-selector">
              <button
                v-for="freq in frequencies"
                :key="freq.id"
                class="frequency-button"
                :class="{ 'frequency-button--active': selectedFrequency === freq.id }"
                @click="selectedFrequency = freq.id"
              >
                {{ freq.label }}
              </button>
            </div>

            <div class="yearly-summary">
              <strong>${{ yearlyAmount.toLocaleString() }}</strong> total impact this year
            </div>
          </div>

          <!-- Visual Impact Grid -->
          <div class="impact-grid">
            <div
              v-for="(impact, index) in visualImpacts"
              :key="index"
              class="impact-item"
            >
              <div class="impact-icon">{{ impact.icon }}</div>
              <div class="impact-value">{{ impact.value }}</div>
              <div class="impact-label">{{ impact.label }}</div>
            </div>
          </div>

          <!-- Big Ticket Progress -->
          <div class="big-ticket-section">
            <h3 class="big-ticket-title">Your contribution toward major projects:</h3>
            <div class="big-ticket-grid">
              <div
                v-for="project in bigTicketProgress"
                :key="project.name"
                class="big-ticket-card"
              >
                <div class="big-ticket-header">
                  <span class="big-ticket-icon">{{ project.icon }}</span>
                  <div>
                    <div class="big-ticket-name">{{ project.name }}</div>
                    <div class="big-ticket-cost">${{ project.cost.toLocaleString() }}</div>
                  </div>
                </div>
                <div class="big-ticket-progress-bar">
                  <div
                    class="big-ticket-progress-fill"
                    :style="{ width: project.percentage + '%' }"
                  >
                    <span v-if="project.percentage >= 15" class="progress-text">
                      {{ project.percentage }}%
                    </span>
                  </div>
                </div>
                <div class="big-ticket-message">
                  <span v-if="project.percentage >= 100">
                    ✅ You can fund this completely!
                  </span>
                  <span v-else>
                    {{ project.percentage }}% of the total cost
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="calculator-cta">
            <button
              class="btn-modern btn-modern--primary btn-modern--large"
              @click="handleDonate"
            >
              <span>Donate ${{ donationAmount }} {{ selectedFrequency }}</span>
            </button>
            <p class="calculator-guarantee">
              💯 100% goes to the field • 🔒 Secure & tax-deductible • 📊 Track your impact
            </p>
          </div>
        </div>

        <!-- Side Information -->
        <div class="calculator-side" data-reveal>
          <div class="side-card">
            <h3 class="side-title">Why this matters</h3>
            <ul class="side-list">
              <li>
                <strong>Transparent pricing:</strong> Every dollar is tracked from donation to deployment
              </li>
              <li>
                <strong>Proven impact:</strong> Telemetry confirms water delivery daily
              </li>
              <li>
                <strong>Sustainable:</strong> Local training ensures systems run for years
              </li>
              <li>
                <strong>Empowering:</strong> Communities own and operate their infrastructure
              </li>
            </ul>
          </div>

          <div class="side-card side-card--highlight">
            <h3 class="side-title">💡 Smart Giving Tip</h3>
            <p>
              Monthly donations create predictable funding that allows us to plan multi-year projects and
              hire local maintenance crews. A <strong>$40/month commitment</strong> has 3x more impact
              than a $480 one-time gift!
            </p>
          </div>

          <div class="side-testimonial">
            <div class="testimonial-quote">"</div>
            <p class="testimonial-text">
              Seeing exactly where my $50/month goes - from the well pump to the hygiene workshop -
              makes me confident I'm making a real difference.
            </p>
            <div class="testimonial-author">
              <strong>Sarah M.</strong>
              <span>Monthly donor since 2022</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.impact-calculator {
  padding: 6rem 0;
  background: #0f3558;
  position: relative;
  width: 100%;
}

.calculator-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.calculator-header .eyebrow-modern {
  color: rgba(255, 255, 255, 0.9);
}

.calculator-header .section-title-modern {
  color: #ffffff;
}

.calculator-subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 1rem;
}

.calculator-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  align-items: start;
}

.calculator-card {
  background: var(--card-surface);
  color: var(--card-foreground);
  border-radius: var(--radius-large);
  padding: 3rem;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(24px);
}

.calculator-input-section {
  margin-bottom: 3rem;
}

.amount-display {
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
}

.currency {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  display: inline-block;
  line-height: 1;
  opacity: 1;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
  margin-right: 0.15rem;
}

.amount-input {
  font-size: 4.5rem;
  font-weight: 800;
  color: #0bb2d4;
  border: none;
  text-align: left;
  width: auto;
  min-width: 180px;
  max-width: 400px;
  background: transparent;
  padding: 0;
  line-height: 1;
  display: inline-block;
  flex-shrink: 0;
}

.amount-input:focus {
  outline: none;
}

.amount-slider {
  width: 100%;
  height: 12px;
  -webkit-appearance: none;
  appearance: none;
  background: linear-gradient(90deg, #e0f7ff 0%, #0bb2d4 100%);
  border-radius: 999px;
  outline: none;
  margin-bottom: 0.5rem;
}

.amount-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--clr-accent), var(--clr-lime));
  border-radius: 50%;
  cursor: grab;
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.4);
  transition: all 0.2s ease;
}

.amount-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 20px rgba(11, 178, 212, 0.6);
}

.amount-slider::-webkit-slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.25);
}

.amount-slider::-moz-range-thumb {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--clr-accent), var(--clr-lime));
  border-radius: 50%;
  cursor: grab;
  border: none;
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.4);
  transition: all 0.2s ease;
}

.amount-slider::-moz-range-thumb:hover {
  transform: scale(1.15);
}

.amount-slider::-moz-range-thumb:active {
  cursor: grabbing;
  transform: scale(1.25);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}

.frequency-selector {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 0.5rem;
  border-radius: 12px;
  overflow: visible;
  visibility: visible;
  backdrop-filter: blur(10px);
}

.frequency-button {
  flex: 1;
  padding: 1rem;
  border: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: visible;
  visibility: visible;
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  white-space: nowrap;
  position: relative;
  z-index: 1;
}

.frequency-button:hover {
  background: rgba(11, 178, 212, 0.15);
  color: #ffffff !important;
  z-index: 2;
}

.frequency-button:hover > *,
.frequency-button:hover span,
.frequency-button:hover text {
  color: #ffffff !important;
  z-index: 2;
  opacity: 1;
  visibility: visible;
}

.frequency-button--active {
  background: linear-gradient(135deg, #0bb2d4, #0891b8);
  color: #ffffff !important;
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.3);
  overflow: visible;
  visibility: visible;
  opacity: 1;
  z-index: 2;
  position: relative;
}

.frequency-button--active > *,
.frequency-button--active span,
.frequency-button--active text {
  color: #ffffff !important;
  z-index: 2;
  opacity: 1;
  visibility: visible;
}

.frequency-button--active:hover {
  background: linear-gradient(135deg, #0a9fc0, #0780a0);
  color: #ffffff !important;
}

.frequency-button--active:hover > *,
.frequency-button--active:hover span,
.frequency-button--active:hover text {
  color: #ffffff !important;
  opacity: 1;
  visibility: visible;
}

.yearly-summary {
  text-align: center;
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  padding: 1.5rem;
  background: rgba(11, 178, 212, 0.15);
  border-radius: 12px;
  border: 1px solid rgba(11, 178, 212, 0.3);
  overflow: visible;
  visibility: visible;
  opacity: 1;
  display: block;
  width: 100%;
  box-sizing: border-box;
}

.yearly-summary strong {
  color: #0bb2d4;
  font-size: 1.4rem;
  overflow: visible;
  visibility: visible;
  opacity: 1;
  display: inline-block;
  font-weight: 700;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.impact-item {
  text-align: center;
  padding: 2rem 1.5rem;
  background: #0f3558;
  border-radius: 20px;
  border: 1px solid rgba(11, 178, 212, 0.2);
  transition: all 0.3s ease;
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

.impact-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 15% 20%, rgba(11, 178, 212, 0.15), transparent 60%);
  opacity: 0.3;
  z-index: 0;
  pointer-events: none;
}

.impact-item > * {
  position: relative;
  z-index: 1;
}

.impact-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(11, 178, 212, 0.25);
  border-color: rgba(11, 178, 212, 0.4);
}

.impact-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.impact-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0bb2d4;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.impact-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.big-ticket-section {
  padding-top: 2rem;
  border-top: 2px solid rgba(11, 178, 212, 0.3);
  margin-bottom: 2rem;
}

.big-ticket-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 1.5rem;
}

.big-ticket-grid {
  display: grid;
  gap: 1.5rem;
}

.big-ticket-card {
  background: var(--card-surface);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--card-border);
  color: var(--card-foreground);
  box-shadow: var(--card-shadow);
  backdrop-filter: blur(24px);
}

.big-ticket-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.big-ticket-icon {
  font-size: 2.5rem;
}

.big-ticket-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--card-foreground);
}

.big-ticket-cost {
  font-size: 0.9rem;
  color: var(--card-muted);
}

.big-ticket-progress-bar {
  height: 30px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 999px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.big-ticket-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--clr-lime), var(--clr-accent));
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-text {
  font-weight: 700;
  font-size: 0.9rem;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.big-ticket-message {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

.calculator-cta {
  text-align: center;
}

.calculator-guarantee {
  margin-top: 1rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
}

.calculator-side {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.side-card {
  background: var(--card-surface);
  padding: 2rem;
  border-radius: 20px;
  box-shadow: var(--card-shadow);
  border: 1px solid var(--card-border);
  color: var(--card-foreground);
  backdrop-filter: blur(24px);
}

.side-card--highlight {
  background: var(--card-surface-strong);
  border-color: var(--clr-lime);
}

.side-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--card-foreground);
  margin-bottom: 1rem;
}

.side-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.side-list li {
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--card-muted);
}

.side-list li:last-child {
  border-bottom: none;
}

.side-list strong {
  color: var(--clr-accent);
  font-weight: 600;
}

.side-testimonial {
  background: linear-gradient(135deg, #0f3558 0%, #1a4d7a 100%);
  color: white;
  padding: 2rem;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 20px 40px -20px rgba(15, 53, 88, 0.4);
}

.testimonial-quote {
  font-size: 5rem;
  line-height: 0.5;
  opacity: 0.2;
  margin-bottom: 1rem;
}

.testimonial-text {
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.testimonial-author strong {
  font-size: 1.1rem;
}

.testimonial-author span {
  font-size: 0.9rem;
  opacity: 0.8;
}

@media (max-width: 968px) {
  .calculator-container {
    grid-template-columns: 1fr;
  }

  .amount-display {
    gap: 0.2rem;
  }

  .amount-input {
    font-size: 3.5rem;
    min-width: 140px;
    max-width: 300px;
  }

  .currency {
    font-size: 2.8rem;
    margin-right: 0.1rem;
  }

  .impact-grid {
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  }

  .impact-value {
    font-size: 2rem;
  }
}

@media (max-width: 640px) {
  .frequency-selector {
    flex-direction: column;
  }

  .calculator-card {
    padding: 2rem 1.5rem;
  }
}

/* Success View Styles */
.calculator-card--success {
  text-align: center;
}

.success-content {
  max-width: 600px;
  margin: 0 auto;
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: linear-gradient(135deg, var(--clr-lime), var(--clr-accent));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(73, 211, 145, 0.4);
  animation: successPulse 0.6s ease-out;
}

@keyframes successPulse {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--clr-deep);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.success-message {
  font-size: 1.2rem;
  color: var(--card-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.success-message strong {
  color: var(--clr-accent);
  font-weight: 700;
}

.success-impact {
  background: linear-gradient(135deg, rgba(11, 178, 212, 0.05), rgba(73, 211, 145, 0.05));
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid rgba(11, 178, 212, 0.2);
}

.success-impact h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--clr-deep);
  margin-bottom: 1rem;
}

.success-impact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: left;
  max-width: 400px;
  margin: 0 auto;
}

.success-impact-list li {
  padding: 0.75rem 0;
  font-size: 1.1rem;
  color: var(--card-foreground);
  border-bottom: 1px solid rgba(11, 178, 212, 0.1);
}

.success-impact-list li:last-child {
  border-bottom: none;
}

.success-next {
  font-size: 1rem;
  color: var(--card-muted);
  margin: 2rem 0;
  line-height: 1.6;
}

@media (max-width: 640px) {
  .success-title {
    font-size: 2rem;
  }

  .success-message {
    font-size: 1.1rem;
  }

  .success-icon {
    width: 60px;
    height: 60px;
    font-size: 2rem;
  }
}
</style>
