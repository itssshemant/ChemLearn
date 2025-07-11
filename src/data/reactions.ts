// Re-export from completeReactions for backward compatibility
export * from './completeReactions';
export { completeReactions as reactions } from './completeReactions';

export interface Reaction {
  id: string;
  title: string;
  category: 'organic' | 'inorganic' | 'physical';
  equation: string;
  description: string;
  mechanism: string;
  stepByStep: string[];
  conditions: string[];
  uses: string[];
  examples: string[];
  exceptions: string[];
  realWorldApplications: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  class: '11' | '12' | 'both';
  chapter: string;
  type: string;
}

// Import reactions from completeReactions
import { completeReactions } from './completeReactions';

// Utility functions
export const getReactionsByCategory = (category: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.category === category);
};

export const getReactionsByClass = (classLevel: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.class === classLevel || reaction.class === 'both');
};

export const getReactionsByDifficulty = (difficulty: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.difficulty === difficulty);
};

export const getReactionsByChapter = (chapter: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.chapter === chapter);
};

export const getReactionsByType = (type: string): Reaction[] => {
  return completeReactions.filter(reaction => reaction.type === type);
};

export const searchReactions = (query: string): Reaction[] => {
  const lowercaseQuery = query.toLowerCase();
  return completeReactions.filter(reaction => 
    reaction.title.toLowerCase().includes(lowercaseQuery) ||
    reaction.description.toLowerCase().includes(lowercaseQuery) ||
    reaction.category.toLowerCase().includes(lowercaseQuery) ||
    reaction.equation.toLowerCase().includes(lowercaseQuery) ||
    reaction.chapter.toLowerCase().includes(lowercaseQuery) ||
    reaction.type.toLowerCase().includes(lowercaseQuery) ||
    reaction.uses.some(use => use.toLowerCase().includes(lowercaseQuery)) ||
    reaction.examples.some(example => example.toLowerCase().includes(lowercaseQuery))
  );
};

export const getReactionCategories = (): string[] => {
  return [...new Set(completeReactions.map(reaction => reaction.category))];
};

export const getReactionTypes = (): string[] => {
  return [...new Set(completeReactions.map(reaction => reaction.type))];
};

export const getReactionChapters = (): string[] => {
  return [...new Set(completeReactions.map(reaction => reaction.chapter))];
};

export const getReactionDifficulties = (): string[] => {
  return [...new Set(completeReactions.map(reaction => reaction.difficulty))];
};