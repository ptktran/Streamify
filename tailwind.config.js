/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '300px',
      'md': '600px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'gray-bg': '#2B2B2B',
        'gray-comps': '#201f1f',
        'gray-dark': '#181818',
        'gray-text': '#A6A6A6',
        'red-main': '#E71818',
        'green-main': '#6edc5f'
      }
    },
    fontFamily: {
      sans: ['Inter', 'Helvetica', 'sans-serif']
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
