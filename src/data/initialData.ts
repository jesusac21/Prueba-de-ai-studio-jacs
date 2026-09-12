import { PlantSpecimen, CareTask, PhotometricZone, DiagnosticIssue, CareGuide } from '../types';

export const INITIAL_PLANTS: PlantSpecimen[] = [
  {
    id: 'plant-1',
    name: 'Monstera Deliciosa',
    scientificName: 'Swiss Cheese Plant',
    room: 'Living Room',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXABzaI8Wz-OlrPUuVfRziB8_3dY0X1ZAC8R0lq5uf2rKXdx6-l0HBlaFVCng6G9P8g31w4BOxJkfWGxtZ4jHYtq2cBMHssOpByiv6pf2aUvKq6pdocE8pKJuIoBenGJKOWXSBC3XS_44AJffysh2FAffoyVeJYay_xlJfjprBkwCAcQs46Y_vbP-v0pLPVlB3JgfCx3hDUgQuRi_XnJu-bfnDYKlJcOX8glLQgiazQ2_CNdBBTm2',
    status: 'Needs Water',
    lightCategory: 'Bright Indirect',
    lightDots: 4,
    lightDescription: '4-6 hrs/day • East/South exposure',
    wateringSchedule: 'Today (7-9d cycle)',
    wateringIntervalDays: 8,
    lastWateredDaysAgo: 8,
    fertilizerSchedule: 'Due in 5 days',
    fertilizerIntervalDays: 14,
    lastFedDaysAgo: 9,
    soilMoisture: 18,
    optimalMoistureRange: [30, 60],
    targetHumidity: '50-65% RH',
    potType: 'Terracotta 10-inch with drainage',
    notes: 'Large fenestrated leaves. Benefits from weekly aerial root misting.'
  },
  {
    id: 'plant-2',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    room: 'Sunroom',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxb0sO0gLfirEHnTkMxTRgln2PcwIQUlMkd2SamkoqaFqQCNtECalza0O9nAezVGiDploSsFNxHHs0Xk8gjhxpknf367zX-2kRogXsFTnuExUeT6YcwEmLRg8HjsET0cogodVYLSeUJa1jOvqbGczowtv9Yiecl_Vf7VO3prrN_ErCbfCcfmKPo7QH3jkjzo-8J13o4dl9dGhfXvLHQ-v4uEtvK4XSHEKm-KXJ0RkkmeJC10CIhRCf',
    status: 'Feed Today',
    lightCategory: 'Direct & Filtered',
    lightDots: 5,
    lightDescription: '6+ hrs/day • Rotate 90° soon',
    wateringSchedule: 'In 3 days (10-12d)',
    wateringIntervalDays: 11,
    lastWateredDaysAgo: 8,
    fertilizerSchedule: 'Today (10-10-10)',
    fertilizerIntervalDays: 28,
    lastFedDaysAgo: 28,
    soilMoisture: 48,
    optimalMoistureRange: [35, 65],
    targetHumidity: '45-60% RH',
    potType: 'Glazed ceramic 14-inch',
    notes: 'Sensitive to drafts. Wipe large violin leaves monthly with damp microfiber.'
  },
  {
    id: 'plant-3',
    name: 'Calathea Orbifolia',
    scientificName: 'Prayer Plant Specimen',
    room: 'Bedroom',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgWisa4uz4pQrq7T6rqmNtd9XiL0jdqBkq9mGwZbRNKAnqrvBEjRTuh4x6G_Z4CQcsAD0zLRxO6IeQXCmZ67ENITmGGOCZ3Et_XcOWkxrIY3vfnjnHDM3Il1PEYKJFxg3qQfRKWBOrlcN5Obm4vGNvBsKn_NTpKFGf8kGXUqNGFaZmWHSIj7-oX1lwiiP-3KCKnkQDy6f-rvSden6Va3CD1KBaJsOEiciuEWmcATOjYYT1r_E669fr',
    status: 'Needs Water',
    lightCategory: 'Low Indirect Light',
    lightDots: 2,
    lightDescription: 'Tolerates shade • No direct sun',
    wateringSchedule: 'Today (Even damp)',
    wateringIntervalDays: 6,
    lastWateredDaysAgo: 6,
    fertilizerSchedule: 'Fed 12d ago',
    fertilizerIntervalDays: 30,
    lastFedDaysAgo: 12,
    soilMoisture: 24,
    optimalMoistureRange: [40, 70],
    targetHumidity: '65-75% RH Target',
    potType: 'Terracotta 8-inch lined',
    notes: 'Only use distilled or rainwater. Tap chlorine causes brown tip scorch.'
  },
  {
    id: 'plant-4',
    name: 'ZZ Plant',
    scientificName: 'Zamioculcas zamiifolia',
    room: 'Home Office',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEv2D-_6bJ1OPTT4d7S3Heuja3HUForIgidaZ-CXgXJhAl60lYz_9AxsIxFDu0gEQXfOfHBoV4gleqsKMgKz0LJuUDPvZzhvAiUvhz9j5P8BiQcNMSRIW5KC2VPnvPIOk218MUBEeiNtuI3MV1sqRo3rLF8_hrZoIQ47uLhQur6WPPDrKco1WzOgI39ru9qRsOGQ24LiLY8VLFHJJBITCQ49kJ6WWXwaJR3kt_MJm0TQ32QnbtGSJv',
    status: 'Hydrated',
    lightCategory: 'Low / Fluorescent',
    lightDots: 1,
    lightDescription: 'Thriving in office shadow',
    wateringSchedule: 'In 14 days (25d cycle)',
    wateringIntervalDays: 25,
    lastWateredDaysAgo: 11,
    fertilizerSchedule: 'Due in 3 weeks',
    fertilizerIntervalDays: 45,
    lastFedDaysAgo: 24,
    soilMoisture: 55,
    optimalMoistureRange: [20, 50],
    targetHumidity: '30-50% RH',
    potType: 'Minimalist matte concrete 9-inch',
    notes: 'Rhizomatous bulbs store water efficiently. Extremely drought-tolerant.'
  },
  {
    id: 'plant-5',
    name: 'String of Pearls',
    scientificName: 'Senecio rowleyanus',
    room: 'Kitchen Sill',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjmkgJ4hQZkvW25BUnfd4t2JywWRBPLOQUPLZ_Vma8C15eM2d5sUjcQE_QjoiR_0rTOnM1a7_GKrKhGIxcYZDpAB1PfnRBHoZyloPCj-78YAd0hgPycrjn7AdTauXepUQCRytqH15biktMTbk3R5Vf74gGxcg0ZCNRjptXn9G3cHjLrxBYLX1qtkoZeI17Rm1ekLdwZbSXnD_r8ERnkm8y4RpEex7me7l4oGFb4CP89xXums8EgHFv',
    status: 'Hydrated',
    lightCategory: 'Direct Morning',
    lightDots: 4,
    lightDescription: '4-5 hrs South sill • Soak & dry',
    wateringSchedule: 'In 4 days',
    wateringIntervalDays: 12,
    lastWateredDaysAgo: 8,
    fertilizerSchedule: 'Due in 18 days',
    fertilizerIntervalDays: 30,
    lastFedDaysAgo: 12,
    soilMoisture: 38,
    optimalMoistureRange: [25, 55],
    targetHumidity: '35-50% RH',
    potType: 'Hanging porous sandstone 6-inch',
    notes: 'Epidermal windows on pearls absorb angled winter sunlight.'
  },
  {
    id: 'plant-6',
    name: 'Snake Plant (Sansevieria)',
    scientificName: 'Dracaena trifasciata',
    room: 'Home Office',
    image: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80',
    status: 'Check Moisture',
    lightCategory: 'Low Indirect',
    lightDots: 2,
    lightDescription: '3-4 hrs diffused light',
    wateringSchedule: 'In 2 days (Moisture check)',
    wateringIntervalDays: 21,
    lastWateredDaysAgo: 19,
    fertilizerSchedule: 'Due in 4 weeks',
    fertilizerIntervalDays: 60,
    lastFedDaysAgo: 32,
    soilMoisture: 42,
    optimalMoistureRange: [15, 45],
    targetHumidity: '30-45% RH',
    potType: 'Earthenware cylinder',
    notes: 'Purifies indoor air at night via CAM photosynthetic pathway.'
  },
  {
    id: 'plant-7',
    name: 'Pothos Marble Queen',
    scientificName: 'Epipremnum aureum',
    room: 'Kitchen Sill',
    image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80',
    status: 'Hydrated',
    lightCategory: 'Bright Indirect',
    lightDots: 3,
    lightDescription: 'Filtered morning reflection',
    wateringSchedule: 'Friday (5-7d cycle)',
    wateringIntervalDays: 7,
    lastWateredDaysAgo: 3,
    fertilizerSchedule: 'Due in 10 days',
    fertilizerIntervalDays: 21,
    lastFedDaysAgo: 11,
    soilMoisture: 45,
    optimalMoistureRange: [30, 60],
    targetHumidity: '50-70% RH',
    potType: 'Terracotta bowl',
    notes: 'Fast trailing growth with distinct cream-white marbling on heart-shaped leaves.'
  },
  {
    id: 'plant-8',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    room: 'Living Room',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80',
    status: 'Reposition Needed',
    lightCategory: 'Bright Indirect',
    lightDots: 3,
    lightDescription: 'Near west window (too intense)',
    wateringSchedule: 'In 3 days',
    wateringIntervalDays: 6,
    lastWateredDaysAgo: 3,
    fertilizerSchedule: 'Due in 2 weeks',
    fertilizerIntervalDays: 30,
    lastFedDaysAgo: 16,
    soilMoisture: 52,
    optimalMoistureRange: [40, 75],
    targetHumidity: '60-70% RH',
    potType: 'Self-watering matte white cylinder',
    notes: 'Microclimate alert: Move 2ft back from west sill to prevent afternoon leaf scorch.'
  }
];

export const INITIAL_TASKS: CareTask[] = [
  {
    id: 'task-card-1',
    plantId: 'plant-1',
    plantName: 'Monstera Deliciosa',
    room: 'Living Room • South-East window',
    taskType: 'water',
    actionLabel: 'Mark Watered',
    dueTime: 'today',
    relativeDue: 'Today',
    dayNumber: 24,
    isCompleted: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDglTJ78-60hLeoVcJDByqxA6U6uA_mup9m__4kMl23dUqJ_XZ7J2EFIFxc38H2MCA3w4DgmGozoUOV4m885HioVonTvIy2IOeeF8cBP9FmypO7w7c9tsmRZl4tEirY0So3wkhOc_L_kIRdLoz1CIcHhALhfr7C4A2HbGia7RkQ3str4vzIjnZ91uRszU8mQ6QdLzdCTVcIyXE3Uyr0dLxdmqxtsE3x6rNFC_ejpKqst5Wii6sSwAJW',
    badgeText: 'Dry • 18%',
    badgeColor: 'tertiary',
    details: 'Watering (500ml filtered) & Mist foliage'
  },
  {
    id: 'task-card-2',
    plantId: 'plant-3',
    plantName: 'Calathea Orbifolia',
    room: 'Bedroom • Diffused ambient light',
    taskType: 'water',
    actionLabel: 'Mark Watered',
    dueTime: 'today',
    relativeDue: 'Today',
    dayNumber: 24,
    isCompleted: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPSbatjgGkhBWiQT5DEt26uICjL8jhBcNKwv_X-ELIM3jXaFfOdDXgYclYEcKV5Zd2OeiIhGj8UVxPtlZ1hGP41py7v5saHrFSuq1XWrVQ4ENB7lEpgwFMxPOYT9ELfKv4aJNWzyRyyuBKKathU3Ubmm2yQHfQV6rSGUupwLk6UIPmNL2swCTHzLhs4nkASOfhxIbsCVaGcEREDk5EwyQhBUyPQ0MwdXqMRJgsbQ7z3eglHE-dJ6U3',
    badgeText: 'RH: 65% Target',
    badgeColor: 'secondary',
    details: 'Distilled Water soak (300ml)'
  },
  {
    id: 'task-card-3',
    plantId: 'plant-2',
    plantName: 'Fiddle Leaf Fig',
    room: 'Sunroom • Direct filtered canopy',
    taskType: 'fertilize',
    actionLabel: 'Mark Fertilized',
    dueTime: 'today',
    relativeDue: 'Today',
    dayNumber: 24,
    isCompleted: false,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeEVUGmPBXzxxkOnJuzo2KhS82V4TGFJbdZbDtCM6kSsy3iKNs4nhfm2x4pfwoAzPUnBiFj4nnCCGdBNwpmhuHHOWaHpOXqt_C6NOnpQxpRV8QSjuCKwcIMc6NlXFxMqVizk0HVGT6D26JKw9-EvUgPCjGSAvoCDNRjcy17Fno3PcSzocLt7n7fWCz4qD2WdLpo0JWioXDNNbzQHGKMT9EBVky9hOeNM4UsxKHWG17-xn1tVpJeMZE',
    badgeText: 'Fed 28d ago',
    badgeColor: 'primary',
    details: 'Organic Bio-Fertilizer (Half dose 10-10-10)'
  },
  {
    id: 'task-card-4',
    plantId: 'plant-6',
    plantName: 'Snake Plant (Sansevieria)',
    room: 'Home Office • Moisture check prior to 200ml cycle',
    taskType: 'water',
    actionLabel: 'Check Moisture',
    dueTime: 'upcoming',
    relativeDue: 'In 2 days',
    dayNumber: 26,
    isCompleted: false,
    badgeText: 'Current soil: 42%',
    badgeColor: 'secondary',
    details: 'Moisture check prior to 200ml cycle'
  },
  {
    id: 'task-card-5',
    plantId: 'plant-7',
    plantName: 'Pothos Marble Queen',
    room: 'Kitchen Sill • Foliage dusting & node trim',
    taskType: 'clean',
    actionLabel: 'Microfiber Clean',
    dueTime: 'upcoming',
    relativeDue: 'Friday',
    dayNumber: 26,
    isCompleted: false,
    badgeText: 'Foliage maintenance',
    badgeColor: 'neutral',
    details: 'Microfiber leaf clean & node check'
  }
];

export const PHOTOMETRIC_ZONES: PhotometricZone[] = [
  {
    id: 'zone-sunroom',
    name: 'Sunroom (South / West Glass)',
    footCandles: 2150,
    rating: 'Excellent',
    percentage: 86,
    icon: 'sunny'
  },
  {
    id: 'zone-living',
    name: 'Living Room (East Window Canopy)',
    footCandles: 1050,
    rating: 'Optimal',
    percentage: 52,
    icon: 'filter_drama'
  },
  {
    id: 'zone-bedroom',
    name: 'Bedroom (North Diffused)',
    footCandles: 380,
    rating: 'Med-Low',
    percentage: 25,
    icon: 'curtains'
  },
  {
    id: 'zone-office',
    name: 'Home Office (Interior Ambient)',
    footCandles: 210,
    rating: 'Low Light',
    percentage: 14,
    icon: 'desk'
  }
];

export const DIAGNOSTIC_ISSUES: DiagnosticIssue[] = [
  {
    id: 'issue-yellow-leaves',
    title: 'Lower Leaf Chlorosis (Yellowing)',
    symptom: 'Older lower leaves turning pale yellow with soft, limp petioles.',
    affectedPart: 'leaves',
    severity: 'moderate',
    probableCauses: [
      'Substrate remaining waterlogged past 48 hours without oxygenation',
      'Insufficient root aeration due to compacted potting medium',
      'Natural senescence if only 1 single basal leaf is affected'
    ],
    remedySteps: [
      'Aerating the soil surface with a sterilized wooden chopstick to improve gas exchange',
      'Delaying subsequent watering until the top 2.5 inches read under 25% moisture',
      'Checking bottom drainage holes for any standing saucer water'
    ],
    preventativeTip: 'Always amend commercial soil mixes with 25% perlite or pumice to prevent anaerobic root suffocating.'
  },
  {
    id: 'issue-crispy-tips',
    title: 'Apical Foliar Tip Necrosis (Brown Crispy Tips)',
    symptom: 'Leaf apex and serrations turning brittle dark brown with yellow halo.',
    affectedPart: 'leaves',
    severity: 'mild',
    probableCauses: [
      'Tap water minerals (chlorine, fluoride, hard lime) accumulating in terracotta pores',
      'Ambient relative humidity dipping below 45% during heating/cooling cycles',
      'Direct late-afternoon sun scorch on sensitive calathea foliage'
    ],
    remedySteps: [
      'Leach terracotta pots with distilled water or rainwater to flush mineral crusts',
      'Position an ultrasonic cool mist humidifier 3 feet away from foliage',
      'Trim crisp margins with sterilized shear leaving 1mm brown border to avoid green tissue trauma'
    ],
    preventativeTip: 'Let tap water stand uncovered for 24 hours or switch completely to reverse osmosis or rainwater.'
  },
  {
    id: 'issue-drooping-stems',
    title: 'Turgor Pressure Loss (Wilted / Drooping Stems)',
    symptom: 'Overall plant loses rigidity, stems bowing downward.',
    affectedPart: 'stems',
    severity: 'moderate',
    probableCauses: [
      'Hydrophobic soil peat resisting water penetration (water draining around the sides)',
      'Sudden temperature drops below 16°C (60°F) from HVAC vents'
    ],
    remedySteps: [
      'Perform a bottom-soak hydration bath in lukewarm water for 30 minutes',
      'Check that water is soaking the center root ball, not just running down pot edges',
      'Move specimen away from exterior door drafts and air conditioner direct streams'
    ],
    preventativeTip: 'Bottom-soaking once a month ensures hydrophobic peat rehydrates thoroughly without channeling.'
  },
  {
    id: 'issue-root-rot',
    title: 'Pythium Root Rot Suspicions',
    symptom: 'Musty soil odor, persistent dampness despite no watering, mushy black root tips.',
    affectedPart: 'roots',
    severity: 'critical',
    probableCauses: [
      'Poor pot drainage or oversized container retaining excess moisture reservoir',
      'Fungal pathogens flourishing in low-light, cold conditions'
    ],
    remedySteps: [
      'Unpot immediately, gently rinse root system and prune dark mushy roots with sterilized scissors',
      'Spritz remaining healthy firm roots with 3% diluted hydrogen peroxide solution',
      'Repot into fresh airy chunky aroid mix in a sanitized container sized 1-inch wider than root ball'
    ],
    preventativeTip: 'Never leave plants sitting in standing runoff saucers for longer than 15 minutes after watering.'
  }
];

export const CARE_GUIDES: CareGuide[] = [
  {
    id: 'guide-aroids',
    family: 'Araceae (Aroids)',
    commonName: 'Monstera, Philodendron, Epipremnum',
    scientificName: 'Epiphytic & Hemi-epiphytic climbers',
    difficulty: 'Beginner',
    lightProfile: 'Medium to bright indirect light (800 – 1,500 Foot-Candles). Avoid harsh midday sun.',
    wateringFormula: 'Allow top 50% of substrate to dry before thorough deep soaking. Reduce frequency in winter.',
    substrateMix: '40% Orchid bark, 30% Coco coir, 20% Perlite/Pumice, 10% Worm castings for vital biome.',
    temperatureHumidity: '18°C – 28°C (65°F – 82°F) • Optimal RH 55% - 75%.',
    commonPitfalls: [
      'Potting in dense garden soil lacking drainage',
      'Letting aerial roots dry out rather than directing them into moss poles or substrate',
      'Overwatering in winter when photoperiod drops below 10 hours'
    ],
    expertAdvice: 'Stake your Monstera with a sturdy sphagnum moss pole as soon as the stem develops internodes. Foliage size will double when climbing vertically.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChXABzaI8Wz-OlrPUuVfRziB8_3dY0X1ZAC8R0lq5uf2rKXdx6-l0HBlaFVCng6G9P8g31w4BOxJkfWGxtZ4jHYtq2cBMHssOpByiv6pf2aUvKq6pdocE8pKJuIoBenGJKOWXSBC3XS_44AJffysh2FAffoyVeJYay_xlJfjprBkwCAcQs46Y_vbP-v0pLPVlB3JgfCx3hDUgQuRi_XnJu-bfnDYKlJcOX8glLQgiazQ2_CNdBBTm2'
  },
  {
    id: 'guide-ficus',
    family: 'Moraceae (Figs)',
    commonName: 'Fiddle Leaf Fig & Rubber Tree',
    scientificName: 'Ficus lyrata, Ficus elastica',
    difficulty: 'Intermediate',
    lightProfile: 'High, direct-filtered light (1,500 – 2,500 Foot-Candles). Direct morning sun encouraged.',
    wateringFormula: 'Thorough saturation when the top 2-3 inches feel completely dry. Water until it runs freely from drain holes.',
    substrateMix: '50% Peat/Coco coir, 30% Perlite, 20% Pine bark chips for structural stability.',
    temperatureHumidity: '18°C – 26°C (65°F – 78°F) • Sensitive to cold drafts below 15°C.',
    commonPitfalls: [
      'Relocating the tree frequently causing shock and lower leaf drop',
      'Dust accumulation blocking stomata on large surface leaves',
      'Inconsistent watering intervals causing edema (red foliar spotting)'
    ],
    expertAdvice: 'Rotate the container 90 degrees clockwise every 2 weeks to promote straight trunk caliper and uniform leaf distribution.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxb0sO0gLfirEHnTkMxTRgln2PcwIQUlMkd2SamkoqaFqQCNtECalza0O9nAezVGiDploSsFNxHHs0Xk8gjhxpknf367zX-2kRogXsFTnuExUeT6YcwEmLRg8HjsET0cogodVYLSeUJa1jOvqbGczowtv9Yiecl_Vf7VO3prrN_ErCbfCcfmKPo7QH3jkjzo-8J13o4dl9dGhfXvLHQ-v4uEtvK4XSHEKm-KXJ0RkkmeJC10CIhRCf'
  },
  {
    id: 'guide-calathea',
    family: 'Marantaceae (Prayer Plants)',
    commonName: 'Calathea, Maranta, Ctenanthe',
    scientificName: 'Nyctinastic tropical understory',
    difficulty: 'Master Botanist',
    lightProfile: 'Soft dappled shade or north-facing exposure (300 – 700 Foot-Candles). Zero direct UV.',
    wateringFormula: 'Keep substrate uniformly and consistently damp like a wrung-out sponge, never waterlogged.',
    substrateMix: '40% Peat moss, 30% Perlite, 20% Vermiculite, 10% Charcoal to absorb toxins.',
    temperatureHumidity: '20°C – 26°C (68°F – 78°F) • High humidity imperative: 60% – 85% RH.',
    commonPitfalls: [
      'Using municipal tap water with chloramines',
      'Allowing root system to dry out completely',
      'Spider mite vulnerability in dry winter heated rooms'
    ],
    expertAdvice: 'Calatheas fold their leaves upward at night ("praying") to preserve moisture and shed excess rain. A pebble tray or group grouping keeps humidity clustered.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgWisa4uz4pQrq7T6rqmNtd9XiL0jdqBkq9mGwZbRNKAnqrvBEjRTuh4x6G_Z4CQcsAD0zLRxO6IeQXCmZ67ENITmGGOCZ3Et_XcOWkxrIY3vfnjnHDM3Il1PEYKJFxg3qQfRKWBOrlcN5Obm4vGNvBsKn_NTpKFGf8kGXUqNGFaZmWHSIj7-oX1lwiiP-3KCKnkQDy6f-rvSden6Va3CD1KBaJsOEiciuEWmcATOjYYT1r_E669fr'
  },
  {
    id: 'guide-succulents',
    family: 'Crassulaceae & Asphodelaceae',
    commonName: 'Sansevieria, String of Pearls, ZZ Plant',
    scientificName: 'Xerophytic indoor succulents',
    difficulty: 'Beginner',
    lightProfile: 'High tolerance spectrum: from low ambient offices (ZZ) to bright south sills (Pearls).',
    wateringFormula: 'Drench and dry routine. Wait until the substrate is 100% dry throughout the entire pot depth.',
    substrateMix: '60% Coarse grit/Pumice/Perlite, 40% Organic succulent compost.',
    temperatureHumidity: '15°C – 32°C (60°F – 90°F) • Low to moderate humidity (30% – 45% RH).',
    commonPitfalls: [
      'Watering on a calendar schedule without checking soil core',
      'Pouring water directly into Sansevieria leaf rosettes causing crown rot'
    ],
    expertAdvice: 'When in doubt, wait one more week before watering. A slightly thirsty succulent will plump up immediately upon watering, but rotted roots cannot be saved.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEv2D-_6bJ1OPTT4d7S3Heuja3HUForIgidaZ-CXgXJhAl60lYz_9AxsIxFDu0gEQXfOfHBoV4gleqsKMgKz0LJuUDPvZzhvAiUvhz9j5P8BiQcNMSRIW5KC2VPnvPIOk218MUBEeiNtuI3MV1sqRo3rLF8_hrZoIQ47uLhQur6WPPDrKco1WzOgI39ru9qRsOGQ24LiLY8VLFHJJBITCQ49kJ6WWXwaJR3kt_MJm0TQ32QnbtGSJv'
  }
];
