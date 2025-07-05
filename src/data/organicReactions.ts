export interface OrganicReaction {
  id: string;
  title: string;
  category: 'organic';
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

export const organicReactions: OrganicReaction[] = [
  // Class 11 Organic Chemistry Reactions
  {
    id: 'combustion-alkanes',
    title: 'Combustion of Alkanes',
    category: 'organic',
    equation: 'CₙH₂ₙ₊₂ + (3n+1)/2 O₂ → nCO₂ + (n+1)H₂O + Heat',
    description: 'Complete combustion of alkanes in presence of excess oxygen produces carbon dioxide and water with release of energy.',
    mechanism: 'Free radical mechanism involving initiation, propagation, and termination steps.',
    stepByStep: [
      'Initiation: Heat breaks C-H or O-O bonds to form free radicals',
      'Propagation: Chain reaction where radicals react with molecules to form new radicals',
      'Termination: Two radicals combine to form stable molecules'
    ],
    conditions: ['High temperature (>500°C)', 'Excess oxygen', 'Ignition source'],
    uses: ['Energy production', 'Heating', 'Power generation', 'Vehicle fuel'],
    examples: ['Natural gas burning: CH₄ + 2O₂ → CO₂ + 2H₂O', 'Propane: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O'],
    exceptions: ['Incomplete combustion produces CO and C', 'Limited oxygen gives different products'],
    realWorldApplications: ['Gas stoves', 'Car engines', 'Power plants', 'Industrial heating'],
    difficulty: 'easy',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Combustion Reaction'
  },

  {
    id: 'halogenation-alkanes',
    title: 'Halogenation of Alkanes',
    category: 'organic',
    equation: 'CH₄ + Cl₂ → CH₃Cl + HCl',
    description: 'Substitution reaction where hydrogen atoms in alkanes are replaced by halogen atoms.',
    mechanism: 'Free radical substitution mechanism',
    stepByStep: [
      'Initiation: Cl₂ → 2Cl• (UV light)',
      'Propagation: CH₄ + Cl• → CH₃• + HCl',
      'Propagation: CH₃• + Cl₂ → CH₃Cl + Cl•',
      'Termination: Cl• + Cl• → Cl₂'
    ],
    conditions: ['UV light or heat (300-400°C)', 'Anhydrous conditions', 'Inert atmosphere'],
    uses: ['Production of chloroform', 'Synthesis of alkyl halides', 'Industrial solvents'],
    examples: ['Methane chlorination', 'Ethane bromination', 'Propane iodination'],
    exceptions: ['Multiple substitution occurs', 'Tertiary H more reactive than secondary > primary'],
    realWorldApplications: ['Refrigerants', 'Dry cleaning solvents', 'Pharmaceutical intermediates'],
    difficulty: 'medium',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Substitution Reaction'
  },

  {
    id: 'addition-alkenes',
    title: 'Addition Reactions of Alkenes',
    category: 'organic',
    equation: 'C₂H₄ + HBr → CH₃CH₂Br',
    description: 'Addition of hydrogen halides to alkenes following Markovnikov\'s rule.',
    mechanism: 'Electrophilic addition mechanism with carbocation intermediate',
    stepByStep: [
      'Protonation: Alkene attacks H⁺ forming more stable carbocation',
      'Nucleophilic attack: Halide ion attacks carbocation',
      'Product formation: Alkyl halide formed'
    ],
    conditions: ['Room temperature', 'Polar solvent', 'Anhydrous HX'],
    uses: ['Synthesis of alkyl halides', 'Polymer production', 'Pharmaceutical intermediates'],
    examples: ['Ethylene + HCl → Ethyl chloride', 'Propene + HBr → 2-bromopropane'],
    exceptions: ['Anti-Markovnikov addition with peroxides', 'Rearrangement in carbocations'],
    realWorldApplications: ['Plastic manufacturing', 'Drug synthesis', 'Industrial chemicals'],
    difficulty: 'medium',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Addition Reaction'
  },

  {
    id: 'hydrogenation-alkenes',
    title: 'Hydrogenation of Alkenes',
    category: 'organic',
    equation: 'C₂H₄ + H₂ → C₂H₆',
    description: 'Addition of hydrogen to alkenes in presence of catalyst to form alkanes.',
    mechanism: 'Heterogeneous catalysis on metal surface',
    stepByStep: [
      'Adsorption: Alkene and H₂ adsorb on catalyst surface',
      'Activation: H-H bond breaks on catalyst',
      'Addition: Hydrogen atoms add to carbon atoms',
      'Desorption: Alkane leaves catalyst surface'
    ],
    conditions: ['Ni/Pd/Pt catalyst', 'High pressure', 'Elevated temperature (150-300°C)'],
    uses: ['Margarine production', 'Fuel production', 'Chemical synthesis'],
    examples: ['Ethene to ethane', 'Vegetable oil hydrogenation', 'Coal liquefaction'],
    exceptions: ['Syn addition occurs', 'Catalyst poisoning by sulfur compounds'],
    realWorldApplications: ['Food industry', 'Petroleum refining', 'Chemical manufacturing'],
    difficulty: 'easy',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Addition Reaction'
  },

  {
    id: 'ozonolysis-alkenes',
    title: 'Ozonolysis of Alkenes',
    category: 'organic',
    equation: 'R₂C=CR₂ + O₃ → R₂C=O + R₂C=O',
    description: 'Cleavage of alkenes using ozone to form carbonyl compounds.',
    mechanism: 'Cycloaddition followed by rearrangement and hydrolysis',
    stepByStep: [
      'Ozone addition: Forms primary ozonide (1,2,3-trioxolane)',
      'Rearrangement: Primary ozonide rearranges to secondary ozonide',
      'Hydrolysis: Secondary ozonide hydrolyzes to carbonyl compounds',
      'Workup: Zn/AcOH or Me₂S reduces any peroxides'
    ],
    conditions: ['Low temperature (-78°C)', 'Inert solvent (CH₂Cl₂)', 'Reductive workup'],
    uses: ['Structure determination', 'Synthesis of aldehydes/ketones', 'Analytical chemistry'],
    examples: ['Ethene → 2 HCHO', 'Propene → HCHO + CH₃CHO', '2-Methyl-2-butene → acetone + acetaldehyde'],
    exceptions: ['Terminal alkenes give formaldehyde', 'Oxidative workup gives carboxylic acids'],
    realWorldApplications: ['Pharmaceutical synthesis', 'Fragrance industry', 'Research applications'],
    difficulty: 'hard',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Oxidation Reaction'
  },

  {
    id: 'polymerization-alkenes',
    title: 'Polymerization of Alkenes',
    category: 'organic',
    equation: 'nCH₂=CH₂ → -(CH₂-CH₂)ₙ-',
    description: 'Addition polymerization of alkenes to form long chain polymers.',
    mechanism: 'Free radical or ionic chain polymerization',
    stepByStep: [
      'Initiation: Initiator forms free radicals',
      'Propagation: Radical adds to alkene forming new radical',
      'Chain growth: Continuous addition of monomers',
      'Termination: Two radicals combine or disproportionate'
    ],
    conditions: ['High pressure', 'Initiator (peroxides)', 'Heat or UV light'],
    uses: ['Plastic production', 'Synthetic materials', 'Industrial applications'],
    examples: ['Polyethylene from ethene', 'Polypropylene from propene', 'PVC from vinyl chloride'],
    exceptions: ['Branching can occur', 'Molecular weight distribution varies'],
    realWorldApplications: ['Plastic bags', 'Bottles', 'Pipes', 'Packaging materials'],
    difficulty: 'medium',
    class: '11',
    chapter: 'Hydrocarbons',
    type: 'Polymerization'
  },

  // Class 12 Organic Chemistry Reactions
  {
    id: 'sn1-mechanism',
    title: 'SN1 Nucleophilic Substitution',
    category: 'organic',
    equation: 'R₃CX + Nu⁻ → R₃CNu + X⁻',
    description: 'Unimolecular nucleophilic substitution involving carbocation intermediate.',
    mechanism: 'Two-step mechanism with rate-determining ionization step',
    stepByStep: [
      'Ionization: R₃CX → R₃C⁺ + X⁻ (slow, rate-determining)',
      'Nucleophilic attack: R₃C⁺ + Nu⁻ → R₃CNu (fast)',
      'Product formation with possible racemization'
    ],
    conditions: ['Polar protic solvent', 'Tertiary alkyl halides', 'Weak nucleophile'],
    uses: ['Synthesis of alcohols', 'Ether formation', 'Pharmaceutical synthesis'],
    examples: ['tert-Butyl chloride + OH⁻ → tert-Butanol', 'Benzyl chloride hydrolysis'],
    exceptions: ['Primary halides don\'t undergo SN1', 'Rearrangement possible'],
    realWorldApplications: ['Drug manufacturing', 'Fine chemical synthesis', 'Academic research'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Haloalkanes and Haloarenes',
    type: 'Substitution Mechanism'
  },

  {
    id: 'sn2-mechanism',
    title: 'SN2 Nucleophilic Substitution',
    category: 'organic',
    equation: 'Nu⁻ + RCH₂X → RCH₂Nu + X⁻',
    description: 'Bimolecular nucleophilic substitution with concerted mechanism and inversion of configuration.',
    mechanism: 'One-step concerted mechanism with transition state',
    stepByStep: [
      'Nucleophile approaches from backside of C-X bond',
      'Transition state: Nu---C---X with partial bonds',
      'Product formation with inversion of stereochemistry'
    ],
    conditions: ['Polar aprotic solvent', 'Primary alkyl halides', 'Strong nucleophile'],
    uses: ['Stereospecific synthesis', 'Williamson ether synthesis', 'Alkylation reactions'],
    examples: ['CH₃CH₂Br + OH⁻ → CH₃CH₂OH + Br⁻', 'Williamson ether synthesis'],
    exceptions: ['Steric hindrance reduces rate', 'Tertiary halides don\'t undergo SN2'],
    realWorldApplications: ['Pharmaceutical synthesis', 'Polymer chemistry', 'Material science'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Haloalkanes and Haloarenes',
    type: 'Substitution Mechanism'
  },

  {
    id: 'e1-elimination',
    title: 'E1 Elimination Mechanism',
    category: 'organic',
    equation: 'R₃CX → R₂C=CR₂ + HX',
    description: 'Unimolecular elimination reaction forming alkenes via carbocation intermediate.',
    mechanism: 'Two-step mechanism with carbocation formation',
    stepByStep: [
      'Ionization: R₃CX → R₃C⁺ + X⁻ (slow, rate-determining)',
      'Deprotonation: Base removes β-hydrogen from carbocation',
      'Alkene formation: Double bond forms'
    ],
    conditions: ['Polar protic solvent', 'Tertiary alkyl halides', 'Weak base', 'Heat'],
    uses: ['Alkene synthesis', 'Dehydration reactions', 'Industrial processes'],
    examples: ['tert-Butyl bromide → Isobutene', 'Alcohol dehydration'],
    exceptions: ['Rearrangement possible', 'Zaitsev rule followed'],
    realWorldApplications: ['Petroleum cracking', 'Polymer precursors', 'Chemical synthesis'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Haloalkanes and Haloarenes',
    type: 'Elimination Mechanism'
  },

  {
    id: 'e2-elimination',
    title: 'E2 Elimination Mechanism',
    category: 'organic',
    equation: 'RCH₂CH₂X + Base → RCH=CH₂ + HX',
    description: 'Bimolecular elimination reaction with concerted mechanism.',
    mechanism: 'One-step concerted mechanism',
    stepByStep: [
      'Base attacks β-hydrogen while C-X bond breaks',
      'Transition state: Base---H---C---C---X',
      'Simultaneous formation of double bond and departure of leaving group'
    ],
    conditions: ['Strong base', 'Primary/secondary alkyl halides', 'Polar aprotic solvent'],
    uses: ['Alkene synthesis', 'Dehydrohalogenation', 'Organic synthesis'],
    examples: ['Ethyl bromide + KOH → Ethene', 'Dehydrobromination reactions'],
    exceptions: ['Anti-periplanar geometry required', 'Zaitsev vs Hofmann products'],
    realWorldApplications: ['Industrial alkene production', 'Pharmaceutical synthesis', 'Research'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Haloalkanes and Haloarenes',
    type: 'Elimination Mechanism'
  },

  {
    id: 'williamson-ether-synthesis',
    title: 'Williamson Ether Synthesis',
    category: 'organic',
    equation: 'RO⁻ + R\'X → ROR\' + X⁻',
    description: 'SN2 reaction between alkoxide ion and alkyl halide to form ethers.',
    mechanism: 'SN2 nucleophilic substitution mechanism',
    stepByStep: [
      'Alkoxide formation: ROH + Base → RO⁻',
      'Nucleophilic attack: RO⁻ attacks R\'X from backside',
      'Ether formation: ROR\' + X⁻'
    ],
    conditions: ['Strong base (NaNH₂, NaH)', 'Primary alkyl halides', 'Aprotic solvent'],
    uses: ['Ether synthesis', 'Pharmaceutical intermediates', 'Solvent production'],
    examples: ['Diethyl ether synthesis', 'Anisole from phenol', 'Crown ether synthesis'],
    exceptions: ['Secondary/tertiary halides give elimination', 'Phenols need stronger bases'],
    realWorldApplications: ['Solvent industry', 'Drug synthesis', 'Polymer chemistry'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Alcohols, Phenols and Ethers',
    type: 'Ether Formation'
  },

  {
    id: 'lucas-test',
    title: 'Lucas Test',
    category: 'organic',
    equation: 'ROH + HCl/ZnCl₂ → RCl + H₂O',
    description: 'Test to distinguish between primary, secondary, and tertiary alcohols.',
    mechanism: 'SN1 mechanism for tertiary, SN2 for primary alcohols',
    stepByStep: [
      'Alcohol reacts with Lucas reagent (HCl/ZnCl₂)',
      'Carbocation formation (tertiary fastest)',
      'Chloride attack forms alkyl chloride',
      'Turbidity indicates positive test'
    ],
    conditions: ['Lucas reagent (HCl/ZnCl₂)', 'Room temperature', 'Anhydrous conditions'],
    uses: ['Alcohol identification', 'Qualitative analysis', 'Laboratory testing'],
    examples: ['Tertiary: Immediate turbidity', 'Secondary: Turbidity in 5 min', 'Primary: No reaction at RT'],
    exceptions: ['Allyl and benzyl alcohols react fast', 'Water interferes with test'],
    realWorldApplications: ['Analytical chemistry', 'Quality control', 'Educational demonstrations'],
    difficulty: 'easy',
    class: '12',
    chapter: 'Alcohols, Phenols and Ethers',
    type: 'Qualitative Test'
  },

  {
    id: 'oxidation-alcohols',
    title: 'Oxidation of Alcohols',
    category: 'organic',
    equation: 'RCH₂OH → RCHO → RCOOH',
    description: 'Oxidation of alcohols to aldehydes, ketones, or carboxylic acids.',
    mechanism: 'Chromium-based oxidation mechanism',
    stepByStep: [
      'Chromate ester formation: ROH + CrO₃ → ROCrO₃H',
      'β-Elimination: Loss of CrO₂OH⁻ and H⁺',
      'Carbonyl formation: C=O bond forms',
      'Further oxidation possible for aldehydes'
    ],
    conditions: ['Oxidizing agent (K₂Cr₂O₇, KMnO₄, PCC)', 'Acidic medium', 'Controlled temperature'],
    uses: ['Aldehyde/ketone synthesis', 'Carboxylic acid preparation', 'Industrial oxidation'],
    examples: ['Ethanol → Acetaldehyde → Acetic acid', 'Isopropanol → Acetone'],
    exceptions: ['Tertiary alcohols don\'t oxidize', 'PCC stops at aldehyde stage'],
    realWorldApplications: ['Pharmaceutical industry', 'Fragrance synthesis', 'Chemical manufacturing'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Alcohols, Phenols and Ethers',
    type: 'Oxidation Reaction'
  },

  {
    id: 'aldol-condensation',
    title: 'Aldol Condensation',
    category: 'organic',
    equation: '2CH₃CHO → CH₃CH(OH)CH₂CHO → CH₃CH=CHCHO + H₂O',
    description: 'Base-catalyzed reaction between two carbonyl compounds forming β-hydroxy carbonyl compound.',
    mechanism: 'Enolate ion formation followed by nucleophilic addition',
    stepByStep: [
      'Enolate formation: Base abstracts α-hydrogen from aldehyde',
      'Nucleophilic addition: Enolate attacks carbonyl carbon of another molecule',
      'Protonation: Forms β-hydroxy aldehyde (aldol)',
      'Dehydration: Elimination of water forms α,β-unsaturated compound'
    ],
    conditions: ['Dilute base (NaOH/KOH)', 'Low temperature for aldol', 'Heat for condensation'],
    uses: ['C-C bond formation', 'Synthesis of complex molecules', 'Industrial chemistry'],
    examples: ['Acetaldehyde aldol condensation', 'Crossed aldol reactions', 'Intramolecular aldol'],
    exceptions: ['Ketones less reactive than aldehydes', 'Mixed aldol gives multiple products'],
    realWorldApplications: ['Pharmaceutical synthesis', 'Fragrance industry', 'Polymer precursors'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Condensation Reaction'
  },

  {
    id: 'cannizzaro-reaction',
    title: 'Cannizzaro Reaction',
    category: 'organic',
    equation: '2HCHO + NaOH → CH₃OH + HCOONa',
    description: 'Disproportionation reaction of aldehydes without α-hydrogen in presence of strong base.',
    mechanism: 'Hydride transfer mechanism',
    stepByStep: [
      'Nucleophilic addition: OH⁻ attacks carbonyl carbon',
      'Hydride transfer: One aldehyde transfers H⁻ to another',
      'Product formation: One molecule oxidized, other reduced'
    ],
    conditions: ['Concentrated NaOH', 'Aldehydes without α-hydrogen', 'Heat'],
    uses: ['Preparation of alcohols and carboxylic acids', 'Industrial synthesis'],
    examples: ['Formaldehyde → Methanol + Formic acid', 'Benzaldehyde → Benzyl alcohol + Benzoic acid'],
    exceptions: ['Only works with aldehydes lacking α-hydrogen', 'Intramolecular version possible'],
    realWorldApplications: ['Industrial alcohol production', 'Chemical synthesis', 'Research applications'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Disproportionation Reaction'
  },

  {
    id: 'wolff-kishner-reduction',
    title: 'Wolff-Kishner Reduction',
    category: 'organic',
    equation: 'R₂C=O + NH₂NH₂ → R₂CH₂ + N₂ + H₂O',
    description: 'Reduction of aldehydes and ketones to alkanes using hydrazine in basic conditions.',
    mechanism: 'Hydrazone formation followed by elimination',
    stepByStep: [
      'Hydrazone formation: C=O + NH₂NH₂ → C=NNH₂ + H₂O',
      'Deprotonation: Base removes NH proton',
      'Nitrogen elimination: N₂ leaves forming carbanion',
      'Protonation: Carbanion protonated to give alkane'
    ],
    conditions: ['Hydrazine (NH₂NH₂)', 'Strong base (KOH)', 'High temperature (200°C)', 'High boiling solvent'],
    uses: ['Deoxygenation of carbonyls', 'Alkane synthesis', 'Natural product synthesis'],
    examples: ['Acetone → Propane', 'Benzophenone → Diphenylmethane', 'Cyclohexanone → Cyclohexane'],
    exceptions: ['Acid-sensitive compounds may decompose', 'High temperature required'],
    realWorldApplications: ['Pharmaceutical synthesis', 'Natural product chemistry', 'Research applications'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Reduction Reaction'
  },

  {
    id: 'clemmensen-reduction',
    title: 'Clemmensen Reduction',
    category: 'organic',
    equation: 'R₂C=O + Zn/HCl → R₂CH₂ + ZnCl₂ + H₂O',
    description: 'Reduction of aldehydes and ketones to alkanes using zinc amalgam in acidic conditions.',
    mechanism: 'Metal-mediated electron transfer reduction',
    stepByStep: [
      'Electron transfer: Zn donates electrons to carbonyl',
      'Protonation: Acid protonates oxygen',
      'Further reduction: Second electron transfer',
      'Elimination: Water eliminated, alkane formed'
    ],
    conditions: ['Zinc amalgam (Zn/Hg)', 'Concentrated HCl', 'Reflux conditions', 'Long reaction time'],
    uses: ['Deoxygenation of carbonyls', 'Alkane synthesis', 'Industrial reductions'],
    examples: ['Acetone → Propane', 'Benzaldehyde → Toluene', 'Ketone reduction in synthesis'],
    exceptions: ['Base-sensitive compounds preferred', 'Mercury toxicity concerns'],
    realWorldApplications: ['Industrial chemistry', 'Pharmaceutical synthesis', 'Research applications'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Reduction Reaction'
  },

  {
    id: 'friedel-crafts-acylation',
    title: 'Friedel-Crafts Acylation',
    category: 'organic',
    equation: 'C₆H₆ + RCOCl → C₆H₅COR + HCl',
    description: 'Electrophilic aromatic substitution introducing acyl group into benzene ring.',
    mechanism: 'Formation of acylium ion followed by electrophilic attack',
    stepByStep: [
      'Acylium ion formation: RCOCl + AlCl₃ → RCO⁺ + AlCl₄⁻',
      'Electrophilic attack: Benzene attacks RCO⁺',
      'Sigma complex formation: Cyclohexadienyl cation intermediate',
      'Deprotonation: Loss of H⁺ restores aromaticity'
    ],
    conditions: ['Lewis acid catalyst (AlCl₃)', 'Anhydrous conditions', 'Inert atmosphere'],
    uses: ['Ketone synthesis', 'Pharmaceutical manufacturing', 'Dye production'],
    examples: ['Acetophenone synthesis', 'Benzoyl chloride reactions', 'Industrial aromatics'],
    exceptions: ['Deactivated benzenes don\'t react', 'Rearrangement doesn\'t occur'],
    realWorldApplications: ['Drug synthesis', 'Fragrance compounds', 'Polymer intermediates'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Electrophilic Substitution'
  },

  {
    id: 'friedel-crafts-alkylation',
    title: 'Friedel-Crafts Alkylation',
    category: 'organic',
    equation: 'C₆H₆ + RCl → C₆H₅R + HCl',
    description: 'Electrophilic aromatic substitution introducing alkyl group into benzene ring.',
    mechanism: 'Carbocation formation followed by electrophilic attack',
    stepByStep: [
      'Carbocation formation: RCl + AlCl₃ → R⁺ + AlCl₄⁻',
      'Electrophilic attack: Benzene attacks R⁺',
      'Sigma complex formation: Cyclohexadienyl cation intermediate',
      'Deprotonation: Loss of H⁺ restores aromaticity'
    ],
    conditions: ['Lewis acid catalyst (AlCl₃)', 'Anhydrous conditions', 'Low temperature'],
    uses: ['Alkylbenzene synthesis', 'Industrial aromatics', 'Pharmaceutical intermediates'],
    examples: ['Toluene from benzene + CH₃Cl', 'Ethylbenzene synthesis', 'Cumene production'],
    exceptions: ['Carbocation rearrangement occurs', 'Polyalkylation possible', 'Deactivated rings don\'t react'],
    realWorldApplications: ['Petrochemical industry', 'Solvent production', 'Chemical synthesis'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Electrophilic Substitution'
  },

  {
    id: 'nitration-benzene',
    title: 'Nitration of Benzene',
    category: 'organic',
    equation: 'C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O',
    description: 'Electrophilic aromatic substitution introducing nitro group into benzene ring.',
    mechanism: 'Nitronium ion electrophilic attack',
    stepByStep: [
      'Nitronium ion formation: HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O',
      'Electrophilic attack: Benzene attacks NO₂⁺',
      'Sigma complex formation: Cyclohexadienyl cation intermediate',
      'Deprotonation: HSO₄⁻ removes H⁺, aromaticity restored'
    ],
    conditions: ['Nitrating mixture (HNO₃/H₂SO₄)', 'Temperature control (50-60°C)', 'Concentrated acids'],
    uses: ['Nitrobenzene production', 'Explosive synthesis', 'Dye intermediates'],
    examples: ['Nitrobenzene from benzene', 'TNT synthesis', 'Aniline precursor'],
    exceptions: ['Polynitration at higher temperatures', 'Deactivated rings need forcing conditions'],
    realWorldApplications: ['Explosives industry', 'Dye manufacturing', 'Pharmaceutical synthesis'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Electrophilic Substitution'
  },

  {
    id: 'sulfonation-benzene',
    title: 'Sulfonation of Benzene',
    category: 'organic',
    equation: 'C₆H₆ + H₂SO₄ → C₆H₅SO₃H + H₂O',
    description: 'Electrophilic aromatic substitution introducing sulfonic acid group into benzene ring.',
    mechanism: 'Sulfur trioxide electrophilic attack',
    stepByStep: [
      'SO₃ formation: H₂SO₄ ⇌ SO₃ + H₂O',
      'Electrophilic attack: Benzene attacks SO₃',
      'Sigma complex formation: Cyclohexadienyl cation intermediate',
      'Protonation: H₂SO₄ protonates to form sulfonic acid'
    ],
    conditions: ['Fuming sulfuric acid (oleum)', 'High temperature (100-200°C)', 'Long reaction time'],
    uses: ['Detergent synthesis', 'Dye intermediates', 'Ion exchange resins'],
    examples: ['Benzenesulfonic acid', 'Detergent alkylates', 'Sulfa drug precursors'],
    exceptions: ['Reversible reaction', 'Desulfonation possible with steam'],
    realWorldApplications: ['Detergent industry', 'Pharmaceutical synthesis', 'Polymer chemistry'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Electrophilic Substitution'
  },

  {
    id: 'saponification',
    title: 'Saponification',
    category: 'organic',
    equation: 'RCOOR\' + NaOH → RCOONa + R\'OH',
    description: 'Base-catalyzed hydrolysis of esters to form carboxylate salts and alcohols.',
    mechanism: 'Nucleophilic acyl substitution with tetrahedral intermediate',
    stepByStep: [
      'Nucleophilic attack: OH⁻ attacks carbonyl carbon',
      'Tetrahedral intermediate formation',
      'Elimination: Alkoxide leaves as leaving group',
      'Proton transfer: Alcohol formation and carboxylate salt'
    ],
    conditions: ['Strong base (NaOH/KOH)', 'Heat (reflux)', 'Aqueous or alcoholic medium'],
    uses: ['Soap production', 'Biodiesel manufacturing', 'Ester hydrolysis'],
    examples: ['Fat + NaOH → Soap + Glycerol', 'Ethyl acetate hydrolysis'],
    exceptions: ['Irreversible due to salt formation', 'Different from acid hydrolysis'],
    realWorldApplications: ['Soap industry', 'Biodiesel production', 'Food processing'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Aldehydes, Ketones and Carboxylic Acids',
    type: 'Hydrolysis Reaction'
  },

  {
    id: 'hoffmann-bromamide',
    title: 'Hoffmann Bromamide Degradation',
    category: 'organic',
    equation: 'RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O',
    description: 'Conversion of primary amides to primary amines with one less carbon atom.',
    mechanism: 'Rearrangement reaction involving nitrene intermediate',
    stepByStep: [
      'N-bromination: RCONH₂ + Br₂ + OH⁻ → RCONHBr',
      'Deprotonation: RCONHBr + OH⁻ → RCONBr⁻',
      'Rearrangement: RCONBr⁻ → R-N=C=O (isocyanate)',
      'Hydrolysis: R-N=C=O + H₂O → RNH₂ + CO₂'
    ],
    conditions: ['Aqueous NaOH', 'Bromine water', 'Heat'],
    uses: ['Amine synthesis', 'Degradation reactions', 'Structural determination'],
    examples: ['Acetamide → Methylamine', 'Benzamide → Aniline'],
    exceptions: ['Only works with primary amides', 'One carbon atom is lost'],
    realWorldApplications: ['Pharmaceutical synthesis', 'Chemical analysis', 'Research applications'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Amines',
    type: 'Degradation Reaction'
  },

  {
    id: 'gabriel-phthalimide-synthesis',
    title: 'Gabriel Phthalimide Synthesis',
    category: 'organic',
    equation: 'Phthalimide + RX → N-alkylphthalimide → RNH₂',
    description: 'Synthesis of primary amines from alkyl halides using phthalimide.',
    mechanism: 'SN2 substitution followed by hydrolysis',
    stepByStep: [
      'Deprotonation: Phthalimide + KOH → Potassium phthalimide',
      'Alkylation: K-phthalimide + RX → N-alkylphthalimide (SN2)',
      'Hydrolysis: N-alkylphthalimide + H₂NNH₂ → RNH₂ + phthalhydrazide'
    ],
    conditions: ['Primary alkyl halides', 'Strong base (KOH)', 'Hydrazine hydrolysis'],
    uses: ['Primary amine synthesis', 'Amino acid synthesis', 'Pharmaceutical intermediates'],
    examples: ['Ethylamine synthesis', 'Benzylamine preparation', 'Amino acid precursors'],
    exceptions: ['Only primary halides work', 'Secondary/tertiary give elimination'],
    realWorldApplications: ['Drug synthesis', 'Amino acid production', 'Chemical research'],
    difficulty: 'hard',
    class: '12',
    chapter: 'Amines',
    type: 'Amine Synthesis'
  },

  {
    id: 'carbylamine-test',
    title: 'Carbylamine Test',
    category: 'organic',
    equation: 'RNH₂ + CHCl₃ + 3KOH → RNC + 3KCl + 3H₂O',
    description: 'Test for primary amines using chloroform and alcoholic KOH.',
    mechanism: 'Elimination and rearrangement to form isocyanide',
    stepByStep: [
      'Dichlorocarbene formation: CHCl₃ + OH⁻ → :CCl₂ + H₂O + Cl⁻',
      'Nucleophilic attack: RNH₂ attacks dichlorocarbene',
      'Elimination: Loss of HCl forms isocyanide',
      'Offensive smell indicates positive test'
    ],
    conditions: ['Alcoholic KOH', 'Chloroform', 'Heat', 'Primary amine'],
    uses: ['Primary amine identification', 'Qualitative analysis', 'Laboratory testing'],
    examples: ['Aniline gives positive test', 'Methylamine positive', 'Secondary amines negative'],
    exceptions: ['Only primary amines give test', 'Secondary/tertiary amines negative'],
    realWorldApplications: ['Analytical chemistry', 'Quality control', 'Educational demonstrations'],
    difficulty: 'easy',
    class: '12',
    chapter: 'Amines',
    type: 'Qualitative Test'
  },

  {
    id: 'diazotization',
    title: 'Diazotization Reaction',
    category: 'organic',
    equation: 'ArNH₂ + NaNO₂ + HCl → ArN₂⁺Cl⁻ + NaCl + 2H₂O',
    description: 'Conversion of aromatic primary amines to diazonium salts.',
    mechanism: 'Nitrous acid formation and electrophilic attack',
    stepByStep: [
      'Nitrous acid formation: NaNO₂ + HCl → HNO₂ + NaCl',
      'Nitrosonium ion: HNO₂ + H⁺ → NO⁺ + H₂O',
      'N-nitrosation: ArNH₂ + NO⁺ → ArNHNO⁺',
      'Rearrangement: ArNHNO⁺ → ArN₂⁺ + H₂O'
    ],
    conditions: ['Low temperature (0-5°C)', 'Acidic medium (HCl)', 'Sodium nitrite'],
    uses: ['Diazonium salt formation', 'Azo dye synthesis', 'Aromatic substitution'],
    examples: ['Aniline → Benzenediazonium chloride', 'Toluidine diazotization'],
    exceptions: ['Only aromatic primary amines', 'Aliphatic amines give alcohols'],
    realWorldApplications: ['Dye industry', 'Pharmaceutical synthesis', 'Analytical chemistry'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Amines',
    type: 'Diazotization'
  },

  {
    id: 'sandmeyer-reaction',
    title: 'Sandmeyer Reaction',
    category: 'organic',
    equation: 'ArN₂⁺Cl⁻ + CuCl → ArCl + N₂ + Cu⁺',
    description: 'Replacement of diazonium group with halogen using copper salts.',
    mechanism: 'Radical mechanism with copper catalysis',
    stepByStep: [
      'Electron transfer: Cu⁺ + ArN₂⁺ → Cu²⁺ + ArN₂•',
      'Nitrogen loss: ArN₂• → Ar• + N₂',
      'Halogen transfer: Ar• + CuX₂ → ArX + CuX',
      'Catalyst regeneration: CuX → Cu⁺ + X•'
    ],
    conditions: ['Copper salts (CuCl, CuBr, CuCN)', 'Diazonium salt', 'Room temperature'],
    uses: ['Aromatic halide synthesis', 'Nitrile preparation', 'Functional group transformation'],
    examples: ['Chlorobenzene from aniline', 'Bromobenzene synthesis', 'Benzonitrile preparation'],
    exceptions: ['Iodine requires KI instead of CuI', 'Fluorine uses different conditions'],
    realWorldApplications: ['Pharmaceutical synthesis', 'Agrochemical production', 'Dye intermediates'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Amines',
    type: 'Aromatic Substitution'
  },

  {
    id: 'coupling-reaction',
    title: 'Azo Coupling Reaction',
    category: 'organic',
    equation: 'ArN₂⁺ + Ar\'H → ArN=NAr\' + H⁺',
    description: 'Electrophilic substitution of diazonium salts with activated aromatic compounds.',
    mechanism: 'Electrophilic aromatic substitution',
    stepByStep: [
      'Electrophilic attack: ArN₂⁺ attacks activated aromatic ring',
      'Sigma complex formation: Cyclohexadienyl cation intermediate',
      'Deprotonation: Loss of H⁺ forms azo compound',
      'Colored product formation'
    ],
    conditions: ['Alkaline medium (pH 8-10)', 'Low temperature (0-5°C)', 'Activated aromatic compound'],
    uses: ['Azo dye synthesis', 'Indicator preparation', 'Colorant production'],
    examples: ['Methyl orange synthesis', 'Congo red preparation', 'Food dye production'],
    exceptions: ['Requires activated aromatic rings', 'Phenols and amines couple easily'],
    realWorldApplications: ['Textile dyes', 'Food coloring', 'pH indicators', 'Cosmetics'],
    difficulty: 'medium',
    class: '12',
    chapter: 'Amines',
    type: 'Coupling Reaction'
  }
];

// Utility functions for organic reactions
export const getOrganicReactionsByClass = (classLevel: string): OrganicReaction[] => {
  return organicReactions.filter(reaction => reaction.class === classLevel || reaction.class === 'both');
};

export const getOrganicReactionsByChapter = (chapter: string): OrganicReaction[] => {
  return organicReactions.filter(reaction => reaction.chapter === chapter);
};

export const getOrganicReactionsByDifficulty = (difficulty: string): OrganicReaction[] => {
  return organicReactions.filter(reaction => reaction.difficulty === difficulty);
};

export const getOrganicReactionsByType = (type: string): OrganicReaction[] => {
  return organicReactions.filter(reaction => reaction.type === type);
};

export const searchOrganicReactions = (query: string): OrganicReaction[] => {
  const lowercaseQuery = query.toLowerCase();
  return organicReactions.filter(reaction => 
    reaction.title.toLowerCase().includes(lowercaseQuery) ||
    reaction.description.toLowerCase().includes(lowercaseQuery) ||
    reaction.equation.toLowerCase().includes(lowercaseQuery) ||
    reaction.chapter.toLowerCase().includes(lowercaseQuery) ||
    reaction.type.toLowerCase().includes(lowercaseQuery) ||
    reaction.uses.some(use => use.toLowerCase().includes(lowercaseQuery)) ||
    reaction.examples.some(example => example.toLowerCase().includes(lowercaseQuery))
  );
};

export const getOrganicReactionChapters = (): string[] => {
  return [...new Set(organicReactions.map(reaction => reaction.chapter))];
};

export const getOrganicReactionTypes = (): string[] => {
  return [...new Set(organicReactions.map(reaction => reaction.type))];
};