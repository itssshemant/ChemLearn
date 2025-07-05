import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Atom, Thermometer, Calendar, Beaker, Lightbulb, Zap, Layers, Activity } from 'lucide-react';
import { Element } from '../data/allElements';

interface ElementDetailsProps {
  element: Element | null;
  onClose: () => void;
}

export const ElementDetails: React.FC<ElementDetailsProps> = ({ element, onClose }) => {
  if (!element) return null;

  const formatTemperature = (temp: number | null) => {
    if (temp === null) return 'N/A';
    return `${temp}°C`;
  };

  const formatElectronegativity = (value: number | null) => {
    if (value === null) return 'N/A';
    return value.toFixed(2);
  };

  const formatDensity = (density: number | null) => {
    if (density === null) return 'N/A';
    return `${density} g/cm³`;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
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
                <div className={`${element.color} text-white text-4xl font-bold 
                                rounded-xl p-4 shadow-xl border-2 border-white/20`}>
                  {element.symbol}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {element.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 capitalize text-lg font-medium">
                    {element.category}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="close-button"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Basic Properties Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="property-card">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Atomic Number</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {element.atomicNumber}
                </div>
              </div>
              <div className="property-card">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Atomic Mass</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {element.atomicMass.toFixed(3)}
                </div>
              </div>
              <div className="property-card">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Period</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {element.period}
                </div>
              </div>
              <div className="property-card">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Group</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {element.group}
                </div>
              </div>
            </div>

            {/* Detailed Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="property-card">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
                      <Atom className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Electron Configuration
                    </h3>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-mono text-lg bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    {element.electronConfiguration}
                  </p>
                </div>

                <div className="property-card">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-600">
                      <Thermometer className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Physical Properties
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="font-medium">Physical State:</span>
                      <span className="capitalize font-semibold text-gray-900 dark:text-white">{element.physicalState}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="font-medium">Melting Point:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatTemperature(element.meltingPoint)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="font-medium">Boiling Point:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatTemperature(element.boilingPoint)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="font-medium">Density:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatDensity(element.density)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="font-medium">Block:</span>
                      <span className="uppercase font-semibold text-gray-900 dark:text-white">{element.block}</span>
                    </div>
                  </div>
                </div>

                <div className="property-card">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-600">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Chemical Properties
                    </h3>
                  </div>
                  <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="font-medium">Electronegativity:</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{formatElectronegativity(element.electronegativity)}</span>
                    </div>
                    <div>
                      <span className="font-medium">Oxidation States:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {element.oxidationStates.map((state, index) => (
                          <span key={index} className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                            {state}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="property-card">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Discovery
                    </h3>
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 space-y-2">
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="font-medium">Year:</span> 
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                        {element.yearDiscovered ? element.yearDiscovered : 'Ancient times'}
                      </span>
                    </div>
                    <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span className="font-medium">Discovered by:</span> 
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                        {element.discoveredBy}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="property-card">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600">
                      <Beaker className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Common Uses
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {element.uses.map((use, index) => (
                      <li key={index} className="flex items-start space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="property-card">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      Fun Facts
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {element.funFacts.map((fact, index) => (
                      <li key={index} className="flex items-start space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};