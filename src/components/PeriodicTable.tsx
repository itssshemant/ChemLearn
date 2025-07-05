import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { allElements } from '../data/allElements';
import { ElementCard } from './ElementCard';
import { ElementDetails } from './ElementDetails';
import { ElementFilters } from './ElementFilters';
import { Element } from '../data/allElements';

interface PeriodicTableProps {
  filteredElements?: Element[];
  searchQuery?: string;
}

export const PeriodicTable: React.FC<PeriodicTableProps> = ({ 
  filteredElements, 
  searchQuery = '' 
}) => {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [filters, setFilters] = useState({
    category: 'all',
    block: 'all',
    state: 'all',
    period: 'all',
    group: 'all'
  });

  // Apply filters and search
  const displayElements = useMemo(() => {
    let elementsToShow = filteredElements || allElements;

    // Apply search filter
    if (searchQuery.trim()) {
      elementsToShow = elementsToShow.filter(element =>
        element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        element.uses.some(use => use.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters.category !== 'all') {
      elementsToShow = elementsToShow.filter(element => element.category === filters.category);
    }

    // Apply block filter
    if (filters.block !== 'all') {
      elementsToShow = elementsToShow.filter(element => element.block === filters.block);
    }

    // Apply state filter
    if (filters.state !== 'all') {
      elementsToShow = elementsToShow.filter(element => element.physicalState === filters.state);
    }

    // Apply period filter
    if (filters.period !== 'all') {
      elementsToShow = elementsToShow.filter(element => element.period === parseInt(filters.period));
    }

    // Apply group filter
    if (filters.group !== 'all') {
      elementsToShow = elementsToShow.filter(element => element.group === parseInt(filters.group));
    }

    return elementsToShow;
  }, [filteredElements, searchQuery, filters]);

  const handleElementClick = (element: Element) => {
    setSelectedElement(element);
  };

  const handleCloseDetails = () => {
    setSelectedElement(null);
  };

  // Create a comprehensive periodic table layout
  const createPeriodicLayout = () => {
    const layout = Array(10).fill(null).map(() => Array(18).fill(null));
    
    displayElements.forEach(element => {
      let row = element.period - 1;
      let col = element.group - 1;
      
      // Handle special cases for lanthanides and actinides
      if (element.atomicNumber >= 57 && element.atomicNumber <= 71) {
        // Lanthanides - place in period 8 (index 8)
        row = 8;
        col = element.atomicNumber - 57;
      } else if (element.atomicNumber >= 89 && element.atomicNumber <= 103) {
        // Actinides - place in period 9 (index 9)
        row = 9;
        col = element.atomicNumber - 89;
      }
      
      // Adjust for groups that don't start from 1
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

  return (
    <div className="w-full max-w-7xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Filters */}
        <ElementFilters filters={filters} onFiltersChange={setFilters} />

        {/* Results count */}
        <div className="mb-6">
          <div className="property-card inline-block">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Showing <span className="font-bold text-cyan-600 dark:text-cyan-400">{displayElements.length}</span> element{displayElements.length !== 1 ? 's' : ''} of <span className="font-bold">118</span> total
            </p>
          </div>
        </div>

        {/* Periodic Table Grid */}
        <div className="space-y-1 mb-8 overflow-x-auto">
          {periodicLayout.map((period, periodIndex) => (
            <div key={periodIndex} className="grid grid-cols-18 gap-1 min-w-max">
              {period.map((element, index) => {
                if (!element) {
                  return (
                    <div
                      key={`${periodIndex}-${index}`}
                      className="aspect-square w-12 sm:w-14 md:w-16 opacity-0 pointer-events-none"
                    />
                  );
                }
                
                return (
                  <div key={element.atomicNumber} className="w-12 sm:w-14 md:w-16">
                    <ElementCard
                      element={element}
                      onClick={() => handleElementClick(element)}
                      isSelected={selectedElement?.atomicNumber === element.atomicNumber}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Category Legend */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="category-legend">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-red-400 to-red-600 rounded shadow-md"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Nonmetals</span>
            </div>
          </div>
          <div className="category-legend">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded shadow-md"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Alkali Metals</span>
            </div>
          </div>
          <div className="category-legend">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded shadow-md"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Alkaline Earth</span>
            </div>
          </div>
          <div className="category-legend">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-700 rounded shadow-md"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Transition Metals</span>
            </div>
          </div>
          <div className="category-legend">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded shadow-md"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Metalloids</span>
            </div>
          </div>
          <div className="category-legend">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded shadow-md"></div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Noble Gases</span>
            </div>
          </div>
        </motion.div>

        {/* No results message */}
        {displayElements.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="property-card inline-block p-8">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No elements found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </motion.div>
        )}

        <ElementDetails element={selectedElement} onClose={handleCloseDetails} />
      </motion.div>
    </div>
  );
};