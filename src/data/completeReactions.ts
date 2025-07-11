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
  visualRepresentation?: string;
  animationSteps?: string[];
  industrialApplications: string[];
  safetyPrecautions: string[];
  economicImportance: string[];
}

export const completeReactions: Reaction[] = [
  // CBSE Class 11 - Basic Concepts and Hydrocarbons
  {
    id: 'combustion-methane',
    title: 'Combustion of Methane',
    category: 'organic',
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O + Heat (890 kJ/mol)',
    description: 'Complete combustion of methane in presence of excess oxygen, fundamental reaction for energy production.',
    mechanism: 'Free radical chain reaction involving initiation, propagation, and termination steps.',
    stepByStep: [
      'Initiation: O₂ → 2O• (high temperature)',
      'Propagation: CH₄ + O• → CH₃• + OH•',
      'Propagation: CH₃• + O₂ → CH₃O₂•',
      'Chain branching: CH₃O₂• → CH₂O + OH•',
      'Termination: Radical recombination reactions'
    ],
    conditions: ['Temperature > 500°C', 'Excess oxygen', 'Ignition source'],
    uses: ['Natural gas heating', 'Power generation', 'Industrial processes', 'Cooking fuel'],
    examples: ['Natural gas stoves', 'Gas turbines', 'Bunsen burner', 'Gas water heaters'],
    exceptions: ['Incomplete combustion with limited oxygen', 'Soot formation at high temperatures'],
    realWorldApplications: ['Home heating', 'Electricity generation', 'Industrial furnaces', 'Vehicle fuel'],
    difficulty: 'easy',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Combustion Reaction',
    visualRepresentation: 'Molecular animation showing CH₄ + O₂ collision and product formation',
    animationSteps: ['Reactant approach', 'Bond breaking', 'Intermediate formation', 'Product separation'],
    industrialApplications: ['Power plants', 'Chemical industry', 'Steel production', 'Glass manufacturing'],
    safetyPrecautions: ['Proper ventilation', 'Gas leak detection', 'Fire safety measures'],
    economicImportance: ['Major energy source', 'Billion-dollar industry', 'Job creation', 'Energy security']
  },

  {
    id: 'halogenation-alkanes',
    title: 'Free Radical Halogenation of Alkanes',
    category: 'organic',
    equation: 'CH₄ + Cl₂ → CH₃Cl + HCl (UV light)',
    description: 'Substitution reaction where hydrogen atoms in alkanes are replaced by halogen atoms via free radical mechanism.',
    mechanism: 'Free radical substitution involving initiation, propagation, and termination steps.',
    stepByStep: [
      'Initiation: Cl₂ → 2Cl• (UV light, ΔH = +243 kJ/mol)',
      'Propagation: CH₄ + Cl• → CH₃• + HCl (ΔH = +4 kJ/mol)',
      'Propagation: CH₃• + Cl₂ → CH₃Cl + Cl• (ΔH = -101 kJ/mol)',
      'Termination: Cl• + Cl• → Cl₂',
      'Termination: CH₃• + CH₃• → C₂H₆'
    ],
    conditions: ['UV light (300-400 nm)', 'Temperature 300-400°C', 'Anhydrous conditions', 'Inert atmosphere'],
    uses: ['Chloroform production', 'Solvent synthesis', 'Pharmaceutical intermediates', 'Pesticide production'],
    examples: ['Methyl chloride synthesis', 'Carbon tetrachloride production', 'Chloroform manufacturing'],
    exceptions: ['Multiple substitution products', 'Tertiary > Secondary > Primary reactivity', 'Rearrangement possible'],
    realWorldApplications: ['Refrigerants', 'Dry cleaning solvents', 'Pharmaceutical industry', 'Polymer production'],
    difficulty: 'medium',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Substitution Reaction',
    visualRepresentation: '3D animation of radical formation and chain propagation',
    animationSteps: ['UV photolysis', 'Radical formation', 'H-abstraction', 'Halogen transfer', 'Chain termination'],
    industrialApplications: ['Chemical manufacturing', 'Solvent production', 'Pharmaceutical synthesis'],
    safetyPrecautions: ['UV protection', 'Ventilation systems', 'Halogen gas handling'],
    economicImportance: ['Multi-billion dollar chlor-alkali industry', 'Essential for chemical synthesis']
  },

  {
    id: 'addition-alkenes-hx',
    title: 'Addition of Hydrogen Halides to Alkenes',
    category: 'organic',
    equation: 'CH₃CH=CH₂ + HBr → CH₃CHBrCH₃ (Markovnikov)',
    description: 'Electrophilic addition of hydrogen halides to alkenes following Markovnikov\'s rule.',
    mechanism: 'Two-step electrophilic addition via carbocation intermediate.',
    stepByStep: [
      'Step 1: Alkene attacks H⁺, forming more stable 2° carbocation',
      'Step 2: Br⁻ attacks carbocation from either side',
      'Product: 2-bromopropane (major product)',
      'Carbocation stability: 3° > 2° > 1° > methyl'
    ],
    conditions: ['Room temperature', 'Polar solvent (if used)', 'Anhydrous HX', 'Absence of peroxides'],
    uses: ['Alkyl halide synthesis', 'Pharmaceutical intermediates', 'Polymer precursors'],
    examples: ['Propene + HCl → 2-chloropropane', 'Ethene + HBr → bromoethane'],
    exceptions: ['Anti-Markovnikov with peroxides', 'Rearrangement in carbocations', 'Syn addition in some cases'],
    realWorldApplications: ['Drug synthesis', 'Plastic production', 'Chemical intermediates'],
    difficulty: 'medium',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Addition Reaction',
    visualRepresentation: 'Orbital overlap showing electrophilic attack and carbocation formation',
    animationSteps: ['π-bond polarization', 'Electrophilic attack', 'Carbocation formation', 'Nucleophilic attack'],
    industrialApplications: ['Pharmaceutical industry', 'Polymer manufacturing', 'Fine chemicals'],
    safetyPrecautions: ['HX gas handling', 'Corrosion protection', 'Ventilation'],
    economicImportance: ['Key step in pharmaceutical synthesis', 'Industrial chemical production']
  },

  // CBSE Class 12 - Advanced Organic Chemistry
  {
    id: 'sn1-mechanism',
    title: 'SN1 Nucleophilic Substitution',
    category: 'organic',
    equation: '(CH₃)₃CBr + OH⁻ → (CH₃)₃COH + Br⁻',
    description: 'Unimolecular nucleophilic substitution involving carbocation intermediate, showing first-order kinetics.',
    mechanism: 'Two-step mechanism with rate-determining ionization step.',
    stepByStep: [
      'Step 1: (CH₃)₃CBr → (CH₃)₃C⁺ + Br⁻ (slow, rate-determining)',
      'Step 2: (CH₃)₃C⁺ + OH⁻ → (CH₃)₃COH (fast)',
      'Rate = k[(CH₃)₃CBr] (first-order kinetics)',
      'Racemization occurs due to planar carbocation'
    ],
    conditions: ['Polar protic solvent (H₂O, ROH)', 'Tertiary alkyl halides', 'Weak nucleophile', 'Heat'],
    uses: ['Alcohol synthesis', 'Ether formation', 'Pharmaceutical intermediates'],
    examples: ['tert-Butyl chloride hydrolysis', 'Benzyl chloride solvolysis', 'Allyl halide reactions'],
    exceptions: ['Primary halides don\'t undergo SN1', 'Rearrangement possible', 'Competing elimination'],
    realWorldApplications: ['Drug manufacturing', 'Fine chemical synthesis', 'Academic research'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Haloalkanes and Haloarenes',
    type: 'Substitution Mechanism',
    visualRepresentation: 'Energy diagram showing two-step mechanism with carbocation intermediate',
    animationSteps: ['C-X bond breaking', 'Carbocation formation', 'Nucleophile approach', 'Product formation'],
    industrialApplications: ['Pharmaceutical synthesis', 'Specialty chemicals', 'Research applications'],
    safetyPrecautions: ['Solvent handling', 'Heat management', 'Waste disposal'],
    economicImportance: ['Essential for drug synthesis', 'High-value chemical production']
  },

  {
    id: 'aldol-condensation',
    title: 'Aldol Condensation',
    category: 'organic',
    equation: '2CH₃CHO → CH₃CH(OH)CH₂CHO → CH₃CH=CHCHO + H₂O',
    description: 'Base-catalyzed reaction between two carbonyl compounds forming β-hydroxy carbonyl compound, followed by dehydration.',
    mechanism: 'Enolate ion formation followed by nucleophilic addition and elimination.',
    stepByStep: [
      'Enolate formation: CH₃CHO + OH⁻ → CH₂⁻CHO + H₂O',
      'Nucleophilic addition: CH₂⁻CHO + CH₃CHO → CH₃CH(O⁻)CH₂CHO',
      'Protonation: CH₃CH(O⁻)CH₂CHO + H₂O → CH₃CH(OH)CH₂CHO + OH⁻',
      'Dehydration: CH₃CH(OH)CH₂CHO → CH₃CH=CHCHO + H₂O'
    ],
    conditions: ['Dilute NaOH (10%)', 'Temperature 0-5°C for aldol', 'Heat for condensation', 'Aqueous medium'],
    uses: ['C-C bond formation', 'Synthesis of complex molecules', 'Industrial chemistry', 'Natural product synthesis'],
    examples: ['Acetaldehyde aldol', 'Crossed aldol reactions', 'Intramolecular aldol', 'Ketone aldol'],
    exceptions: ['Ketones less reactive', 'Mixed aldol gives multiple products', 'Retro-aldol possible'],
    realWorldApplications: ['Pharmaceutical synthesis', 'Fragrance industry', 'Polymer precursors'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Condensation Reaction',
    visualRepresentation: 'Mechanism showing enolate formation and nucleophilic addition',
    animationSteps: ['Base deprotonation', 'Enolate formation', 'Nucleophilic attack', 'Protonation', 'Dehydration'],
    industrialApplications: ['Fine chemicals', 'Pharmaceutical intermediates', 'Polymer industry'],
    safetyPrecautions: ['Base handling', 'Temperature control', 'Ventilation'],
    economicImportance: ['Key reaction in organic synthesis', 'Pharmaceutical industry']
  },

  // Inorganic Chemistry Reactions
  {
    id: 'haber-process',
    title: 'Haber Process for Ammonia Synthesis',
    category: 'inorganic',
    equation: 'N₂ + 3H₂ ⇌ 2NH₃ + 92 kJ (ΔH = -92 kJ/mol)',
    description: 'Industrial process for ammonia synthesis from nitrogen and hydrogen using iron catalyst.',
    mechanism: 'Heterogeneous catalysis on iron surface with promoters.',
    stepByStep: [
      'Adsorption: N₂ and H₂ adsorb on Fe catalyst surface',
      'Dissociation: N≡N and H-H bonds break on catalyst',
      'Surface reaction: N and H atoms combine to form NH₃',
      'Desorption: NH₃ leaves catalyst surface',
      'Recycling: Unreacted gases recycled'
    ],
    conditions: ['Pressure: 200-300 atm', 'Temperature: 400-500°C', 'Iron catalyst + K₂O + Al₂O₃ promoters'],
    uses: ['Fertilizer production', 'Explosives', 'Cleaning products', 'Pharmaceutical synthesis'],
    examples: ['Industrial ammonia plants', 'Fertilizer manufacturing', 'Nitric acid production'],
    exceptions: ['Le Chatelier\'s principle effects', 'Catalyst poisoning by sulfur', 'Equilibrium limitations'],
    realWorldApplications: ['Agriculture', 'Food security', 'Chemical industry', 'National defense'],
    difficulty: 'medium',
    class: '12',
    chapter: 'The p-Block Elements',
    type: 'Industrial Process',
    visualRepresentation: 'Reactor design and catalyst surface interactions',
    animationSteps: ['Gas compression', 'Catalyst contact', 'Reaction', 'Separation', 'Recycling'],
    industrialApplications: ['Fertilizer industry', 'Chemical manufacturing', 'Explosives production'],
    safetyPrecautions: ['High pressure systems', 'Ammonia handling', 'Catalyst management'],
    economicImportance: ['$60 billion global market', 'Essential for food production', 'Strategic importance']
  },

  {
    id: 'contact-process',
    title: 'Contact Process for Sulfuric Acid',
    category: 'inorganic',
    equation: 'SO₂ + ½O₂ ⇌ SO₃ (V₂O₅ catalyst)',
    description: 'Industrial process for sulfuric acid production via sulfur trioxide formation.',
    mechanism: 'Catalytic oxidation of sulfur dioxide followed by absorption.',
    stepByStep: [
      'Sulfur burning: S + O₂ → SO₂',
      'Catalytic oxidation: SO₂ + ½O₂ → SO₃ (V₂O₅, 450°C)',
      'Absorption: SO₃ + H₂SO₄ → H₂S₂O₇ (oleum)',
      'Dilution: H₂S₂O₇ + H₂O → 2H₂SO₄'
    ],
    conditions: ['Temperature: 400-500°C', 'Pressure: 1-2 atm', 'V₂O₅ catalyst', 'Dry conditions'],
    uses: ['Chemical industry', 'Battery acid', 'Fertilizer production', 'Metal processing'],
    examples: ['Industrial H₂SO₄ plants', 'Battery manufacturing', 'Petroleum refining'],
    exceptions: ['High temperature reduces yield', 'Catalyst deactivation', 'Corrosion issues'],
    realWorldApplications: ['Chemical manufacturing', 'Automotive batteries', 'Steel industry'],
    difficulty: 'medium',
    class: '12',
    chapter: 'The p-Block Elements',
    type: 'Industrial Process',
    visualRepresentation: 'Multi-stage reactor system with heat exchangers',
    animationSteps: ['SO₂ formation', 'Catalytic oxidation', 'SO₃ absorption', 'Acid formation'],
    industrialApplications: ['Chemical industry', 'Mining', 'Petroleum refining'],
    safetyPrecautions: ['Acid handling', 'SO₂ gas management', 'Corrosion protection'],
    economicImportance: ['Most produced chemical', 'Economic indicator', 'Industrial backbone']
  },

  // Physical Chemistry Reactions
  {
    id: 'electrolysis-water',
    title: 'Electrolysis of Water',
    category: 'physical',
    equation: '2H₂O(l) → 2H₂(g) + O₂(g) (E°cell = -1.23 V)',
    description: 'Decomposition of water into hydrogen and oxygen using electrical energy.',
    mechanism: 'Redox reaction with reduction at cathode and oxidation at anode.',
    stepByStep: [
      'At cathode: 2H₂O + 2e⁻ → H₂ + 2OH⁻ (reduction)',
      'At anode: 2H₂O → O₂ + 4H⁺ + 4e⁻ (oxidation)',
      'Overall: 2H₂O → 2H₂ + O₂',
      'Ion migration: H⁺ to cathode, OH⁻ to anode'
    ],
    conditions: ['Electric current', 'Electrolyte (H₂SO₄/NaOH)', 'Inert electrodes (Pt)', 'DC power supply'],
    uses: ['Hydrogen production', 'Oxygen generation', 'Water purification', 'Energy storage'],
    examples: ['Industrial H₂ production', 'Fuel cell technology', 'Space applications'],
    exceptions: ['Pure water poor conductor', 'Electrode material affects products', 'Energy intensive'],
    realWorldApplications: ['Hydrogen fuel', 'Medical oxygen', 'Water treatment', 'Space missions'],
    difficulty: 'easy',
    class: '12',
    chapter: 'Electrochemistry',
    type: 'Electrolytic Process',
    visualRepresentation: 'Electrochemical cell with gas evolution',
    animationSteps: ['Current flow', 'Ion migration', 'Electrode reactions', 'Gas evolution'],
    industrialApplications: ['Hydrogen economy', 'Chemical industry', 'Metal refining'],
    safetyPrecautions: ['Electrical safety', 'Gas handling', 'Electrolyte management'],
    economicImportance: ['Clean energy production', 'Industrial applications', 'Future fuel']
  },

  {
    id: 'daniell-cell',
    title: 'Daniell Cell',
    category: 'physical',
    equation: 'Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E°cell = +1.10 V)',
    description: 'Galvanic cell converting chemical energy to electrical energy through spontaneous redox reaction.',
    mechanism: 'Spontaneous electron transfer in separate half-cells.',
    stepByStep: [
      'At anode: Zn(s) → Zn²⁺(aq) + 2e⁻ (oxidation, E° = +0.76 V)',
      'At cathode: Cu²⁺(aq) + 2e⁻ → Cu(s) (reduction, E° = +0.34 V)',
      'Electron flow: From Zn to Cu through external circuit',
      'Ion flow: Through salt bridge to complete circuit'
    ],
    conditions: ['Zn and Cu electrodes', 'ZnSO₄ and CuSO₄ solutions', 'Salt bridge (KCl)', 'External circuit'],
    uses: ['Battery technology', 'Electrochemical studies', 'Power generation', 'Educational demonstrations'],
    examples: ['Early batteries', 'Laboratory experiments', 'Electrochemical series determination'],
    exceptions: ['Cell potential decreases with use', 'Concentration affects EMF', 'Temperature dependence'],
    realWorldApplications: ['Battery development', 'Corrosion studies', 'Electroplating'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Electrochemistry',
    type: 'Galvanic Cell',
    visualRepresentation: 'Complete electrochemical cell with electron and ion flow',
    animationSteps: ['Electrode reactions', 'Electron flow', 'Ion migration', 'Circuit completion'],
    industrialApplications: ['Battery technology', 'Corrosion protection', 'Electroplating'],
    safetyPrecautions: ['Chemical handling', 'Electrical connections', 'Waste disposal'],
    economicImportance: ['Battery industry', 'Renewable energy storage', 'Portable electronics']
  },

  // Advanced Organic Reactions
  {
    id: 'friedel-crafts-acylation',
    title: 'Friedel-Crafts Acylation',
    category: 'organic',
    equation: 'C₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl (AlCl₃)',
    description: 'Electrophilic aromatic substitution introducing acyl group into benzene ring.',
    mechanism: 'Acylium ion formation followed by electrophilic attack on benzene.',
    stepByStep: [
      'Acylium ion formation: CH₃COCl + AlCl₃ → CH₃CO⁺ + AlCl₄⁻',
      'Electrophilic attack: C₆H₆ + CH₃CO⁺ → C₆H₆⁺COCH₃',
      'Deprotonation: C₆H₆⁺COCH₃ + AlCl₄⁻ → C₆H₅COCH₃ + HCl + AlCl₃',
      'Catalyst regeneration: AlCl₃ is regenerated'
    ],
    conditions: ['Lewis acid catalyst (AlCl₃)', 'Anhydrous conditions', 'Inert atmosphere', 'Low temperature'],
    uses: ['Ketone synthesis', 'Pharmaceutical manufacturing', 'Dye production', 'Fragrance compounds'],
    examples: ['Acetophenone synthesis', 'Benzoyl chloride reactions', 'Industrial aromatics'],
    exceptions: ['Deactivated benzenes don\'t react', 'No rearrangement occurs', 'Catalyst complexation'],
    realWorldApplications: ['Drug synthesis', 'Perfume industry', 'Polymer intermediates'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Electrophilic Substitution',
    visualRepresentation: 'Aromatic substitution mechanism with acylium ion',
    animationSteps: ['Acylium formation', 'Electrophilic attack', 'Sigma complex', 'Deprotonation'],
    industrialApplications: ['Pharmaceutical industry', 'Fine chemicals', 'Specialty polymers'],
    safetyPrecautions: ['Anhydrous conditions', 'HCl gas handling', 'Lewis acid safety'],
    economicImportance: ['Pharmaceutical synthesis', 'High-value chemicals', 'Industrial applications']
  }
];

// Utility functions
export const getReactionsByCategory = (category: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.category === category);
};

export const getReactionsByClass = (classLevel: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.class === classLevel || reaction.class === 'both');
};

export const getReactionsByDifficulty = (difficulty: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.difficulty === difficulty);
};

export const getReactionsByChapter = (chapter: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.chapter === chapter);
};

export const searchReactions = (query: string): Reaction[] => {
  const lowercaseQuery = query.toLowerCase();
  return completeReactions.filter(reaction => 
    reaction.title.toLowerCase().includes(lowercaseQuery) ||
    reaction.description.toLowerCase().includes(lowercaseQuery) ||
    reaction.category.toLowerCase().includes(lowercaseQuery) ||
    reaction.equation.toLowerCase().includes(lowercaseQuery) ||
    reaction.chapter.toLowerCase().includes(lowercaseQuery) ||
    reaction.type.toLowerCase().includes(lowercaseQuery) ||
    reaction.uses.some(use => use.toLowerCase().includes(lowercaseQuery)) ||
    reaction.examples.some(example => example.toLowerCase().includes(lowercaseQuery)) ||
    reaction.realWorldApplications.some(app => app.toLowerCase().includes(lowercaseQuery))
  );
};

export const getReactionCategories = (): string[] => {
  return [...new Set(completeReactions.map(reaction => reaction.category))];
};

export const getReactionTypes = (): string[] => {
  return [...new Set(completeReactions.map(reaction => reaction.type))];
};

export const getReactionChapters = (): string[] => {
  return [...new Set(completeReactions.map(reaction => reaction.chapter))];
};

export const getReactionDifficulties = (): string[] => {
  return [...new Set(completeReactions.map(reaction => reaction.difficulty))];
};

// Export for backward compatibility
export { completeReactions as reactions };