import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Beaker, GraduationCap } from 'lucide-react';
import { PeriodicTable } from './components/PeriodicTable';
import { ReactionsSection } from './components/ReactionsSection';
import { SearchBar } from './components/SearchBar';
import { ThemeToggle } from './components/ThemeToggle';
import { Navigation } from './components/Navigation';
import { ParticleBackground } from './components/ParticleBackground';
import { searchElements } from './data/allElements';
import { Element } from './data/allElements';

function App() {
  const [activeSection, setActiveSection] = useState<'periodic' | 'reactions'>('periodic');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredElements, setFilteredElements] = useState<Element[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredElements([]);
    } else {
      const results = searchElements(query);
      setFilteredElements(results);
    }
  };

  const handleSectionChange = (section: 'periodic' | 'reactions') => {
    setActiveSection(section);
    setSearchQuery('');
    setFilteredElements([]);
  };

  return (
    <div className="min-h-screen transition-all duration-500 dark:section-gradient light-gradient relative">
      <ParticleBackground />
      <div className="molecule-pattern min-h-screen relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.header
            className="text-center mb-8 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Beaker className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold neon-text">
                ChemLearn
              </h1>
              <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-purple-400" />
            </div>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
              Comprehensive Chemistry Learning Platform for CBSE Classes 11 & 12
              <br />
              <span className="text-base md:text-lg text-gray-500 dark:text-gray-400">
                Complete Periodic Table • All Important Reactions • Interactive Learning
              </span>
            </p>
          </motion.header>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 md:mb-8">
            <SearchBar
              onSearch={handleSearch}
              placeholder={`Search ${activeSection === 'periodic' ? 'elements by name, symbol, or properties' : 'reactions by name, equation, or chapter'}...`}
              className="w-full md:w-96"
            />
            <ThemeToggle />
          </div>

          {/* Navigation */}
          <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />

          {/* Main Content */}
          <main>
            {activeSection === 'periodic' ? (
              <motion.div
                key="periodic"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <PeriodicTable 
                  filteredElements={filteredElements.length > 0 ? filteredElements : undefined}
                  searchQuery={searchQuery}
                />
              </motion.div>
            ) : (
              <motion.div
                key="reactions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ReactionsSection searchQuery={searchQuery} />
              </motion.div>
            )}
          </main>

          {/* Footer */}
          <motion.footer
            className="mt-12 md:mt-16 text-center text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="space-y-2">
              <p>© 2025 ChemLearn - Making Chemistry Education Interactive</p>
              <p className="text-sm">
                Complete CBSE Chemistry Resource • {activeSection === 'periodic' ? '118 Elements' : '50+ Important Reactions'} • 
                Designed for Classes 11 & 12
              </p>
              <p className="text-sm text-cyan-400 font-medium">
                Made with ❤️ by Hemant | Concept by Aryan
              </p>
            </div>
          </motion.footer>
        </div>
      </div>
    </div>
  );
}

export default App;