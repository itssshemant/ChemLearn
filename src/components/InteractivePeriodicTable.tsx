import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Info, Atom, Zap, Thermometer } from 'lucide-react';
import { completeElements as allElements, Element } from '../data/completeElements';

interface InteractivePeriodicTableProps {
  searchQuery?: string;
  onElementSelect?: (element: Element) => void;
}

export const InteractivePeriodicTable: React.FC<InteractivePeriodicTableProps> = ({ 
  searchQuery = '', 
  onElementSelect 
}) => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    block: 'all',
    phase: 'all',
    period: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Create periodic table layout
  const createPeriodicLayout = () => {
    const layout = Array(10).fill(null).map(() => Array(18).fill(null));
    
    allElements.forEach(element => {
      let row = element.period - 1;
      let col = element.group - 1;
      
      // Handle lanthanides and actinides
      if (element.atomicNumber >= 57 && element.atomicNumber <= 71) {
        row = 8; // Lanthanides row
        col = element.atomicNumber - 57;
      } else if (element.atomicNumber >= 89 && element.atomicNumber <= 103) {
        row = 9; // Actinides row
        col = element.atomicNumber - 89;
      }
      
      // Adjust for proper positioning
      if (element.period >= 2 && element.group >= 13) {
        col = element.group - 1;
      } else if (element.period >= 4 && element.group >= 3 && element.group <= 12) {
        col = element.group - 1;
      }
      
      if (row >= 0 && row < layout.length && col >= 0 && col < 18) {
        layout[row][col] = element;
      }
    });
    
    return layout;
  };

  const periodicLayout = createPeriodicLayout();

  const getCategoryColor = (category: string) => {
    const colors = {
      'alkali metal': 'from-purple-500 to-purple-700',
      'alkaline earth metal': 'from-green-500 to-green-700',
      'transition metal': 'from-blue-500 to-blue-700',
      'post-transition metal': 'from-gray-500 to-gray-700',
      'metalloid': 'from-yellow-500 to-yellow-700',
      'nonmetal': 'from-red-500 to-red-700',
      'halogen': 'from-orange-500 to-orange-700',
      'noble gas': 'from-cyan-500 to-cyan-700',
      'lanthanide': 'from-pink-500 to-pink-700',
      'actinide': 'from-indigo-500 to-indigo-700'
    };
    return colors[category as keyof typeof colors] || 'from-gray-400 to-gray-600';
  };

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    onElementSelect?.(element);
  };

  const ElementCard: React.FC<{ element: Element; position: { row: number; col: number } }> = ({ 
    element, 
    position 
  }) => (
    <motion.div
      className={`relative cursor-pointer rounded-lg p-2 text-center transition-all duration-300
                  bg-gradient-to-br ${getCategoryColor(element.category)}
                  hover:scale-110 hover:z-20 hover:shadow-2xl
                  ${selectedElement?.atomicNumber === element.atomicNumber ? 'ring-4 ring-cyan-400' : ''}
                  text-white font-bold shadow-lg border border-white/20`}
      onClick={() => handleElementClick(element)}
      onMouseEnter={() => setHoveredElement(element)}
      onMouseLeave={() => setHoveredElement(null)}
      whileHover={{ scale: 1.1, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: (position.row + position.col) * 0.01 }}
    >
      <div className="text-xs opacity-80 mb-1">{element.atomicNumber}</div>
      <div className="text-lg md:text-xl font-bold mb-1">{element.symbol}</div>
      <div className="text-xs opacity-90 truncate">{element.name}</div>
      <div className="text-xs opacity-70 mt-1">{element.atomicMass.toFixed(1)}</div>
      
      {/* Hover tooltip */}
      <AnimatePresence>
        {hoveredElement?.atomicNumber === element.atomicNumber && (
          <motion.div
            className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-30
                       bg-gray-900 text-white p-3 rounded-lg shadow-xl min-w-max
                       border border-gray-700"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <div className="text-sm font-bold">{element.name}</div>
            <div className="text-xs text-gray-300">
              Atomic Number: {element.atomicNumber}
            </div>
            <div className="text-xs text-gray-300">
              Mass: {element.atomicMass.toFixed(3)}
            </div>
            <div className="text-xs text-gray-300 capitalize">
              {element.category}
            </div>
            <div className="text-xs text-gray-300 capitalize">
              Phase: {element.phase}
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                            border-4 border-transparent border-t-gray-900"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">
            <Atom className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Interactive Periodic Table
          </h2>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600
                     text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300
                     shadow-lg hover:shadow-xl"
        >
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="mb-6 p-4 bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl border border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600"
                >
                  <option value="all">All Categories</option>
                  <option value="alkali metal">Alkali Metals</option>
                  <option value="alkaline earth metal">Alkaline Earth</option>
                  <option value="transition metal">Transition Metals</option>
                  <option value="nonmetal">Nonmetals</option>
                  <option value="noble gas">Noble Gases</option>
                  <option value="halogen">Halogens</option>
                  <option value="metalloid">Metalloids</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Block
                </label>
                <select
                  value={filters.block}
                  onChange={(e) => setFilters(prev => ({ ...prev, block: e.target.value }))}
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600"
                >
                  <option value="all">All Blocks</option>
                  <option value="s">S-block</option>
                  <option value="p">P-block</option>
                  <option value="d">D-block</option>
                  <option value="f">F-block</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phase
                </label>
                <select
                  value={filters.phase}
                  onChange={(e) => setFilters(prev => ({ ...prev, phase: e.target.value }))}
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600"
                >
                  <option value="all">All Phases</option>
                  <option value="solid">Solid</option>
                  <option value="liquid">Liquid</option>
                  <option value="gas">Gas</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Period
                </label>
                <select
                  value={filters.period}
                  onChange={(e) => setFilters(prev => ({ ...prev, period: e.target.value }))}
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600"
                >
                  <option value="all">All Periods</option>
                  {[1, 2, 3, 4, 5, 6, 7].map(period => (
                    <option key={period} value={period}>Period {period}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Periodic Table Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-max space-y-1">
          {periodicLayout.map((period, periodIndex) => (
            <div key={periodIndex} className="flex space-x-1">
              {period.map((element, colIndex) => {
                if (!element) {
                  return (
                    <div
                      key={`${periodIndex}-${colIndex}`}
                      className="w-16 h-20 opacity-0 pointer-events-none"
                    />
                  );
                }
                
                // Apply filters
                const matchesFilters = 
                  (filters.category === 'all' || element.category === filters.category) &&
                  (filters.block === 'all' || element.block === filters.block) &&
                  (filters.phase === 'all' || element.phase === filters.phase) &&
                  (filters.period === 'all' || element.period.toString() === filters.period);
                
                if (!matchesFilters) {
                  return (
                    <div
                      key={element.atomicNumber}
                      className="w-16 h-20 opacity-20 pointer-events-none bg-gray-400 rounded-lg"
                    />
                  );
                }
                
                return (
                  <div key={element.atomicNumber} className="w-16 h-20">
                    <ElementCard 
                      element={element} 
                      position={{ row: periodIndex, col: colIndex }}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <motion.div
        className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {[
          { category: 'alkali metal', name: 'Alkali Metals', color: 'from-purple-500 to-purple-700' },
          { category: 'alkaline earth metal', name: 'Alkaline Earth', color: 'from-green-500 to-green-700' },
          { category: 'transition metal', name: 'Transition Metals', color: 'from-blue-500 to-blue-700' },
          { category: 'nonmetal', name: 'Nonmetals', color: 'from-red-500 to-red-700' },
          { category: 'noble gas', name: 'Noble Gases', color: 'from-cyan-500 to-cyan-700' },
          { category: 'halogen', name: 'Halogens', color: 'from-orange-500 to-orange-700' },
          { category: 'metalloid', name: 'Metalloids', color: 'from-yellow-500 to-yellow-700' },
          { category: 'post-transition metal', name: 'Post-transition', color: 'from-gray-500 to-gray-700' },
          { category: 'lanthanide', name: 'Lanthanides', color: 'from-pink-500 to-pink-700' },
          { category: 'actinide', name: 'Actinides', color: 'from-indigo-500 to-indigo-700' }
        ].map(({ category, name, color }) => (
          <div
            key={category}
            className="flex items-center space-x-2 p-2 bg-white/10 dark:bg-black/20 
                       backdrop-blur-lg rounded-lg border border-white/20"
          >
            <div className={`w-4 h-4 rounded bg-gradient-to-r ${color}`}></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Element Details Modal */}
      <AnimatePresence>
        {selectedElement && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedElement(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`text-white text-4xl font-bold rounded-xl p-4 shadow-xl
                                    bg-gradient-to-br ${getCategoryColor(selectedElement.category)}`}>
                      {selectedElement.symbol}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {selectedElement.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 capitalize text-lg">
                        {selectedElement.category}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedElement(null)}
                    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
                               dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Basic Properties */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 
                                    rounded-xl p-4 border border-cyan-200 dark:border-cyan-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Atom className="w-5 h-5 mr-2 text-cyan-600" />
                        Basic Properties
                      </h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Atomic Number:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {selectedElement.atomicNumber}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Atomic Mass:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {selectedElement.atomicMass.toFixed(3)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Period:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {selectedElement.period}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Group:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {selectedElement.group}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Block:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white uppercase">
                            {selectedElement.block}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-600 dark:text-gray-400">Phase:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white capitalize">
                            {selectedElement.phase}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Physical Properties */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 
                                    rounded-xl p-4 border border-red-200 dark:border-red-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                        <Thermometer className="w-5 h-5 mr-2 text-red-600" />
                        Physical Properties
                      </h3>
                      <div className="space-y-2 text-sm">
                        {selectedElement.meltingPoint && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Melting Point:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {selectedElement.meltingPoint}°C
                            </span>
                          </div>
                        )}
                        {selectedElement.boilingPoint && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Boiling Point:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {selectedElement.boilingPoint}°C
                            </span>
                          </div>
                        )}
                        {selectedElement.density && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Density:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {selectedElement.density} g/cm³
                            </span>
                          </div>
                        )}
                        {selectedElement.electronegativity && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Electronegativity:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {selectedElement.electronegativity}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Uses and Applications */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 
                                    rounded-xl p-4 border border-green-200 dark:border-green-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                        Common Uses
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {selectedElement.uses.map((use, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">{use}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 
                                    rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                        Fun Facts
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {selectedElement.funFacts.map((fact, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Electron Configuration */}
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 
                                rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-blue-600" />
                    Electron Configuration
                  </h3>
                  <div className="font-mono text-lg bg-white dark:bg-gray-800 p-3 rounded-lg border">
                    {selectedElement.electronConfiguration}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 
                                rounded-xl p-4 border border-gray-200 dark:border-gray-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedElement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};