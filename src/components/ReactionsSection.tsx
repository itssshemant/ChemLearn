import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Filter, BookOpen } from 'lucide-react';
import { reactions, Reaction, getReactionCategories, getReactionTypes, getReactionChapters, getReactionDifficulties } from '../data/reactions';
import { ReactionCard } from './ReactionCard';

interface ReactionsSectionProps {
  searchQuery?: string;
}

export const ReactionsSection: React.FC<ReactionsSectionProps> = ({ searchQuery = '' }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    class: 'all',
    difficulty: 'all',
    chapter: 'all',
    type: 'all'
  });

  const categories = getReactionCategories();
  const types = getReactionTypes();
  const chapters = getReactionChapters();
  const difficulties = getReactionDifficulties();

  const filteredReactions = useMemo(() => {
    return reactions.filter(reaction => {
      const matchesSearch = searchQuery === '' || 
        reaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reaction.equation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reaction.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
        reaction.type.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = filters.category === 'all' || reaction.category === filters.category;
      const matchesClass = filters.class === 'all' || reaction.class === filters.class || reaction.class === 'both';
      const matchesDifficulty = filters.difficulty === 'all' || reaction.difficulty === filters.difficulty;
      const matchesChapter = filters.chapter === 'all' || reaction.chapter === filters.chapter;
      const matchesType = filters.type === 'all' || reaction.type === filters.type;

      return matchesSearch && matchesCategory && matchesClass && matchesDifficulty && matchesChapter && matchesType;
    });
  }, [searchQuery, filters]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: 'all',
      class: 'all',
      difficulty: 'all',
      chapter: 'all',
      type: 'all'
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all');

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold neon-text">
            CBSE Chemistry Reactions
          </h2>
        </div>

        {/* Filters */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg">
                <Filter className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Filter Reactions
              </h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="clear-button"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="property-card">
              <label className="filter-label">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="property-card">
              <label className="filter-label">
                Class
              </label>
              <select
                value={filters.class}
                onChange={(e) => handleFilterChange('class', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Classes</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            <div className="property-card">
              <label className="filter-label">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Levels</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="property-card">
              <label className="filter-label">
                Chapter
              </label>
              <select
                value={filters.chapter}
                onChange={(e) => handleFilterChange('chapter', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Chapters</option>
                {chapters.map(chapter => (
                  <option key={chapter} value={chapter}>
                    {chapter}
                  </option>
                ))}
              </select>
            </div>

            <div className="property-card">
              <label className="filter-label">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <div className="property-card inline-block">
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Showing <span className="font-bold text-cyan-600 dark:text-cyan-400">{filteredReactions.length}</span> reaction{filteredReactions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Reactions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReactions.map((reaction, index) => (
            <motion.div
              key={reaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <ReactionCard reaction={reaction} />
            </motion.div>
          ))}
        </div>

        {filteredReactions.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="property-card inline-block p-8">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">
                No reactions found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};