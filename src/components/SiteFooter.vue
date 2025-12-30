<script setup>
import { footerData } from '@/data/content'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import SiteLogo from '@/components/SiteLogo.vue'

const currentYear = new Date().getFullYear()
const newsletterEmail = ref('')
const isNewsletterSubmitted = ref(false)

const handleNewsletterSubmit = () => {
  if (newsletterEmail.value) {
    // Newsletter signup logic would go here
    isNewsletterSubmitted.value = true
    // In production, this would submit to newsletter service
  }
}
</script>

<template>
  <footer class="site-footer" aria-label="Foundation footer">
    <div class="content-max">
      <!-- Footer Bar - Top Section with Navigation Links -->
      <div class="footer-bar">
        <!-- Column 1: Our Programs -->
        <div class="footer-bar__column">
          <h4 class="footer-bar__title">OUR PROGRAMS</h4>
          <ul class="footer-bar__links">
            <li v-for="link in footerData.quickLinks.programs" :key="link.label">
              <RouterLink :to="link.to" class="footer-bar__link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Column 3: About Us -->
        <div class="footer-bar__column">
          <h4 class="footer-bar__title">ABOUT US</h4>
          <ul class="footer-bar__links">
            <li v-for="link in footerData.quickLinks.about" :key="link.label">
              <RouterLink :to="link.to" class="footer-bar__link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Column 4: Resources -->
        <div class="footer-bar__column">
          <h4 class="footer-bar__title">RESOURCES</h4>
          <ul class="footer-bar__links">
            <li v-for="link in footerData.quickLinks.resources" :key="link.label">
              <RouterLink :to="link.to" class="footer-bar__link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>

        <!-- Column 5: Contact Us -->
        <div class="footer-bar__column">
          <h4 class="footer-bar__title">CONTACT US</h4>
          <div class="footer-bar__contact">
            <div class="footer-bar__contact-item">
              <span class="footer-bar__contact-icon">📧</span>
              <a :href="`mailto:${footerData.contact.email}`" class="footer-bar__contact-link">
                {{ footerData.contact.email }}
              </a>
            </div>
            <div class="footer-bar__contact-item">
              <span class="footer-bar__contact-icon">📞</span>
              <a :href="`tel:${footerData.contact.phone}`" class="footer-bar__contact-link">
                {{ footerData.contact.phone }}
              </a>
            </div>
            <div class="footer-bar__contact-item">
              <span class="footer-bar__contact-icon">📍</span>
              <span class="footer-bar__contact-text">
                {{ footerData.contact.address }}, {{ footerData.contact.city }}
              </span>
            </div>
            <div class="footer-bar__contact-item">
              <span class="footer-bar__contact-icon">🌍</span>
              <span class="footer-bar__contact-text">{{ footerData.contact.regions }}</span>
            </div>
            <div class="footer-bar__contact-item">
              <span class="footer-bar__contact-icon">🕒</span>
              <span class="footer-bar__contact-text">{{ footerData.contact.hours }}</span>
            </div>
          </div>
        </div>

        <!-- Column 6: Get Involved -->
        <div class="footer-bar__column">
          <h4 class="footer-bar__title">GET INVOLVED</h4>
          <ul class="footer-bar__links">
            <li v-for="link in footerData.quickLinks.getInvolved" :key="link.label">
              <RouterLink :to="link.to" class="footer-bar__link">{{ link.label }}</RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Content - Bottom Section with Organization Info and Social -->
      <div class="footer-content">
        <!-- Left Column: Organization Info -->
        <div class="footer-content__left">
          <SiteLogo size="xl" stacked inverted class="footer-content__logo" />
          <p class="footer-content__tagline">{{ footerData.organization.tagline }}</p>
          <p class="footer-content__mission">{{ footerData.organization.mission }}</p>
          <div class="footer-content__legal">
            <p>{{ footerData.organization.status }}</p>
            <p>{{ footerData.organization.registration }}</p>
            <p>{{ footerData.organization.established }}</p>
          </div>
          <div class="footer-content__copyright">
            <p>&copy; {{ currentYear }} {{ footerData.organization.name }}. All rights reserved.</p>
            <div class="footer-content__legal-links">
              <a href="#" class="footer-content__legal-link">Privacy Policy</a>
              <span class="footer-content__separator">•</span>
              <a href="#" class="footer-content__legal-link">Terms of Service</a>
              <span class="footer-content__separator">•</span>
              <a href="#" class="footer-content__legal-link">Transparency Report</a>
            </div>
          </div>
        </div>

        <!-- Right Column: Social & Newsletter -->
        <div class="footer-content__right">
          <!-- Stay Connected -->
          <div class="footer-content__social-section">
            <h4 class="footer-content__section-title">STAY CONNECTED</h4>
            <div class="footer-content__social" role="list">
              <a
                v-for="social in footerData.social"
                :key="social.name"
                :href="social.url"
                :aria-label="social.name"
                class="footer-content__social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="footer-content__social-icon" aria-hidden="true">
                  <svg v-if="social.icon === 'twitter'" viewBox="0 0 24 24" role="img" focusable="false">
                    <path d="M4 3h4.2l3.7 5.3L15.7 3H20l-6.3 8.6 6.3 9.4h-4.3l-3.9-5.9L8.3 21H4l6.2-9.4z" fill="currentColor" />
                  </svg>
                  <svg v-else-if="social.icon === 'facebook'" viewBox="0 0 24 24" role="img" focusable="false">
                    <path
                      d="M14.6 3c1.7 0 3.4.1 3.4.1V7h-2.3c-.9 0-1.6.7-1.6 1.6V11h3.8l-.6 4h-3.2v7H10v-7H7v-4h3V7.6C10 5 11.7 3 14.6 3Z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg v-else-if="social.icon === 'linkedin'" viewBox="0 0 24 24" role="img" focusable="false">
                    <path
                      d="M5.3 9.2h3.2V21H5.3zM6.9 4a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8Zm4.4 5.2h3v1.6h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9V21h-3.3v-5.4c0-1.3 0-3-1.8-3-1.8 0-2 1.4-2 2.9V21h-3z"
                      fill="currentColor"
                    />
                  </svg>
                  <svg v-else-if="social.icon === 'instagram'" viewBox="0 0 24 24" role="img" focusable="false">
                    <rect x="3.5" y="3.5" width="17" height="17" rx="5" ry="5" stroke="currentColor" stroke-width="1.4" fill="none" />
                    <circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.4" fill="none" />
                    <circle cx="17" cy="7.2" r="1.1" fill="currentColor" />
                  </svg>
                  <svg v-else-if="social.icon === 'youtube'" viewBox="0 0 24 24" role="img" focusable="false" width="24" height="24">
                    <path
                      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          <!-- Newsletter -->
          <div class="footer-content__newsletter-section">
            <h4 class="footer-content__section-title">Newsletter</h4>
            <!-- Newsletter Success View -->
            <div v-if="isNewsletterSubmitted" class="footer-content__newsletter footer-content__newsletter--success">
              <div class="footer-content__newsletter-success-content">
                <div class="footer-content__newsletter-success-icon">✓</div>
                <p class="footer-content__newsletter-success-message">
                  Thank you for subscribing!<br />
                  <span class="footer-content__newsletter-success-email">{{ newsletterEmail }}</span>
                </p>
                <p class="footer-content__newsletter-success-detail">
                  You'll receive our monthly updates with impact stories and program highlights.
                </p>
                <button
                  type="button"
                  class="footer-content__newsletter-success-reset"
                  @click="isNewsletterSubmitted = false; newsletterEmail = ''"
                >
                  Subscribe Another Email
                </button>
              </div>
            </div>

            <!-- Newsletter Form View -->
            <form v-else @submit.prevent="handleNewsletterSubmit" class="footer-content__newsletter">
              <div class="footer-content__newsletter-input-group">
                <label class="sr-only" for="newsletter-email">Email address</label>
                <input
                  id="newsletter-email"
                  v-model="newsletterEmail"
                  type="email"
                  placeholder="Your email"
                  required
                  class="footer-content__newsletter-input"
                />
                <button type="submit" class="footer-content__newsletter-submit">Subscribe</button>
              </div>
            </form>
          </div>

          <!-- Partners -->
          <div class="footer-content__partners">
            <p class="footer-content__partners-text">
              Partners: {{ footerData.partners.join(' • ') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
