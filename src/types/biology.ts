export type CellType = 'plant' | 'animal';
export type OrganelleCategory = 'plant-only' | 'both';

export interface Organelle {
  id: string;
  name: string;
  category: OrganelleCategory;
  primaryFunction: string;
  p5Summary: string; // Exact P5 curriculum definition
  analogy: string;
  shapeDescription: string;
  color: string;
  plantOnly: boolean;
  vacuoleNote?: string;
}

export interface SpecimenSlide {
  id: string;
  codeName: string;
  commonName: string;
  correctType: 'plant' | 'animal';
  clues: string[];
  features: {
    hasCellWall: boolean;
    hasChloroplasts: boolean;
    hasLargeVacuole: boolean;
    shape: 'Regular / Box-like' | 'Irregular / Rounded';
  };
  fieldOfViewDescription: string;
  slideSummary: string;
  p5Tip: string;
  optimalFocus: number;
  optimalLight: number;
  bestStain: 'none' | 'methylene_blue' | 'iodine';
  visualSvgType: 'plant_leaf' | 'animal_cheek' | 'plant_onion' | 'animal_skin' | 'plant_waterweed' | 'animal_muscle';
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  p5Concept: string;
}

export interface CellPin {
  id: string;
  organelleId: string;
  label: string;
  xPercent: number;
  yPercent: number;
}
