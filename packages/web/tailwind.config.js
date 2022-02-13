module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#1A374D',
        'med-dark-blue': '#284f6d',
        'med-blue': '#406882',
        'light-blue': '#6998AB',
        'super-light-blue': '#B1D0E0'
      },
      spacing: {
        '10p': '10%',
        '90p': '90%',
        '5/12': '41.666%'
      }
    },
  },
  plugins: [],
}
