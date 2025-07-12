import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Atom, 
  FlaskConical, 
  Brain, 
  BookOpen, 
  Beaker, 
  GraduationCap,
  Menu,
  X,
  Home,
  Search
} from 'lucide-react';
import { CompletePeriodicTable } from './CompletePeriodicTable';
import { ReactionsSection } from './ReactionsSection';
import { EnhancedVirtualLab } from './EnhancedVirtualLab';
import { ComprehensiveQuizSystem } from './ComprehensiveQuizSystem';
import { MultiLearningPaths } from './MultiLearningPaths';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from './ThemeToggle';
import { ParticleBackground } from './ParticleBackground';
import { searchElements } from '../data/allElements118';
import { searchReactions } from '../data/extensiveReactions';
import type { Element } from '../data/allElements118';

type Section = 'home' | 'periodic' | 'reactions' | 'lab' | 'quiz' | 'paths';

export const EnhancedApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredElements, setFilteredElements] = useState<Element[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredElements([]);
    } else {
      const results = searchElements(query);
      setFilteredElements(results);
    }
  };

  const navigationItems = [
    { id: 'home' as Section, label: 'Home', icon: Home },
    { id: 'periodic' as Section, label: 'Periodic Table', icon: Atom },
    { id: 'reactions' as Section, label: 'Reactions', icon: FlaskConical },
    { id: 'lab' as Section, label: 'Virtual Lab', icon: Beaker },
    { id: 'quiz' as Section, label: 'Quiz', icon: Brain },
    { id: 'paths' as Section, label: 'Learning Paths', icon: BookOpen }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'periodic':
        return (
          <CompletePeriodicTable 
            searchQuery={searchQuery}
          />
        );
      case 'reactions':
        return <ReactionsSection searchQuery={searchQuery} />;
      case 'lab':
        return <EnhancedVirtualLab />;
      case 'quiz':
        return <ComprehensiveQuizSystem />;
      case 'paths':
        return <MultiLearningPaths />;
      default:
        return <HomePage onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen transition-all duration-500 dark:bg-gradient-to-br dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative">
      <ParticleBackground />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    ChemLearn
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Interactive Chemistry Platform
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Search and Theme Toggle */}
              <div className="flex items-center space-x-4">
                {(activeSection === 'periodic' || activeSection === 'reactions') && (
                  <div className="hidden md:block">
                    <SearchBar
                      onSearch={handleSearch}
                      placeholder={`Search ${activeSection === 'periodic' ? 'elements' : 'reactions'}...`}
                      className="w-64"
                    />
                  </div>
                )}
                <ThemeToggle />
                
                {/* Mobile Menu Button */}
                <div className="text-4xl font-bold mb-2">100+</div>
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                <div className="text-4xl font-bold mb-2">15+</div>
                    <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  ) : (
                    <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                <div className="text-4xl font-bold mb-2">500+</div>
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            {(activeSection === 'periodic' || activeSection === 'reactions') && (
              <div className="md:hidden mt-4">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder={`Search ${activeSection === 'periodic' ? 'elements' : 'reactions'}...`}
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <motion.div
              className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="container mx-auto px-4 py-4 space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          )}
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    ChemLearn
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The most comprehensive interactive chemistry learning platform for CBSE students. 
                  Master chemistry with our periodic table, reactions database, virtual labs, and more.
                </p>
                <div className="flex space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Made with ❤️ by Hemant
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Concept by Aryan
                  </span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>Interactive Periodic Table</li>
                  <li>Complete Reactions Database</li>
                  <li>Virtual Chemistry Lab</li>
                  <li>Adaptive Quizzes</li>
                  <li>Structured Learning Paths</li>
                </ul>
              </div>
                The most comprehensive interactive chemistry learning platform for CBSE, JEE, and NEET students. 
                Master chemistry with our complete periodic table, extensive reactions database, enhanced virtual labs, comprehensive quiz system, and structured learning paths.
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-sm font-semibold">
                    Made with ❤️ by Hemant
                  </span>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow-lg">
                  <span className="text-sm font-semibold">
                    Concept by Aryan
                  </span>
                </div>
              </div>
                <li>Foundation Course</li>
                <li>Advanced Problem Solving</li>
                <li>Complete Periodic Table (118 Elements)</li>
                <li>Extensive Reactions Database (100+ Reactions)</li>
                <li>Enhanced Virtual Chemistry Lab</li>
                <li>Comprehensive Quiz System (100+ Questions)</li>
                <li>Multi-Track Learning Paths</li>
                <li>JEE/NEET/CBSE Focused Content</li>
              © 2025 ChemLearn. All rights reserved. | Empowering chemistry education through interactive technology.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Home Page Component
const HomePage: React.FC<{ onSectionChange: (section: Section) => void }> = ({ onSectionChange }) => {
  const features = [
    {
      icon: Atom,
      title: 'Interactive Periodic Table',
      description: 'Explore all 118 elements with detailed information, properties, and real-world applications.',
      color: 'from-blue-500 to-cyan-600',
      action: () => onSectionChange('periodic')
    },
    {
      icon: FlaskConical,
      title: 'Complete Reactions Database',
      description: 'Master all important reactions from CBSE Class 11 & 12 with mechanisms and applications.',
      color: 'from-green-500 to-emerald-600',
      action: () => onSectionChange('reactions')
    },
    {
      icon: Beaker,
      title: 'Virtual Chemistry Lab',
      description: 'Perform experiments safely with interactive simulations and real-time feedback.',
      color: 'from-purple-500 to-indigo-600',
      action: () => onSectionChange('lab')
    },
    {
      icon: Brain,
      title: 'Adaptive Quizzes',
      description: 'Test your knowledge with intelligent quizzes that adapt to your learning level.',
      color: 'from-orange-500 to-red-600',
      action: () => onSectionChange('quiz')
    },
    {
      icon: BookOpen,
      title: 'Structured Learning Paths',
      description: 'Follow guided learning journeys designed for CBSE curriculum success.',
      color: 'from-pink-500 to-purple-600',
      action: () => onSectionChange('paths')
    }
  ];

  return (
    <div className="text-center">
      {/* Hero Section */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Master Chemistry
          </span>
          <br />
          <span className="text-gray-800 dark:text-gray-200">
            Interactively
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
          The most comprehensive chemistry learning platform for CBSE students. 
          Explore elements, master reactions, and excel in your chemistry journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => onSectionChange('periodic')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white 
                       rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl 
                       hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Periodic Table
          </motion.button>
          <motion.button
            onClick={() => onSectionChange('lab')}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                       rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl 
                       hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Virtual Lab
          </motion.button>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 
                         shadow-lg border border-gray-200/50 dark:border-gray-700/50
                         hover:shadow-xl cursor-pointer transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onClick={feature.action}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} 
                              flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Stats Section */}
      <motion.div
        className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-8 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8">Everything You Need to Excel</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">118</div>
            <div className="text-cyan-100">Elements</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-cyan-100">Reactions</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">10+</div>
            <div className="text-cyan-100">Virtual Labs</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-cyan-100">Quiz Questions</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};