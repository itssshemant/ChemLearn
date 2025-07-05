import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, FlaskRound as Flask, Thermometer, Clock, BookOpen, Zap, AlertTriangle, Globe, Layers } from 'lucide-react';
import { Reaction } from '../data/reactions';

interface ReactionCardProps {
  reaction: Reaction;
}

export const ReactionCard: React.FC<ReactionCardProps> = ({ reaction }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'organic':
        return 'bg-green-500';
      case 'inorganic':
        return 'bg-blue-500';
      case 'physical':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'medium':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <motion.div
      className="reaction-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`${getCategoryColor(reaction.category)} text-white 
                            px-3 py-1 rounded-full text-sm font-medium`}>
              {reaction.category}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Class {reaction.class}
            </div>
            <div className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                            px-2 py-1 rounded">
              {reaction.type}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getDifficultyColor(reaction.difficulty)}`}>
              {reaction.difficulty}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </motion.div>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {reaction.title}
        </h3>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-3">
          <code className="text-lg font-mono text-gray-800 dark:text-gray-200 break-all">
            {reaction.equation}
          </code>
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-2">
          {reaction.description}
        </p>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          Chapter: {reaction.chapter}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-4"
          >
            <div className="glass-effect rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Mechanism
                </h4>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                {reaction.mechanism}
              </p>
              <div className="space-y-2">
                <h5 className="font-medium text-gray-800 dark:text-gray-200">Step-by-step:</h5>
                <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {reaction.stepByStep.map((step, index) => (
                    <li key={index} className="text-sm">{step}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="glass-effect rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Reaction Conditions
                </h4>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {reaction.conditions.map((condition, index) => (
                  <li key={index} className="text-sm">{condition}</li>
                ))}
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Flask className="w-5 h-5 text-purple-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Uses & Applications
                </h4>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {reaction.uses.map((use, index) => (
                  <li key={index} className="text-sm">{use}</li>
                ))}
              </ul>
            </div>

            <div className="glass-effect rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-5 h-5 text-green-400" />
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Examples
                </h4>
              </div>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {reaction.examples.map((example, index) => (
                  <li key={index} className="text-sm">{example}</li>
                ))}
              </ul>
            </div>

            {reaction.exceptions.length > 0 && (
              <div className="glass-effect rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Exceptions & Special Cases
                  </h4>
                </div>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {reaction.exceptions.map((exception, index) => (
                    <li key={index} className="text-sm">{exception}</li>
                  ))}
                </ul>
              </div>
            )}

            {reaction.realWorldApplications.length > 0 && (
              <div className="glass-effect rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Real-World Applications
                  </h4>
                </div>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                  {reaction.realWorldApplications.map((application, index) => (
                    <li key={index} className="text-sm">{application}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};