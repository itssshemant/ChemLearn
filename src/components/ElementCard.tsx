import React from 'react';
import { motion } from 'framer-motion';
import { Element } from '../data/elements';

interface ElementCardProps {
  element: Element;
  onClick: () => void;
  isSelected?: boolean;
}

export const ElementCard: React.FC<ElementCardProps> = ({ 
  element, 
  onClick, 
  isSelected = false 
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`element-card glass-effect rounded-lg p-2 text-center 
                  hover:shadow-lg transition-all duration-300 
                  ${isSelected ? 'ring-2 ring-cyan-400' : ''}`}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
          {element.atomicNumber}
        </div>
        <div className={`text-2xl font-bold ${element.color} text-white 
                         rounded-lg py-1 px-2 mb-1 shadow-lg`}>
          {element.symbol}
        </div>
        <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">
          {element.name}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {element.atomicMass.toFixed(2)}
        </div>
      </div>
      
      {/* Hover tooltip */}
      <motion.div
        className="absolute -top-20 left-1/2 transform -translate-x-1/2 
                   bg-gray-900 dark:bg-gray-800 text-white p-2 rounded-lg 
                   shadow-lg opacity-0 pointer-events-none z-20 min-w-max"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-sm font-semibold">{element.name}</div>
        <div className="text-xs text-gray-300">
          Atomic Number: {element.atomicNumber}
        </div>
        <div className="text-xs text-gray-300">
          Atomic Mass: {element.atomicMass.toFixed(2)}
        </div>
        <div className="text-xs text-gray-300 capitalize">
          {element.category}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 
                        border-4 border-transparent border-t-gray-900 dark:border-t-gray-800">
        </div>
      </motion.div>
    </motion.div>
  );
};