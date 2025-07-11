import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Thermometer, Droplet, Zap, Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface Experiment {
  id: string;
  title: string;
  description: string;
  type: 'titration' | 'reaction' | 'molecular-building' | 'crystallization';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  materials: string[];
  procedure: string[];
  safetyNotes: string[];
}

const experiments: Experiment[] = [
  {
    id: 'acid-base-titration',
    title: 'Acid-Base Titration',
    description: 'Determine the concentration of an unknown acid using standardized NaOH solution.',
    type: 'titration',
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    materials: ['0.1 M NaOH solution', 'Unknown HCl solution', 'Phenolphthalein indicator', 'Burette', 'Conical flask'],
    procedure: [
      'Fill the burette with 0.1 M NaOH solution',
      'Pipette 25 mL of unknown acid into conical flask',
      'Add 2-3 drops of phenolphthalein indicator',
      'Titrate slowly until permanent pink color appears',
      'Record the volume of NaOH used',
      'Repeat for accuracy'
    ],
    safetyNotes: ['Wear safety goggles', 'Handle acids and bases carefully', 'Wash hands after experiment']
  },
  {
    id: 'molecular-models',
    title: 'Build Molecular Models',
    description: 'Construct 3D models of organic molecules and understand their geometry.',
    type: 'molecular-building',
    difficulty: 'beginner',
    estimatedTime: '20 minutes',
    materials: ['Carbon atoms', 'Hydrogen atoms', 'Oxygen atoms', 'Bonds', 'VSEPR theory guide'],
    procedure: [
      'Select the molecule to build (methane, ethane, etc.)',
      'Identify the central atom',
      'Add appropriate number of bonds',
      'Attach atoms according to valency',
      'Adjust geometry based on VSEPR theory',
      'Observe bond angles and molecular shape'
    ],
    safetyNotes: ['Handle model pieces carefully', 'Keep workspace organized']
  },
  {
    id: 'crystallization',
    title: 'Salt Crystallization',
    description: 'Observe crystal formation and understand factors affecting crystal growth.',
    type: 'crystallization',
    difficulty: 'beginner',
    estimatedTime: '45 minutes',
    materials: ['Copper sulfate', 'Distilled water', 'Beaker', 'Stirring rod', 'Heat source'],
    procedure: [
      'Prepare saturated copper sulfate solution',
      'Heat the solution gently while stirring',
      'Allow solution to cool slowly',
      'Observe crystal formation',
      'Compare with rapid cooling',
      'Analyze crystal structure'
    ],
    safetyNotes: ['Handle hot solutions carefully', 'Use proper heating equipment', 'Avoid skin contact with chemicals']
  }
];

export const VirtualLab: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [experimentData, setExperimentData] = useState<any>({});
  const [showSettings, setShowSettings] = useState(false);

  // Titration simulation state
  const [titrationState, setTitrationState] = useState({
    volume: 0,
    pH: 1,
    colorChanged: false,
    endpoint: false
  });

  const handleStartExperiment = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setCurrentStep(0);
    setIsRunning(false);
    setExperimentData({});
    
    // Initialize experiment-specific state
    if (experiment.type === 'titration') {
      setTitrationState({
        volume: 0,
        pH: 1,
        colorChanged: false,
        endpoint: false
      });
    }
  };

  const handleNextStep = () => {
    if (selectedExperiment && currentStep < selectedExperiment.procedure.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsRunning(false);
    setExperimentData({});
    setTitrationState({
      volume: 0,
      pH: 1,
      colorChanged: false,
      endpoint: false
    });
  };

  // Titration simulation
  const addTitrant = (amount: number) => {
    if (selectedExperiment?.type === 'titration') {
      const newVolume = Math.min(titrationState.volume + amount, 50);
      const newPH = calculatePH(newVolume);
      const colorChanged = newPH > 8.2;
      const endpoint = newVolume >= 24.8 && newVolume <= 25.2;
      
      setTitrationState({
        volume: newVolume,
        pH: newPH,
        colorChanged,
        endpoint
      });
    }
  };

  const calculatePH = (volume: number): number => {
    // Simplified pH calculation for strong acid-strong base titration
    const initialMoles = 0.1 * 0.025; // 0.1 M × 25 mL
    const addedMoles = 0.1 * (volume / 1000); // 0.1 M × volume in L
    const totalVolume = 0.025 + (volume / 1000);
    
    if (addedMoles < initialMoles) {
      // Before equivalence point
      const excessAcid = (initialMoles - addedMoles) / totalVolume;
      return -Math.log10(excessAcid);
    } else if (addedMoles > initialMoles) {
      // After equivalence point
      const excessBase = (addedMoles - initialMoles) / totalVolume;
      return 14 + Math.log10(excessBase);
    } else {
      // At equivalence point
      return 7;
    }
  };

  const TitrationSimulator: React.FC = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 
                    rounded-xl p-6 border border-blue-200 dark:border-blue-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Beaker className="w-6 h-6 mr-2 text-blue-600" />
        Titration Simulator
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Visual Representation */}
        <div className="space-y-4">
          <div className="relative">
            {/* Burette */}
            <div className="w-8 h-40 bg-gray-300 dark:bg-gray-700 rounded-t-lg mx-auto relative">
              <div 
                className="absolute bottom-0 w-full bg-blue-500 rounded-t-lg transition-all duration-500"
                style={{ height: `${(50 - titrationState.volume) / 50 * 100}%` }}
              />
              <div className="absolute -right-12 top-1/2 text-sm text-gray-600 dark:text-gray-400">
                Burette
              </div>
            </div>
            
            {/* Conical Flask */}
            <div className="w-24 h-24 mx-auto mt-4 relative">
              <div className={`w-full h-full rounded-full border-4 border-gray-400 transition-all duration-500
                              ${titrationState.colorChanged ? 'bg-pink-200' : 'bg-red-100'}`}>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 dark:text-gray-400">
                  Flask
                </div>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => addTitrant(0.1)}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              +0.1 mL
            </button>
            <button
              onClick={() => addTitrant(1)}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              +1.0 mL
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Data Display */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Measurements</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Volume Added:</span>
                <span className="font-mono text-gray-900 dark:text-white">
                  {titrationState.volume.toFixed(1)} mL
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">pH:</span>
                <span className="font-mono text-gray-900 dark:text-white">
                  {titrationState.pH.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Indicator:</span>
                <span className={`font-semibold ${titrationState.colorChanged ? 'text-pink-600' : 'text-red-600'}`}>
                  {titrationState.colorChanged ? 'Pink' : 'Colorless'}
                </span>
              </div>
            </div>
          </div>
          
          {titrationState.endpoint && (
            <motion.div
              className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 
                         rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                🎉 Endpoint Reached!
              </h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                Concentration of unknown acid: ~0.1 M
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  const MolecularBuilder: React.FC = () => {
    const [selectedMolecule, setSelectedMolecule] = useState('methane');
    const [atoms, setAtoms] = useState<any[]>([]);
    
    const molecules = {
      methane: { formula: 'CH₄', atoms: [{ type: 'C', x: 0, y: 0 }, { type: 'H', x: 1, y: 0 }, { type: 'H', x: -1, y: 0 }, { type: 'H', x: 0, y: 1 }, { type: 'H', x: 0, y: -1 }] },
      water: { formula: 'H₂O', atoms: [{ type: 'O', x: 0, y: 0 }, { type: 'H', x: 1, y: 1 }, { type: 'H', x: -1, y: 1 }] },
      ammonia: { formula: 'NH₃', atoms: [{ type: 'N', x: 0, y: 0 }, { type: 'H', x: 1, y: 0 }, { type: 'H', x: -0.5, y: 1 }, { type: 'H', x: -0.5, y: -1 }] }
    };
    
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 
                      rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Molecular Model Builder
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Molecule:
            </label>
            <select
              value={selectedMolecule}
              onChange={(e) => setSelectedMolecule(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="methane">Methane (CH₄)</option>
              <option value="water">Water (H₂O)</option>
              <option value="ammonia">Ammonia (NH₃)</option>
            </select>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border min-h-48 relative">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              3D Model: {molecules[selectedMolecule as keyof typeof molecules].formula}
            </h4>
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="relative w-32 h-32">
                {molecules[selectedMolecule as keyof typeof molecules].atoms.map((atom, index) => (
                  <motion.div
                    key={index}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                               ${atom.type === 'C' ? 'bg-gray-800' : 
                                 atom.type === 'H' ? 'bg-blue-500' : 
                                 atom.type === 'O' ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{
                      left: `${50 + atom.x * 20}%`,
                      top: `${50 + atom.y * 20}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {atom.type}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 shadow-xl">
            <Beaker className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
            Virtual Chemistry Lab
          </h2>
        </div>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600
                     text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </button>
      </div>

      {!selectedExperiment ? (
        /* Experiment Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <motion.div
              key={experiment.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700
                         hover:shadow-xl transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => handleStartExperiment(experiment)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  experiment.type === 'titration' ? 'bg-blue-100 text-blue-600' :
                  experiment.type === 'molecular-building' ? 'bg-purple-100 text-purple-600' :
                  experiment.type === 'crystallization' ? 'bg-green-100 text-green-600' :
                  'bg-gray-100 text-gray-600'
                }`}>
                  {experiment.type === 'titration' ? <Droplet className="w-6 h-6" /> :
                   experiment.type === 'molecular-building' ? <Zap className="w-6 h-6" /> :
                   <Thermometer className="w-6 h-6" />}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  experiment.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                  experiment.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {experiment.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {experiment.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {experiment.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>⏱️ {experiment.estimatedTime}</span>
                <span className="capitalize">{experiment.type.replace('-', ' ')}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Experiment Interface */
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedExperiment.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedExperiment.description}
              </p>
            </div>
            <button
              onClick={() => setSelectedExperiment(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Experiments
            </button>
          </div>

          {/* Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep + 1} of {selectedExperiment.procedure.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(((currentStep + 1) / selectedExperiment.procedure.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / selectedExperiment.procedure.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Current Step:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {selectedExperiment.procedure[currentStep]}
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={handleNextStep}
                disabled={currentStep === selectedExperiment.procedure.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                <RotateCcw className="w-4 h-4 mr-2 inline" />
                Reset
              </button>
            </div>
          </div>

          {/* Experiment Simulator */}
          {selectedExperiment.type === 'titration' && <TitrationSimulator />}
          {selectedExperiment.type === 'molecular-building' && <MolecularBuilder />}

          {/* Materials and Safety */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Materials Needed
              </h4>
              <ul className="space-y-2">
                {selectedExperiment.materials.map((material, index) => (
                  <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
              <h4 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-3">
                ⚠️ Safety Notes
              </h4>
              <ul className="space-y-2">
                {selectedExperiment.safetyNotes.map((note, index) => (
                  <li key={index} className="flex items-center text-red-700 dark:text-red-400">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};