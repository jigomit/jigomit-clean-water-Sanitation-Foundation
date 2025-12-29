import dawnWellImg from '@/assets/gallery/photos/dawn-well-calibrations.jpg'
import filtrationBanksImg from '@/assets/gallery/photos/compact-filtration-banks.jpg'
import hygieneLessonImg from '@/assets/gallery/photos/hygiene-lesson-students.jpg'
import latrineUpgradesImg from '@/assets/gallery/photos/latrine-upgrades-residents.jpg'
import mobileLabImg from '@/assets/gallery/photos/mobile-lab-filtration.jpg'
import educatorsTrainingImg from '@/assets/gallery/photos/hygiene-educators-training.jpg'
import waterDeliveryImg from '@/assets/gallery/photos/water-delivery-storage.jpg'
import solarPumpImg from '@/assets/gallery/photos/solar-pump-array.jpg'
import labTestingImg from '@/assets/gallery/photos/lab-testing-who.jpg'
import schoolProgramImg from '@/assets/gallery/photos/school-handwashing-program.jpg'
import vipLatrineImg from '@/assets/gallery/photos/vip-latrine-construction.jpg'
import biogasSystemImg from '@/assets/gallery/photos/biogas-system.jpg'
import protectedSpringImg from '@/assets/gallery/photos/protected-spring-gravity.jpg'
import villagePlanningImg from '@/assets/gallery/photos/village-leaders-planning.jpg'

export const heroHighlights = [
  {
    title: 'Building wells',
    detail: 'Telemetry-ready, solar-assisted wells draw reliable groundwater all year.',
  },
  {
    title: 'Water filtration systems',
    detail: 'WHO-grade sand, carbon, and membrane filtration hits 0.2-micron performance.',
  },
  {
    title: 'Hygiene education',
    detail: 'UNICEF-inspired hygiene clubs shift habits through storytelling and data.',
  },
]

export const projectHighlights = [
  {
    title: 'Deep-bore Wells',
    description: 'Community-run bore wells with smart flow monitoring provide up to 22,000 liters daily.',
    stat: '142 wells online',
    icon: 'well',
  },
  {
    title: 'Solar Pumping',
    description: 'Solar pumps keep water moving without diesel generators, reducing annual emissions by 48 tons.',
    stat: '87 pump kits',
    icon: 'sun',
  },
  {
    title: 'Rapid Filters',
    description: 'Compact gravel-sand-UV stacks slot into tanks and are serviced by trained residents.',
    stat: '63 filter banks',
    icon: 'filter',
  },
  {
    title: 'Aquifer Stewardship',
    description: 'Recharge protection plans map tree buffers, cattle corridors, and safe waste disposal zones.',
    stat: '22 recharge plans',
    icon: 'earth',
  },
  {
    title: 'Rainwater Harvest Loops',
    description: 'Clustered rooftop catchments feed 40k-liter tanks with UV polishing to bridge late dry seasons.',
    stat: '58 climate buffers',
    icon: 'earth',
  },
  {
    title: 'Ops & Training Hubs',
    description: 'Solar-cooled container labs house telemetry servers, spare parts caches, and resident training pods.',
    stat: '9 service hubs',
    icon: 'sun',
  },
]

export const educationFocus = [
  {
    title: 'Youth Hygiene Leaders',
    description:
      'Workshops turn students into peer ambassadors covering handwashing, menstruation care, and household safety.',
    stat: '320 student champions',
  },
  {
    title: 'Mothers Circles',
    description: 'Weekly groups co-design hygiene pledges, soap-making kits, and school sanitation dashboards.',
    stat: '54 active circles',
  },
  {
    title: 'Health Radio Minutes',
    description: 'Local radio dramatizations zero in on myths, featuring voices from the villages we serve.',
    stat: '96 broadcasts aired',
  },
  {
    title: 'SMS & WhatsApp nudges',
    description: 'Bilingual hygiene tips and maintenance reminders reach households every market day.',
    stat: '4.8k weekly sends',
  },
  {
    title: 'Caregiver Home Labs',
    description: 'Loaner turbidity and chlorine kits travel with hygiene coaches for real-time water lessons.',
    stat: '210 kits rotating',
  },
  {
    title: 'Community Data Walls',
    description: 'Illustrated pump uptime and ODF dashboards update every market week to rally neighbors.',
    stat: '27 dashboard stations',
  },
]

export const sanitationTracks = [
  {
    title: 'Village sanitation development',
    description: 'Community blueprints add safe latrines, greywater gardens, and maintenance plans to every block.',
  },
  {
    title: 'Waste-to-garden loops',
    description: 'Bio-digesters keep waste out of streams while producing compost for nutrition gardens.',
  },
  {
    title: 'Stormwater guidance',
    description: 'Low-impact drainage, soak pits, and replanted tree buffers calm seasonal flooding.',
  },
  {
    title: 'School dignity suites',
    description: 'Gender-separated latrines with handwashing stations boost attendance for girls.',
  },
  {
    title: 'Water-safe businesses',
    description: 'Soap makers, laundry cooperatives, and refill kiosks thrive with micro-loans.',
  },
  {
    title: 'Handwashing micro-franchises',
    description: 'Refill kiosks and ceramic filter sellers keep soap and treated water close to markets.',
  },
  {
    title: 'Cholera surge planning',
    description: 'Rapid response kits, SMS alerts, and chlorine dosing guides ready clinics before rainy seasons.',
  },
]

export const impactStats = [
  {
    value: '31',
    suffix: ' communities',
    label: 'Sustained access',
    description: 'Fully funded well + sanitation plans with local governance charters',
  },
  {
    value: '11.4',
    suffix: 'M liters',
    label: 'Water delivered',
    description: 'Telemetry-confirmed potable liters produced each year',
  },
  {
    value: '5,200',
    suffix: '+',
    label: 'Families trained',
    description: 'Households completing hygiene scorecard coaching',
  },
  {
    value: '99%',
    suffix: ' uptime',
    label: 'Systems online',
    description: 'Average monthly reliability thanks to remote monitoring',
  },
  {
    value: '840',
    suffix: ' sensors',
    label: 'Telemetry endpoints',
    description: 'Flow, pressure, and chlorine probes ping dashboards every hour',
  },
  {
    value: '12',
    suffix: ' partner labs',
    label: 'Quality audits',
    description: 'Regional labs validating samples quarterly against WHO standards',
  },
]

export const galleryImages = [
  {
    src: dawnWellImg,
    alt: 'Technicians calibrate a solar-assisted well at sunrise in Lura.',
    caption: 'Dawn well calibrations in Lura',
    meta: 'Telemetry crew primes the dawn shift in Lura.',
  },
  {
    src: filtrationBanksImg,
    alt: 'Compact filtration units staged for a community install.',
    caption: 'Compact filtration banks ready for install',
    meta: 'Modular carbon-sand banks staged for deployment.',
  },
  {
    src: hygieneLessonImg,
    alt: 'Student leaders gather outdoors for a hygiene lesson.',
    caption: 'Hygiene lesson with student leaders',
    meta: 'Student leaders co-teach hygiene drills.',
  },
  {
    src: latrineUpgradesImg,
    alt: 'Residents gather around a plan to map latrine upgrades.',
    caption: 'Mapping latrine upgrades with residents',
    meta: 'Co-design workshop prioritizes next latrine upgrades.',
  },
  {
    src: mobileLabImg,
    alt: 'Technician validates filtration quality inside a mobile lab.',
    caption: 'Mobile lab validating filtration quality',
    meta: 'QA mobile lab signs off WHO compliance.',
  },
  {
    src: educatorsTrainingImg,
    alt: 'Hygiene educators collaborate during a technical training.',
    caption: 'Hygiene educators in technical training workshop',
    meta: 'Educators review pump diagrams and lesson plans.',
  },
  {
    src: waterDeliveryImg,
    alt: 'Team unloads pipework for a new water delivery link.',
    caption: 'Water delivery link boosting storage',
    meta: 'Distribution link increases downstream storage.',
  },
  {
    src: solarPumpImg,
    alt: 'Solar array powers a deep-bore well next to a storage tower.',
    caption: 'Solar pump array powering deep-bore well',
    meta: '4kW solar field powers telemetry-enabled pump.',
  },
  {
    src: labTestingImg,
    alt: 'Technician analyzes a water sample during lab testing.',
    caption: 'Lab testing ensuring WHO compliance standards',
    meta: 'Lab validation confirms WHO compliance.',
  },
  {
    src: schoolProgramImg,
    alt: 'Students wash hands at a school hygiene station.',
    caption: 'School-based handwashing behavior program',
    meta: 'Behavior club demonstrates daily hygiene rituals.',
  },
  {
    src: vipLatrineImg,
    alt: 'Local team constructs a ventilated improved pit latrine.',
    caption: 'VIP latrine construction with local team',
    meta: 'Local masons assemble ventilated improved pit latrine.',
  },
  {
    src: biogasSystemImg,
    alt: 'Technicians inspect a biogas system converting waste to fuel.',
    caption: 'Biogas system converting waste to cooking fuel',
    meta: 'Biodigester dome channels waste into clean cooking fuel.',
  },
  {
    src: protectedSpringImg,
    alt: 'Protected spring feeds a gravity distribution system.',
    caption: 'Protected spring with gravity-fed distribution',
    meta: 'Spring box diverts flow into hillside storage.',
  },
  {
    src: villagePlanningImg,
    alt: 'Village leaders collaborate around a planning table.',
    caption: 'Village leaders mapping sanitation improvements',
    meta: 'Leaders align sanitation priorities for next build season.',
  },
]

export const footerLinks = [
  { label: 'Impact', target: '/impact' },
  { label: 'Projects', target: '/projects' },
  { label: 'Hygiene', target: '/education' },
  { label: 'Sanitation', target: '/sanitation' },
  { label: 'Gallery', target: '/gallery' },
  { label: 'Donate', target: '/donate' },
]

export const footerData = {
  organization: {
    name: 'LifeSpring Water Foundation',
    mission: 'Engineering water security with local leadership across East Africa',
    tagline: 'Pure water infrastructure backed by trusted educators',
    registration: 'Reg #CW-2049',
    status: '501(c)(3) Non-Profit Organization',
    established: 'Established 2015'
  },
  contact: {
    email: 'hello@lifespringwater.org',
    phone: '+1 (555) 123-4567',
    address: '123 Water Street, Suite 400',
    city: 'San Francisco, CA 94102',
    regions: 'Serving 31 communities across East Africa',
    hours: 'Mon-Fri: 9:00 AM - 5:00 PM PST'
  },
  quickLinks: {
    programs: [
      { label: 'Well Construction', to: '/projects' },
      { label: 'Water Filtration', to: '/projects' },
      { label: 'Hygiene Education', to: '/education' },
      { label: 'Sanitation Development', to: '/sanitation' }
    ],
    about: [
      { label: 'Our Mission', to: '/about' },
      { label: 'Impact Metrics', to: '/impact' },
      { label: 'Photo Gallery', to: '/gallery' },
      { label: 'Our Team', to: '/about' }
    ],
    getInvolved: [
      { label: 'Donate Monthly', to: '/donate' },
      { label: 'Volunteer', to: '/donate' },
      { label: 'Corporate Partners', to: '/donate' },
      { label: 'Join Our Newsletter', to: '#newsletter' }
    ],
    resources: [
      { label: 'Blog', to: '/blog' }
    ]
  },
  social: [
    { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
    { name: 'Facebook', url: 'https://facebook.com', icon: 'facebook' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'Instagram', url: 'https://instagram.com', icon: 'instagram' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'youtube' }
  ],
  partners: [
    'UN WASH Initiative',
    'UNICEF Clean Futures',
    'Global Water Alliance'
  ]
}

// ========================================
// TEAM MEMBERS & LEADERSHIP
// ========================================

export const teamMembers = [
  {
    name: 'Dr. Sarah Mwangi',
    role: 'Executive Director',
    bio: 'Hydrogeologist with 15 years leading WASH programs across Kenya, Tanzania, and Uganda. Former UN WASH consultant.',
    expertise: 'Water resource management, aquifer mapping',
  },
  {
    name: 'James Odhiambo',
    role: 'Field Operations Director',
    bio: 'Coordinates drilling teams, pump installations, and maintenance crews across 31 communities. Trained 180+ local technicians.',
    expertise: 'Well construction, solar infrastructure',
  },
  {
    name: 'Grace Nakato',
    role: 'Hygiene Education Lead',
    bio: 'Designs behavior-change curriculum, trains peer educators, and runs mothers circles. Background in public health nursing.',
    expertise: 'Community health, adult education',
  },
  {
    name: 'Michael Waweru',
    role: 'Water Quality Engineer',
    bio: 'Oversees filtration system design, water testing protocols, and WHO compliance. Previously with WaterAid.',
    expertise: 'Filtration technology, quality assurance',
  },
  {
    name: 'Amina Hassan',
    role: 'Sanitation Program Manager',
    bio: 'Leads village sanitation planning, latrine construction, and waste management initiatives in rural communities.',
    expertise: 'Sanitation infrastructure, waste systems',
  },
  {
    name: 'David Kimani',
    role: 'Technology & Monitoring',
    bio: 'Manages telemetry systems, flow sensors, and digital dashboards. Provides real-time monitoring for all wells.',
    expertise: 'IoT sensors, data analytics',
  },
]

// ========================================
// FOUNDATION MILESTONES
// ========================================

export const milestones = [
  {
    year: 2015,
    title: 'Foundation Established',
    description: 'LifeSpring Water Foundation founded in partnership with local leaders in rural Kenya.',
  },
  {
    year: 2016,
    title: 'First 5 Wells Completed',
    description: 'Successfully drilled and equipped 5 deep-bore wells serving 2,500 people in Machakos County.',
  },
  {
    year: 2017,
    title: 'Hygiene Program Launch',
    description: 'Launched school-based hygiene education reaching 50 schools and 8,000 students.',
  },
  {
    year: 2018,
    title: 'Solar Pumping Initiative',
    description: 'Introduced solar-powered pumping systems, eliminating diesel dependency and reducing emissions.',
  },
  {
    year: 2019,
    title: 'Telemetry System Deployed',
    description: 'Installed remote monitoring on all wells, achieving 99% uptime through predictive maintenance.',
  },
  {
    year: 2020,
    title: 'Sanitation Expansion',
    description: 'Expanded to village-wide sanitation planning with bio-digesters and greywater gardens.',
  },
  {
    year: 2021,
    title: 'Regional Growth',
    description: 'Extended operations to Tanzania and Uganda, serving 20 communities across three nations.',
  },
  {
    year: 2022,
    title: '100th Well Milestone',
    description: 'Celebrated completion of 100th well, delivering clean water to over 50,000 people daily.',
  },
  {
    year: 2023,
    title: 'Filtration Innovation',
    description: 'Deployed advanced multi-stage filtration achieving 0.2-micron performance in 15 communities.',
  },
  {
    year: 2024,
    title: '31 Communities & Counting',
    description: 'Now serving 31 communities with sustained water access, delivering 11.4M liters annually.',
  },
]

// ========================================
// WELL TYPES & CONSTRUCTION METHODS
// ========================================

export const wellTypes = [
  {
    title: 'Deep Borehole Wells',
    description: 'Reach aquifers 50-150 meters deep using rotary drilling equipment. Each well produces 15,000-22,000 liters daily.',
    features: [
      'Stainless steel casing prevents contamination',
      'Submersible solar-powered pumps',
      'Flow sensors with telemetry',
      'Serves 400-800 people per well',
    ],
    cost: '$8,500',
    lifespan: '20-25 years',
  },
  {
    title: 'Hand-Dug Wells',
    description: 'Excavated manually in areas with shallow water tables (5-15 meters). Lined with concrete rings for stability.',
    features: [
      'Lower cost, community-built',
      'Hand pump or rope-washer pump',
      'Ideal for seasonal water tables',
      'Serves 100-200 people',
    ],
    cost: '$2,500',
    lifespan: '15-20 years',
  },
  {
    title: 'Spring Protection',
    description: 'Captures natural springs with gravity-fed systems. No pumping needed, minimal maintenance.',
    features: [
      'Protects water source from contamination',
      'Gravity flow distribution',
      'No electricity required',
      'Serves 200-400 people',
    ],
    cost: '$3,200',
    lifespan: '25-30 years',
  },
]

// ========================================
// FILTRATION TECHNOLOGY
// ========================================

export const filtrationTechnology = [
  {
    title: 'Multi-Stage Sand Filtration',
    description: 'Gravel, sand, and carbon layers remove sediment, bacteria, and organic matter. WHO-compliant performance.',
    stages: [
      'Pre-filter: Removes large particles',
      'Gravel layer: Clarification',
      'Sand layer: Bacterial removal (99.9%)',
      'Activated carbon: Taste, odor, chemicals',
    ],
    flowRate: '500-800 liters/hour',
    maintenance: 'Backwash monthly, media replacement every 3 years',
  },
  {
    title: 'UV Disinfection',
    description: 'Ultraviolet light destroys bacteria, viruses, and protozoa without chemicals. Solar-powered UV units.',
    stages: [
      'Pre-filtration to remove turbidity',
      'UV-C exposure (254 nanometers)',
      '99.99% pathogen elimination',
      'No chemical taste or residue',
    ],
    flowRate: '200-400 liters/hour',
    maintenance: 'UV bulb replacement annually',
  },
  {
    title: 'Ceramic Filters',
    description: 'Porous ceramic candles filter to 0.2 microns, removing bacteria and protozoa. Ideal for household use.',
    stages: [
      'Ceramic candle filtration',
      'Silver-impregnated for bacteria',
      'Gravity-fed, no electricity',
      'Point-of-use treatment',
    ],
    flowRate: '2-4 liters/hour per candle',
    maintenance: 'Scrub monthly, replace every 2 years',
  },
]
// ========================================
// HYGIENE EDUCATION CURRICULUM
// ========================================

export const hygieneTopics = [
  {
    title: 'Handwashing with Soap',
    description: 'Critical moments for handwashing: after toilet, before eating, before food prep, after cleaning baby.',
    activities: [
      'Interactive demonstrations with soap and water',
      'Tippy-tap construction workshops',
      'Glow-germ training showing invisible germs',
      'Peer-to-peer accountability challenges',
    ],
    impact: '76% increase in handwashing at critical times',
  },
  {
    title: 'Menstrual Hygiene Management',
    description: 'Safe, dignified menstrual care using reusable pads, privacy facilities, and disposal systems.',
    activities: [
      'Girls-only sessions led by female educators',
      'Reusable pad sewing workshops',
      'School privacy facilities (changing rooms)',
      'Myth-busting and body literacy sessions',
    ],
    impact: '34% reduction in school absenteeism among girls',
  },
  {
    title: 'Safe Water Storage',
    description: 'Preventing recontamination through proper storage, covered containers, and narrow-mouth vessels.',
    activities: [
      'Container cleaning demonstrations',
      'Chlorination training (0.5-2 mg/L)',
      'SODIS (solar disinfection) methods',
      'Household water quality testing',
    ],
    impact: '89% of households using covered storage',
  },
  {
    title: 'Food Safety & Hygiene',
    description: 'Preventing diarrheal disease through safe food handling, cooking, and storage practices.',
    activities: [
      'Cooking demonstrations with safe practices',
      'Refrigeration alternatives (zeer pots)',
      'Fly control and food covering',
      'Market hygiene training for vendors',
    ],
    impact: '42% reduction in foodborne illness',
  },
  {
    title: 'Latrine Use & Maintenance',
    description: 'Proper toilet use, cleaning practices, and maintaining sanitation facilities.',
    activities: [
      'Latrine maintenance committees',
      'Cleaning schedule development',
      'Bio-enzyme cleaners production',
      'Fly trap construction',
    ],
    impact: '98% latrine utilization rate',
  },
]

// ========================================
// SANITATION INFRASTRUCTURE DETAILS
// ========================================

export const latrineTypes = [
  {
    title: 'VIP Latrines (Ventilated Improved Pit)',
    description: 'Odor-free pit latrines with vent pipes and fly screens. Most common rural sanitation solution.',
    features: [
      'Concrete slab with squatting plate',
      'Vent pipe with fly screen',
      'Dark interior reduces fly breeding',
      'Concrete or brick superstructure',
    ],
    capacity: '5-7 years for family of 6',
    cost: '$350 per household',
  },
  {
    title: 'Pour-Flush Toilets',
    description: 'Water-seal toilets connected to septic tanks or soak pits. Preferred in peri-urban areas.',
    features: [
      'Ceramic pan with water seal',
      'Connected to septic tank',
      'Requires 2-3 liters per flush',
      'Gender-separated in schools',
    ],
    capacity: 'Septic tank: 3-5 year emptying cycle',
    cost: '$800 per household',
  },
  {
    title: 'Composting Toilets',
    description: 'Dual-chamber systems that produce safe compost for gardens. No water needed, environmentally friendly.',
    features: [
      'Two alternating chambers',
      'Ash or sawdust added after use',
      '6-12 month decomposition cycle',
      'Produces safe agricultural compost',
    ],
    capacity: 'Continuous use with chamber rotation',
    cost: '$650 per household',
  },
  {
    title: 'Bio-Digesters',
    description: 'Anaerobic digestion systems producing biogas for cooking and liquid fertilizer for crops.',
    features: [
      'Underground digestion tank',
      'Biogas piped to kitchen',
      'Liquid effluent for irrigation',
      'Eliminates firewood dependency',
    ],
    capacity: 'Family of 6: 4-6m³ digester',
    cost: '$1,200 per household',
  },
]

// ========================================
// COMMUNITY IMPACT STORIES
// ========================================

export const communityStories = [
  {
    community: 'Lura Village, Kenya',
    population: 1850,
    year: 2019,
    challenge: 'Women walked 4km daily for water from contaminated river. Diarrhea affected 40% of children under 5.',
    solution: 'Deep borehole well with solar pump, 6 public taps, household filtration training.',
    results: [
      'Water access time reduced from 3 hours to 15 minutes',
      'Childhood diarrhea dropped 78%',
      '32 women started small businesses with saved time',
      'School attendance up 24%',
    ],
    quote: '"My daughters now go to school instead of fetching water. We have time to grow vegetables and sell at market." - Mary Wanjiru, mother of 4',
  },
  {
    community: 'Mbale District, Uganda',
    population: 3200,
    year: 2021,
    challenge: 'Seasonal flooding contaminated shallow wells. No latrines led to open defecation and disease.',
    solution: 'Protected spring, VIP latrines for 180 households, community-led total sanitation campaign.',
    results: [
      'Cholera cases eliminated (was 40/year)',
      'Open defecation reduced from 60% to 2%',
      '180 families with improved latrines',
      'Certified Open Defecation Free (ODF)',
    ],
    quote: '"Our village is cleaner, healthier, and we have dignity. Neighbors helped each other build latrines." - Hassan Okello, village chairman',
  },
  {
    community: 'Shinyanga Region, Tanzania',
    population: 2400,
    year: 2022,
    challenge: 'School had no toilets, girls missed 5 days/month during menstruation, 30% dropout rate.',
    solution: 'Gender-separated school latrines, menstrual hygiene program, reusable pad distribution.',
    results: [
      'Girl enrollment increased 42%',
      'School absenteeism reduced 83%',
      '240 girls received menstrual hygiene training',
      'Zero dropout rate for trained girls',
    ],
    quote: '"I no longer miss school. I have clean facilities and understand my body. I will finish secondary school now." - Grace, 14 years old',
  },
]

// ========================================
// HEALTH & ECONOMIC IMPACT METRICS
// ========================================

export const healthImpact = [
  {
    metric: 'Diarrheal Disease Reduction',
    value: '64%',
    description: 'Average decrease in diarrhea cases across all communities within 12 months of well completion.',
    source: 'Health facility records, 2020-2024',
  },
  {
    metric: 'Childhood Mortality',
    value: '38%',
    description: 'Reduction in under-5 mortality attributed to waterborne illness prevention.',
    source: 'District health surveys',
  },
  {
    metric: 'Hospital Visits',
    value: '51%',
    description: 'Fewer visits for water-related illness, saving families $40-80 annually in medical costs.',
    source: 'Community health worker data',
  },
  {
    metric: 'Malnutrition Improvement',
    value: '29%',
    description: 'Reduced stunting and wasting as clean water enables better hygiene and nutrition practices.',
    source: 'WHO growth monitoring',
  },
]

export const economicImpact = [
  {
    metric: 'Time Saved',
    value: '2.5 hours/day',
    description: 'Average time saved per household, primarily benefiting women and girls.',
    monetaryValue: '$450/year per household',
  },
  {
    metric: 'School Attendance',
    value: '+18%',
    description: 'Increase in daily attendance, especially among girls (menstrual hygiene programs).',
    monetaryValue: 'Higher lifetime earnings potential',
  },
  {
    metric: 'Income Generation',
    value: '+$600/year',
    description: 'Average increase in household income from businesses started with saved time.',
    activities: 'Market vending, tailoring, livestock',
  },
  {
    metric: 'Healthcare Savings',
    value: '$65/year',
    description: 'Reduction in medical expenses from waterborne diseases.',
    compounded: 'Includes transport, lost wages',
  },
]

export const environmentalImpact = [
  {
    metric: 'CO₂ Emissions Avoided',
    value: '48 tons/year',
    description: 'Solar pumps eliminate diesel generators across 87 pump installations.',
  },
  {
    metric: 'Deforestation Prevention',
    value: '12 hectares/year',
    description: 'Bio-digesters reduce firewood demand, protecting local forests.',
  },
  {
    metric: 'Water Table Protection',
    value: '22 aquifers',
    description: 'Recharge management plans prevent over-extraction and contamination.',
  },
]

// ========================================
// DONATION IMPACT BREAKDOWN
// ========================================

export const donationBreakdown = {
  programSpending: {
    percentage: 87,
    description: 'Every dollar: 87¢ directly to field programs (wells, filtration, education, sanitation)',
  },
  administration: {
    percentage: 8,
    description: 'Operational costs: staff salaries, office, technology, compliance',
  },
  fundraising: {
    percentage: 5,
    description: 'Donor cultivation, campaigns, grants management',
  },
}

export const impactPerDollar = [
  {
    amount: 10,
    provides: '40 liters of clean water for one family for one day',
    equivalent: '10 days of drinking water for one person',
  },
  {
    amount: 50,
    provides: 'Hygiene education kit for one household (soap, tippy-tap, training)',
    equivalent: 'Reduces disease risk for family of 6',
  },
  {
    amount: 100,
    provides: 'One household ceramic water filter (2-year lifespan)',
    equivalent: '8,000 liters of filtered water',
  },
  {
    amount: 250,
    provides: 'School hygiene training for 50 students + handwashing stations',
    equivalent: 'Year-long behavior change program',
  },
  {
    amount: 500,
    provides: 'One VIP latrine construction + maintenance training',
    equivalent: 'Dignified sanitation for 6-8 people',
  },
  {
    amount: 1000,
    provides: 'Solar pump kit for existing well serving 400 people',
    equivalent: '20 years of diesel-free pumping',
  },
  {
    amount: 2500,
    provides: 'Complete water filtration system for 200 people',
    equivalent: '2 million liters of clean water annually',
  },
  {
    amount: 8500,
    provides: 'Full deep-borehole well serving 600 people',
    equivalent: '20-year water security for entire community',
  },
]

export const monthlyGivingBenefits = [
  {
    tier: '$10/month',
    impact: 'Maintains one well telemetry sensor (real-time monitoring)',
    perks: 'Monthly email updates, donor newsletter',
  },
  {
    tier: '$25/month',
    impact: 'Trains one youth hygiene leader per year',
    perks: 'Quarterly impact reports, community photos',
  },
  {
    tier: '$50/month',
    impact: 'Supports one mother\'s hygiene circle (30 women)',
    perks: 'Annual field visit invitation, named recognition',
  },
  {
    tier: '$100/month',
    impact: 'Funds complete sanitation for one household annually',
    perks: 'Direct community connection, video updates',
  },
  {
    tier: '$250+/month',
    impact: 'Partners-level: co-funds major infrastructure',
    perks: 'Advisory council seat, field visit hosting, naming opportunities',
  },
]

export const corporatePartnerships = [
  {
    level: 'Community Partner',
    investment: '$5,000-$15,000',
    benefits: [
      'Co-brand one well or filtration system',
      'Employee volunteer opportunities',
      'Social media recognition',
      'Impact report with photos/video',
    ],
  },
  {
    level: 'Regional Partner',
    investment: '$25,000-$75,000',
    benefits: [
      'Name an entire village program',
      'Employee delegation field visit',
      'Press release and media coverage',
      'Quarterly executive briefings',
    ],
  },
  {
    level: 'Strategic Partner',
    investment: '$100,000+',
    benefits: [
      'Multi-year program partnership',
      'Board advisory role',
      'Co-branded research and reports',
      'Employee engagement programs',
      'Naming rights for major initiatives',
    ],
  },
]
