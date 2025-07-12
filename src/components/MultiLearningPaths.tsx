import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, Lock, Play, Star, Clock, Users, Award, Target, Zap, Trophy, Brain } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completed: boolean;
  locked: boolean;
  prerequisites: string[];
  content: {
    theory: string[];
    examples: string[];
    practice: string[];
    keyFormulas: string[];
    importantPoints: string[];
  };
  jeeWeightage: number;
  neetWeightage: number;
  cbseImportance: 'high' | 'medium' | 'low';
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  targetExam: 'JEE' | 'NEET' | 'CBSE' | 'Foundation';
  class: '11' | '12' | 'both';
  totalTopics: number;
  completedTopics: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: Topic[];
  color: string;
  features: string[];
  successRate: number;
  enrolledStudents: number;
}

const multiLearningPaths: LearningPath[] = [
  // JEE Preparation Paths
  {
    id: 'jee-main-foundation',
    title: 'JEE Main Foundation',
    description: 'Complete preparation for JEE Main with focus on fundamental concepts and problem-solving techniques.',
    targetExam: 'JEE',
    class: 'both',
    totalTopics: 15,
    completedTopics: 0,
    estimatedTime: '12 weeks',
    difficulty: 'intermediate',
    color: 'from-blue-500 to-indigo-600',
    features: [
      'Comprehensive concept coverage',
      'Previous year questions',
      'Mock tests and analysis',
      'Doubt resolution sessions',
      'Performance tracking'
    ],
    successRate: 85,
    enrolledStudents: 15420,
    topics: [
      {
        id: 'atomic-structure-jee',
        title: 'Atomic Structure for JEE',
        description: 'Deep understanding of atomic models, quantum numbers, and electronic configurations',
        duration: '1 week',
        difficulty: 'beginner',
        completed: false,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'Historical development of atomic models',
            'Quantum mechanical model of atom',
            'Quantum numbers and their significance',
            'Electronic configuration and exceptions',
            'Periodic trends based on electronic configuration'
          ],
          examples: [
            'Electronic configuration of transition elements',
            'Quantum number calculations',
            'Orbital energy diagrams',
            'Periodic property variations'
          ],
          practice: [
            'Write electronic configurations for given elements',
            'Determine quantum numbers for electrons',
            'Predict periodic trends',
            'Solve numerical problems on atomic structure'
          ],
          keyFormulas: [
            'E = -13.6 Z²/n² eV (Hydrogen-like atoms)',
            'λ = h/mv (de Broglie wavelength)',
            'ΔE = hν (Energy of photon)',
            'Zeff = Z - σ (Effective nuclear charge)'
          ],
          importantPoints: [
            'Aufbau principle, Pauli exclusion principle, Hund\'s rule',
            'Exceptions in electronic configuration (Cr, Cu, etc.)',
            'Relationship between quantum numbers',
            'Periodic trends and their explanations'
          ]
        },
        jeeWeightage: 8,
        neetWeightage: 5,
        cbseImportance: 'high'
      },
      {
        id: 'chemical-bonding-jee',
        title: 'Chemical Bonding and Molecular Structure',
        description: 'Comprehensive study of ionic, covalent, and metallic bonding with molecular geometry',
        duration: '2 weeks',
        difficulty: 'intermediate',
        completed: false,
        locked: false,
        prerequisites: ['atomic-structure-jee'],
        content: {
          theory: [
            'Types of chemical bonds and their formation',
            'Lewis structures and formal charge',
            'VSEPR theory and molecular geometry',
            'Hybridization and orbital overlap',
            'Molecular orbital theory',
            'Intermolecular forces'
          ],
          examples: [
            'Drawing Lewis structures for complex molecules',
            'Predicting molecular geometry using VSEPR',
            'Determining hybridization states',
            'MO diagrams for diatomic molecules'
          ],
          practice: [
            'Draw Lewis structures and predict geometry',
            'Calculate formal charges',
            'Determine hybridization and bond angles',
            'Compare bond properties'
          ],
          keyFormulas: [
            'Formal charge = V - N - B/2',
            'Bond order = (Nb - Na)/2',
            'Dipole moment = q × d',
            'Lattice energy ∝ q₁q₂/r'
          ],
          importantPoints: [
            'Relationship between bond length, strength, and order',
            'Resonance and its effects on stability',
            'Factors affecting molecular polarity',
            'Comparison of VBT and MOT'
          ]
        },
        jeeWeightage: 12,
        neetWeightage: 8,
        cbseImportance: 'high'
      },
      {
        id: 'thermodynamics-jee',
        title: 'Chemical Thermodynamics',
        description: 'Energy changes in chemical reactions, entropy, and spontaneity',
        duration: '2 weeks',
        difficulty: 'advanced',
        completed: false,
        locked: true,
        prerequisites: ['chemical-bonding-jee'],
        content: {
          theory: [
            'First law of thermodynamics',
            'Enthalpy and its types',
            'Second law and entropy',
            'Gibbs free energy and spontaneity',
            'Third law of thermodynamics'
          ],
          examples: [
            'Calculation of enthalpy changes',
            'Entropy calculations for phase changes',
            'Predicting reaction spontaneity',
            'Temperature dependence of equilibrium'
          ],
          practice: [
            'Calculate ΔH using bond energies',
            'Determine ΔS for reactions',
            'Predict spontaneity using ΔG',
            'Apply Hess\'s law'
          ],
          keyFormulas: [
            'ΔU = q + w',
            'ΔH = ΔU + ΔnRT',
            'ΔG = ΔH - TΔS',
            'ΔG° = -RT ln K'
          ],
          importantPoints: [
            'Sign conventions for heat and work',
            'Relationship between ΔG and spontaneity',
            'Factors affecting entropy',
            'Applications of thermodynamic laws'
          ]
        },
        jeeWeightage: 10,
        neetWeightage: 6,
        cbseImportance: 'high'
      }
    ]
  },

  {
    id: 'jee-advanced-mastery',
    title: 'JEE Advanced Mastery',
    description: 'Advanced problem-solving techniques and complex concepts for JEE Advanced preparation.',
    targetExam: 'JEE',
    class: '12',
    totalTopics: 20,
    completedTopics: 0,
    estimatedTime: '16 weeks',
    difficulty: 'advanced',
    color: 'from-purple-500 to-pink-600',
    features: [
      'Advanced problem-solving techniques',
      'Multi-concept integration',
      'Time management strategies',
      'Advanced numerical problems',
      'Conceptual depth'
    ],
    successRate: 78,
    enrolledStudents: 8750,
    topics: [
      {
        id: 'coordination-chemistry-advanced',
        title: 'Advanced Coordination Chemistry',
        description: 'Complex formation, isomerism, and applications in JEE Advanced context',
        duration: '2 weeks',
        difficulty: 'advanced',
        completed: false,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'Werner\'s coordination theory',
            'Types of ligands and coordination numbers',
            'Isomerism in coordination compounds',
            'Crystal field theory and applications',
            'Organometallic compounds'
          ],
          examples: [
            'Complex nomenclature problems',
            'Isomerism identification',
            'CFT splitting patterns',
            'Magnetic property calculations'
          ],
          practice: [
            'Name complex compounds systematically',
            'Identify types of isomerism',
            'Calculate CFSE values',
            'Predict magnetic properties'
          ],
          keyFormulas: [
            'CFSE = -0.4Δₒ × t₂g + 0.6Δₒ × eₓ',
            'μ = √n(n+2) BM',
            'Δₒ/Δₜ = 4/9',
            'EAN = Z - oxidation state + 2 × coordination number'
          ],
          importantPoints: [
            'Factors affecting crystal field splitting',
            'Relationship between color and d-electron configuration',
            'Applications in catalysis and medicine',
            'Comparison of CFT and LFT'
          ]
        },
        jeeWeightage: 15,
        neetWeightage: 8,
        cbseImportance: 'high'
      }
    ]
  },

  // NEET Preparation Paths
  {
    id: 'neet-biology-chemistry',
    title: 'NEET Chemistry Mastery',
    description: 'Focused preparation for NEET chemistry with emphasis on biological applications and medical relevance.',
    targetExam: 'NEET',
    class: 'both',
    totalTopics: 18,
    completedTopics: 0,
    estimatedTime: '14 weeks',
    difficulty: 'intermediate',
    color: 'from-green-500 to-emerald-600',
    features: [
      'Medical application focus',
      'Biological relevance',
      'NEET pattern questions',
      'Quick revision techniques',
      'Memory aids and mnemonics'
    ],
    successRate: 82,
    enrolledStudents: 22340,
    topics: [
      {
        id: 'biomolecules-neet',
        title: 'Biomolecules for NEET',
        description: 'Comprehensive study of carbohydrates, proteins, lipids, and nucleic acids',
        duration: '2 weeks',
        difficulty: 'intermediate',
        completed: false,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'Classification and structure of carbohydrates',
            'Protein structure and functions',
            'Lipids and their biological roles',
            'Nucleic acids and genetic information',
            'Enzymes and their mechanisms'
          ],
          examples: [
            'Glucose metabolism pathways',
            'Protein folding and denaturation',
            'Membrane lipid composition',
            'DNA replication and transcription'
          ],
          practice: [
            'Identify biomolecule structures',
            'Classify carbohydrates and proteins',
            'Understand enzyme kinetics',
            'Relate structure to function'
          ],
          keyFormulas: [
            'Michaelis-Menten equation: v = Vmax[S]/(Km + [S])',
            'Henderson-Hasselbalch equation for amino acids',
            'Chargaff\'s rules for DNA composition',
            'Protein isoelectric point calculations'
          ],
          importantPoints: [
            'Essential vs non-essential amino acids',
            'Vitamin deficiency diseases',
            'Enzyme inhibition types',
            'Genetic code and mutations'
          ]
        },
        jeeWeightage: 5,
        neetWeightage: 12,
        cbseImportance: 'high'
      },
      {
        id: 'environmental-chemistry-neet',
        title: 'Environmental Chemistry',
        description: 'Pollution, its effects, and green chemistry principles',
        duration: '1 week',
        difficulty: 'beginner',
        completed: false,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'Air pollution and its control',
            'Water pollution and treatment',
            'Soil pollution and remediation',
            'Green chemistry principles',
            'Ozone depletion and global warming'
          ],
          examples: [
            'Photochemical smog formation',
            'Water treatment processes',
            'Biodegradable vs non-biodegradable materials',
            'CFC alternatives'
          ],
          practice: [
            'Identify pollution sources',
            'Suggest control measures',
            'Apply green chemistry principles',
            'Analyze environmental data'
          ],
          keyFormulas: [
            'BOD and COD calculations',
            'pH of acid rain',
            'Ozone depletion potential',
            'Global warming potential'
          ],
          importantPoints: [
            'Major air and water pollutants',
            'Effects of pollution on health',
            'International environmental protocols',
            'Sustainable development goals'
          ]
        },
        jeeWeightage: 3,
        neetWeightage: 8,
        cbseImportance: 'medium'
      }
    ]
  },

  // CBSE Board Preparation
  {
    id: 'cbse-class11-complete',
    title: 'CBSE Class 11 Complete',
    description: 'Comprehensive coverage of CBSE Class 11 chemistry syllabus with board exam focus.',
    targetExam: 'CBSE',
    class: '11',
    totalTopics: 12,
    completedTopics: 0,
    estimatedTime: '10 weeks',
    difficulty: 'beginner',
    color: 'from-orange-500 to-red-600',
    features: [
      'NCERT textbook alignment',
      'Board exam pattern',
      'Step-by-step solutions',
      'Important questions',
      'Practical applications'
    ],
    successRate: 92,
    enrolledStudents: 35670,
    topics: [
      {
        id: 'basic-concepts-cbse',
        title: 'Some Basic Concepts of Chemistry',
        description: 'Fundamental concepts including mole concept, stoichiometry, and laws of chemical combination',
        duration: '1 week',
        difficulty: 'beginner',
        completed: false,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'Matter and its classification',
            'Laws of chemical combination',
            'Atomic and molecular masses',
            'Mole concept and molar mass',
            'Stoichiometry and percentage composition'
          ],
          examples: [
            'Mole calculations',
            'Empirical and molecular formula determination',
            'Stoichiometric calculations',
            'Percentage composition problems'
          ],
          practice: [
            'Calculate number of moles',
            'Determine empirical formulas',
            'Solve stoichiometry problems',
            'Find percentage composition'
          ],
          keyFormulas: [
            'Number of moles = Given mass / Molar mass',
            'Molarity = Moles of solute / Volume of solution (L)',
            'Percentage composition = (Mass of element / Molecular mass) × 100',
            'Empirical formula mass × n = Molecular mass'
          ],
          importantPoints: [
            'Avogadro\'s number and its significance',
            'Difference between empirical and molecular formula',
            'Limiting reagent concept',
            'Significant figures in calculations'
          ]
        },
        jeeWeightage: 6,
        neetWeightage: 4,
        cbseImportance: 'high'
      }
    ]
  },

  {
    id: 'cbse-class12-complete',
    title: 'CBSE Class 12 Complete',
    description: 'Complete CBSE Class 12 chemistry preparation with focus on board exams and competitive readiness.',
    targetExam: 'CBSE',
    class: '12',
    totalTopics: 14,
    completedTopics: 0,
    estimatedTime: '12 weeks',
    difficulty: 'intermediate',
    color: 'from-teal-500 to-cyan-600',
    features: [
      'Board exam focused',
      'Previous year questions',
      'Practical experiments',
      'Important derivations',
      'Quick revision notes'
    ],
    successRate: 89,
    enrolledStudents: 28950,
    topics: [
      {
        id: 'electrochemistry-cbse',
        title: 'Electrochemistry',
        description: 'Galvanic cells, electrolysis, and applications in daily life',
        duration: '2 weeks',
        difficulty: 'intermediate',
        completed: false,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'Electrochemical cells and EMF',
            'Nernst equation and its applications',
            'Conductance and its measurement',
            'Electrolysis and Faraday\'s laws',
            'Batteries and fuel cells'
          ],
          examples: [
            'EMF calculations using Nernst equation',
            'Conductivity measurements',
            'Electrolysis calculations',
            'Battery voltage determinations'
          ],
          practice: [
            'Calculate cell EMF under different conditions',
            'Solve conductance problems',
            'Apply Faraday\'s laws',
            'Analyze electrochemical processes'
          ],
          keyFormulas: [
            'E = E° - (RT/nF) ln Q (Nernst equation)',
            'ΔG° = -nFE°',
            'κ = 1/ρ (Conductivity)',
            'Λm = κ × 1000/M (Molar conductivity)'
          ],
          importantPoints: [
            'Standard electrode potentials',
            'Factors affecting conductivity',
            'Applications of electrolysis',
            'Corrosion and its prevention'
          ]
        },
        jeeWeightage: 8,
        neetWeightage: 5,
        cbseImportance: 'high'
      }
    ]
  },

  // Foundation Course
  {
    id: 'chemistry-foundation',
    title: 'Chemistry Foundation Course',
    description: 'Building strong fundamentals for students starting their chemistry journey.',
    targetExam: 'Foundation',
    class: 'both',
    totalTopics: 10,
    completedTopics: 0,
    estimatedTime: '8 weeks',
    difficulty: 'beginner',
    color: 'from-indigo-500 to-purple-600',
    features: [
      'Concept building approach',
      'Visual learning aids',
      'Simple explanations',
      'Gradual difficulty progression',
      'Interactive exercises'
    ],
    successRate: 95,
    enrolledStudents: 45230,
    topics: [
      {
        id: 'introduction-chemistry',
        title: 'Introduction to Chemistry',
        description: 'What is chemistry and its importance in daily life',
        duration: '3 days',
        difficulty: 'beginner',
        completed: false,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'Definition and scope of chemistry',
            'Branches of chemistry',
            'Chemistry in daily life',
            'Scientific method in chemistry',
            'Safety in chemistry laboratory'
          ],
          examples: [
            'Chemical processes in cooking',
            'Medicines and chemistry',
            'Cosmetics and chemistry',
            'Environmental applications'
          ],
          practice: [
            'Identify chemical processes around us',
            'Classify different branches of chemistry',
            'Understand laboratory safety rules',
            'Appreciate chemistry\'s role in society'
          ],
          keyFormulas: [],
          importantPoints: [
            'Chemistry is the study of matter and its transformations',
            'All life processes involve chemical reactions',
            'Chemistry helps in developing new materials',
            'Safety is paramount in chemical work'
          ]
        },
        jeeWeightage: 2,
        neetWeightage: 2,
        cbseImportance: 'medium'
      }
    ]
  }
];

export const MultiLearningPaths: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'examples' | 'practice' | 'formulas' | 'points'>('theory');
  const [filterExam, setFilterExam] = useState<'all' | 'JEE' | 'NEET' | 'CBSE' | 'Foundation'>('all');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const getProgressPercentage = (path: LearningPath) => {
    return Math.round((path.completedTopics / path.totalTopics) * 100);
  };

  const filteredPaths = multiLearningPaths.filter(path => 
    filterExam === 'all' || path.targetExam === filterExam
  );

  if (selectedTopic) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedTopic(null)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              ←
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedTopic.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedTopic.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedTopic.difficulty)}`}>
              {selectedTopic.difficulty}
            </span>
            <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{selectedTopic.duration}</span>
            </div>
          </div>
        </div>

        {/* Exam Weightage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800 dark:text-blue-300">JEE Weightage</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {selectedTopic.jeeWeightage}%
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800 dark:text-green-300">NEET Weightage</span>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {selectedTopic.neetWeightage}%
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-orange-800 dark:text-orange-300">CBSE Importance</span>
            </div>
            <div className={`text-2xl font-bold capitalize ${
              selectedTopic.cbseImportance === 'high' ? 'text-red-600 dark:text-red-400' :
              selectedTopic.cbseImportance === 'medium' ? 'text-yellow-600 dark:text-yellow-400' :
              'text-green-600 dark:text-green-400'
            }`}>
              {selectedTopic.cbseImportance}
            </div>
          </div>
        </div>

        {/* Enhanced Content Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {(['theory', 'examples', 'practice', 'formulas', 'points'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab === 'formulas' ? 'Key Formulas' : 
                   tab === 'points' ? 'Important Points' :
                   tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="space-y-3">
                  {selectedTopic.content[activeTab].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <span className={`text-gray-700 dark:text-gray-300 ${
                        activeTab === 'formulas' ? 'font-mono text-lg' : ''
                      }`}>
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setSelectedTopic(null)}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Path
          </button>
          
          <div className="space-x-3">
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Take Quiz
            </button>
            <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Mark Complete
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPath) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedPath(null)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              ←
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedPath.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedPath.description}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {getProgressPercentage(selectedPath)}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {selectedPath.completedTopics} of {selectedPath.totalTopics} completed
            </div>
          </div>
        </div>

        {/* Path Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-800 dark:text-blue-300">Success Rate</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {selectedPath.successRate}%
            </div>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-green-800 dark:text-green-300">Enrolled</span>
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {selectedPath.enrolledStudents.toLocaleString()}
            </div>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-purple-800 dark:text-purple-300">Duration</span>
            </div>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {selectedPath.estimatedTime}
            </div>
          </div>
          
          <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-200 dark:border-orange-800">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-orange-600" />
              <span className="font-semibold text-orange-800 dark:text-orange-300">Target</span>
            </div>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {selectedPath.targetExam}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-8">
          <div 
            className={`bg-gradient-to-r ${selectedPath.color} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${getProgressPercentage(selectedPath)}%` }}
          />
        </div>

        {/* Path Features */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            What You'll Get
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedPath.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Topics List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Learning Topics
          </h3>
          {selectedPath.topics.map((topic, index) => (
            <motion.div
              key={topic.id}
              className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700
                         ${topic.locked ? 'opacity-60' : 'hover:shadow-xl cursor-pointer'} transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => !topic.locked && setSelectedTopic(topic)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    topic.completed ? 'bg-green-500 text-white' :
                    topic.locked ? 'bg-gray-300 dark:bg-gray-600 text-gray-500' :
                    'bg-blue-500 text-white'
                  }`}>
                    {topic.completed ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : topic.locked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {topic.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty}
                  </span>
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{topic.duration}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Weightage</div>
                    <div className="flex space-x-2 text-xs">
                      <span className="text-blue-600">JEE: {topic.jeeWeightage}%</span>
                      <span className="text-green-600">NEET: {topic.neetWeightage}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {topic.prerequisites.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Prerequisites: {topic.prerequisites.join(', ')}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Main learning paths view
  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            Multi-Track Learning Paths
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Structured learning journeys for JEE, NEET, CBSE, and Foundation students
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700">
          {(['all', 'JEE', 'NEET', 'CBSE', 'Foundation'] as const).map((exam) => (
            <button
              key={exam}
              onClick={() => setFilterExam(exam)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                filterExam === exam
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {exam === 'all' ? 'All Paths' : exam}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPaths.map((path, index) => (
          <motion.div
            key={path.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700
                       hover:shadow-xl cursor-pointer transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => setSelectedPath(path)}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`px-4 py-2 rounded-full text-white text-sm font-medium bg-gradient-to-r ${path.color}`}>
                {path.targetExam} • Class {path.class}
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(path.difficulty)}`}>
                {path.difficulty}
              </span>
            </div>

            {/* Title and Description */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {path.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {path.description}
            </p>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Progress</span>
                <span>{path.completedTopics}/{path.totalTopics} topics</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className={`bg-gradient-to-r ${path.color} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${getProgressPercentage(path)}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {path.totalTopics}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Topics
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {path.estimatedTime}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Duration
                </div>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {path.successRate}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Success
                </div>
              </div>
            </div>

            {/* Features Preview */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="flex flex-wrap gap-2">
                {path.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
                {path.features.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    +{path.features.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Enrollment Info */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4" />
                <span>{path.enrolledStudents.toLocaleString()} enrolled</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">4.8</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};