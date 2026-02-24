/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E8F5EC',
          100: '#C5E6CE',
          200: '#9FD5AD',
          300: '#78C48C',
          400: '#5AB873',
          500: '#1B6B3A',
          600: '#175E33',
          700: '#124F2B',
          800: '#0E4023',
          900: '#092E19',
        },
        accent: {
          50: '#FDF8E8',
          100: '#F9ECC5',
          200: '#F2D98B',
          300: '#E5C25A',
          400: '#D4AC3D',
          500: '#C9A84C',
          600: '#B08E2E',
          700: '#8D7124',
          800: '#6A551B',
          900: '#473812',
        },
        surface: {
          light: '#FAFAF7',
          DEFAULT: '#FAFAF7',
          dark: '#1A1A2E',
          'dark-card': '#232340',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
      borderRadius: {
        card: '16px',
      },
      minHeight: {
        tap: '48px',
      },
      minWidth: {
        tap: '48px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
