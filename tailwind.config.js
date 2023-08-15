/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '2000px'
      },
      colors: {
        'buzzhub-green': '#ECF6EF',
        'buzzhub-green-dark': '#B5D6B2',
        'buzzhub-yellow': '#FCB017',
        'buzzhub-navy': '#2B2D42',
      },
    }
  },
  plugins: [],
}