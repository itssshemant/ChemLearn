import { organicReactions, type OrganicReaction } from './organicReactions';

export interface Reaction {
  id: string;
  title: string;
  category: 'organic' | 'inorganic' | 'physical';
  equation: string;
  description: string;
  mechanism: string;
  stepByStep: string[];
  conditions: string[];
  uses: string[];
  examples: string[];
  exceptions: string[];
  realWorldApplications: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  class: '11' | '12' | 'both';
  chapter: string;
  type: string;
}

// Inorganic and Physical Chemistry reactions
const inorganicAndPhysicalReactions: Reaction[] = [
  // CBSE Class 12 Inorganic Chemistry
  {
    id: 'haber-process',
    title: 'Haber Process',
    category: 'inorganic',
    equation: 'N₂ + 3H₂ ⇌ 2NH₃ + Heat',
    description: 'Industrial process for ammonia synthesis from nitrogen and hydrogen.',
    mechanism: 'Heterogeneous catalysis on iron surface',
    stepByStep: [
      'Adsorption: N₂ and H₂ adsorb on iron catalyst surface',
      'Dissociation: N≡N and H-H bonds break on catalyst',
      'Surface reaction: N and H atoms combine to form NH₃',
      'Desorption: NH₃ leaves catalyst surface'
    ],
    conditions: ['High pressure (200-300 atm)', 'Moderate temperature (400-500°C)', 'Iron catalyst with promoters'],
    uses: ['Ammonia production', 'Fertilizer manufacturing', 'Explosives', 'Cleaning products'],
    examples: ['Industrial ammonia plants', 'Fertilizer production', 'Nitric acid synthesis'],
    exceptions: ['Le Chatelier\'s principle affects equilibrium', 'Catalyst poisoning by sulfur'],
    realWorldApplications: ['Agricultural fertilizers', 'Pharmaceutical industry', 'Refrigeration', 'Explosives'],
    difficulty: 'medium',
    class: '12',
    chapter: 'The p-Block Elements',
    type: 'Industrial Process'
  },

  {
    id: 'contact-process',
    title: 'Contact Process',
    category: 'inorganic',
    equation: 'SO₂ + ½O₂ ⇌ SO₃',
    description: 'Industrial process for sulfuric acid production via sulfur trioxide formation.',
    mechanism: 'Catalytic oxidation of sulfur dioxide',
    stepByStep: [
      'Sulfur burning: S + O₂ → SO₂',
      'Catalytic oxidation: SO₂ + ½O₂ → SO₃ (V₂O₅ catalyst)',
      'Absorption: SO₃ + H₂SO₄ → H₂S₂O₇',
      'Dilution: H₂S₂O₇ + H₂O → 2H₂SO₄'
    ],
    conditions: ['Temperature 400-500°C', 'Pressure 1-2 atm', 'V₂O₅ catalyst'],
    uses: ['Sulfuric acid production', 'Chemical industry', 'Battery acid', 'Fertilizers'],
    examples: ['Industrial H₂SO₄ plants', 'Battery manufacturing', 'Petroleum refining'],
    exceptions: ['High temperature reduces yield', 'Catalyst deactivation by impurities'],
    realWorldApplications: ['Chemical manufacturing', 'Metal processing', 'Petroleum industry', 'Agriculture'],
    difficulty: 'medium',
    class: '12',
    chapter: 'The p-Block Elements',
    type: 'Industrial Process'
  },

  {
    id: 'ostwald-process',
    title: 'Ostwald Process',
    category: 'inorganic',
    equation: 'NH₃ + O₂ → NO → NO₂ → HNO₃',
    description: 'Industrial process for nitric acid production from ammonia.',
    mechanism: 'Catalytic oxidation followed by absorption',
    stepByStep: [
      'Ammonia oxidation: 4NH₃ + 5O₂ → 4NO + 6H₂O (Pt catalyst)',
      'NO oxidation: 2NO + O₂ → 2NO₂',
      'Disproportionation: 3NO₂ + H₂O → 2HNO₃ + NO',
      'NO recycling: NO is recycled back'
    ],
    conditions: ['Platinum catalyst', 'High temperature (900°C)', 'Pressure 4-10 atm'],
    uses: ['Nitric acid production', 'Fertilizer synthesis', 'Explosives', 'Chemical industry'],
    examples: ['Industrial HNO₃ plants', 'Ammonium nitrate production', 'TNT synthesis'],
    exceptions: ['Side reactions produce N₂O', 'Catalyst loss due to volatilization'],
    realWorldApplications: ['Fertilizer industry', 'Explosives manufacturing', 'Metal processing'],
    difficulty: 'medium',
    class: '12',
    chapter: 'The p-Block Elements',
    type: 'Industrial Process'
  },

  {
    id: 'thermite-reaction',
    title: 'Thermite Reaction',
    category: 'inorganic',
    equation: 'Fe₂O₃ + 2Al → Al₂O₃ + 2Fe + Heat',
    description: 'Highly exothermic redox reaction used for welding and metal production.',
    mechanism: 'Electron transfer from aluminum to iron oxide',
    stepByStep: [
      'Ignition: High temperature initiates reaction',
      'Reduction: Al reduces Fe₂O₃ to metallic iron',
      'Oxidation: Al is oxidized to Al₂O₃',
      'Heat release: Enormous heat melts iron'
    ],
    conditions: ['High ignition temperature (>1000°C)', 'Intimate mixing of reactants', 'Magnesium ribbon igniter'],
    uses: ['Railway track welding', 'Metal cutting', 'Military applications', 'Demolition'],
    examples: ['Railroad rail joining', 'Ship propeller repair', 'Military incendiary devices'],
    exceptions: ['Requires very high ignition temperature', 'Dangerous if not controlled'],
    realWorldApplications: ['Railway maintenance', 'Underwater welding', 'Emergency cutting', 'Metallurgy'],
    difficulty: 'medium',
    class: '12',
    chapter: 'General Principles and Processes of Isolation of Elements',
    type: 'Redox Reaction'
  },

  {
    id: 'hall-heroult-process',
    title: 'Hall-Héroult Process',
    category: 'inorganic',
    equation: '2Al₂O₃ + 3C → 4Al + 3CO₂',
    description: 'Electrolytic process for aluminum extraction from alumina.',
    mechanism: 'Electrolysis of molten alumina in cryolite',
    stepByStep: [
      'Dissolution: Al₂O₃ dissolves in molten cryolite (Na₃AlF₆)',
      'Cathode reaction: Al³⁺ + 3e⁻ → Al',
      'Anode reaction: 2O²⁻ → O₂ + 4e⁻',
      'Carbon consumption: C + O₂ → CO₂'
    ],
    conditions: ['Temperature 950-970°C', 'Cryolite flux', 'Carbon electrodes', 'High current'],
    uses: ['Aluminum production', 'Metal industry', 'Aerospace applications'],
    examples: ['Industrial aluminum smelters', 'Aluminum ingot production'],
    exceptions: ['High energy consumption', 'Anode consumption', 'Fluoride emissions'],
    realWorldApplications: ['Aluminum industry', 'Aerospace', 'Automotive', 'Construction'],
    difficulty: 'medium',
    class: '12',
    chapter: 'General Principles and Processes of Isolation of Elements',
    type: 'Electrolytic Process'
  },

  // Physical Chemistry Reactions
  {
    id: 'electrolysis-water',
    title: 'Electrolysis of Water',
    category: 'physical',
    equation: '2H₂O → 2H₂ + O₂',
    description: 'Decomposition of water into hydrogen and oxygen using electrical energy.',
    mechanism: 'Redox reaction with reduction at cathode and oxidation at anode',
    stepByStep: [
      'At cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻ (reduction)',
      'At anode: 2H₂O → O₂ + 4H⁺ + 4e⁻ (oxidation)',
      'Overall: 2H₂O → 2H₂ + O₂',
      'Ion migration: H⁺ to cathode, OH⁻ to anode'
    ],
    conditions: ['Electric current', 'Electrolyte (H₂SO₄/NaOH)', 'Inert electrodes (Pt)'],
    uses: ['Hydrogen production', 'Oxygen generation', 'Water purification', 'Energy storage'],
    examples: ['Industrial H₂ production', 'Fuel cell technology', 'Space applications'],
    exceptions: ['Pure water is poor conductor', 'Electrode material affects products'],
    realWorldApplications: ['Hydrogen fuel', 'Oxygen for hospitals', 'Water treatment', 'Energy storage'],
    difficulty: 'easy',
    class: '12',
    chapter: 'Electrochemistry',
    type: 'Electrolytic Process'
  },

  {
    id: 'daniell-cell',
    title: 'Daniell Cell',
    category: 'physical',
    equation: 'Zn + Cu²⁺ → Zn²⁺ + Cu',
    description: 'Galvanic cell that converts chemical energy to electrical energy.',
    mechanism: 'Spontaneous redox reaction in separate half-cells',
    stepByStep: [
      'At anode: Zn → Zn²⁺ + 2e⁻ (oxidation)',
      'At cathode: Cu²⁺ + 2e⁻ → Cu (reduction)',
      'Electron flow: From Zn to Cu through external circuit',
      'Ion flow: Through salt bridge to complete circuit'
    ],
    conditions: ['Zn and Cu electrodes', 'ZnSO₄ and CuSO₄ solutions', 'Salt bridge'],
    uses: ['Battery technology', 'Electrochemical studies', 'Power generation'],
    examples: ['Early batteries', 'Laboratory demonstrations', 'Electrochemical series'],
    exceptions: ['Cell potential decreases with use', 'Concentration affects EMF'],
    realWorldApplications: ['Battery development', 'Corrosion studies', 'Electroplating', 'Sensors'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Electrochemistry',
    type: 'Galvanic Cell'
  },

  {
    id: 'neutralization',
    title: 'Acid-Base Neutralization',
    category: 'inorganic',
    equation: 'HCl + NaOH → NaCl + H₂O',
    description: 'Reaction between acid and base to form salt and water.',
    mechanism: 'Proton transfer from acid to base',
    stepByStep: [
      'Dissociation: HCl → H⁺ + Cl⁻',
      'Dissociation: NaOH → Na⁺ + OH⁻',
      'Neutralization: H⁺ + OH⁻ → H₂O',
      'Salt formation: Na⁺ + Cl⁻ → NaCl'
    ],
    conditions: ['Aqueous medium', 'Room temperature', 'Stoichiometric amounts'],
    uses: ['pH adjustment', 'Salt production', 'Waste treatment', 'Titrations'],
    examples: ['HCl + NaOH', 'H₂SO₄ + Ba(OH)₂', 'CH₃COOH + NH₃'],
    exceptions: ['Weak acids/bases partially ionize', 'Buffer solutions resist pH change'],
    realWorldApplications: ['Antacid tablets', 'Water treatment', 'Food preservation', 'Industrial processes'],
    difficulty: 'easy',
    class: '11',
    chapter: 'Equilibrium',
    type: 'Acid-Base Reaction'
  },

  {
    id: 'redox-permanganate',
    title: 'Permanganate Oxidation',
    category: 'inorganic',
    equation: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O',
    description: 'Oxidation reactions using potassium permanganate as oxidizing agent.',
    mechanism: 'Electron transfer from reducing agent to permanganate',
    stepByStep: [
      'Permanganate reduction: MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O',
      'Substrate oxidation: Various depending on substrate',
      'Electron transfer: From substrate to permanganate',
      'Color change: Purple to colorless (acidic) or brown (neutral/basic)'
    ],
    conditions: ['Acidic medium (H₂SO₄)', 'Room temperature', 'Dilute solutions'],
    uses: ['Analytical chemistry', 'Water treatment', 'Organic synthesis', 'Disinfection'],
    examples: ['Oxalic acid titration', 'Alkene oxidation', 'Alcohol oxidation'],
    exceptions: ['Different products in different pH', 'Can over-oxidize substrates'],
    realWorldApplications: ['Water purification', 'Medical antiseptic', 'Laboratory analysis'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Redox Reactions',
    type: 'Redox Reaction'
  },

  {
    id: 'buffer-action',
    title: 'Buffer Action',
    category: 'physical',
    equation: 'CH₃COOH + CH₃COONa ⇌ H⁺ + CH₃COO⁻',
    description: 'Resistance to pH change by buffer solutions containing weak acid and its salt.',
    mechanism: 'Le Chatelier\'s principle and common ion effect',
    stepByStep: [
      'Equilibrium establishment: Weak acid partially dissociates',
      'Common ion effect: Salt provides conjugate base',
      'Acid addition: OH⁻ neutralized by weak acid',
      'Base addition: H⁺ neutralized by conjugate base'
    ],
    conditions: ['Weak acid and its salt', 'Comparable concentrations', 'Aqueous medium'],
    uses: ['pH control', 'Biological systems', 'Analytical chemistry', 'Industrial processes'],
    examples: ['Acetate buffer', 'Phosphate buffer', 'Blood buffer system'],
    exceptions: ['Buffer capacity limited', 'Effective in narrow pH range'],
    realWorldApplications: ['Biological systems', 'Pharmaceutical formulations', 'Food preservation'],
    difficulty: 'medium',
    class: '11',
    chapter: 'Equilibrium',
    type: 'Buffer System'
  }
];

// Combine all reactions
export const reactions: Reaction[] = [
  ...organicReactions,
  ...inorganicAndPhysicalReactions
];

// Utility functions
export const getReactionsByCategory = (category: string): Reaction[] => {
  return reactions.filter(reaction => reaction.category === category);
};

export const getReactionsByClass = (classLevel: string): Reaction[] => {
  return reactions.filter(reaction => reaction.class === classLevel || reaction.class === 'both');
};

export const getReactionsByDifficulty = (difficulty: string): Reaction[] => {
  return reactions.filter(reaction => reaction.difficulty === difficulty);
};

export const getReactionsByChapter = (chapter: string): Reaction[] => {
  return reactions.filter(reaction => reaction.chapter === chapter);
};

export const getReactionsByType = (type: string): Reaction[] => {
  return reactions.filter(reaction => reaction.type === type);
};

export const searchReactions = (query: string): Reaction[] => {
  const lowercaseQuery = query.toLowerCase();
  return reactions.filter(reaction => 
    reaction.title.toLowerCase().includes(lowercaseQuery) ||
    reaction.description.toLowerCase().includes(lowercaseQuery) ||
    reaction.category.toLowerCase().includes(lowercaseQuery) ||
    reaction.equation.toLowerCase().includes(lowercaseQuery) ||
    reaction.chapter.toLowerCase().includes(lowercaseQuery) ||
    reaction.type.toLowerCase().includes(lowercaseQuery) ||
    reaction.uses.some(use => use.toLowerCase().includes(lowercaseQuery)) ||
    reaction.examples.some(example => example.toLowerCase().includes(lowercaseQuery))
  );
};

export const getReactionCategories = (): string[] => {
  return [...new Set(reactions.map(reaction => reaction.category))];
};

export const getReactionTypes = (): string[] => {
  return [...new Set(reactions.map(reaction => reaction.type))];
};

export const getReactionChapters = (): string[] => {
  return [...new Set(reactions.map(reaction => reaction.chapter))];
};

export const getReactionDifficulties = (): string[] => {
  return [...new Set(reactions.map(reaction => reaction.difficulty))];
};