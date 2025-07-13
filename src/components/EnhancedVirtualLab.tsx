import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Beaker, Thermometer, Droplet, Zap, Play, Pause, RotateCcw, Settings, Clock } from 'lucide-react';

interface Experiment {
  id: string;
  title: string;
  description: string;
  type: 'titration' | 'reaction' | 'molecular-building' | 'crystallization' | 'ph-meter' | 'spectroscopy';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  materials: string[];
  procedure: string[];
  safetyNotes: string[];
  learningObjectives: string[];
  jeeNeetRelevance: string;
}

const experiments: Experiment[] = [
  {
    id: 'acid-base-titration',
    title: 'Acid-Base Titration Simulation',
    description: 'Determine the concentration of an unknown acid using standardized NaOH solution with real-time pH monitoring.',
    type: 'titration',
    difficulty: 'intermediate',
    estimatedTime: '30 minutes',
    materials: ['0.1 M NaOH solution', 'Unknown HCl solution', 'Phenolphthalein indicator', 'Burette', 'Conical flask', 'pH meter'],
    procedure: [
      'Fill the burette with 0.1 M NaOH solution',
      'Pipette 25 mL of unknown acid into conical flask',
      'Add 2-3 drops of phenolphthalein indicator',
      'Record initial pH reading',
      'Titrate slowly while monitoring pH changes',
      'Note the equivalence point and endpoint',
      'Record the volume of NaOH used',
      'Calculate the concentration of unknown acid'
    ],
    safetyNotes: ['Wear safety goggles', 'Handle acids and bases carefully', 'Wash hands after experiment', 'Use fume hood if available'],
    learningObjectives: [
      'Understand acid-base neutralization',
      'Learn to use pH indicators',
      'Practice stoichiometric calculations',
      'Interpret titration curves'
    ],
    jeeNeetRelevance: 'Essential for understanding acid-base equilibrium, pH calculations, and quantitative analysis - frequently tested in JEE/NEET'
  },
  {
    id: 'molecular-models',
    title: 'Interactive Molecular Model Builder',
    description: 'Construct 3D models of organic molecules and understand their geometry using VSEPR theory.',
    type: 'molecular-building',
    difficulty: 'beginner',
    estimatedTime: '20 minutes',
    materials: ['Virtual atoms (C, H, O, N)', 'Bond connectors', 'VSEPR theory guide', 'Molecular geometry templates'],
    procedure: [
      'Select the molecule to build (methane, ethane, water, ammonia)',
      'Identify the central atom and its hybridization',
      'Add appropriate number of bonds based on valency',
      'Attach atoms according to VSEPR predictions',
      'Adjust geometry to minimize electron repulsion',
      'Observe bond angles and molecular shape',
      'Compare with theoretical predictions'
    ],
    safetyNotes: ['Virtual experiment - no physical safety concerns', 'Take breaks to avoid eye strain'],
    learningObjectives: [
      'Understand VSEPR theory',
      'Learn molecular geometries',
      'Visualize 3D molecular structures',
      'Predict bond angles'
    ],
    jeeNeetRelevance: 'Critical for understanding chemical bonding, molecular geometry, and hybridization - major topic in JEE/NEET organic chemistry'
  },
  {
    id: 'crystallization-simulation',
    title: 'Salt Crystallization Dynamics',
    description: 'Observe crystal formation and understand factors affecting crystal growth with real-time visualization.',
    type: 'crystallization',
    difficulty: 'beginner',
    estimatedTime: '45 minutes',
    materials: ['Copper sulfate solution', 'Distilled water', 'Virtual beaker', 'Stirring rod', 'Heat source', 'Cooling system'],
    procedure: [
      'Prepare saturated copper sulfate solution',
      'Heat the solution gently while stirring',
      'Monitor temperature and concentration',
      'Allow solution to cool slowly (controlled cooling)',
      'Observe crystal nucleation and growth',
      'Compare with rapid cooling results',
      'Analyze crystal structure and size distribution'
    ],
    safetyNotes: ['Handle hot solutions carefully', 'Use proper heating equipment', 'Avoid skin contact with chemicals'],
    learningObjectives: [
      'Understand crystallization process',
      'Learn about nucleation and growth',
      'Observe effect of cooling rate',
      'Study crystal structures'
    ],
    jeeNeetRelevance: 'Important for understanding solid state chemistry, crystal structures, and purification techniques'
  },
  {
    id: 'ph-meter-calibration',
    title: 'pH Meter Calibration and Measurement',
    description: 'Learn to calibrate and use pH meters for accurate measurement of solution acidity.',
    type: 'ph-meter',
    difficulty: 'intermediate',
    estimatedTime: '25 minutes',
    materials: ['pH meter', 'Buffer solutions (pH 4, 7, 10)', 'Unknown solutions', 'Distilled water', 'Tissue paper'],
    procedure: [
      'Calibrate pH meter using standard buffer solutions',
      'Rinse electrode with distilled water',
      'Measure pH of buffer solutions to verify calibration',
      'Test unknown solutions and record pH values',
      'Plot pH vs concentration graphs',
      'Analyze the relationship between pH and [H⁺]'
    ],
    safetyNotes: ['Handle pH meter electrode carefully', 'Clean electrode between measurements', 'Store electrode properly'],
    learningObjectives: [
      'Learn pH meter operation',
      'Understand pH scale',
      'Practice accurate measurements',
      'Interpret pH data'
    ],
    jeeNeetRelevance: 'Fundamental for understanding pH, pOH, and acid-base equilibrium calculations'
  },
  {
    id: 'spectroscopy-analysis',
    title: 'UV-Vis Spectroscopy Analysis',
    description: 'Analyze the absorption spectra of different compounds and determine concentrations using Beer\'s law.',
    type: 'spectroscopy',
    difficulty: 'advanced',
    estimatedTime: '40 minutes',
    materials: ['UV-Vis spectrophotometer', 'Sample solutions', 'Cuvettes', 'Reference standards', 'Computer interface'],
    procedure: [
      'Prepare standard solutions of known concentrations',
      'Set up the spectrophotometer',
      'Record absorption spectra for standards',
      'Create calibration curve using Beer\'s law',
      'Analyze unknown sample concentrations',
      'Identify compounds based on absorption patterns'
    ],
    safetyNotes: ['Handle cuvettes carefully', 'Avoid UV exposure', 'Clean cuvettes between samples'],
    learningObjectives: [
      'Understand Beer\'s law',
      'Learn spectroscopic analysis',
      'Practice quantitative analysis',
      'Interpret absorption spectra'
    ],
    jeeNeetRelevance: 'Important for understanding electromagnetic radiation, electronic transitions, and analytical chemistry'
  }
];

export const EnhancedVirtualLab: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [experimentData, setExperimentData] = useState<any>({});
  const [showSettings, setShowSettings] = useState(false);

  // Enhanced Titration simulation state
  const [titrationState, setTitrationState] = useState({
    volume: 0,
    pH: 1,
    colorChanged: false,
    endpoint: false,
    equivalencePoint: false,
    titrationCurve: [] as { volume: number; pH: number }[]
  });

  // Molecular builder state
  const [molecularState, setMolecularState] = useState({
    selectedMolecule: 'methane',
    atoms: [] as any[],
    bonds: [] as any[],
    geometry: 'tetrahedral',
    bondAngles: [] as number[]
  });

  // Crystallization state
  const [crystallizationState, setCrystallizationState] = useState({
    temperature: 25,
    concentration: 0.5,
    coolingRate: 'slow',
    crystalSize: 0,
    nucleationSites: 0,
    crystalStructure: 'cubic'
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
        endpoint: false,
        equivalencePoint: false,
        titrationCurve: []
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
      endpoint: false,
      equivalencePoint: false,
      titrationCurve: []
    });
    setMolecularState({
      selectedMolecule: 'methane',
      atoms: [],
      bonds: [],
      geometry: 'tetrahedral',
      bondAngles: []
    });
    setCrystallizationState({
      temperature: 25,
      concentration: 0.5,
      coolingRate: 'slow',
      crystalSize: 0,
      nucleationSites: 0,
      crystalStructure: 'cubic'
    });
  };

  // Enhanced titration simulation
  const addTitrant = (amount: number) => {
    if (selectedExperiment?.type === 'titration') {
      const newVolume = Math.min(titrationState.volume + amount, 50);
      const newPH = calculatePH(newVolume);
      const colorChanged = newPH > 8.2;
      const equivalencePoint = newVolume >= 24.8 && newVolume <= 25.2;
      const endpoint = newVolume >= 24.9 && newVolume <= 25.1;
      
      const newCurvePoint = { volume: newVolume, pH: newPH };
      const newCurve = [...titrationState.titrationCurve, newCurvePoint];
      
      setTitrationState({
        volume: newVolume,
        pH: newPH,
        colorChanged,
        endpoint,
        equivalencePoint,
        titrationCurve: newCurve
      });
    }
  };

  const calculatePH = (volume: number): number => {
    // Enhanced pH calculation for strong acid-strong base titration
    const initialMoles = 0.1 * 0.025; // 0.1 M × 25 mL
    const addedMoles = 0.1 * (volume / 1000); // 0.1 M × volume in L
    const totalVolume = 0.025 + (volume / 1000);
    
    if (addedMoles < initialMoles) {
      // Before equivalence point
      const excessAcid = (initialMoles - addedMoles) / totalVolume;
      return Math.max(-Math.log10(excessAcid), 0);
    } else if (addedMoles > initialMoles) {
      // After equivalence point
      const excessBase = (addedMoles - initialMoles) / totalVolume;
      const pOH = -Math.log10(excessBase);
      return Math.min(14 - pOH, 14);
    } else {
      // At equivalence point
      return 7;
    }
  };

  // Enhanced Titration Simulator Component
  const TitrationSimulator: React.FC = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 
                    rounded-xl p-6 border border-blue-200 dark:border-blue-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <Beaker className="w-6 h-6 mr-2 text-blue-600" />
        Interactive Titration Simulator
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual Representation */}
        <div className="space-y-4">
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border">
            {/* Enhanced Burette */}
            <div className="w-12 h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg mx-auto relative border-2 border-gray-400">
              <div 
                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                style={{ height: `${(50 - titrationState.volume) / 50 * 100}%` }}
              />
              <div className="absolute -right-16 top-1/2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                NaOH Solution
              </div>
              <div className="absolute -left-16 top-1/4 text-xs text-gray-500 dark:text-gray-500">
                {(50 - titrationState.volume).toFixed(1)} mL
              </div>
            </div>
            
            {/* Enhanced Conical Flask */}
            <div className="w-32 h-32 mx-auto mt-6 relative">
              <div className={`w-full h-full rounded-full border-4 border-gray-400 transition-all duration-500 relative overflow-hidden
                              ${titrationState.colorChanged ? 'bg-gradient-to-b from-pink-200 to-pink-300' : 'bg-gradient-to-b from-red-100 to-red-200'}`}>
                {/* Liquid level animation */}
                <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-t from-current to-transparent opacity-70"></div>
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 dark:text-gray-400 font-medium">
                  HCl + Indicator
                </div>
              </div>
              {/* pH indicator */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs">
                pH: {titrationState.pH.toFixed(2)}
              </div>
            </div>
          </div>
          
          {/* Enhanced Controls */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Titrant Addition</h4>
            <div className="flex justify-center space-x-2 mb-4">
              <button
                onClick={() => addTitrant(0.1)}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                +0.1 mL
              </button>
              <button
                onClick={() => addTitrant(0.5)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                +0.5 mL
              </button>
              <button
                onClick={() => addTitrant(1)}
                className="px-3 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
              >
                +1.0 mL
              </button>
            </div>
            <button
              onClick={handleReset}
              className="w-full px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Reset Experiment
            </button>
          </div>
        </div>
        
        {/* Data Display */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Real-time Measurements</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-600 dark:text-gray-400">Volume Added:</span>
                <span className="font-mono text-gray-900 dark:text-white font-bold">
                  {titrationState.volume.toFixed(1)} mL
                </span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-600 dark:text-gray-400">pH:</span>
                <span className="font-mono text-gray-900 dark:text-white font-bold">
                  {titrationState.pH.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-600 dark:text-gray-400">Indicator Color:</span>
                <span className={`font-semibold ${titrationState.colorChanged ? 'text-pink-600' : 'text-red-600'}`}>
                  {titrationState.colorChanged ? 'Pink' : 'Colorless'}
                </span>
              </div>
              <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className={`font-semibold ${
                  titrationState.endpoint ? 'text-green-600' : 
                  titrationState.equivalencePoint ? 'text-yellow-600' : 'text-blue-600'
                }`}>
                  {titrationState.endpoint ? 'Endpoint Reached' : 
                   titrationState.equivalencePoint ? 'Near Equivalence' : 'In Progress'}
                </span>
              </div>
            </div>
          </div>

          {/* Calculations */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Calculations</h4>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                <div className="text-gray-600 dark:text-gray-400 mb-1">Moles of NaOH added:</div>
                <div className="font-mono text-gray-900 dark:text-white">
                  {(0.1 * titrationState.volume / 1000).toExponential(3)} mol
                </div>
              </div>
              {titrationState.endpoint && (
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border border-green-200 dark:border-green-800">
                  <div className="text-green-800 dark:text-green-300 mb-1 font-medium">Concentration of HCl:</div>
                  <div className="font-mono text-green-900 dark:text-green-200 font-bold">
                    ~0.100 M
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Titration Curve */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Titration Curve</h4>
            <div className="h-48 bg-gray-50 dark:bg-gray-700 rounded border relative">
              {/* Simple curve visualization */}
              <div className="absolute inset-2">
                <div className="w-full h-full relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 text-xs text-gray-500">pH 14</div>
                  <div className="absolute left-0 top-1/2 text-xs text-gray-500">pH 7</div>
                  <div className="absolute left-0 bottom-0 text-xs text-gray-500">pH 0</div>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-0 text-xs text-gray-500">0 mL</div>
                  <div className="absolute bottom-0 right-0 text-xs text-gray-500">50 mL</div>
                  
                  {/* Plot points */}
                  {titrationState.titrationCurve.map((point, index) => (
                    <div
                      key={index}
                      className="absolute w-2 h-2 bg-blue-500 rounded-full"
                      style={{
                        left: `${(point.volume / 50) * 100}%`,
                        bottom: `${(point.pH / 14) * 100}%`,
                        transform: 'translate(-50%, 50%)'
                      }}
                    />
                  ))}
                  
                  {/* Equivalence point marker */}
                  {titrationState.equivalencePoint && (
                    <div
                      className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                      style={{
                        left: '50%',
                        bottom: '50%',
                        transform: 'translate(-50%, 50%)'
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          {titrationState.endpoint && (
            <motion.div
              className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 
                         border border-green-300 dark:border-green-700 rounded-lg p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2 flex items-center">
                🎉 Titration Complete!
              </h4>
              <div className="text-sm text-green-700 dark:text-green-400 space-y-1">
                <p>Endpoint volume: {titrationState.volume.toFixed(1)} mL</p>
                <p>Calculated concentration: ~0.100 M</p>
                <p>Percentage error: &lt; 1%</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );

  // Enhanced Molecular Builder Component
  const MolecularBuilder: React.FC = () => {
    const [selectedMolecule, setSelectedMolecule] = useState('methane');
    const [rotationX, setRotationX] = useState(0);
    const [rotationY, setRotationY] = useState(0);
    
    const molecules = {
      methane: { 
        formula: 'CH₄', 
        geometry: 'Tetrahedral',
        bondAngle: '109.5°',
        hybridization: 'sp³',
        atoms: [
          { type: 'C', x: 0, y: 0, z: 0, color: 'bg-gray-800' },
          { type: 'H', x: 1, y: 1, z: 1, color: 'bg-blue-500' },
          { type: 'H', x: -1, y: -1, z: 1, color: 'bg-blue-500' },
          { type: 'H', x: -1, y: 1, z: -1, color: 'bg-blue-500' },
          { type: 'H', x: 1, y: -1, z: -1, color: 'bg-blue-500' }
        ]
      },
      water: { 
        formula: 'H₂O', 
        geometry: 'Bent',
        bondAngle: '104.5°',
        hybridization: 'sp³',
        atoms: [
          { type: 'O', x: 0, y: 0, z: 0, color: 'bg-red-500' },
          { type: 'H', x: 1, y: 1, z: 0, color: 'bg-blue-500' },
          { type: 'H', x: -1, y: 1, z: 0, color: 'bg-blue-500' }
        ]
      },
      ammonia: { 
        formula: 'NH₃', 
        geometry: 'Trigonal Pyramidal',
        bondAngle: '107°',
        hybridization: 'sp³',
        atoms: [
          { type: 'N', x: 0, y: 0, z: 0, color: 'bg-green-500' },
          { type: 'H', x: 1, y: 0, z: 0, color: 'bg-blue-500' },
          { type: 'H', x: -0.5, y: 1, z: 0, color: 'bg-blue-500' },
          { type: 'H', x: -0.5, y: -1, z: 0, color: 'bg-blue-500' }
        ]
      },
      ethene: {
        formula: 'C₂H₄',
        geometry: 'Planar',
        bondAngle: '120°',
        hybridization: 'sp²',
        atoms: [
          { type: 'C', x: -0.5, y: 0, z: 0, color: 'bg-gray-800' },
          { type: 'C', x: 0.5, y: 0, z: 0, color: 'bg-gray-800' },
          { type: 'H', x: -1, y: 1, z: 0, color: 'bg-blue-500' },
          { type: 'H', x: -1, y: -1, z: 0, color: 'bg-blue-500' },
          { type: 'H', x: 1, y: 1, z: 0, color: 'bg-blue-500' },
          { type: 'H', x: 1, y: -1, z: 0, color: 'bg-blue-500' }
        ]
      }
    };
    
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 
                      rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <Atom className="w-6 h-6 mr-2 text-purple-600" />
          3D Molecular Model Builder
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Molecule:
              </label>
              <select
                value={selectedMolecule}
                onChange={(e) => setSelectedMolecule(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="methane">Methane (CH₄)</option>
                <option value="water">Water (H₂O)</option>
                <option value="ammonia">Ammonia (NH₃)</option>
                <option value="ethene">Ethene (C₂H₄)</option>
              </select>
            </div>

            {/* Molecular Properties */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Molecular Properties</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Formula:</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-white">
                    {molecules[selectedMolecule as keyof typeof molecules].formula}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Geometry:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {molecules[selectedMolecule as keyof typeof molecules].geometry}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Bond Angle:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {molecules[selectedMolecule as keyof typeof molecules].bondAngle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Hybridization:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {molecules[selectedMolecule as keyof typeof molecules].hybridization}
                  </span>
                </div>
              </div>
            </div>

            {/* Rotation Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">3D Controls</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Rotate X: {rotationX}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotationX}
                    onChange={(e) => setRotationX(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Rotate Y: {rotationY}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={rotationY}
                    onChange={(e) => setRotationY(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <button
                  onClick={() => {
                    setRotationX(0);
                    setRotationY(0);
                  }}
                  className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Reset View
                </button>
              </div>
            </div>
          </div>
          
          {/* 3D Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border min-h-96 relative overflow-hidden">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
              3D Model: {molecules[selectedMolecule as keyof typeof molecules].formula}
            </h4>
            <div 
              className="absolute inset-4 flex items-center justify-center"
              style={{
                transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="relative w-48 h-48">
                {molecules[selectedMolecule as keyof typeof molecules].atoms.map((atom, index) => (
                  <motion.div
                    key={index}
                    className={`absolute w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm
                               ${atom.color} shadow-lg border-2 border-white`}
                    style={{
                      left: `${50 + atom.x * 25}%`,
                      top: `${50 + atom.y * 25}%`,
                      transform: `translate(-50%, -50%) translateZ(${atom.z * 20}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {atom.type}
                  </motion.div>
                ))}
                
                {/* Bonds visualization */}
                {selectedMolecule === 'methane' && (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={`bond-${i}`}
                        className="absolute w-0.5 h-8 bg-gray-400"
                        style={{
                          left: '50%',
                          top: '50%',
                          transformOrigin: 'bottom',
                          transform: `translate(-50%, -100%) rotateZ(${i * 90}deg) rotateX(70deg)`
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-gray-100 dark:bg-gray-700 rounded p-2 text-xs">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
                <span>Carbon</span>
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Hydrogen</span>
              </div>
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Oxygen</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Nitrogen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Crystallization Simulator
  const CrystallizationSimulator: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);

    const startCrystallization = () => {
      setIsRunning(true);
      setProgress(0);
      
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsRunning(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    };

    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 
                      rounded-xl p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
          <FlaskConical className="w-6 h-6 mr-2 text-green-600" />
          Crystal Growth Simulation
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Experimental Parameters</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Temperature: {crystallizationState.temperature}°C
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={crystallizationState.temperature}
                    onChange={(e) => setCrystallizationState(prev => ({ 
                      ...prev, 
                      temperature: parseInt(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Concentration: {crystallizationState.concentration} M
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={crystallizationState.concentration}
                    onChange={(e) => setCrystallizationState(prev => ({ 
                      ...prev, 
                      concentration: parseFloat(e.target.value) 
                    }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Cooling Rate:
                  </label>
                  <select
                    value={crystallizationState.coolingRate}
                    onChange={(e) => setCrystallizationState(prev => ({ 
                      ...prev, 
                      coolingRate: e.target.value 
                    }))}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="slow">Slow (1°C/min)</option>
                    <option value="medium">Medium (5°C/min)</option>
                    <option value="fast">Fast (10°C/min)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Crystal Properties</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Crystal Size:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {crystallizationState.coolingRate === 'slow' ? 'Large' : 
                     crystallizationState.coolingRate === 'medium' ? 'Medium' : 'Small'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Nucleation Sites:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {crystallizationState.coolingRate === 'slow' ? 'Few' : 
                     crystallizationState.coolingRate === 'medium' ? 'Moderate' : 'Many'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Crystal Quality:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {crystallizationState.coolingRate === 'slow' ? 'High' : 
                     crystallizationState.coolingRate === 'medium' ? 'Good' : 'Poor'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={startCrystallization}
              disabled={isRunning}
              className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 
                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isRunning ? 'Crystallization in Progress...' : 'Start Crystallization'}
            </button>
          </div>

          {/* Visualization */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Crystal Formation Visualization
            </h4>
            <div className="h-64 bg-gradient-to-b from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 
                            rounded border relative overflow-hidden">
              {/* Solution */}
              <div className="absolute inset-2 bg-gradient-to-b from-cyan-200 to-cyan-300 dark:from-cyan-800/50 dark:to-cyan-700/50 
                              rounded opacity-80">
                {/* Crystals */}
                {progress > 20 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className={`w-4 h-4 bg-blue-600 transform rotate-45 ${
                      crystallizationState.coolingRate === 'slow' ? 'animate-pulse' : 'animate-bounce'
                    }`}></div>
                  </div>
                )}
                {progress > 40 && (
                  <div className="absolute bottom-4 left-1/3 transform -translate-x-1/2">
                    <div className="w-3 h-3 bg-blue-700 transform rotate-45 animate-pulse"></div>
                  </div>
                )}
                {progress > 60 && (
                  <div className="absolute bottom-4 right-1/3 transform translate-x-1/2">
                    <div className="w-3 h-3 bg-blue-700 transform rotate-45 animate-pulse"></div>
                  </div>
                )}
                {progress > 80 && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-2 h-2 bg-blue-800 transform rotate-45 animate-pulse"></div>
                  </div>
                )}
              </div>
              
              {/* Progress indicator */}
              <div className="absolute bottom-2 left-2 right-2">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">
                  Progress: {progress}%
                </div>
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
            <Microscope className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Enhanced Virtual Chemistry Lab
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Interactive simulations with real-time data and analysis
            </p>
          </div>
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
        /* Enhanced Experiment Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiments.map((experiment) => (
            <motion.div
              key={experiment.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700
                         hover:shadow-xl transition-all duration-300 cursor-pointer group"
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={() => handleStartExperiment(experiment)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  experiment.type === 'titration' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30' :
                  experiment.type === 'molecular-building' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30' :
                  experiment.type === 'crystallization' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' :
                  experiment.type === 'ph-meter' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30' :
                  experiment.type === 'spectroscopy' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' :
                  'bg-gray-100 text-gray-600 dark:bg-gray-900/30'
                }`}>
                  {experiment.type === 'titration' ? <Droplet className="w-6 h-6" /> :
                   experiment.type === 'molecular-building' ? <Atom className="w-6 h-6" /> :
                   experiment.type === 'crystallization' ? <FlaskConical className="w-6 h-6" /> :
                   experiment.type === 'ph-meter' ? <Thermometer className="w-6 h-6" /> :
                   experiment.type === 'spectroscopy' ? <Zap className="w-6 h-6" /> :
                   <Beaker className="w-6 h-6" />}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  experiment.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  experiment.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {experiment.difficulty}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {experiment.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {experiment.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>⏱️ {experiment.estimatedTime}</span>
                  <span className="capitalize">{experiment.type.replace('-', ' ')}</span>
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  JEE/NEET: {experiment.jeeNeetRelevance.slice(0, 50)}...
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {experiment.materials.length} materials
                </div>
                <div className="text-blue-600 dark:text-blue-400 font-medium group-hover:translate-x-1 transition-transform">
                  Start Lab →
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Enhanced Experiment Interface */
        <div className="space-y-6">
          {/* Enhanced Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedExperiment.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {selectedExperiment.description}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedExperiment.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  selectedExperiment.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {selectedExperiment.difficulty}
                </span>
                <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{selectedExperiment.estimatedTime}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedExperiment(null)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Experiments
            </button>
          </div>

          {/* Enhanced Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Step {currentStep + 1} of {selectedExperiment.procedure.length}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {Math.round(((currentStep + 1) / selectedExperiment.procedure.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / selectedExperiment.procedure.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Current Step:
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              {selectedExperiment.procedure[currentStep]}
            </p>
            
            <div className="flex flex-wrap gap-3">
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

          {/* Enhanced Experiment Simulators */}
          {selectedExperiment.type === 'titration' && <TitrationSimulator />}
          {selectedExperiment.type === 'molecular-building' && <MolecularBuilder />}
          {selectedExperiment.type === 'crystallization' && <CrystallizationSimulator />}

          {/* Enhanced Materials and Safety */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-300 mb-3">
                🎯 Learning Objectives
              </h4>
              <ul className="space-y-2">
                {selectedExperiment.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-center text-green-700 dark:text-green-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* JEE/NEET Relevance */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 
                          rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
            <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center">
              📚 JEE/NEET Relevance
            </h4>
            <p className="text-yellow-700 dark:text-yellow-400 leading-relaxed">
              {selectedExperiment.jeeNeetRelevance}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};