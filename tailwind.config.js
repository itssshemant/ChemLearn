/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      gridTemplateColumns: {
        '18': 'repeat(18, minmax(0, 1fr))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        neon: {
          cyan: '#00D9FF',
          green: '#00FF88',
          purple: '#6366F1',
          pink: '#FF00FF',
        }
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 217, 255, 0.5)',
        'glow-lg': '0 0 30px rgba(0, 217, 255, 0.6)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};