/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf9f8',
          100: '#f5f1f0',
          200: '#ede7e5',
          300: '#dcc9c0',
          400: '#c5aba0',
          500: '#8b7ebd',
          600: '#5b4e9e',
          700: '#4a4180',
          800: '#3a3361',
          900: '#2c2541',
        },
        success: {
          50: '#f0f9f5',
          100: '#d4f0e3',
          500: '#a8d5ba',
          600: '#7fb8a0',
        },
        danger: {
          50: '#fdf3f3',
          500: '#e8a0a0',
          600: '#d97979',
        },
        neutral: {
          50: '#faf9f8',
          100: '#f7f6f3',
          200: '#ede7e5',
          300: '#d4d0c8',
          400: '#b8b2a6',
          500: '#9d9689',
          600: '#7d7568',
          700: '#5a524a',
          800: '#3a3530',
          900: '#2c2c2c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
        '4xl': ['36px', '40px'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(10px)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
