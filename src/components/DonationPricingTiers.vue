<script setup>
import { ref } from 'vue'

const selectedTier = ref(null)
const customAmount = ref('')

const pricingTiers = [
  {
    id: 'tier1',
    amount: 10,
    title: 'Water Starter',
    impact: 'Clean water for 1 family for 1 week',
    icon: 'droplet',
    details: [
      '140 liters of filtered water',
      'Weekly hygiene tip via SMS',
      'Impact photo update'
    ],
    popular: false
  },
  {
    id: 'tier2',
    amount: 40,
    title: 'Family Guardian',
    impact: 'Clean water for 1 person for a full month',
    icon: 'family',
    details: [
      '600 liters per person/month',
      'Includes filtration maintenance',
      'Monthly community report',
      'Your name on donor wall'
    ],
    popular: true
  },
  {
    id: 'tier3',
    amount: 120,
    title: 'Hygiene Champion',
    impact: 'Fund 1 complete hygiene workshop + supplies',
    icon: 'education',
    details: [
      '25 students trained',
      'Soap-making kit included',
      'Handwashing station materials',
      'Certificate & photo gallery'
    ],
    popular: false
  },
  {
    id: 'tier4',
    amount: 500,
    title: 'Solar Booster',
    impact: 'Solar pump maintenance for 6 months',
    icon: 'sun',
    details: [
      'Powers 8,000 liters/day',
      'Serves 150+ people',
      'Prevents 2 tons CO₂ emissions',
      'Live telemetry access',
      'Quarterly video updates'
    ],
    popular: false
  },
  {
    id: 'tier5',
    amount: 2500,
    title: 'Filter Founder',
    impact: 'Install complete filtration system',
    icon: 'filter',
    details: [
      'Serves 200 people daily',
      '0.2-micron WHO-grade filtration',
      'Trained local maintenance crew',
      'Named dedication plaque',
      'Visit invitation (optional)'
    ],
    popular: false
  },
  {
    id: 'tier6',
    amount: 8500,
    title: 'Well Builder',
    impact: 'Build a complete deep-bore well',
    icon: 'well',
    details: [
      'Up to 22,000 liters/day capacity',
      'Serves entire community (500+ people)',
      'Solar-powered with telemetry',
      'Your choice of community',
      '10-year maintenance guarantee',
      'Dedication ceremony video',
      'Adopt-a-Well dashboard access'
    ],
    popular: false
  }
]

const selectTier = (tier) => {
  selectedTier.value = tier.id
  customAmount.value = tier.amount.toString()
}

const isSubmitted = ref(false)

const handleDonate = () => {
  const amount = customAmount.value || (selectedTier.value ? pricingTiers.find(t => t.id === selectedTier.value)?.amount : 0)
  if (amount) {
    // Show success view
    isSubmitted.value = true
    // In production, this would redirect to payment processor
    // window.location.href = `mailto:hello@lifespringwater.org?subject=Donation - $${amount}&body=I would like to donate $${amount} to LifeSpring Water Foundation.`
  }
}
</script>

<template>
  <section class="pricing-tiers" aria-labelledby="pricing-heading">
    <div class="content-max">
      <!-- Success View -->
      <div v-if="isSubmitted" class="pricing-success" data-reveal>
        <div class="pricing-success-card">
          <div class="success-icon">✓</div>
          <h2 class="success-title">Thank You for Your Donation!</h2>
          <p class="success-message">
            Your contribution of <strong>${{ customAmount || (selectedTier ? pricingTiers.find(t => t.id === selectedTier)?.amount : 0) }}</strong> will make a real difference in providing clean water and sanitation to communities in need.
          </p>
          <div class="success-details">
            <p>You will receive a confirmation email shortly with details about your donation and how to track your impact.</p>
            <p>100% of your donation goes directly to the field to support our water, sanitation, and hygiene programs.</p>
          </div>
          <button class="btn-modern btn-modern--primary btn-modern--large" @click="isSubmitted = false" aria-label="Make another donation">
            <span>Make Another Donation</span>
          </button>
        </div>
      </div>

      <!-- Form View -->
      <div v-else>
        <div class="pricing-header" data-reveal>
          <p class="eyebrow-modern">Make Your Impact</p>
          <h2 id="pricing-heading" class="section-title-modern">Choose Your Contribution</h2>
          <p class="pricing-subtitle">
            Every dollar creates measurable change. Select a tier or enter a custom amount.
          </p>
        </div>

        <div class="tiers-grid">
        <div
          v-for="tier in pricingTiers"
          :key="tier.id"
          class="tier-card"
          :class="{
            'tier-card--selected': selectedTier === tier.id,
            'tier-card--popular': tier.popular
          }"
          @click="selectTier(tier)"
          data-reveal
        >
          <div v-if="tier.popular" class="tier-badge">Most Popular</div>

          <div class="tier-icon" :data-icon="tier.icon"></div>

          <div class="tier-amount">
            <span class="tier-currency">$</span>
            <span class="tier-number">{{ tier.amount.toLocaleString() }}</span>
          </div>

          <h3 class="tier-title">{{ tier.title }}</h3>

          <p class="tier-impact">{{ tier.impact }}</p>

          <ul class="tier-details">
            <li v-for="(detail, index) in tier.details" :key="index">
              <span class="tier-check">✓</span>
              {{ detail }}
            </li>
          </ul>

          <div class="tier-button-wrapper">
            <button
              class="tier-button"
              :class="{ 'tier-button--selected': selectedTier === tier.id }"
              @click.stop="selectTier(tier)"
              :aria-label="selectedTier === tier.id ? `Selected: ${tier.name} tier` : `Select ${tier.name} tier`"
              :aria-pressed="selectedTier === tier.id"
            >
              {{ selectedTier === tier.id ? 'Selected' : 'Select' }}
            </button>
          </div>
        </div>
      </div>

      <div class="custom-amount-section" data-reveal>
        <div class="custom-amount-card">
          <h3 class="custom-amount-title">Or Enter Custom Amount</h3>
          <div class="custom-amount-input-group">
            <span class="custom-amount-currency">$</span>
            <label for="custom-amount-input" class="sr-only">Enter custom donation amount in dollars</label>
            <input
              id="custom-amount-input"
              v-model="customAmount"
              type="number"
              min="5"
              placeholder="Enter amount"
              class="custom-amount-input"
              aria-label="Enter custom donation amount in dollars"
              @focus="selectedTier = null"
            />
          </div>
          <p class="custom-amount-hint">Minimum $5 • Suggested: $40/month for sustained impact</p>
        </div>
      </div>

      <div class="pricing-actions" data-reveal>
        <button
          class="btn-modern btn-modern--primary btn-modern--large"
          @click="handleDonate"
          :disabled="!customAmount && !selectedTier"
          :aria-label="!customAmount && !selectedTier ? 'Please select a donation tier or enter a custom amount' : 'Continue to secure donation'"
          aria-describedby="pricing-security"
        >
          <span>Continue to Secure Donation</span>
        </button>
        <p id="pricing-security" class="pricing-security">
          🔒 Secure payment • 100% goes to the field • Tax-deductible
        </p>
      </div>

        <div class="pricing-trust" data-reveal>
          <div class="trust-stats">
            <div class="trust-stat">
              <div class="trust-stat__value">100%</div>
              <div class="trust-stat__label">To the field</div>
            </div>
            <div class="trust-stat">
              <div class="trust-stat__value">12,437</div>
              <div class="trust-stat__label">Monthly donors</div>
            </div>
            <div class="trust-stat">
              <div class="trust-stat__value">4.9★</div>
              <div class="trust-stat__label">Charity rating</div>
            </div>
            <div class="trust-stat">
              <div class="trust-stat__value">99%</div>
              <div class="trust-stat__label">Uptime guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pricing-tiers {
  padding: 5rem 0;
  background: transparent;
}

.pricing-header {
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
}

.pricing-subtitle {
  font-size: 1.1rem;
  color: var(--clr-muted);
  margin-top: 1rem;
}

.tiers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.tier-card {
  position: relative;
  background: var(--card-surface);
  color: var(--card-foreground);
  border-radius: var(--radius-large);
  padding: 2rem;
  box-shadow: var(--card-shadow);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  border: 3px solid var(--card-border);
  backdrop-filter: blur(24px);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 500px;
}

.tier-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 35px 75px -30px rgba(0, 0, 0, 0.85);
}

.tier-card--selected {
  border-color: var(--clr-accent);
  background: var(--card-surface-strong);
  transform: translateY(-8px) scale(1.02);
}

.tier-card--popular {
  border-color: var(--clr-lime);
}

.tier-badge {
  position: absolute;
  top: -12px;
  right: 20px;
  background: linear-gradient(135deg, var(--clr-lime), #35c47f);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(73, 211, 145, 0.4);
}

.tier-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--clr-accent), #0891b8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.tier-icon::before {
  content: '💧';
}

.tier-icon[data-icon="family"]::before {
  content: '👨‍👩‍👧';
}

.tier-icon[data-icon="education"]::before {
  content: '📚';
}

.tier-icon[data-icon="sun"]::before {
  content: '☀️';
}

.tier-icon[data-icon="filter"]::before {
  content: '🔬';
}

.tier-icon[data-icon="well"]::before {
  content: '🏗️';
}

.tier-amount {
  text-align: center;
  line-height: 1;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.15rem;
  min-height: 3.5rem;
}

.tier-currency {
  font-size: 2.2rem;
  font-weight: 700;
  color: #0bb2d4;
  opacity: 1;
  display: inline-block;
  vertical-align: baseline;
  line-height: 1;
}

.tier-number {
  font-size: 3.5rem;
  font-weight: 800;
  color: #0bb2d4;
  line-height: 1;
  display: inline-block;
}

.tier-title {
  text-align: center;
  font-size: 1.3rem;
  font-weight: 700;
  color: rgba(200, 244, 255, 0.85);
  margin-bottom: 1rem;
}

.tier-impact {
  text-align: center;
  color: var(--clr-accent);
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
  min-height: 3em;
}

.tier-details {
  list-style: none;
  padding: 0;
  margin: 0 0 auto 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tier-details li {
  padding: 0.5rem 0;
  color: rgba(223, 245, 252, 0.9);
  font-size: 0.95rem;
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
}

.tier-check {
  color: var(--clr-lime);
  font-weight: 700;
  flex-shrink: 0;
}

.tier-button-wrapper {
  margin-top: auto;
  padding-top: 1.5rem;
  width: 100%;
}

.tier-button {
  width: 100%;
  padding: 1rem;
  border: 2px solid #0bb2d4;
  background: #ffffff;
  color: #0bb2d4;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.05rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 48px;
  isolation: isolate;
}

.tier-button > *,
.tier-button span {
  position: relative;
  z-index: 10;
  color: inherit;
}

.tier-button:hover {
  background: #0bb2d4;
  color: #ffffff !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.3);
  z-index: 10;
}

.tier-button:hover,
.tier-button:hover *,
.tier-button:hover > *,
.tier-button:hover span,
.tier-button:hover text {
  color: #ffffff !important;
  z-index: 10;
  opacity: 1 !important;
  visibility: visible !important;
}

.tier-button--selected {
  background: #0bb2d4;
  color: #ffffff !important;
  border-color: #0bb2d4;
  box-shadow: 0 4px 12px rgba(11, 178, 212, 0.3);
  z-index: 10;
}

.tier-button--selected,
.tier-button--selected *,
.tier-button--selected > *,
.tier-button--selected span,
.tier-button--selected text {
  color: #ffffff !important;
  z-index: 10;
  opacity: 1 !important;
  visibility: visible !important;
}

.tier-button--selected:hover {
  background: #0a9fc0;
  border-color: #0a9fc0;
  color: #ffffff !important;
}

.tier-button--selected:hover,
.tier-button--selected:hover *,
.tier-button--selected:hover > *,
.tier-button--selected:hover span,
.tier-button--selected:hover text {
  color: #ffffff !important;
  opacity: 1 !important;
  visibility: visible !important;
}

.custom-amount-section {
  max-width: 600px;
  margin: 0 auto 3rem;
}

.custom-amount-card {
  background: var(--card-surface);
  color: var(--card-foreground);
  padding: 2.5rem;
  border-radius: var(--radius-large);
  box-shadow: var(--card-shadow);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(24px);
  text-align: center;
}

.custom-amount-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--card-foreground);
  margin-bottom: 1.5rem;
}

.custom-amount-input-group {
  position: relative;
  max-width: 400px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.3rem;
  background: rgba(15, 53, 88, 0.05);
  border: 3px solid var(--card-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.custom-amount-input-group:focus-within {
  border-color: var(--clr-accent);
  box-shadow: 0 0 0 4px rgba(11, 178, 212, 0.2);
  background: rgba(15, 53, 88, 0.08);
}

.custom-amount-currency {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0bb2d4;
  display: inline-block;
  line-height: 1;
  opacity: 1;
  flex-shrink: 0;
  margin-right: 0.1rem;
}

.custom-amount-input {
  flex: 0 1 auto;
  min-width: 120px;
  max-width: 250px;
  padding: 0;
  border: none;
  border-radius: 0;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--clr-deep);
  background: transparent;
  text-align: left;
  transition: all 0.3s ease;
}

.custom-amount-input:focus {
  outline: none;
  color: var(--clr-accent);
}

.custom-amount-hint {
  color: var(--card-muted);
  font-size: 0.95rem;
}

.pricing-actions {
  text-align: center;
  margin-bottom: 3rem;
}

.pricing-actions button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pricing-security {
  margin-top: 1rem;
  color: var(--clr-muted);
  font-size: 0.95rem;
}

.pricing-trust {
  background: var(--card-surface);
  color: var(--card-foreground);
  padding: 2.5rem;
  border-radius: var(--radius-large);
  box-shadow: var(--card-shadow);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(24px);
}

.trust-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
  text-align: center;
}

.trust-stat__value {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--clr-accent);
  line-height: 1;
  margin-bottom: 0.5rem;
}

.trust-stat__label {
  color: var(--card-muted);
  font-size: 0.95rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .tiers-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .tier-amount {
    min-height: 3rem;
  }

  .tier-currency {
    font-size: 1.8rem;
  }

  .tier-number {
    font-size: 2.8rem;
  }

  .custom-amount-input-group {
    padding: 1.2rem;
    gap: 0.25rem;
    align-items: baseline;
  }

  .custom-amount-input {
    font-size: 2rem;
    min-width: 100px;
    max-width: 200px;
  }

  .custom-amount-currency {
    font-size: 2rem;
    margin-right: 0.05rem;
  }

  .trust-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Success View Styles */
.pricing-success {
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  background: #1a3a4a;
  min-height: 100vh;
  padding: 4rem 0;
}

.pricing-success-card {
  background: linear-gradient(135deg, #15303d 0%, #0f2540 50%, #15303d 100%);
  color: #ffffff;
  border-radius: 24px;
  padding: clamp(3rem, 6vw, 5rem) clamp(2.5rem, 5vw, 4rem);
  box-shadow: 
    0 20px 60px rgba(15, 53, 88, 0.4),
    0 8px 24px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(11, 178, 212, 0.3);
  backdrop-filter: blur(24px);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.pricing-success-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 30%, rgba(11, 178, 212, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(73, 211, 145, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.pricing-success-card > * {
  position: relative;
  z-index: 1;
}

.success-icon {
  width: clamp(70px, 10vw, 90px);
  height: clamp(70px, 10vw, 90px);
  margin: 0 auto clamp(1.5rem, 3vw, 2.5rem);
  background: linear-gradient(135deg, #49d391 0%, #0bb2d4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: white;
  font-weight: 700;
  box-shadow: 
    0 10px 40px rgba(73, 211, 145, 0.5),
    0 4px 16px rgba(11, 178, 212, 0.3);
  animation: successPulse 0.6s ease-out;
}

@keyframes successPulse {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.success-title {
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 800;
  color: #abdcef;
  margin-bottom: clamp(1.25rem, 2.5vw, 1.75rem);
  line-height: 1.25;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 20px rgba(171, 220, 239, 0.5);
  opacity: 1;
}

.success-message {
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  color: #e0e0e0;
  margin-bottom: clamp(1.75rem, 3.5vw, 2.5rem);
  line-height: 1.7;
  text-shadow: 0 1px 10px rgba(0, 0, 0, 0.3);
  opacity: 1;
}

.success-message strong {
  color: #0bb2d4;
  font-weight: 700;
  font-size: 1.15em;
  text-shadow: 0 2px 12px rgba(11, 178, 212, 0.6);
  opacity: 1;
}

.success-details {
  background: rgba(21, 48, 61, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: clamp(1.75rem, 3.5vw, 2.5rem);
  margin: clamp(1.75rem, 3.5vw, 2.5rem) 0;
  border: 1px solid rgba(11, 178, 212, 0.3);
  text-align: left;
}

.success-details p {
  font-size: clamp(0.95rem, 1.9vw, 1.1rem);
  color: #e0e0e0;
  line-height: 1.7;
  margin-bottom: 1.25rem;
  text-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  opacity: 1;
}

.success-details h3 {
  color: rgba(11, 178, 212, 0.8);
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  opacity: 1;
}

.success-details p:last-child {
  margin-bottom: 0;
}

.pricing-success-card .btn-modern {
  margin-top: clamp(1.5rem, 3vw, 2rem);
  box-shadow: 0 8px 24px rgba(11, 178, 212, 0.4);
}

.pricing-success-card .btn-modern:hover {
  box-shadow: 0 12px 32px rgba(11, 178, 212, 0.5);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .pricing-success-card {
    padding: 3rem 2rem;
    border-radius: 20px;
  }

  .success-title {
    font-size: 2rem;
  }

  .success-message {
    font-size: 1.15rem;
  }

  .success-icon {
    width: 70px;
    height: 70px;
    font-size: 2.5rem;
  }

  .success-details {
    padding: 1.75rem;
  }
}

@media (max-width: 480px) {
  .pricing-success-card {
    padding: 2.5rem 1.5rem;
    border-radius: 16px;
  }

  .success-title {
    font-size: 1.75rem;
  }

  .success-message {
    font-size: 1.05rem;
  }

  .success-details {
    padding: 1.5rem;
  }
}
</style>
