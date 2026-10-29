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