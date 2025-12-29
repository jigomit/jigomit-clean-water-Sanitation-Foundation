<script setup>
import { impactStats, healthImpact, economicImpact, environmentalImpact, communityStories } from '@/data/content'
</script>

<template>
  <div class="view-stack">
    <!-- Impact Numbers Section -->
    <section class="screen screen--impact-numbers" aria-labelledby="impact-numbers-heading">
      <div class="content-max">
        <div class="content-section content-section--alt">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Impact numbers</p>
            <h2 id="impact-numbers-heading">Transparent metrics from live monitoring</h2>
            <p>Every indicator streams from sensors, school scorecards, or verified partner data and refreshes weekly.</p>
          </div>
          <div class="impact-metrics-row">
            <article v-for="stat in impactStats" :key="stat.label" class="impact-metrics-card" data-reveal>
              <h3>{{ stat.label }}</h3>
              <p class="impact-metrics-card__value">
                <span>{{ stat.value }}</span>
                <span class="impact-metrics-card__suffix">{{ stat.suffix }}</span>
              </p>
              <p class="impact-metrics-card__description">{{ stat.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Health Impact Section -->
    <section class="screen screen--health-impact" aria-labelledby="health-impact-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Health outcomes</p>
            <h2 id="health-impact-heading">Measurable health transformation</h2>
            <p>
              Access to clean water and sanitation directly reduces waterborne disease, child mortality, and malnutrition.
              We track health indicators through partnerships with district health facilities and community health workers.
            </p>
          </div>
          <div class="impact-metrics-grid">
            <article v-for="metric in healthImpact" :key="metric.metric" class="impact-metric-card" data-reveal>
              <div class="impact-metric-card__value">{{ metric.value }}</div>
              <h3>{{ metric.metric }}</h3>
              <p class="impact-metric-card__description">{{ metric.description }}</p>
              <p class="impact-metric-card__source">Source: {{ metric.source }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Economic Impact Section -->
    <section class="screen screen--economic-impact" aria-labelledby="economic-impact-heading">
      <div class="content-max">
        <div class="content-section content-section--alt">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Economic benefits</p>
            <h2 id="economic-impact-heading">Unlocking productivity and opportunity</h2>
            <p>
              Time saved from water collection translates to education, income generation, and community development.
              Our projects create ripple effects across household economics and long-term prosperity.
            </p>
          </div>
          <div class="economic-impact-grid">
            <article v-for="metric in economicImpact" :key="metric.metric" class="economic-card" data-reveal>
              <div class="economic-card__header">
                <div class="economic-card__value">{{ metric.value }}</div>
                <h3>{{ metric.metric }}</h3>
              </div>
              <p class="economic-card__description">{{ metric.description }}</p>
              <div class="economic-card__meta">
                <span v-if="metric.monetaryValue" class="badge badge--money">{{ metric.monetaryValue }}</span>
                <span v-if="metric.activities" class="badge">{{ metric.activities }}</span>
                <span v-if="metric.compounded" class="badge">{{ metric.compounded }}</span>
              </div>
            </article>
          </div>
          <div class="economic-callout" data-reveal>
            <h3>Combined Economic Impact</h3>
            <p>
              The average household experiences a net economic benefit of <strong>$1,115/year</strong> from
              clean water access: $450 in time savings, $600 in new income, and $65 in healthcare savings.
              This 40% increase in household income transforms lives and enables investment in education,
              nutrition, and asset building.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Environmental Impact Section -->
    <section class="screen screen--environmental-impact" aria-labelledby="environmental-impact-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Environmental stewardship</p>
            <h2 id="environmental-impact-heading">Protecting ecosystems for future generations</h2>
            <p>
              Sustainable water infrastructure, renewable energy, and circular sanitation systems reduce carbon
              emissions, prevent deforestation, and safeguard aquifer health for long-term water security.
            </p>
          </div>
          <div class="environmental-impact-grid">
            <article v-for="metric in environmentalImpact" :key="metric.metric" class="environmental-card" data-reveal>
              <div class="environmental-card__icon" aria-hidden="true">🌍</div>
              <div class="environmental-card__value">{{ metric.value }}</div>
              <h3>{{ metric.metric }}</h3>
              <p>{{ metric.description }}</p>
            </article>
          </div>
          <div class="environmental-details" data-reveal>
            <h3>Climate & Conservation Benefits</h3>
            <div class="environmental-detail-grid">
              <div class="env-detail-item">
                <h4>Carbon Reduction</h4>
                <p>
                  Solar pumps eliminate 48 tons of CO₂ annually from diesel avoidance, while bio-digesters
                  prevent an additional 108 tons from methane and firewood combustion reduction.
                </p>
              </div>
              <div class="env-detail-item">
                <h4>Forest Protection</h4>
                <p>
                  Bio-digesters reduce firewood demand by 12 hectares/year of forest protection. This prevents
                  soil erosion, maintains watershed health, and preserves biodiversity.
                </p>
              </div>
              <div class="env-detail-item">
                <h4>Water Table Management</h4>
                <p>
                  Aquifer recharge plans map safe extraction rates, protect recharge zones from contamination,
                  and establish tree buffers to maintain long-term groundwater sustainability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Stories with Data -->
    <section class="screen screen--impact-stories" aria-labelledby="impact-stories-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Transformative impact</p>
            <h2 id="impact-stories-heading">Stories of change, backed by data</h2>
            <p>
              Behind every statistic is a community transformed. These case studies demonstrate the comprehensive
              health, economic, and social benefits of sustainable water infrastructure.
            </p>
          </div>
          <div class="impact-stories-grid">
            <article v-for="story in communityStories" :key="story.community" class="impact-story-card" data-reveal>
              <div class="impact-story-card__header">
                <h3>{{ story.community }}</h3>
                <div class="impact-story-card__meta">
                  <span class="badge">{{ story.population.toLocaleString() }} people</span>
                  <span class="badge badge--year">{{ story.year }}</span>
                </div>
              </div>
              <div class="impact-story-card__body">
                <div class="impact-story-section">
                  <h4>The Challenge</h4>
                  <p>{{ story.challenge }}</p>
                </div>
                <div class="impact-story-section">
                  <h4>Our Solution</h4>
                  <p>{{ story.solution }}</p>
                </div>
                <div class="impact-story-section impact-story-section--results">
                  <h4>Measured Results</h4>
                  <ul class="results-list">
                    <li v-for="result in story.results" :key="result">
                      <span class="result-icon">✓</span>
                      {{ result }}
                    </li>
                  </ul>
                </div>
              </div>
              <blockquote class="impact-story-card__quote">
                <span class="quote-mark">"</span>
                {{ story.quote }}
              </blockquote>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Data Transparency Section -->
    <section class="screen screen--data-transparency" aria-labelledby="data-transparency-heading">
      <div class="content-max">
        <div class="content-section content-section--alt">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Measurement & accountability</p>
            <h2 id="data-transparency-heading">How we track and verify impact</h2>
            <p>
              Rigorous monitoring ensures accurate reporting and continuous improvement. All impact metrics
              are independently verified and updated quarterly.
            </p>
          </div>
          <div class="data-methods-grid">
            <div class="data-method-card" data-reveal>
              <h3>🔧 Infrastructure Monitoring</h3>
              <ul>
                <li>IoT flow sensors on all wells (real-time data)</li>
                <li>Water quality testing (monthly WHO compliance checks)</li>
                <li>System uptime tracking (99% reliability target)</li>
                <li>Maintenance logs and repair response times</li>
              </ul>
            </div>
            <div class="data-method-card" data-reveal>
              <h3>📊 Health Data Collection</h3>
              <ul>
                <li>Partnership with district health facilities</li>
                <li>Community health worker surveillance</li>
                <li>Diarrhea incidence tracking (before/after comparison)</li>
                <li>Child growth monitoring (WHO standards)</li>
              </ul>
            </div>
            <div class="data-method-card" data-reveal>
              <h3>💰 Economic Impact Assessment</h3>
              <ul>
                <li>Household surveys (time use, income, expenses)</li>
                <li>School attendance records</li>
                <li>Healthcare cost analysis</li>
                <li>Business development tracking</li>
              </ul>
            </div>
            <div class="data-method-card" data-reveal>
              <h3>🌱 Environmental Monitoring</h3>
              <ul>
                <li>Carbon footprint calculations (solar vs diesel)</li>
                <li>Firewood consumption surveys</li>
                <li>Aquifer level measurements (quarterly)</li>
                <li>Recharge zone protection assessments</li>
              </ul>
            </div>
          </div>
          <div class="data-transparency-footer" data-reveal>
            <p>
              <strong>Independent verification:</strong> All health and economic impact data is reviewed by
              third-party evaluators annually. Full impact reports are published on our website and shared
              with funding partners, community councils, and government ministries.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
