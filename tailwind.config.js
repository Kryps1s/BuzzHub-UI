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
        'buzzhub-yellow': '#FBC86A',
        'buzzhub-yellow-dark': '#FCB017',
        'buzzhub-navy': '#545778',
        'buzzhub-navy-dark': '#2B2D42',
        'buzzhub-grey-light' : '#F8F9FA'
      },
      minHeight: {
        '40': '10rem',
      },
      maxHeight: {
        '4/5': '80%',
      }
  },
  plugins: [],
  }
}