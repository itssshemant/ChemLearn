import React from 'react';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import { getElementCategories, getElementBlocks, getElementStates } from '../data/allElements';

interface ElementFiltersProps {
  filters: {
    category: string;
    block: string;
    state: string;
    period: string;
    group: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const ElementFilters: React.FC<ElementFiltersProps> = ({ filters, onFiltersChange }) => {
  const categories = getElementCategories();
  const blocks = getElementBlocks();
  const states = getElementStates();
  const periods = ['1', '2', '3', '4', '5', '6', '7'];
  const groups = ['1', '2', '13', '14', '15', '16', '17', '18'];

  const handleFilterChange = (filterType: string, value: string) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      category: 'all',
      block: 'all',
      state: 'all',
      period: 'all',
      group: 'all'
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all');

  return (
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
            Filter Elements
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
        {/* Category Filter */}
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

        {/* Block Filter */}
        <div className="property-card">
          <label className="filter-label">
            Block
          </label>
          <select
            value={filters.block}
            onChange={(e) => handleFilterChange('block', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Blocks</option>
            {blocks.map(block => (
              <option key={block} value={block}>
                {block.toUpperCase()}-block
              </option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div className="property-card">
          <label className="filter-label">
            Physical State
          </label>
          <select
            value={filters.state}
            onChange={(e) => handleFilterChange('state', e.target.value)}
            className="filter-select"
          >
            <option value="all">All States</option>
            {states.map(state => (
              <option key={state} value={state}>
                {state.charAt(0).toUpperCase() + state.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Period Filter */}
        <div className="property-card">
          <label className="filter-label">
            Period
          </label>
          <select
            value={filters.period}
            onChange={(e) => handleFilterChange('period', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Periods</option>
            {periods.map(period => (
              <option key={period} value={period}>
                Period {period}
              </option>
            ))}
          </select>
        </div>

        {/* Group Filter */}
        <div className="property-card">
          <label className="filter-label">
            Group
          </label>
          <select
            value={filters.group}
            onChange={(e) => handleFilterChange('group', e.target.value)}
            className="filter-select"
          >
            <option value="all">All Groups</option>
            {groups.map(group => (
              <option key={group} value={group}>
                Group {group}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  );
};