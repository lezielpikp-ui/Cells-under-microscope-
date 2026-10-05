import { Organelle, SpecimenSlide, QuizQuestion, CellPin } from '../types/biology';

// The exact 7 cell parts for Primary 5 Science curriculum
export const ORGANELLES: Organelle[] = [
  {
    id: 'cell_wall',
    name: 'Cell Wall',
    category: 'plant-only',
    plantOnly: true,
    primaryFunction: 'Gives support, shape, and protection.',
    p5Summary: 'Gives support, shape, and protection',
    analogy: 'Strong Brick Wall / Stiff Cardboard Box',
    shapeDescription: 'Stiff outer layer outside the cell membrane.',
    color: '#16a34a'
  },
  {
    id: 'chloroplast',
    name: 'Chloroplasts',
    category: 'plant-only',
    plantOnly: true,
    primaryFunction: 'Makes food using sunlight (photosynthesis). Contains green chlorophyll.',
    p5Summary: 'Makes food using sunlight (photosynthesis)',
    analogy: 'Solar Panel / Food Kitchen',
    shapeDescription: 'Small green oval discs containing green chlorophyll.',
    color: '#22c55e'
  },
  {
    id: 'cell_membrane',
    name: 'Cell Membrane',
    category: 'both',
    plantOnly: false,
    primaryFunction: 'Controls what enters and leaves the cell; protects it.',
    p5Summary: 'Controls what enters and leaves the cell; protects it',
    analogy: 'Security Guard / Gated Doorway',
    shapeDescription: 'Thin flexible skin around the cell (just inside the cell wall in plant cells).',
    color: '#0284c7'
  },
  {
    id: 'nucleus',
    name: 'Nucleus',
    category: 'both',
    plantOnly: false,
    primaryFunction: 'Control centre; directs all cell activities; holds DNA.',
    p5Summary: 'Control centre; directs all cell activities; holds DNA',
    analogy: 'The Brain / Principal of the Cell',
    shapeDescription: 'Round, dark-stained ball inside the cell.',
    color: '#6366f1'
  },
  {
    id: 'cytoplasm',
    name: 'Cytoplasm',
    category: 'both',
    plantOnly: false,
    primaryFunction: 'Jelly-like substance; holds all organelles in place.',
    p5Summary: 'Jelly-like substance; holds all organelles in place',
    analogy: 'Clear Jelly Cushion / Swimming Pool Water',
    shapeDescription: 'Jelly-like fluid filling the space inside the cell.',
    color: '#94a3b8'
  },
  {
    id: 'mitochondria',
    name: 'Mitochondria',
    category: 'both',
    plantOnly: false,
    primaryFunction: 'Produces energy for the cell — the "powerhouse".',
    p5Summary: 'Produces energy for the cell — the "powerhouse"',
    analogy: 'The Powerhouse / Rechargeable Battery',
    shapeDescription: 'Tiny oval shapes that release energy from food.',
    color: '#ea580c'
  },
  {
    id: 'vacuole',
    name: 'Vacuole',
    category: 'both',
    plantOnly: false,
    primaryFunction: 'Stores water, food, and waste (larger in plant cells).',
    p5Summary: 'Stores water, food, and waste (larger in plant cells)',
    analogy: 'Water Storage Tank / Pantry',
    shapeDescription: 'One HUGE central sac in plant cells; few TINY sacs in animal cells.',
    color: '#0ea5e9',
    vacuoleNote: 'Plant cells have ONE LARGE central vacuole. Animal cells have SMALL vacuoles.'
  }
];

// 6 engaging Primary 5 specimen slides
export const SPECIMEN_SLIDES: SpecimenSlide[] = [
  {
    id: 'slide_1',
    codeName: 'SLIDE #1',
    commonName: 'Elodea (Waterweed) Leaf Cell',
    correctType: 'plant',
    clues: [
      'You can see a stiff, box-shaped outer Cell Wall.',
      'Bright green Chloroplasts are moving in the sunlight!',
      'There is one large Vacuole in the middle of each cell.'
    ],
    features: {
      hasCellWall: true,
      hasChloroplasts: true,
      hasLargeVacuole: true,
      shape: 'Regular / Box-like'
    },
    fieldOfViewDescription: 'Neat green rectangular cells with green chloroplast discs and a clear cell wall.',
    slideSummary: 'This is a leaf cell from a waterweed plant. The green chloroplasts and stiff cell wall prove it is a PLANT cell!',
    p5Tip: 'Remember: Only plant cells have Chloroplasts to make food with sunlight, and a stiff Cell Wall!',
    optimalFocus: 70,
    optimalLight: 75,
    bestStain: 'none',
    visualSvgType: 'plant_leaf'
  },
  {
    id: 'slide_2',
    codeName: 'SLIDE #2',
    commonName: 'Human Cheek Cell',
    correctType: 'animal',
    clues: [
      'The shape is soft, irregular, and rounded (NOT a stiff box).',
      'There is NO stiff cell wall — only a thin Cell Membrane.',
      'There are NO green chloroplasts.',
      'You can clearly see a dark Nucleus right in the centre.'
    ],
    features: {
      hasCellWall: false,
      hasChloroplasts: false,
      hasLargeVacuole: false,
      shape: 'Irregular / Rounded'
    },
    fieldOfViewDescription: 'Translucent rounded cells with soft flexible edges and a dark blue nucleus in the middle.',
    slideSummary: 'These cells were gently scraped from inside a human cheek. Because it has NO cell wall and NO chloroplasts, it is an ANIMAL cell!',
    p5Tip: 'Animal cells have a flexible cell membrane, so they have an irregular rounded shape instead of a stiff box.',
    optimalFocus: 55,
    optimalLight: 60,
    bestStain: 'methylene_blue',
    visualSvgType: 'animal_cheek'
  },
  {
    id: 'slide_3',
    codeName: 'SLIDE #3',
    commonName: 'Onion Skin Cell',
    correctType: 'plant',
    clues: [
      'Cells fit together neatly like bricks in a wall.',
      'Has a very clear, stiff Cell Wall giving it a regular shape.',
      'Has a huge central Vacuole pushing the nucleus to the side.',
      'Tricky: NO green chloroplasts! (Why? Onions grow underground away from sunlight).'
    ],
    features: {
      hasCellWall: true,
      hasChloroplasts: false,
      hasLargeVacuole: true,
      shape: 'Regular / Box-like'
    },
    fieldOfViewDescription: 'Neat rows of rectangular cells with stiff outer walls and clear central vacuoles.',
    slideSummary: 'Onion skin cell! Even without chloroplasts, the stiff Cell Wall and Large Vacuole prove it is definitely a PLANT cell.',
    p5Tip: 'P5 Exam Tip: Onion bulbs grow underground where there is no sunlight, so they do NOT need chloroplasts! But they still have a Cell Wall!',
    optimalFocus: 65,
    optimalLight: 70,
    bestStain: 'iodine',
    visualSvgType: 'plant_onion'
  },
  {
    id: 'slide_4',
    codeName: 'SLIDE #4',
    commonName: 'Human Muscle Cell',
    correctType: 'animal',
    clues: [
      'Long flexible fibers that can bend and stretch.',
      'Has a flexible Cell Membrane with NO stiff cell wall.',
      'Packed with Mitochondria to make lots of energy for movement!',
      'NO chloroplasts anywhere.'
    ],
    features: {
      hasCellWall: false,
      hasChloroplasts: false,
      hasLargeVacuole: false,
      shape: 'Irregular / Rounded'
    },
    fieldOfViewDescription: 'Stretchy pink muscle fibers with flexible cell membranes and active mitochondria.',
    slideSummary: 'Muscle cells from an animal. They need lots of Mitochondria (the powerhouse) to produce energy for running and jumping!',
    p5Tip: 'Muscle cells need lots of energy, so they have many Mitochondria — the "powerhouse" of the cell!',
    optimalFocus: 60,
    optimalLight: 65,
    bestStain: 'methylene_blue',
    visualSvgType: 'animal_muscle'
  },
  {
    id: 'slide_5',
    codeName: 'SLIDE #5',
    commonName: 'Hydrilla Leaf Cell',
    correctType: 'plant',
    clues: [
      'Bright green cells packed with tiny green Chloroplasts.',
      'Stiff cellulose Cell Wall gives each cell a regular brick shape.',
      'One large clear Vacuole holding water in each cell.'
    ],
    features: {
      hasCellWall: true,
      hasChloroplasts: true,
      hasLargeVacuole: true,
      shape: 'Regular / Box-like'
    },
    fieldOfViewDescription: 'Vibrant green plant cells with visible chloroplasts and strong cell walls.',
    slideSummary: 'Hydrilla is an aquatic green plant. The chloroplasts catch sunlight through the water to make food (photosynthesis)!',
    p5Tip: 'Chloroplasts contain green chlorophyll which absorbs sunlight for photosynthesis.',
    optimalFocus: 72,
    optimalLight: 75,
    bestStain: 'none',
    visualSvgType: 'plant_waterweed'
  },
  {
    id: 'slide_6',
    codeName: 'SLIDE #6',
    commonName: 'Bird Skin Cell',
    correctType: 'animal',
    clues: [
      'Soft flexible cell boundary with NO stiff cell wall.',
      'Contains a dark control centre (Nucleus) and jelly-like Cytoplasm.',
      'Only tiny vacuoles (NOT a giant central vacuole).',
      'No chloroplasts.'
    ],
    features: {
      hasCellWall: false,
      hasChloroplasts: false,
      hasLargeVacuole: false,
      shape: 'Irregular / Rounded'
    },
    fieldOfViewDescription: 'Rounded animal skin cells with flexible membranes and central nuclei.',
    slideSummary: 'Animal skin cells protect the body while remaining soft and flexible because they lack a rigid cell wall.',
    p5Tip: 'Both plant and animal cells have Cell Membrane, Nucleus, and Cytoplasm! But only plant cells have a Cell Wall!',
    optimalFocus: 58,
    optimalLight: 65,
    bestStain: 'methylene_blue',
    visualSvgType: 'animal_skin'
  }
];

// Pins for Plant Cell (The 7 P5 parts)
export const PLANT_CELL_PINS: CellPin[] = [
  { id: 'pin_p_wall', organelleId: 'cell_wall', label: 'Cell Wall', xPercent: 12, yPercent: 16 },
  { id: 'pin_p_membrane', organelleId: 'cell_membrane', label: 'Cell Membrane', xPercent: 18, yPercent: 32 },
  { id: 'pin_p_vacuole', organelleId: 'vacuole', label: 'Large Vacuole', xPercent: 55, yPercent: 48 },
  { id: 'pin_p_chloroplast', organelleId: 'chloroplast', label: 'Chloroplasts', xPercent: 78, yPercent: 24 },
  { id: 'pin_p_nucleus', organelleId: 'nucleus', label: 'Nucleus', xPercent: 28, yPercent: 68 },
  { id: 'pin_p_cytoplasm', organelleId: 'cytoplasm', label: 'Cytoplasm', xPercent: 48, yPercent: 82 },
  { id: 'pin_p_mitochondria', organelleId: 'mitochondria', label: 'Mitochondria', xPercent: 82, yPercent: 68 }
];

// Pins for Animal Cell (The 5 P5 parts present in animal cells)
export const ANIMAL_CELL_PINS: CellPin[] = [
  { id: 'pin_a_membrane', organelleId: 'cell_membrane', label: 'Cell Membrane', xPercent: 15, yPercent: 32 },
  { id: 'pin_a_nucleus', organelleId: 'nucleus', label: 'Nucleus', xPercent: 48, yPercent: 48 },
  { id: 'pin_a_cytoplasm', organelleId: 'cytoplasm', label: 'Cytoplasm', xPercent: 26, yPercent: 74 },
  { id: 'pin_a_mitochondria', organelleId: 'mitochondria', label: 'Mitochondria', xPercent: 78, yPercent: 36 },
  { id: 'pin_a_vacuole', organelleId: 'vacuole', label: 'Small Vacuoles', xPercent: 68, yPercent: 66 }
];

// 10 Primary 5 Exam Practice Questions
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    prompt: 'Which two cell parts are found in plant cells, but NEVER in animal cells?',
    options: [
      'Cell Wall and Chloroplasts',
      'Nucleus and Cell Membrane',
      'Cytoplasm and Mitochondria',
      'Vacuole and Nucleus'
    ],
    correctIndex: 0,
    explanation: 'Cell Wall (gives support, shape, and protection) and Chloroplasts (makes food using sunlight) are found ONLY in plant cells!',
    p5Concept: 'Plants Only Parts'
  },
  {
    id: 'q2',
    prompt: 'What is the main function of the Nucleus in both plant and animal cells?',
    options: [
      'To produce energy for the cell',
      'Control centre; directs all cell activities; holds DNA',
      'To control what enters and leaves the cell',
      'To store water and food'
    ],
    correctIndex: 1,
    explanation: 'The Nucleus is the control centre of the cell. It directs all cell activities and holds the genetic material (DNA).',
    p5Concept: 'Nucleus Function'
  },
  {
    id: 'q3',
    prompt: 'Which part of the cell acts like a security guard by controlling what enters and leaves the cell?',
    options: [
      'Cytoplasm',
      'Cell Membrane',
      'Cell Wall',
      'Chloroplast'
    ],
    correctIndex: 1,
    explanation: 'The Cell Membrane controls what enters and leaves the cell and protects it. It is found in BOTH plant and animal cells.',
    p5Concept: 'Cell Membrane'
  },
  {
    id: 'q4',
    prompt: 'Why do plant cells have a regular, box-like shape while animal cells have an irregular, flexible shape?',
    options: [
      'Plant cells have a stiff Cell Wall that gives support and a fixed shape.',
      'Plant cells have more water than animal cells.',
      'Animal cells have chloroplasts that make them round.',
      'Plant cells do not have a cell membrane.'
    ],
    correctIndex: 0,
    explanation: 'The stiff Cell Wall in plant cells provides support, protection, and gives the cell its regular, fixed box-like shape.',
    p5Concept: 'Cell Wall Function'
  },
  {
    id: 'q5',
    prompt: 'Which cell part is known as the "powerhouse" because it produces energy for the cell?',
    options: [
      'Cytoplasm',
      'Mitochondria',
      'Vacuole',
      'Chloroplast'
    ],
    correctIndex: 1,
    explanation: 'Mitochondria produces energy for the cell — that is why it is called the "powerhouse" of the cell!',
    p5Concept: 'Mitochondria'
  },
  {
    id: 'q6',
    prompt: 'How is the Vacuole in a plant cell different from the vacuoles in an animal cell?',
    options: [
      'Plant cells have one LARGE central vacuole, while animal cells have small vacuoles.',
      'Animal cells have green vacuoles, while plant cells have clear ones.',
      'Only animal cells have vacuoles; plant cells do not.',
      'Plant vacuoles produce energy, while animal vacuoles do not.'
    ],
    correctIndex: 0,
    explanation: 'Plant cells usually have ONE LARGE central vacuole full of liquid to keep the cell firm, while animal cells only have small vacuoles.',
    p5Concept: 'Vacuole Comparison'
  },
  {
    id: 'q7',
    prompt: 'Under a microscope, a student sees green structures inside a leaf cell. What are these green parts and what is their job?',
    options: [
      'Chloroplasts — they make food using sunlight (photosynthesis)',
      'Mitochondria — they store waste',
      'Cell Walls — they absorb water',
      'Nuclei — they hold extra air'
    ],
    correctIndex: 0,
    explanation: 'Chloroplasts contain green chlorophyll which traps sunlight to make food for the plant through photosynthesis!',
    p5Concept: 'Chloroplasts'
  },
  {
    id: 'q8',
    prompt: 'Why do onion bulb cells NOT have green chloroplasts even though an onion is a plant?',
    options: [
      'Onions grow underground where there is no sunlight, so they do not make chloroplasts.',
      'The onion cell was broken under the microscope.',
      'Onions are actually animals, not plants.',
      'Chloroplasts only appear when an onion is cooked.'
    ],
    correctIndex: 0,
    explanation: 'Chloroplasts are only found in plant parts that get sunlight (like leaves). Onion bulbs grow underground in the dark, so they do not have chloroplasts!',
    p5Concept: 'P5 Science Concept'
  },
  {
    id: 'q9',
    prompt: 'What is the jelly-like substance that fills the cell and holds all the organelles in place?',
    options: [
      'Cell Membrane',
      'Cytoplasm',
      'Cell Wall',
      'Vacuole'
    ],
    correctIndex: 1,
    explanation: 'Cytoplasm is the jelly-like substance that fills the cell and holds all organelles in place.',
    p5Concept: 'Cytoplasm'
  },
  {
    id: 'q10',
    prompt: 'A mystery cell has a Nucleus, Cytoplasm, Cell Membrane, and Mitochondria, but NO Cell Wall and NO Chloroplasts. What is it?',
    options: [
      'An Animal Cell',
      'A Plant Leaf Cell',
      'An Onion Cell',
      'A Tree Bark Cell'
    ],
    correctIndex: 0,
    explanation: 'Because it lacks a Cell Wall and Chloroplasts, this must be an ANIMAL cell! All plant cells have a cell wall.',
    p5Concept: 'Identification Summary'
  }
];
