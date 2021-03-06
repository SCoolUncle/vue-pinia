module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily:{
      sans: ['Graphik', 'sans-serif'],
    },
    container: {
      padding: {
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
