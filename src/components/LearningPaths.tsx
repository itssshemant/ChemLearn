import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CheckCircle, Lock, Play, Star, Clock, Users, Award } from 'lucide-react';

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
  };
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  class: '11' | '12';
  totalTopics: number;
  completedTopics: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topics: Topic[];
  color: string;
}

const learningPaths: LearningPath[] = [
  {
    id: 'class11-basics',
    title: 'Chemistry Fundamentals',
    description: 'Master the basic concepts of chemistry including atomic structure, bonding, and states of matter.',
    class: '11',
    totalTopics: 8,
    completedTopics: 3,
    estimatedTime: '6 weeks',
    difficulty: 'beginner',
    color: 'from-blue-500 to-cyan-600',
    topics: [
      {
        id: 'atomic-structure',
        title: 'Atomic Structure',
        description: 'Understanding atoms, electrons, and quantum numbers',
        duration: '1 week',
        difficulty: 'beginner',
        completed: true,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'Discovery of subatomic particles',
            'Rutherford and Bohr atomic models',
            'Quantum mechanical model',
            'Electronic configuration'
          ],
          examples: [
            'Electronic configuration of elements',
            'Quantum number calculations',
            'Orbital shapes and energies'
          ],
          practice: [
            'Write electronic configurations',
            'Determine quantum numbers',
            'Draw orbital diagrams'
          ]
        }
      },
      {
        id: 'chemical-bonding',
        title: 'Chemical Bonding',
        description: 'Ionic, covalent, and metallic bonding concepts',
        duration: '1.5 weeks',
        difficulty: 'intermediate',
        completed: true,
        locked: false,
        prerequisites: ['atomic-structure'],
        content: {
          theory: [
            'Types of chemical bonds',
            'Lewis structures',
            'VSEPR theory',
            'Hybridization'
          ],
          examples: [
            'Drawing Lewis structures',
            'Predicting molecular geometry',
            'Hybridization in molecules'
          ],
          practice: [
            'Draw Lewis structures for compounds',
            'Predict molecular shapes',
            'Identify hybridization states'
          ]
        }
      },
      {
        id: 'states-of-matter',
        title: 'States of Matter',
        description: 'Solid, liquid, and gaseous states and their properties',
        duration: '1 week',
        difficulty: 'beginner',
        completed: true,
        locked: false,
        prerequisites: ['chemical-bonding'],
        content: {
          theory: [
            'Kinetic molecular theory',
            'Gas laws',
            'Intermolecular forces',
            'Phase transitions'
          ],
          examples: [
            'Gas law calculations',
            'Phase diagram interpretation',
            'Intermolecular force comparison'
          ],
          practice: [
            'Solve gas law problems',
            'Analyze phase diagrams',
            'Compare boiling points'
          ]
        }
      },
      {
        id: 'thermodynamics',
        title: 'Thermodynamics',
        description: 'Energy changes in chemical reactions',
        duration: '1.5 weeks',
        difficulty: 'intermediate',
        completed: false,
        locked: false,
        prerequisites: ['states-of-matter'],
        content: {
          theory: [
            'First law of thermodynamics',
            'Enthalpy and entropy',
            'Gibbs free energy',
            'Spontaneity of reactions'
          ],
          examples: [
            'Enthalpy calculations',
            'Entropy change calculations',
            'Predicting reaction spontaneity'
          ],
          practice: [
            'Calculate enthalpy changes',
            'Determine entropy changes',
            'Predict reaction feasibility'
          ]
        }
      },
      {
        id: 'equilibrium',
        title: 'Chemical Equilibrium',
        description: 'Dynamic equilibrium and Le Chatelier\'s principle',
        duration: '1 week',
        difficulty: 'intermediate',
        completed: false,
        locked: true,
        prerequisites: ['thermodynamics'],
        content: {
          theory: [
            'Equilibrium constant',
            'Le Chatelier\'s principle',
            'Acid-base equilibrium',
            'Buffer solutions'
          ],
          examples: [
            'Equilibrium constant calculations',
            'Predicting equilibrium shifts',
            'pH calculations'
          ],
          practice: [
            'Calculate equilibrium constants',
            'Predict equilibrium changes',
            'Solve pH problems'
          ]
        }
      }
    ]
  },
  {
    id: 'class12-organic',
    title: 'Organic Chemistry Mastery',
    description: 'Comprehensive study of organic compounds, reactions, and mechanisms.',
    class: '12',
    totalTopics: 10,
    completedTopics: 1,
    estimatedTime: '8 weeks',
    difficulty: 'advanced',
    color: 'from-green-500 to-emerald-600',
    topics: [
      {
        id: 'organic-basics',
        title: 'Organic Chemistry Basics',
        description: 'Nomenclature, isomerism, and basic concepts',
        duration: '1 week',
        difficulty: 'beginner',
        completed: true,
        locked: false,
        prerequisites: [],
        content: {
          theory: [
            'IUPAC nomenclature',
            'Structural and stereoisomerism',
            'Functional groups',
            'Reaction mechanisms'
          ],
          examples: [
            'Naming organic compounds',
            'Identifying isomers',
            'Functional group recognition'
          ],
          practice: [
            'Name organic compounds',
            'Draw isomers',
            'Identify functional groups'
          ]
        }
      },
      {
        id: 'hydrocarbons',
        title: 'Hydrocarbons',
        description: 'Alkanes, alkenes, alkynes, and aromatic compounds',
        duration: '1.5 weeks',
        difficulty: 'intermediate',
        completed: false,
        locked: false,
        prerequisites: ['organic-basics'],
        content: {
          theory: [
            'Alkane reactions',
            'Alkene addition reactions',
            'Alkyne chemistry',
            'Aromatic substitution'
          ],
          examples: [
            'Halogenation of alkanes',
            'Addition to alkenes',
            'Electrophilic aromatic substitution'
          ],
          practice: [
            'Predict reaction products',
            'Write reaction mechanisms',
            'Solve synthesis problems'
          ]
        }
      }
    ]
  }
];

export const LearningPaths: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<'theory' | 'examples' | 'practice'>('theory');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressPercentage = (path: LearningPath) => {
    return Math.round((path.completedTopics / path.totalTopics) * 100);
  };

  if (selectedTopic) {
    return (
      <div className="w-full max-w-6xl mx-auto p-6">
        {/* Header */}
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

        {/* Content Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {(['theory', 'examples', 'practice'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
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
        {/* Header */}
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

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-8">
          <div 
            className={`bg-gradient-to-r ${selectedPath.color} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${getProgressPercentage(selectedPath)}%` }}
          />
        </div>

        {/* Topics List */}
        <div className="space-y-4">
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
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            Learning Paths
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Structured learning journeys to master chemistry concepts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {learningPaths.map((path, index) => (
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
              <div className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${path.color}`}>
                Class {path.class}
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
            <div className="grid grid-cols-3 gap-4 text-center">
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
                  {getProgressPercentage(path)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Complete
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};