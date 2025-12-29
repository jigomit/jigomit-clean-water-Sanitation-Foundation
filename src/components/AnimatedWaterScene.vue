<script setup>
import { ref, onMounted } from 'vue'

// Generate random particles
const particles = ref([])
const waterDrops = ref([])

onMounted(() => {
  // Generate 50 particles with random positions and delays
  for (let i = 0; i < 50; i++) {
    particles.value.push({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 15,
      duration: Math.random() * 20 + 15,
      opacity: Math.random() * 0.6 + 0.2
    })
  }

  // Generate 15 water drops
  for (let i = 0; i < 15; i++) {
    waterDrops.value.push({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 4,
      size: Math.random() * 30 + 20
    })
  }
})
</script>

<template>
  <div class="animated-water-scene">
    <!-- Animated Background Waves -->
    <div class="water-waves">
      <div class="wave wave--1"></div>
      <div class="wave wave--2"></div>
      <div class="wave wave--3"></div>
    </div>

    <!-- Central Well Visualization -->
    <div class="water-well-container">
      <div class="well-glow"></div>
      <div class="well-circle">
        <div class="well-inner">
          <svg viewBox="0 0 200 200" class="well-svg">
            <!-- Water well icon -->
            <defs>
              <linearGradient id="wellGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#8be0ff" />
                <stop offset="100%" stop-color="#0bb2d4" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <!-- Well structure -->
            <circle cx="100" cy="100" r="70" fill="none" stroke="url(#wellGradient)" stroke-width="4" opacity="0.5"/>
            <circle cx="100" cy="100" r="60" fill="url(#wellGradient)" opacity="0.2"/>

            <!-- Water droplet in center -->
            <path
              d="M100 60 Q115 75 100 95 Q85 75 100 60Z"
              fill="url(#wellGradient)"
              filter="url(#glow)"
              class="center-droplet"
            />

            <!-- Ripple circles -->
            <circle cx="100" cy="100" r="45" fill="none" stroke="#0bb2d4" stroke-width="2" opacity="0.3" class="ripple-1"/>
            <circle cx="100" cy="100" r="55" fill="none" stroke="#0bb2d4" stroke-width="2" opacity="0.2" class="ripple-2"/>
            <circle cx="100" cy="100" r="65" fill="none" stroke="#0bb2d4" stroke-width="2" opacity="0.1" class="ripple-3"/>
          </svg>
        </div>
      </div>

      <!-- Flowing water lines -->
      <div class="water-flow water-flow--1"></div>
      <div class="water-flow water-flow--2"></div>
      <div class="water-flow water-flow--3"></div>
      <div class="water-flow water-flow--4"></div>
    </div>

    <!-- Floating Particles -->
    <div class="particles-container">
      <div
        v-for="particle in particles"
        :key="particle.id"
        class="particle"
        :style="{
          left: particle.left + '%',
          top: particle.top + '%',
          width: particle.size + 'px',
          height: particle.size + 'px',
          animationDelay: particle.delay + 's',
          animationDuration: particle.duration + 's',
          opacity: particle.opacity
        }"
      ></div>
    </div>

    <!-- Falling Water Drops -->
    <div class="water-drops-container">
      <div
        v-for="drop in waterDrops"
        :key="drop.id"
        class="water-drop"
        :style="{
          left: drop.left + '%',
          animationDelay: drop.delay + 's',
          animationDuration: drop.duration + 's',
          fontSize: drop.size + 'px'
        }"
      >
        💧
      </div>
    </div>

    <!-- Mesh Gradient Overlay (Modern Effect) -->
    <div class="mesh-gradient"></div>
  </div>
</template>

<style scoped>
.animated-water-scene {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

/* Animated Background Waves */
.water-waves {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  opacity: 0.4;
}

.wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(11, 178, 212, 0.1) 50%, rgba(11, 178, 212, 0.2) 100%);
  border-radius: 1000px 1000px 0 0;
  animation: waveFlow 20s ease-in-out infinite;
}

.wave--1 {
  animation-duration: 25s;
  opacity: 0.3;
}

.wave--2 {
  animation-duration: 20s;
  animation-delay: -5s;
  opacity: 0.2;
}

.wave--3 {
  animation-duration: 30s;
  animation-delay: -10s;
  opacity: 0.15;
}

@keyframes waveFlow {
  0%, 100% {
    transform: translateX(-25%) translateY(0) scale(1);
  }
  50% {
    transform: translateX(0%) translateY(-20px) scale(1.05);
  }
}

/* Central Well Visualization */
.water-well-container {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.well-glow {
  position: absolute;
  inset: -50px;
  background: radial-gradient(circle, rgba(11, 178, 212, 0.3) 0%, transparent 70%);
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

.well-circle {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(11, 178, 212, 0.1));
  backdrop-filter: blur(20px);
  box-shadow:
    0 8px 32px rgba(11, 178, 212, 0.3),
    inset 0 0 30px rgba(11, 178, 212, 0.1);
  animation: wellFloat 6s ease-in-out infinite;
}

@keyframes wellFloat {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}

.well-inner {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.well-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px rgba(11, 178, 212, 0.4));
}

.center-droplet {
  animation: dropletBounce 2s ease-in-out infinite;
  transform-origin: center;
}

@keyframes dropletBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.05);
  }
}

.ripple-1,
.ripple-2,
.ripple-3 {
  animation: rippleExpand 3s ease-out infinite;
  transform-origin: center;
}

.ripple-2 {
  animation-delay: 1s;
}

.ripple-3 {
  animation-delay: 2s;
}

@keyframes rippleExpand {
  0% {
    r: 35;
    opacity: 0.5;
  }
  100% {
    r: 75;
    opacity: 0;
  }
}

/* Flowing Water Lines */
.water-flow {
  position: absolute;
  width: 3px;
  height: 150px;
  background: linear-gradient(180deg, rgba(11, 178, 212, 0) 0%, rgba(11, 178, 212, 0.6) 50%, rgba(11, 178, 212, 0) 100%);
  filter: blur(2px);
  animation: flowUpward 3s ease-in-out infinite;
}

.water-flow--1 {
  left: 30%;
  bottom: 0;
  animation-delay: 0s;
}

.water-flow--2 {
  left: 45%;
  bottom: 0;
  animation-delay: 0.5s;
}

.water-flow--3 {
  right: 30%;
  bottom: 0;
  animation-delay: 1s;
}

.water-flow--4 {
  right: 45%;
  bottom: 0;
  animation-delay: 1.5s;
}

@keyframes flowUpward {
  0% {
    transform: translateY(0) scaleY(0);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(-400px) scaleY(1);
    opacity: 0;
  }
}

/* Floating Particles */
.particles-container {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(139, 224, 255, 0.8) 0%, rgba(11, 178, 212, 0.4) 100%);
  border-radius: 50%;
  animation: particleFloat 15s ease-in-out infinite;
  filter: blur(1px);
}

@keyframes particleFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(30px, -40px) scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: translate(-20px, -80px) scale(0.9);
    opacity: 0.5;
  }
  75% {
    transform: translate(40px, -60px) scale(1.1);
    opacity: 0.7;
  }
}

/* Falling Water Drops */
.water-drops-container {
  position: absolute;
  inset: 0;
  z-index: 3;
}

.water-drop {
  position: absolute;
  top: -50px;
  animation: dropFall 5s linear infinite;
  filter: drop-shadow(0 2px 8px rgba(11, 178, 212, 0.6));
}

@keyframes dropFall {
  0% {
    transform: translateY(0) scale(0.5) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(calc(100vh + 50px)) scale(1) rotate(20deg);
    opacity: 0;
  }
}

/* Mesh Gradient (Trendy 2024 Effect) */
.mesh-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(at 20% 30%, rgba(139, 224, 255, 0.15) 0%, transparent 50%),
    radial-gradient(at 80% 70%, rgba(73, 211, 145, 0.15) 0%, transparent 50%),
    radial-gradient(at 50% 50%, rgba(21, 121, 212, 0.1) 0%, transparent 60%);
  opacity: 0.6;
  animation: meshShift 20s ease-in-out infinite;
}

@keyframes meshShift {
  0%, 100% {
    transform: scale(1) rotate(0deg);
  }
  50% {
    transform: scale(1.1) rotate(2deg);
  }
}

/* Responsive Adjustments */
@media (max-width: 1200px) {
  .water-well-container {
    width: 350px;
    height: 350px;
  }

  .well-circle {
    width: 240px;
    height: 240px;
  }
}

@media (max-width: 968px) {
  .water-well-container {
    right: 50%;
    transform: translate(50%, -50%);
    width: 300px;
    height: 300px;
    opacity: 0.6;
  }

  .well-circle {
    width: 200px;
    height: 200px;
  }

  .water-flow {
    display: none;
  }

  .particle {
    display: none;
  }
}

@media (max-width: 640px) {
  .water-well-container {
    width: 250px;
    height: 250px;
  }

  .well-circle {
    width: 180px;
    height: 180px;
  }

  .water-drop {
    font-size: 20px;
  }

  /* Reduce particles on mobile for performance */
  .water-drops-container .water-drop:nth-child(n+8) {
    display: none;
  }
}

/* Accessibility: Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .wave,
  .well-glow,
  .well-circle,
  .center-droplet,
  .ripple-1,
  .ripple-2,
  .ripple-3,
  .water-flow,
  .particle,
  .water-drop,
  .mesh-gradient {
    animation: none !important;
  }

  .well-circle {
    transform: none;
  }
}
</style>
