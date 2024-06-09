/** @type {import('tailwindcss').Config} */
const {fontFamily} = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./App/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'PRIMARY': '#354573', 
        'LIGHT-PRIMARY': '#E9EFFF',
        'SECONDARY': '#6F7597',
        'GREEN': '#32C48D',
        'LIGHT-GREEN': '#F2FAF7', 
        'SECONDARY-GREEN': '#00C6C0',
        'RED': '#FF5F54',
        'BLUE': '#208BE8',
        'BROWN': '#580600',
        'BEIGE': '#F4E9D9',
        'BACKGROUND': '#F2FAFF',
        'SECONDARY-BG': '#C6D6FF',
        'LIGHT-PINK': '#F6E8E8',
        'LIGHT-RED': '#FFD0D0'
      },
      fontFamily: {
        custom: ['lato', ...fontFamily.sans]
      }
    },
  },
  plugins: [],
}

