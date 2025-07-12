import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Info, Atom, Zap, Thermometer, BookOpen } from 'lucide-react';
import { all118Elements as allElements, Element } from '../data/allElements118';

interface CompletePeriodicTableProps {
  searchQuery?: string;
  onElementSelect?: (element: Element) => void;
}

export const CompletePeriodicTable: React.FC<CompletePeriodicTableProps> = ({ 
  searchQuery = '', 
  onElementSelect 
}) => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    block: 'all',
    physicalState: 'all',
    period: 'all',
    academicLevel: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Create complete periodic table layout with proper positioning
  const createCompletePeriodicLayout = () => {
    // Initialize 10x18 grid (including lanthanides and actinides rows)
    const layout = Array(10).fill(null).map(() => Array(18).fill(null));
    
    allElements.forEach(element => {
      let row = element.period - 1;
      let col = element.group - 1;
      
      // Special positioning for lanthanides (57-71)
      if (element.atomicNumber >= 57 && element.atomicNumber <= 71) {
        row = 8; // Lanthanides row
        col = element.atomicNumber - 57;
      } 
      // Special positioning for actinides (89-103)
      else if (element.atomicNumber >= 89 && element.atomicNumber <= 103) {
        row = 9; // Actinides row
        col = element.atomicNumber - 89;
      }
      // Regular positioning for main group elements
      else {
        // Adjust column for proper group positioning
        if (element.period === 1) {
          // Period 1: H in group 1, He in group 18
          col = element.group === 1 ? 0 : 17;
        } else if (element.period >= 2 && element.period <= 3) {
          // Periods 2-3: s and p blocks
          if (element.group <= 2) {
            col = element.group - 1; // s-block
          } else {
            col = element.group - 1; // p-block (groups 13-18 → columns 12-17)
          }
        } else {
          // Periods 4-7: include d-block
          col = element.group - 1;
        }
      }
      
      // Ensure valid positioning
      if (row >= 0 && row < layout.length && col >= 0 && col < 18) {
        layout[row][col] = element;
      }
    });
    
    return layout;
  };

  const periodicLayout = createCompletePeriodicLayout();

  // Enhanced category colors with better contrast
  const getCategoryColor = (category: string) => {
    const colors = {
      'alkali metal': 'from-purple-600 to-purple-800 border-purple-400',
      'alkaline earth metal': 'from-green-600 to-green-800 border-green-400',
      'transition metal': 'from-blue-600 to-blue-800 border-blue-400',
      'post-transition metal': 'from-gray-600 to-gray-800 border-gray-400',
      'metalloid': 'from-yellow-600 to-yellow-800 border-yellow-400',
      'nonmetal': 'from-red-600 to-red-800 border-red-400',
      'halogen': 'from-orange-600 to-orange-800 border-orange-400',
      'noble gas': 'from-cyan-600 to-cyan-800 border-cyan-400',
      'lanthanide': 'from-pink-600 to-pink-800 border-pink-400',
      'actinide': 'from-indigo-600 to-indigo-800 border-indigo-400'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-700 border-gray-400';
  };

  // Filter elements based on search and filters
  const filteredElements = useMemo(() => {
    let elements = allElements;

    // Apply search filter
    if (searchQuery.trim()) {
      elements = elements.filter(element =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase())) ||
        element.jeeNeetImportance.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.category !== 'all') {
      elements = elements.filter(element => element.category === filters.category);
    }
    if (filters.block !== 'all') {
      elements = elements.filter(element => element.block === filters.block);
    }
    if (filters.physicalState !== 'all') {
      elements = elements.filter(element => element.physicalState === filters.physicalState);
    }
    if (filters.period !== 'all') {
      elements = elements.filter(element => element.period === parseInt(filters.period));
    }
    if (filters.academicLevel !== 'all') {
      elements = elements.filter(element => 
        element.academicLevel.some(level => level.toLowerCase().includes(filters.academicLevel.toLowerCase()))
      );
    }

    return elements;
  }, [searchQuery, filters]);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
    onElementSelect?.(element);
  };

  const ElementCard: React.FC<{ element: Element; position: { row: number; col: number } }> = ({ 
    element, 
    position 
  }) => {
    const isFiltered = filteredElements.includes(element);
    
    return (
      <motion.div
        className={`relative cursor-pointer rounded-lg p-1.5 sm:p-2 text-center transition-all duration-300
                    bg-gradient-to-br ${getCategoryColor(element.category)}
                    hover:scale-110 hover:z-20 hover:shadow-2xl
                    ${selectedElement?.atomicNumber === element.atomicNumber ? 'ring-4 ring-cyan-400 ring-opacity-70' : ''}
                    ${!isFiltered ? 'opacity-30 pointer-events-none' : ''}
                    text-white font-bold shadow-lg border-2 border-opacity-50
                    min-h-[60px] sm:min-h-[70px] md:min-h-[80px] flex flex-col justify-between`}
        onClick={() => isFiltered && handleElementClick(element)}
        onMouseEnter={() => isFiltered && setHoveredElement(element)}
        onMouseLeave={() => setHoveredElement(null)}
        whileHover={isFiltered ? { scale: 1.1, rotateY: 5 } : {}}
        whileTap={isFiltered ? { scale: 0.95 } : {}}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isFiltered ? 1 : 0.3, scale: 1 }}
        transition={{ duration: 0.3, delay: (position.row + position.col) * 0.01 }}
      >
        <div className="text-xs opacity-80 leading-tight">{element.atomicNumber}</div>
        <div className="text-sm sm:text-lg md:text-xl font-bold leading-tight">{element.symbol}</div>
        <div className="text-xs opacity-90 truncate leading-tight">{element.name}</div>
        <div className="text-xs opacity-70 leading-tight">{element.atomicMass.toFixed(1)}</div>
        
        {/* Enhanced hover tooltip */}
        <AnimatePresence>
          {hoveredElement?.atomicNumber === element.atomicNumber && (
            <motion.div
              className="absolute -top-32 left-1/2 transform -translate-x-1/2 z-30
                         bg-gray-900 text-white p-4 rounded-lg shadow-2xl min-w-max max-w-xs
                         border border-gray-700"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-sm font-bold mb-1">{element.name} ({element.symbol})</div>
              <div className="text-xs text-gray-300 space-y-1">
                <div>Atomic Number: {element.atomicNumber}</div>
                <div>Mass: {element.atomicMass.toFixed(3)} u</div>
                <div className="capitalize">Category: {element.category}</div>
                <div className="capitalize">State: {element.physicalState}</div>
                <div>Block: {element.block.toUpperCase()}</div>
                <div className="text-cyan-300 font-medium">
                  {element.academicLevel.join(', ')}
                </div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                              border-4 border-transparent border-t-gray-900"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-2 sm:p-4">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">
            <Atom className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Complete Periodic Table
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All 118 elements with detailed information
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full font-medium">
            {filteredElements.length} / 118 elements
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600
                       text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300
                       shadow-lg hover:shadow-xl"
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Enhanced Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="mb-6 p-4 bg-white/10 dark:bg-black/20 backdrop-blur-lg rounded-xl border border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="alkali metal">Alkali Metals</option>
                  <option value="alkaline earth metal">Alkaline Earth</option>
                  <option value="transition metal">Transition Metals</option>
                  <option value="post-transition metal">Post-transition</option>
                  <option value="nonmetal">Nonmetals</option>
                  <option value="noble gas">Noble Gases</option>
                  <option value="halogen">Halogens</option>
                  <option value="metalloid">Metalloids</option>
                  <option value="lanthanide">Lanthanides</option>
                  <option value="actinide">Actinides</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Block
                </label>
                <select
                  value={filters.block}
                  onChange={(e) => setFilters(prev => ({ ...prev, block: e.target.value }))}
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-sm"
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
                  Physical State
                </label>
                <select
                  value={filters.physicalState}
                  onChange={(e) => setFilters(prev => ({ ...prev, physicalState: e.target.value }))}
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-sm"
                >
                  <option value="all">All States</option>
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
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-sm"
                >
                  <option value="all">All Periods</option>
                  {[1, 2, 3, 4, 5, 6, 7].map(period => (
                    <option key={period} value={period}>Period {period}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Academic Level
                </label>
                <select
                  value={filters.academicLevel}
                  onChange={(e) => setFilters(prev => ({ ...prev, academicLevel: e.target.value }))}
                  className="w-full p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-600 text-sm"
                >
                  <option value="all">All Levels</option>
                  <option value="class 11">Class 11</option>
                  <option value="class 12">Class 12</option>
                  <option value="jee">JEE</option>
                  <option value="neet">NEET</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setFilters({
                  category: 'all',
                  block: 'all',
                  physicalState: 'all',
                  period: 'all',
                  academicLevel: 'all'
                })}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Periodic Table Grid with proper spacing */}
      <div className="overflow-x-auto">
        <div className="min-w-max space-y-1">
          {periodicLayout.map((period, periodIndex) => (
            <div key={periodIndex} className="flex space-x-1">
              {/* Period label */}
              <div className="w-8 h-16 sm:h-20 flex items-center justify-center text-sm font-bold text-gray-600 dark:text-gray-400">
                {periodIndex < 7 ? periodIndex + 1 : periodIndex === 8 ? 'La' : 'Ac'}
              </div>
              
              {period.map((element, colIndex) => {
                if (!element) {
                  return (
                    <div
                      key={`${periodIndex}-${colIndex}`}
                      className="w-12 h-16 sm:w-14 sm:h-20 md:w-16 md:h-20 opacity-0 pointer-events-none"
                    />
                  );
                }
                
                return (
                  <div key={element.atomicNumber} className="w-12 h-16 sm:w-14 sm:h-20 md:w-16 md:h-20">
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

      {/* Enhanced Legend with better organization */}
      <motion.div
        className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {[
          { category: 'alkali metal', name: 'Alkali Metals', color: 'from-purple-600 to-purple-800' },
          { category: 'alkaline earth metal', name: 'Alkaline Earth', color: 'from-green-600 to-green-800' },
          { category: 'transition metal', name: 'Transition Metals', color: 'from-blue-600 to-blue-800' },
          { category: 'post-transition metal', name: 'Post-transition', color: 'from-gray-600 to-gray-800' },
          { category: 'nonmetal', name: 'Nonmetals', color: 'from-red-600 to-red-800' },
          { category: 'noble gas', name: 'Noble Gases', color: 'from-cyan-600 to-cyan-800' },
          { category: 'halogen', name: 'Halogens', color: 'from-orange-600 to-orange-800' },
          { category: 'metalloid', name: 'Metalloids', color: 'from-yellow-600 to-yellow-800' },
          { category: 'lanthanide', name: 'Lanthanides', color: 'from-pink-600 to-pink-800' },
          { category: 'actinide', name: 'Actinides', color: 'from-indigo-600 to-indigo-800' }
        ].map(({ category, name, color }) => (
          <div
            key={category}
            className="flex items-center space-x-2 p-2 bg-white/10 dark:bg-black/20 
                       backdrop-blur-lg rounded-lg border border-white/20 hover:bg-white/20 
                       dark:hover:bg-black/30 transition-all duration-300"
          >
            <div className={`w-4 h-4 rounded bg-gradient-to-r ${color} border border-white/30`}></div>
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              {name}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Enhanced Element Details Modal */}
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
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                {/* Enhanced Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`text-white text-4xl font-bold rounded-xl p-4 shadow-xl
                                    bg-gradient-to-br ${getCategoryColor(selectedElement.category).split(' ')[0]} ${getCategoryColor(selectedElement.category).split(' ')[1]}`}>
                      {selectedElement.symbol}
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {selectedElement.name}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 capitalize text-lg">
                        {selectedElement.category}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedElement.academicLevel.map((level, index) => (
                          <span key={index} className="px-2 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full text-xs font-medium">
                            {level}
                          </span>
                        ))}
                      </div>
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

                {/* Enhanced Content Grid */}
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
                        <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                          <span className="text-gray-600 dark:text-gray-400">Atomic Number:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {selectedElement.atomicNumber}
                          </span>
                        </div>
                        <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                          <span className="text-gray-600 dark:text-gray-400">Atomic Mass:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {selectedElement.atomicMass.toFixed(3)} u
                          </span>
                        </div>
                        <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                          <span className="text-gray-600 dark:text-gray-400">Period:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {selectedElement.period}
                          </span>
                        </div>
                        <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                          <span className="text-gray-600 dark:text-gray-400">Group:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                            {selectedElement.group}
                          </span>
                        </div>
                        <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                          <span className="text-gray-600 dark:text-gray-400">Block:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white uppercase">
                            {selectedElement.block}
                          </span>
                        </div>
                        <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                          <span className="text-gray-600 dark:text-gray-400">State:</span>
                          <span className="ml-2 font-semibold text-gray-900 dark:text-white capitalize">
                            {selectedElement.physicalState}
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
                          <div className="flex justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <span className="text-gray-600 dark:text-gray-400">Melting Point:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {selectedElement.meltingPoint}°C
                            </span>
                          </div>
                        )}
                        {selectedElement.boilingPoint && (
                          <div className="flex justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <span className="text-gray-600 dark:text-gray-400">Boiling Point:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {selectedElement.boilingPoint}°C
                            </span>
                          </div>
                        )}
                        {selectedElement.density && (
                          <div className="flex justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <span className="text-gray-600 dark:text-gray-400">Density:</span>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {selectedElement.density} g/cm³
                            </span>
                          </div>
                        )}
                        {selectedElement.electronegativity && (
                          <div className="flex justify-between p-2 bg-white/50 dark:bg-gray-800/50 rounded">
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
                          <li key={index} className="flex items-start p-2 bg-white/50 dark:bg-gray-800/50 rounded">
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
                          <li key={index} className="flex items-start p-2 bg-white/50 dark:bg-gray-800/50 rounded">
                            <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            <span className="text-gray-700 dark:text-gray-300">{fact}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* JEE/NEET Importance */}
                <div className="mt-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 
                                rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-yellow-600" />
                    JEE/NEET Importance
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedElement.jeeNeetImportance}
                  </p>
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