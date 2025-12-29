<script setup>
import ImpactCalculator from '@/components/ImpactCalculator.vue'
import DonationPricingTiers from '@/components/DonationPricingTiers.vue'
import DonationCallToAction from '@/components/DonationCallToAction.vue'
</script>

<template>
  <div class="donate-view view-stack">
    <ImpactCalculator />
    <DonationPricingTiers />
    <DonationCallToAction />
  </div>
</template>

<style scoped>
.donate-view {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #ffffff 0%, #f4fffe 100%);
  display: flex;
  flex-direction: column;
  gap: 0;
  padding-top: clamp(1.5rem, 4vw, 2.5rem);
  position: relative;
}

.view-stack {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-x: hidden;
}
</style>
