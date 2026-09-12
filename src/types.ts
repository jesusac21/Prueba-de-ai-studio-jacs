export type RoomType = 'All Rooms' | 'Living Room' | 'Sunroom' | 'Bedroom' | 'Home Office' | 'Kitchen Sill';

export type LightLevel = 'Low Indirect' | 'Bright Indirect' | 'Direct & Filtered' | 'Direct Morning' | 'Low / Fluorescent';

export type CareStatus = 'Needs Water' | 'Feed Today' | 'Hydrated' | 'Reposition Needed' | 'Check Moisture';

export interface PlantSpecimen {
  id: string;
  name: string;
  scientificName: string;
  room: 'Living Room' | 'Sunroom' | 'Bedroom' | 'Home Office' | 'Kitchen Sill';
  image: string;
  status: CareStatus;
  lightCategory: string;
  lightDots: number; // out of 5
  lightDescription: string;
  wateringSchedule: string;
  wateringIntervalDays: number;
  lastWateredDaysAgo: number;
  fertilizerSchedule: string;
  fertilizerIntervalDays: number;
  lastFedDaysAgo: number;
  soilMoisture: number; // percentage
  optimalMoistureRange: [number, number];
  targetHumidity?: string;
  potType?: string;
  notes?: string;
}

export interface CareTask {
  id: string;
  plantId: string;
  plantName: string;
  room: string;
  taskType: 'water' | 'fertilize' | 'mist' | 'clean' | 'reposition';
  actionLabel: string;
  dueTime: 'today' | 'upcoming';
  relativeDue: string; // e.g. "Today", "In 2 days", "Friday"
  dayNumber?: number;
  isCompleted: boolean;
  image?: string;
  badgeText?: string;
  badgeColor?: 'tertiary' | 'secondary' | 'primary' | 'neutral';
  details: string;
}

export interface PhotometricZone {
  id: string;
  name: string;
  footCandles: number;
  rating: string;
  percentage: number;
  icon: string;
}

export interface DiagnosticIssue {
  id: string;
  title: string;
  symptom: string;
  affectedPart: 'leaves' | 'stems' | 'roots' | 'soil';
  severity: 'mild' | 'moderate' | 'critical';
  probableCauses: string[];
  remedySteps: string[];
  preventativeTip: string;
}

export interface CareGuide {
  id: string;
  family: string;
  commonName: string;
  scientificName: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Master Botanist';
  lightProfile: string;
  wateringFormula: string;
  substrateMix: string;
  temperatureHumidity: string;
  commonPitfalls: string[];
  expertAdvice: string;
  image: string;
}
