import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, Trophy, Clock, RotateCcw, Star } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  chapter: string;
  class: '11' | '12';
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number[];
  incorrectAnswers: number[];
}

const questions: Question[] = [
  {
    id: 'q1',
    question: 'What is the electronic configuration of Carbon (Z=6)?',
    options: ['1s² 2s² 2p²', '1s² 2s² 2p⁴', '1s² 2s¹ 2p³', '1s² 2s² 2p⁶'],
    correctAnswer: 0,
    explanation: 'Carbon has 6 electrons. Following the aufbau principle: 1s² (2 electrons), 2s² (2 electrons), 2p² (2 electrons).',
    difficulty: 'easy',
    topic: 'Atomic Structure',
    chapter: 'Structure of Atom',
    class: '11'
  },
  {
    id: 'q2',
    question: 'Which of the following represents Markovnikov\'s rule?',
    options: [
      'H⁺ adds to the carbon with more hydrogen atoms',
      'H⁺ adds to the carbon with fewer hydrogen atoms', 
      'Halogen adds to the carbon with more hydrogen atoms',
      'Addition occurs randomly'
    ],
    correctAnswer: 0,
    explanation: 'Markovnikov\'s rule states that in the addition of HX to an alkene, hydrogen attaches to the carbon atom that already has more hydrogen atoms.',
    difficulty: 'medium',
    topic: 'Hydrocarbons',
    chapter: 'Hydrocarbons',
    class: '11'
  },
  {
    id: 'q3',
    question: 'What is the hybridization of carbon in methane (CH₄)?',
    options: ['sp', 'sp²', 'sp³', 'sp³d'],
    correctAnswer: 2,
    explanation: 'In methane, carbon forms 4 sigma bonds with hydrogen atoms, requiring sp³ hybridization (tetrahedral geometry).',
    difficulty: 'easy',
    topic: 'Chemical Bonding',
    chapter: 'Chemical Bonding and Molecular Structure',
    class: '11'
  },
  {
    id: 'q4',
    question: 'Which mechanism does tertiary alkyl halides follow in nucleophilic substitution?',
    options: ['SN1', 'SN2', 'E1', 'E2'],
    correctAnswer: 0,
    explanation: 'Tertiary alkyl halides follow SN1 mechanism due to the stability of tertiary carbocation intermediate.',
    difficulty: 'hard',
    topic: 'Organic Chemistry',
    chapter: 'Haloalkanes and Haloarenes',
    class: '12'
  },
  {
    id: 'q5',
    question: 'What is the standard electrode potential of the standard hydrogen electrode?',
    options: ['+1.00 V', '0.00 V', '-1.00 V', '+0.76 V'],
    correctAnswer: 1,
    explanation: 'The standard hydrogen electrode (SHE) is defined as having a potential of exactly 0.00 V at all temperatures.',
    difficulty: 'medium',
    topic: 'Electrochemistry',
    chapter: 'Electrochemistry',
    class: '12'
  },
  {
    id: 'q6',
    question: 'Which catalyst is used in the Haber process?',
    options: ['Platinum', 'Iron', 'Nickel', 'Vanadium pentoxide'],
    correctAnswer: 1,
    explanation: 'Iron catalyst with promoters (K₂O and Al₂O₃) is used in the Haber process for ammonia synthesis.',
    difficulty: 'easy',
    topic: 'Industrial Chemistry',
    chapter: 'The p-Block Elements',
    class: '12'
  },
  {
    id: 'q7',
    question: 'What type of isomerism is shown by [Co(NH₃)₄Cl₂]⁺?',
    options: ['Optical isomerism', 'Geometrical isomerism', 'Linkage isomerism', 'Ionization isomerism'],
    correctAnswer: 1,
    explanation: 'This complex shows geometrical isomerism (cis-trans) due to the presence of two different types of ligands.',
    difficulty: 'hard',
    topic: 'Coordination Chemistry',
    chapter: 'Coordination Compounds',
    class: '12'
  },
  {
    id: 'q8',
    question: 'Which of the following is an example of a nucleophile?',
    options: ['BF₃', 'AlCl₃', 'OH⁻', 'H⁺'],
    correctAnswer: 2,
    explanation: 'OH⁻ (hydroxide ion) is a nucleophile as it has a lone pair of electrons and can donate them to electron-deficient centers.',
    difficulty: 'easy',
    topic: 'Organic Mechanisms',
    chapter: 'General Organic Chemistry',
    class: '11'
  }
];

export const QuizSystem: React.FC = () => {
  const [currentQuiz, setCurrentQuiz] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [score, setScore] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [noQuestionsFound, setNoQuestionsFound] = useState(false);
  const [filters, setFilters] = useState({
    class: 'all',
    difficulty: 'all',
    topic: 'all'
  });

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizCompleted) {
      interval = setInterval(() => {
        setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizCompleted, startTime]);

  const startQuiz = () => {
    let filteredQuestions = questions;
    
    // Apply filters
    if (filters.class !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.class === filters.class);
    }
    if (filters.difficulty !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === filters.difficulty);
    }
    if (filters.topic !== 'all') {
      filteredQuestions = filteredQuestions.filter(q => q.topic === filters.topic);
    }
    
    // Shuffle and take first 5 questions
    const shuffled = [...filteredQuestions].sort(() => Math.random() - 0.5);
    const quizQuestions = shuffled.slice(0, Math.min(5, shuffled.length));
    
    // Check if any questions were found
    if (quizQuestions.length === 0) {
      setNoQuestionsFound(true);
      return;
    }
    
    setCurrentQuiz(quizQuestions);
    setUserAnswers(new Array(quizQuestions.length).fill(null));
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizStarted(true);
    setQuizCompleted(false);
    setNoQuestionsFound(false);
    setScore(0);
    setTimeSpent(0);
    setStartTime(Date.now());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newUserAnswers);
    setShowExplanation(true);
    
    if (selectedAnswer === currentQuiz[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setNoQuestionsFound(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setUserAnswers([]);
    setScore(0);
    setTimeSpent(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return 'Excellent! 🏆';
    if (percentage >= 80) return 'Great job! 🌟';
    if (percentage >= 70) return 'Good work! 👍';
    if (percentage >= 60) return 'Not bad! 📚';
    return 'Keep studying! 💪';
  };

  // Handle no questions found
  if (noQuestionsFound) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 shadow-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">
              Chemistry Quiz
            </h2>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <div className="mb-6">
            <XCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Questions Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              No questions match your current filter selection. Please try adjusting your filters or select "All" for broader results.
            </p>
          </div>
          
          <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <p>Current filters:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                Class: {filters.class === 'all' ? 'All Classes' : `Class ${filters.class}`}
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                Difficulty: {filters.difficulty === 'all' ? 'All Levels' : filters.difficulty}
              </span>
              <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                Topic: {filters.topic === 'all' ? 'All Topics' : filters.topic}
              </span>
            </div>
          </div>
          
          <button
            onClick={() => setNoQuestionsFound(false)}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                       rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 
                       transition-all duration-300"
          >
            Adjust Filters
          </button>
        </div>
      </div>
    );
  }
  if (!quizStarted) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 shadow-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-600 bg-clip-text text-transparent">
              Chemistry Quiz
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Test your knowledge with interactive quizzes
          </p>
        </div>

        {/* Quiz Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Customize Your Quiz
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Class
              </label>
              <select
                value={filters.class}
                onChange={(e) => setFilters(prev => ({ ...prev, class: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Classes</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Levels</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Topic
              </label>
              <select
                value={filters.topic}
                onChange={(e) => setFilters(prev => ({ ...prev, topic: e.target.value }))}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="all">All Topics</option>
                <option value="Atomic Structure">Atomic Structure</option>
                <option value="Chemical Bonding">Chemical Bonding</option>
                <option value="Hydrocarbons">Hydrocarbons</option>
                <option value="Organic Chemistry">Organic Chemistry</option>
                <option value="Electrochemistry">Electrochemistry</option>
                <option value="Industrial Chemistry">Industrial Chemistry</option>
              </select>
            </div>
          </div>
        </div>

        {/* Start Quiz Button */}
        <div className="text-center">
          <motion.button
            onClick={startQuiz}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                       rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl 
                       hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Quiz
          </motion.button>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            5 questions • Mixed difficulty • Instant feedback
          </p>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / currentQuiz.length) * 100);
    
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Trophy className={`w-16 h-16 ${getScoreColor(percentage)}`} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Quiz Completed!
            </h2>
            <p className={`text-2xl font-semibold ${getScoreColor(percentage)}`}>
              {getScoreMessage(percentage)}
            </p>
          </div>

          {/* Results Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {score}/{currentQuiz.length}
              </div>
              <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Correct Answers
              </div>
            </div>
            
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {percentage}%
              </div>
              <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                Score
              </div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {formatTime(timeSpent)}
              </div>
              <div className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                Time Spent
              </div>
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Question Review
            </h3>
            {currentQuiz.map((question, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect 
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">
                        {question.question}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Your answer: {question.options[userAnswer || 0]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Correct answer: {question.options[question.correctAnswer]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                         rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 
                         transition-all duration-300 flex items-center space-x-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Take Another Quiz</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quiz in progress
  const currentQuestion = currentQuiz[currentQuestionIndex];
  
  // Additional safety check
  if (!currentQuestion) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Quiz Error
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There was an error loading the current question. Please restart the quiz.
          </p>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                       rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 
                       transition-all duration-300"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }
  
  const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            Question {currentQuestionIndex + 1} of {currentQuiz.length}
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeSpent)}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
            currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentQuestion.difficulty}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {currentQuestion.topic}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-to-r from-purple-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestionIndex}
        className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ";
            
            if (showExplanation) {
              if (index === currentQuestion.correctAnswer) {
                buttonClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
              } else {
                buttonClass += "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
              }
            } else {
              if (selectedAnswer === index) {
                buttonClass += "border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300";
              } else {
                buttonClass += "border-gray-200 dark:border-gray-600 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/10 text-gray-900 dark:text-white";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showExplanation}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-bold ${
                    showExplanation && index === currentQuestion.correctAnswer ? 'border-green-500 bg-green-500 text-white' :
                    showExplanation && index === selectedAnswer && index !== currentQuestion.correctAnswer ? 'border-red-500 bg-red-500 text-white' :
                    selectedAnswer === index ? 'border-purple-500 bg-purple-500 text-white' :
                    'border-gray-300 dark:border-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                Explanation:
              </h4>
              <p className="text-blue-700 dark:text-blue-400">
                {currentQuestion.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={resetQuiz}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Exit Quiz
          </button>
          
          <div className="space-x-3">
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
                           rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                           rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 
                           transition-all duration-300"
              >
                {currentQuestionIndex < currentQuiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};