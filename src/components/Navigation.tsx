import React from 'react';
import { motion } from 'framer-motion';
import { Atom, FlaskConical } from 'lucide-react';

interface NavigationProps {
  activeSection: 'periodic' | 'reactions';
  onSectionChange: (section: 'periodic' | 'reactions') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  return (
    <nav className="flex justify-center mb-8">
      <div className="glass-effect rounded-full p-2 flex space-x-2 shadow-xl border-2 border-gray-200/50 dark:border-gray-600/50">
        <motion.button
          onClick={() => onSectionChange('periodic')}
          className={`nav-button ${
            activeSection === 'periodic' ? 'active' : 'inactive'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Atom className="w-5 h-5" />
          <span className="font-semibold">Periodic Table</span>
        </motion.button>
        
        <motion.button
          onClick={() => onSectionChange('reactions')}
          className={`nav-button ${
            activeSection === 'reactions' ? 'active' : 'inactive'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <FlaskConical className="w-5 h-5" />
          <span className="font-semibold">Reactions</span>
        </motion.button>
      </div>
    </nav>
  );
};