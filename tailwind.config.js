/** @type {import('tailwindcss').Config} */
const {fontFamily} = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./App/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'PRIMARY': '#354573', 
        'LIGHT_PRIMARY': '#E9EFFF',
        'LIGHT_GREEN': '#F2FAF7', 
        'SECONDARY': '#6F7597',
        'GREEN': '#32C48D',
        'RED': '#FF5F54',
        'BROWN': '#580600',
        'BEIGE': '#F4E9D9',
        'BACKGROUND': '#F2FAFF',
        'SECONDARY_BG': '#C6D6FF'
      },
      fontFamily: {
        custom: ['lato', ...fontFamily.sans]
      }
    },
  },
  plugins: [],
}

