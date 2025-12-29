<script setup>
import SanitationSection from '@/components/SanitationSection.vue'
import { latrineTypes, communityStories } from '@/data/content'

// Filter for sanitation-related story
const sanitationStory = communityStories.find(story => story.community.includes('Mbale'))
</script>

<template>
  <div class="view-stack">
    <SanitationSection />

    <!-- Latrine Types Section -->
    <section class="screen screen--latrine-types" aria-labelledby="latrine-types-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Sanitation infrastructure</p>
            <h2 id="latrine-types-heading">Context-appropriate toilet solutions</h2>
            <p>
              We design sanitation systems based on water availability, soil conditions, household capacity, and
              community preferences. Every installation includes hygiene training and maintenance support.
            </p>
          </div>
          <div class="latrine-types-grid">
            <article v-for="latrine in latrineTypes" :key="latrine.title" class="latrine-card" data-reveal>
              <div class="latrine-card__header">
                <h3>{{ latrine.title }}</h3>
                <div class="latrine-card__meta">
                  <span class="badge badge--cost">{{ latrine.cost }}</span>
                  <span class="badge badge--capacity">{{ latrine.capacity }}</span>
                </div>
              </div>
              <p class="latrine-card__description">{{ latrine.description }}</p>
              <div class="latrine-card__features">
                <h4>Features:</h4>
                <ul>
                  <li v-for="feature in latrine.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Bio-Digester Benefits Section -->
    <section class="screen screen--biodigesters" aria-labelledby="biodigesters-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="content-section--split">
            <div class="section-text" data-reveal>
              <p class="eyebrow">Biogas systems</p>
              <h2 id="biodigesters-heading">Waste-to-energy circular economy</h2>
              <p>
                Bio-digesters transform human and animal waste into cooking fuel and high-nutrient fertilizer,
                creating closed-loop sanitation systems that protect waterways while reducing firewood dependency.
              </p>
              <ul class="checklist">
                <li>Produces 1-2 cubic meters of biogas daily (family cooking needs)</li>
                <li>Generates 200+ liters of liquid fertilizer monthly</li>
                <li>Eliminates firewood collection (saves 3-5 hours/week)</li>
                <li>Reduces deforestation and indoor air pollution</li>
                <li>Creates income opportunities through surplus gas/fertilizer sales</li>
              </ul>
            </div>
            <div class="section-card" data-reveal>
              <h3>Bio-Digester Impact</h3>
              <dl class="stats-pair">
                <div>
                  <dt>Systems installed</dt>
                  <dd>45</dd>
                </div>
                <div>
                  <dt>Biogas produced</dt>
                  <dd>18,000 m³/year</dd>
                </div>
                <div>
                  <dt>Forest protected</dt>
                  <dd>12 hectares/year</dd>
                </div>
                <div>
                  <dt>Household savings</dt>
                  <dd>$280/year</dd>
                </div>
              </dl>
              <p class="card-note">
                <strong>Environmental benefit:</strong> Each bio-digester prevents 2.4 tons of CO₂ emissions annually
                by replacing firewood and eliminating methane from open waste decomposition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- School Sanitation Program -->
    <section class="screen screen--school-sanitation" aria-labelledby="school-sanitation-heading">
      <div class="content-max">
        <div class="content-section content-section--alt">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Education facilities</p>
            <h2 id="school-sanitation-heading">Dignity and safety for every student</h2>
            <p>
              Gender-separated school latrines with handwashing stations and menstrual hygiene management facilities
              dramatically reduce absenteeism and improve learning outcomes, especially for girls.
            </p>
          </div>
          <div class="school-sanitation-grid">
            <div class="school-feature-card" data-reveal>
              <h3>🚻 Gender-Separated Facilities</h3>
              <p>
                Separate toilet blocks for boys and girls with lockable doors, proper lighting, and privacy screening.
                Reduces harassment and increases usage rates to 95%+.
              </p>
            </div>
            <div class="school-feature-card" data-reveal>
              <h3>💧 Handwashing Stations</h3>
              <p>
                Multiple tippy-taps or handwashing basins with soap dispensers placed at toilet exits and near
                classrooms. 76% increase in handwashing at critical times.
              </p>
            </div>
            <div class="school-feature-card" data-reveal>
              <h3>🩸 Menstrual Hygiene Rooms</h3>
              <p>
                Private changing rooms with disposal bins, running water, and emergency pad supplies. Girls-only
                sessions cover menstrual health, reusable pads, and body literacy.
              </p>
            </div>
            <div class="school-feature-card" data-reveal>
              <h3>🧹 Student Maintenance Teams</h3>
              <p>
                Trained student committees manage cleaning schedules, supply inventory, and minor repairs. Builds
                ownership and ensures long-term facility sustainability.
              </p>
            </div>
          </div>
          <div class="school-impact-stats" data-reveal>
            <h3>School Sanitation Impact</h3>
            <div class="impact-stat-inline">
              <span class="stat-value">42%</span>
              <span class="stat-label">Increase in girl enrollment (schools with dignity facilities)</span>
            </div>
            <div class="impact-stat-inline">
              <span class="stat-value">83%</span>
              <span class="stat-label">Reduction in school absenteeism during menstruation</span>
            </div>
            <div class="impact-stat-inline">
              <span class="stat-value">18</span>
              <span class="stat-label">Schools upgraded with complete WASH facilities</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Community Success Story -->
    <section v-if="sanitationStory" class="screen screen--sanitation-story" aria-labelledby="sanitation-story-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Community transformation</p>
            <h2 id="sanitation-story-heading">From open defecation to ODF certification</h2>
            <p>
              Community-Led Total Sanitation (CLTS) campaigns combine infrastructure with behavior change to achieve
              Open Defecation Free (ODF) status and sustained sanitation improvements.
            </p>
          </div>
          <div class="story-card story-card--featured" data-reveal>
            <div class="story-card__header">
              <h3>{{ sanitationStory.community }}</h3>
              <div class="story-card__meta">
                <span class="badge">{{ sanitationStory.population.toLocaleString() }} people</span>
                <span class="badge">{{ sanitationStory.year }}</span>
              </div>
            </div>
            <div class="story-card__challenge">
              <h4>The Challenge</h4>
              <p>{{ sanitationStory.challenge }}</p>
            </div>
            <div class="story-card__solution">
              <h4>Our Solution</h4>
              <p>{{ sanitationStory.solution }}</p>
            </div>
            <div class="story-card__results">
              <h4>Results</h4>
              <ul>
                <li v-for="result in sanitationStory.results" :key="result">{{ result }}</li>
              </ul>
            </div>
            <blockquote class="story-card__quote">
              {{ sanitationStory.quote }}
            </blockquote>
          </div>
        </div>
      </div>
    </section>

    <!-- Waste Management Cycle -->
    <section class="screen screen--waste-cycle" aria-labelledby="waste-cycle-heading">
      <div class="content-max">
        <div class="content-section">
          <div class="section-heading" data-reveal>
            <p class="eyebrow">Circular sanitation</p>
            <h2 id="waste-cycle-heading">Waste-to-garden loops protect ecosystems</h2>
            <p>
              By capturing and composting waste instead of allowing open contamination, we protect groundwater,
              reduce disease transmission, and create valuable soil amendments for nutrition gardens.
            </p>
          </div>
          <div class="waste-cycle-steps" data-reveal>
            <div class="cycle-step">
              <span class="cycle-step__number">1</span>
              <h4>Safe Collection</h4>
              <p>Toilets and bio-digesters contain waste, preventing environmental contamination and fly breeding</p>
            </div>
            <div class="cycle-step">
              <span class="cycle-step__number">2</span>
              <h4>Decomposition</h4>
              <p>Anaerobic digestion or composting breaks down pathogens over 6-12 months, producing safe byproducts</p>
            </div>
            <div class="cycle-step">
              <span class="cycle-step__number">3</span>
              <h4>Nutrient Recovery</h4>
              <p>Stabilized compost and liquid fertilizer provide nitrogen, phosphorus, and micronutrients for crops</p>
            </div>
            <div class="cycle-step">
              <span class="cycle-step__number">4</span>
              <h4>Food Production</h4>
              <p>Nutrition gardens yield vegetables, improving household food security and generating income</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
