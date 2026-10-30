/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Ubuntu', 'sans-serif'], // ✅ Set Ubuntu as default
      },
      colors: {
        // ✅ Overriding Tailwind's default blue/indigo to NLS Colors
        indigo: {
          50: '#F1F5F9',
          100: '#E2E8F0',
          500: '#186BB1', // Medium Blue
          600: '#186BB1', // Medium Blue (Primary Buttons)
          700: '#124F82', // Darker Blue for hover
          800: '#082845', // Deep Navy
          900: '#051C2F', // Darkest Navy
        },
        blue: {
          50: '#F1F5F9',
          100: '#E2E8F0',
          500: '#186BB1',
          600: '#186BB1',
          700: '#124F82',
          800: '#082845',
          900: '#051C2F',
        },
        nls: {
          navy: '#082845',
          blue: '#186BB1',
          grey: '#F1F5F9',
          gold: '#C6AA58',
        }
      }
    },
  },
  plugins: [],
}