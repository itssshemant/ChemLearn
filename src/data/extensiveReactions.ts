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
  jeeNeetImportance: string;
  examTips: string[];
  commonMistakes: string[];
  relatedConcepts: string[];
  practiceQuestions: string[];
}

export const extensiveReactions: Reaction[] = [
  // CBSE Class 11 - Fundamental Reactions
  {
    id: 'combustion-methane-detailed',
    title: 'Complete Combustion of Methane',
    category: 'organic',
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O + 890 kJ/mol',
    description: 'Complete combustion of methane in presence of excess oxygen, fundamental reaction for energy production and understanding thermochemistry.',
    mechanism: 'Free radical chain reaction involving initiation, propagation, and termination steps with detailed kinetics.',
    stepByStep: [
      'Initiation: O₂ → 2O• (high temperature, ΔH = +498 kJ/mol)',
      'Propagation: CH₄ + O• → CH₃• + OH• (ΔH = +4 kJ/mol)',
      'Propagation: CH₃• + O₂ → CH₃O₂• (ΔH = -140 kJ/mol)',
      'Chain branching: CH₃O₂• → CH₂O + OH• (ΔH = +85 kJ/mol)',
      'Further oxidation: CH₂O + O• → CHO• + OH•',
      'Final oxidation: CHO• + O₂ → CO₂ + OH•',
      'Termination: Radical recombination reactions'
    ],
    conditions: ['Temperature > 500°C', 'Excess oxygen (λ > 1)', 'Ignition source', 'Proper mixing'],
    uses: ['Natural gas heating', 'Power generation', 'Industrial processes', 'Cooking fuel', 'Steam reforming'],
    examples: ['Natural gas stoves', 'Gas turbines', 'Bunsen burner', 'Gas water heaters', 'Industrial furnaces'],
    exceptions: ['Incomplete combustion with limited oxygen produces CO', 'Soot formation at high temperatures', 'NOx formation at very high temperatures'],
    realWorldApplications: ['Home heating systems', 'Electricity generation', 'Industrial furnaces', 'Vehicle fuel (CNG)', 'Hydrogen production'],
    difficulty: 'easy',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Combustion Reaction',
    visualRepresentation: 'Molecular animation showing CH₄ + O₂ collision, bond breaking, and product formation with energy release',
    animationSteps: ['Reactant approach and collision', 'C-H and O=O bond breaking', 'Intermediate radical formation', 'New bond formation', 'Product separation with energy release'],
    industrialApplications: ['Power plants (combined cycle)', 'Chemical industry feedstock', 'Steel production heating', 'Glass manufacturing', 'Cement production'],
    safetyPrecautions: ['Proper ventilation to prevent CO buildup', 'Gas leak detection systems', 'Fire safety measures', 'Explosion prevention'],
    economicImportance: ['Major energy source globally', '$2 trillion natural gas industry', 'Job creation in energy sector', 'Energy security for nations'],
    jeeNeetImportance: 'Fundamental for understanding thermochemistry, kinetics, and energy calculations. Essential for JEE Main/Advanced and NEET chemistry sections.',
    examTips: [
      'Remember the exact stoichiometry: 1 CH₄ : 2 O₂ : 1 CO₂ : 2 H₂O',
      'Calculate enthalpy changes using bond energies',
      'Understand difference between complete and incomplete combustion',
      'Know industrial applications for application-based questions'
    ],
    commonMistakes: [
      'Forgetting to balance the equation properly',
      'Confusing complete vs incomplete combustion products',
      'Not considering the energy released in calculations',
      'Mixing up the conditions required'
    ],
    relatedConcepts: ['Thermochemistry', 'Chemical kinetics', 'Free radical reactions', 'Environmental chemistry'],
    practiceQuestions: [
      'Calculate the heat released when 16g of methane burns completely',
      'What volume of CO₂ is produced at STP when 2.24L of CH₄ burns?',
      'Explain why incomplete combustion is dangerous',
      'Compare the energy output of methane vs other fuels'
    ]
  },

  {
    id: 'haber-process-detailed',
    title: 'Haber Process for Ammonia Synthesis',
    category: 'inorganic',
    equation: 'N₂(g) + 3H₂(g) ⇌ 2NH₃(g) + 92 kJ/mol',
    description: 'Industrial process for ammonia synthesis using iron catalyst. Demonstrates Le Chatelier\'s principle and industrial chemistry optimization.',
    mechanism: 'Heterogeneous catalysis on iron surface with promoters K₂O and Al₂O₃. Involves dissociative adsorption and surface reactions.',
    stepByStep: [
      'Gas purification: Remove sulfur compounds and other poisons',
      'Compression: Increase pressure to 200-300 atm',
      'Heating: Raise temperature to 400-500°C',
      'Catalytic reaction: N₂ and H₂ adsorb on Fe catalyst surface',
      'Dissociation: N≡N and H-H bonds break on catalyst',
      'Surface reaction: N and H atoms combine to form NH₃',
      'Desorption: NH₃ leaves catalyst surface',
      'Separation: Cool to liquefy NH₃, recycle unreacted gases'
    ],
    conditions: [
      'Pressure: 200-300 atm (high pressure favors NH₃ formation)',
      'Temperature: 400-500°C (compromise between rate and equilibrium)',
      'Iron catalyst with K₂O and Al₂O₃ promoters',
      'Continuous removal of NH₃ to shift equilibrium'
    ],
    uses: ['Fertilizer production (80%)', 'Explosives manufacturing', 'Cleaning products', 'Pharmaceutical synthesis', 'Refrigeration'],
    examples: ['Urea fertilizer production', 'Ammonium nitrate explosives', 'Household ammonia cleaners', 'Nitric acid production'],
    exceptions: [
      'Catalyst poisoning by sulfur compounds reduces efficiency',
      'Very high temperatures decrease yield due to equilibrium shift',
      'Pressure too high increases equipment costs without proportional benefit'
    ],
    realWorldApplications: [
      'Global food security through fertilizers',
      'Chemical industry backbone',
      'National defense (explosives)',
      'Refrigeration systems',
      'Water treatment'
    ],
    difficulty: 'medium',
    class: '12',
    chapter: 'The p-Block Elements',
    type: 'Industrial Process',
    visualRepresentation: 'Reactor design showing gas flow, catalyst bed, heat exchangers, and separation units',
    animationSteps: ['Gas compression and heating', 'Catalyst surface interactions', 'Bond breaking and formation', 'Product separation', 'Gas recycling'],
    industrialApplications: [
      'Fertilizer industry (largest application)',
      'Chemical manufacturing complexes',
      'Explosives production facilities',
      'Pharmaceutical intermediate synthesis'
    ],
    safetyPrecautions: [
      'High pressure system safety protocols',
      'Ammonia gas handling procedures',
      'Catalyst management and replacement',
      'Emergency shutdown systems'
    ],
    economicImportance: [
      '$60 billion global ammonia market',
      'Essential for feeding 40% of world population',
      'Strategic importance for national security',
      'Major industrial employment sector'
    ],
    jeeNeetImportance: 'Critical for understanding chemical equilibrium, Le Chatelier\'s principle, and industrial chemistry. Frequently appears in JEE Advanced and competitive exams.',
    examTips: [
      'Understand the compromise between temperature and pressure',
      'Know the role of each catalyst component',
      'Remember the economic and environmental significance',
      'Practice equilibrium constant calculations'
    ],
    commonMistakes: [
      'Thinking higher temperature always increases yield',
      'Forgetting the role of pressure in equilibrium',
      'Not understanding catalyst promoter functions',
      'Confusing optimal vs maximum conditions'
    ],
    relatedConcepts: ['Chemical equilibrium', 'Le Chatelier\'s principle', 'Catalysis', 'Industrial chemistry', 'Thermodynamics'],
    practiceQuestions: [
      'Why is a temperature of 450°C used instead of higher temperatures?',
      'Calculate the equilibrium constant at different temperatures',
      'Explain the role of promoters in the iron catalyst',
      'How does removing NH₃ affect the equilibrium position?'
    ]
  },

  {
    id: 'sn1-mechanism-detailed',
    title: 'SN1 Nucleophilic Substitution Mechanism',
    category: 'organic',
    equation: '(CH₃)₃CBr + OH⁻ → (CH₃)₃COH + Br⁻',
    description: 'Unimolecular nucleophilic substitution involving carbocation intermediate. Shows first-order kinetics and stereochemical implications.',
    mechanism: 'Two-step mechanism with rate-determining ionization step. Carbocation intermediate leads to racemization in chiral centers.',
    stepByStep: [
      'Step 1: Ionization - (CH₃)₃CBr → (CH₃)₃C⁺ + Br⁻ (slow, rate-determining)',
      'Carbocation stabilization by hyperconjugation and inductive effects',
      'Step 2: Nucleophilic attack - (CH₃)₃C⁺ + OH⁻ → (CH₃)₃COH (fast)',
      'Rate equation: Rate = k[(CH₃)₃CBr] (first-order kinetics)',
      'Stereochemistry: Racemization occurs due to planar carbocation'
    ],
    conditions: [
      'Polar protic solvent (H₂O, ROH) to stabilize ions',
      'Tertiary alkyl halides (most reactive)',
      'Weak nucleophiles (strong nucleophiles favor SN2)',
      'Moderate heating to increase ionization rate'
    ],
    uses: ['Alcohol synthesis from alkyl halides', 'Ether formation reactions', 'Pharmaceutical intermediate preparation'],
    examples: [
      'tert-Butyl chloride hydrolysis',
      'Benzyl chloride solvolysis',
      'Allyl halide reactions',
      'Triphenylmethyl chloride reactions'
    ],
    exceptions: [
      'Primary halides don\'t undergo SN1 (unstable carbocations)',
      'Rearrangement possible with secondary carbocations',
      'Competing elimination (E1) reactions at higher temperatures'
    ],
    realWorldApplications: [
      'Drug manufacturing processes',
      'Fine chemical synthesis',
      'Academic research and teaching',
      'Polymer chemistry applications'
    ],
    difficulty: 'hard',
    class: '12',
    chapter: 'Haloalkanes and Haloarenes',
    type: 'Substitution Mechanism',
    visualRepresentation: 'Energy diagram showing two-step mechanism with carbocation intermediate, including stereochemical outcomes',
    animationSteps: [
      'C-X bond heterolytic cleavage',
      'Carbocation formation and stabilization',
      'Nucleophile approach from both sides',
      'Product formation showing racemization'
    ],
    industrialApplications: [
      'Pharmaceutical synthesis pathways',
      'Specialty chemical manufacturing',
      'Research and development applications'
    ],
    safetyPrecautions: [
      'Proper handling of organic solvents',
      'Temperature control to prevent side reactions',
      'Waste disposal protocols for halogenated compounds'
    ],
    economicImportance: [
      'Essential for drug synthesis industry',
      'High-value chemical production',
      'Research and development sector'
    ],
    jeeNeetImportance: 'Fundamental mechanism for understanding organic reaction pathways. Critical for JEE Advanced organic chemistry and mechanism-based questions.',
    examTips: [
      'Remember the order of carbocation stability: 3° > 2° > 1°',
      'Understand the relationship between structure and reactivity',
      'Know the stereochemical outcomes',
      'Practice drawing energy diagrams'
    ],
    commonMistakes: [
      'Confusing SN1 with SN2 conditions',
      'Forgetting about carbocation rearrangements',
      'Not considering stereochemical implications',
      'Mixing up the rate-determining step'
    ],
    relatedConcepts: ['Carbocation stability', 'Stereochemistry', 'Reaction kinetics', 'Solvent effects'],
    practiceQuestions: [
      'Why do tertiary halides undergo SN1 but not SN2?',
      'Predict the products of SN1 reaction with chiral substrates',
      'Compare the rates of SN1 for different alkyl halides',
      'Explain the role of solvent in SN1 reactions'
    ]
  },

  {
    id: 'aldol-condensation-detailed',
    title: 'Aldol Condensation Reaction',
    category: 'organic',
    equation: '2CH₃CHO → CH₃CH(OH)CH₂CHO → CH₃CH=CHCHO + H₂O',
    description: 'Base-catalyzed reaction between two carbonyl compounds forming β-hydroxy carbonyl compound, followed by dehydration to α,β-unsaturated carbonyl.',
    mechanism: 'Enolate ion formation followed by nucleophilic addition and subsequent elimination of water.',
    stepByStep: [
      'Enolate formation: CH₃CHO + OH⁻ → CH₂⁻CHO + H₂O',
      'Resonance stabilization of enolate ion',
      'Nucleophilic addition: CH₂⁻CHO + CH₃CHO → CH₃CH(O⁻)CH₂CHO',
      'Protonation: CH₃CH(O⁻)CH₂CHO + H₂O → CH₃CH(OH)CH₂CHO + OH⁻',
      'Dehydration (condensation): CH₃CH(OH)CH₂CHO → CH₃CH=CHCHO + H₂O',
      'Base-catalyzed elimination mechanism'
    ],
    conditions: [
      'Dilute NaOH (10%) for aldol formation',
      'Temperature 0-5°C for aldol step',
      'Heat (50-60°C) for condensation step',
      'Aqueous or alcoholic medium'
    ],
    uses: [
      'C-C bond formation in organic synthesis',
      'Synthesis of complex molecules',
      'Industrial aldehyde production',
      'Natural product synthesis',
      'Pharmaceutical intermediates'
    ],
    examples: [
      'Acetaldehyde aldol condensation',
      'Crossed aldol reactions with different aldehydes',
      'Intramolecular aldol cyclizations',
      'Ketone aldol reactions (slower)',
      'Claisen-Schmidt condensation'
    ],
    exceptions: [
      'Ketones less reactive than aldehydes',
      'Mixed aldol gives multiple products without selectivity',
      'Retro-aldol possible under basic conditions',
      'Formaldehyde doesn\'t undergo aldol (no α-hydrogen)'
    ],
    realWorldApplications: [
      'Pharmaceutical synthesis (drug intermediates)',
      'Fragrance industry (cinnamaldehyde synthesis)',
      'Polymer precursor manufacturing',
      'Fine chemical production'
    ],
    difficulty: 'hard',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Condensation Reaction',
    visualRepresentation: 'Mechanism showing enolate formation, nucleophilic addition, and elimination steps with electron movement',
    animationSteps: [
      'Base deprotonation at α-carbon',
      'Enolate ion formation and stabilization',
      'Nucleophilic attack on carbonyl carbon',
      'Protonation of alkoxide',
      'Dehydration to form double bond'
    ],
    industrialApplications: [
      'Fine chemical manufacturing',
      'Pharmaceutical intermediate production',
      'Polymer industry applications',
      'Fragrance and flavor synthesis'
    ],
    safetyPrecautions: [
      'Proper handling of strong bases',
      'Temperature control during reaction',
      'Ventilation for aldehyde vapors',
      'Personal protective equipment'
    ],
    economicImportance: [
      'Key reaction in pharmaceutical industry',
      'Important for fine chemical synthesis',
      'Significant in academic research'
    ],
    jeeNeetImportance: 'Essential mechanism for understanding carbonyl chemistry and C-C bond formation. Frequently tested in JEE Advanced organic chemistry.',
    examTips: [
      'Understand the difference between aldol and condensation products',
      'Know the conditions for each step',
      'Practice drawing the mechanism with electron arrows',
      'Remember the stereochemical implications'
    ],
    commonMistakes: [
      'Confusing aldol addition with condensation',
      'Forgetting the role of α-hydrogen',
      'Not understanding enolate stability',
      'Mixing up reaction conditions'
    ],
    relatedConcepts: ['Enolate chemistry', 'Nucleophilic addition', 'Elimination reactions', 'Stereochemistry'],
    practiceQuestions: [
      'Why are aldehydes more reactive than ketones in aldol reactions?',
      'Predict the products of crossed aldol condensation',
      'Explain the mechanism of retro-aldol reaction',
      'How does temperature affect product distribution?'
    ]
  },

  {
    id: 'electrolysis-water-detailed',
    title: 'Electrolysis of Water',
    category: 'physical',
    equation: '2H₂O(l) → 2H₂(g) + O₂(g) (E°cell = -1.23 V)',
    description: 'Decomposition of water into hydrogen and oxygen using electrical energy. Demonstrates electrochemical principles and energy conversion.',
    mechanism: 'Redox reaction with reduction at cathode and oxidation at anode, involving ion migration and electron transfer.',
    stepByStep: [
      'At cathode (reduction): 2H₂O + 2e⁻ → H₂ + 2OH⁻ (E° = -0.83 V)',
      'At anode (oxidation): 2H₂O → O₂ + 4H⁺ + 4e⁻ (E° = +1.23 V)',
      'Overall reaction: 2H₂O → 2H₂ + O₂ (E°cell = -1.23 V)',
      'Ion migration: H⁺ ions move to cathode, OH⁻ ions move to anode',
      'Gas evolution: H₂ bubbles at cathode, O₂ bubbles at anode',
      'Volume ratio: H₂:O₂ = 2:1 (by volume)'
    ],
    conditions: [
      'Electric current (DC power supply)',
      'Electrolyte (H₂SO₄ or NaOH) to increase conductivity',
      'Inert electrodes (Pt or graphite)',
      'Minimum voltage > 1.23 V (theoretical)',
      'Practical voltage ~1.8-2.0 V due to overpotential'
    ],
    uses: [
      'Hydrogen production for fuel cells',
      'Oxygen generation for medical use',
      'Water purification processes',
      'Energy storage (power-to-gas)',
      'Laboratory gas preparation'
    ],
    examples: [
      'Industrial H₂ production for ammonia synthesis',
      'Fuel cell technology development',
      'Space applications (ISS oxygen generation)',
      'Laboratory demonstrations',
      'Renewable energy storage'
    ],
    exceptions: [
      'Pure water is poor conductor (needs electrolyte)',
      'Electrode material affects side reactions',
      'Energy intensive process (requires external power)',
      'Overpotential increases actual voltage required'
    ],
    realWorldApplications: [
      'Hydrogen fuel production',
      'Medical oxygen generation',
      'Water treatment facilities',
      'Space missions (life support)',
      'Renewable energy storage systems'
    ],
    difficulty: 'easy',
    class: '12',
    chapter: 'Electrochemistry',
    type: 'Electrolytic Process',
    visualRepresentation: 'Electrochemical cell showing electrode reactions, ion movement, gas evolution, and electrical circuit',
    animationSteps: [
      'Current flow through external circuit',
      'Ion migration in electrolyte',
      'Electrode reactions and electron transfer',
      'Gas bubble formation and evolution',
      'Continuous process demonstration'
    ],
    industrialApplications: [
      'Hydrogen economy development',
      'Chemical industry applications',
      'Metal refining processes',
      'Renewable energy integration'
    ],
    safetyPrecautions: [
      'Electrical safety protocols',
      'Hydrogen gas handling (explosive)',
      'Proper ventilation systems',
      'Electrolyte handling safety'
    ],
    economicImportance: [
      'Clean energy production method',
      'Industrial hydrogen market',
      'Future energy storage solutions',
      'Environmental benefits'
    ],
    jeeNeetImportance: 'Fundamental for understanding electrochemistry, Faraday\'s laws, and energy calculations. Essential for JEE Main/Advanced electrochemistry.',
    examTips: [
      'Remember the electrode reactions and their potentials',
      'Understand Faraday\'s laws for quantitative calculations',
      'Know the gas volume ratios',
      'Practice energy and efficiency calculations'
    ],
    commonMistakes: [
      'Confusing anode and cathode reactions',
      'Forgetting the role of electrolyte',
      'Not considering overpotential in calculations',
      'Mixing up gas volume ratios'
    ],
    relatedConcepts: ['Electrochemistry', 'Faraday\'s laws', 'Redox reactions', 'Energy conversion'],
    practiceQuestions: [
      'Calculate the volume of gases produced when 2A current flows for 1 hour',
      'Why is an electrolyte needed for water electrolysis?',
      'What is the minimum voltage required for water electrolysis?',
      'How much energy is required to produce 1 mole of H₂?'
    ]
  },

  // Advanced JEE/NEET Level Reactions
  {
    id: 'friedel-crafts-acylation-detailed',
    title: 'Friedel-Crafts Acylation',
    category: 'organic',
    equation: 'C₆H₆ + CH₃COCl → C₆H₅COCH₃ + HCl (AlCl₃)',
    description: 'Electrophilic aromatic substitution introducing acyl group into benzene ring. Important for ketone synthesis and aromatic chemistry.',
    mechanism: 'Acylium ion formation followed by electrophilic attack on benzene ring with subsequent deprotonation.',
    stepByStep: [
      'Acylium ion formation: CH₃COCl + AlCl₃ → CH₃CO⁺ + AlCl₄⁻',
      'Resonance stabilization of acylium ion',
      'Electrophilic attack: C₆H₆ + CH₃CO⁺ → C₆H₆⁺COCH₃ (σ-complex)',
      'Resonance stabilization of σ-complex',
      'Deprotonation: C₆H₆⁺COCH₃ + AlCl₄⁻ → C₆H₅COCH₃ + HCl + AlCl₃',
      'Catalyst regeneration and product formation'
    ],
    conditions: [
      'Lewis acid catalyst (AlCl₃, FeCl₃, or ZnCl₂)',
      'Anhydrous conditions (moisture deactivates catalyst)',
      'Inert atmosphere (N₂ or Ar)',
      'Low to moderate temperature (0-50°C)',
      'Excess catalyst often required'
    ],
    uses: [
      'Ketone synthesis from aromatic compounds',
      'Pharmaceutical manufacturing',
      'Dye and pigment production',
      'Fragrance compound synthesis',
      'Polymer intermediate preparation'
    ],
    examples: [
      'Acetophenone synthesis from benzene',
      'Benzoyl chloride reactions',
      'Industrial aromatic ketone production',
      'Pharmaceutical intermediate synthesis'
    ],
    exceptions: [
      'Deactivated benzenes (nitrobenzene) don\'t react',
      'No rearrangement occurs (unlike alkylation)',
      'Catalyst complexation with product reduces efficiency',
      'Multiple acylation is difficult due to deactivation'
    ],
    realWorldApplications: [
      'Drug synthesis (aspirin, ibuprofen precursors)',
      'Perfume industry (aromatic ketones)',
      'Polymer intermediate manufacturing',
      'Dye and pigment industry'
    ],
    difficulty: 'hard',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Electrophilic Substitution',
    visualRepresentation: 'Aromatic substitution mechanism showing acylium ion formation, σ-complex intermediate, and product formation',
    animationSteps: [
      'Acylium ion formation with catalyst',
      'Electrophilic attack on benzene ring',
      'σ-complex formation and stabilization',
      'Deprotonation and aromaticity restoration',
      'Catalyst regeneration'
    ],
    industrialApplications: [
      'Pharmaceutical industry (drug intermediates)',
      'Fine chemical manufacturing',
      'Specialty polymer production',
      'Fragrance and flavor industry'
    ],
    safetyPrecautions: [
      'Anhydrous conditions maintenance',
      'HCl gas handling and neutralization',
      'Lewis acid safety protocols',
      'Inert atmosphere requirements'
    ],
    economicImportance: [
      'Pharmaceutical synthesis industry',
      'High-value chemical production',
      'Specialty chemical markets'
    ],
    jeeNeetImportance: 'Critical for understanding electrophilic aromatic substitution and synthetic organic chemistry. Frequently tested in JEE Advanced.',
    examTips: [
      'Understand the difference from Friedel-Crafts alkylation',
      'Know the role of Lewis acid catalyst',
      'Remember the directing effects of substituents',
      'Practice mechanism with electron movement'
    ],
    commonMistakes: [
      'Confusing with alkylation mechanism',
      'Forgetting anhydrous conditions requirement',
      'Not understanding catalyst complexation',
      'Mixing up directing effects'
    ],
    relatedConcepts: ['Electrophilic aromatic substitution', 'Lewis acids', 'Resonance', 'Synthetic organic chemistry'],
    practiceQuestions: [
      'Why doesn\'t nitrobenzene undergo Friedel-Crafts acylation?',
      'Compare acylation vs alkylation mechanisms',
      'Predict the major product with substituted benzenes',
      'Explain the role of AlCl₃ in the reaction'
    ]
  },

  // More advanced reactions for comprehensive coverage...
  {
    id: 'cannizzaro-reaction-detailed',
    title: 'Cannizzaro Reaction',
    category: 'organic',
    equation: '2HCHO + NaOH → HCOONa + CH₃OH',
    description: 'Disproportionation reaction of aldehydes without α-hydrogen in strong base, producing alcohol and carboxylate salt.',
    mechanism: 'Nucleophilic addition followed by hydride transfer and subsequent proton transfer.',
    stepByStep: [
      'Nucleophilic addition: HCHO + OH⁻ → HOCH₂O⁻',
      'Hydride transfer: HOCH₂O⁻ + HCHO → HCOO⁻ + CH₂OH',
      'Protonation: CH₂OH + H₂O → CH₃OH + OH⁻',
      'Overall: 2HCHO + OH⁻ → HCOO⁻ + CH₃OH'
    ],
    conditions: [
      'Concentrated NaOH (50% solution)',
      'High temperature (100°C)',
      'Aldehydes without α-hydrogen',
      'Aqueous medium'
    ],
    uses: [
      'Industrial methanol production from formaldehyde',
      'Synthesis of primary alcohols',
      'Waste formaldehyde treatment',
      'Laboratory alcohol preparation'
    ],
    examples: [
      'Formaldehyde to methanol and formate',
      'Benzaldehyde to benzyl alcohol and benzoate',
      'Furfural disproportionation'
    ],
    exceptions: [
      'Only works with aldehydes lacking α-hydrogen',
      'Aldehydes with α-hydrogen undergo aldol reaction instead',
      'Ketones don\'t undergo Cannizzaro reaction'
    ],
    realWorldApplications: [
      'Industrial methanol production',
      'Pharmaceutical intermediate synthesis',
      'Fine chemical manufacturing'
    ],
    difficulty: 'medium',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Disproportionation Reaction',
    visualRepresentation: 'Mechanism showing nucleophilic addition, hydride transfer, and product formation',
    animationSteps: [
      'Hydroxide attack on carbonyl',
      'Tetrahedral intermediate formation',
      'Hydride transfer between molecules',
      'Product separation and regeneration'
    ],
    industrialApplications: [
      'Methanol production industry',
      'Chemical synthesis applications',
      'Waste treatment processes'
    ],
    safetyPrecautions: [
      'Strong base handling',
      'High temperature operations',
      'Formaldehyde vapor control'
    ],
    economicImportance: [
      'Industrial methanol market',
      'Chemical synthesis industry'
    ],
    jeeNeetImportance: 'Important for understanding aldehyde chemistry and disproportionation reactions. Tested in advanced organic chemistry.',
    examTips: [
      'Remember it only works with aldehydes without α-hydrogen',
      'Understand the hydride transfer mechanism',
      'Know the industrial significance',
      'Practice identifying suitable substrates'
    ],
    commonMistakes: [
      'Thinking it works with all aldehydes',
      'Confusing with aldol condensation',
      'Not understanding the disproportionation concept'
    ],
    relatedConcepts: ['Nucleophilic addition', 'Hydride transfer', 'Disproportionation', 'Industrial chemistry'],
    practiceQuestions: [
      'Why doesn\'t acetaldehyde undergo Cannizzaro reaction?',
      'Predict products of benzaldehyde Cannizzaro reaction',
      'Explain the mechanism of hydride transfer',
      'What are the industrial applications?'
    ]
  },

  // Continue with more reactions to reach 100+ total...
  // Including reactions for:
  // - Organic chemistry (substitution, elimination, addition, rearrangement)
  // - Inorganic chemistry (acid-base, redox, coordination, solid state)
  // - Physical chemistry (thermodynamics, kinetics, electrochemistry, surface chemistry)
  // - Biochemistry relevant reactions
  // - Industrial processes
  // - Environmental chemistry
  // - Analytical chemistry methods

  // Additional reactions would follow the same detailed pattern...
];

// Utility functions for the extensive reactions database
export const getReactionsByCategory = (category: string): Reaction[] => {
  return extensiveReactions.filter(reaction => reaction.category === category);
};

export const getReactionsByClass = (classLevel: string): Reaction[] => {
  return extensiveReactions.filter(reaction => reaction.class === classLevel || reaction.class === 'both');
};

export const getReactionsByDifficulty = (difficulty: string): Reaction[] => {
  return extensiveReactions.filter(reaction => reaction.difficulty === difficulty);
};

export const getReactionsByChapter = (chapter: string): Reaction[] => {
  return extensiveReactions.filter(reaction => reaction.chapter === chapter);
};

export const searchReactions = (query: string): Reaction[] => {
  const lowercaseQuery = query.toLowerCase();
  return extensiveReactions.filter(reaction => 
    reaction.title.toLowerCase().includes(lowercaseQuery) ||
    reaction.description.toLowerCase().includes(lowercaseQuery) ||
    reaction.category.toLowerCase().includes(lowercaseQuery) ||
    reaction.equation.toLowerCase().includes(lowercaseQuery) ||
    reaction.chapter.toLowerCase().includes(lowercaseQuery) ||
    reaction.type.toLowerCase().includes(lowercaseQuery) ||
    reaction.uses.some(use => use.toLowerCase().includes(lowercaseQuery)) ||
    reaction.examples.some(example => example.toLowerCase().includes(lowercaseQuery)) ||
    reaction.realWorldApplications.some(app => app.toLowerCase().includes(lowercaseQuery)) ||
    reaction.jeeNeetImportance.toLowerCase().includes(lowercaseQuery) ||
    reaction.examTips.some(tip => tip.toLowerCase().includes(lowercaseQuery))
  );
};

export const getReactionCategories = (): string[] => {
  return [...new Set(extensiveReactions.map(reaction => reaction.category))];
};

export const getReactionTypes = (): string[] => {
  return [...new Set(extensiveReactions.map(reaction => reaction.type))];
};

export const getReactionChapters = (): string[] => {
  return [...new Set(extensiveReactions.map(reaction => reaction.chapter))];
};

export const getReactionDifficulties = (): string[] => {
  return [...new Set(extensiveReactions.map(reaction => reaction.difficulty))];
};

// Export for backward compatibility
export { extensiveReactions as reactions };
export type { Reaction };