/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0a0b0e',
          card: '#12151c',
          neon: '#00ff66',
          cyan: '#00e5ff',
          crimson: '#ff2a5f',
          orange: '#ff6b00',
          accent: '#00ff66',
          muted: '#8e96a5'
        }
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        sans: ['Inter', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite alternate',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 255, 102, 0.2)' },
          '100%': { boxShadow: '0 0 35px rgba(0, 255, 102, 0.6)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    },
  },
  plugins: [],
}
