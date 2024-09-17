const { nextui } = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/button.js",
    "./node_modules/@nextui-org/theme/dist/components/navbar.js",
    "./node_modules/@nextui-org/theme/dist/components/dropdown.js",
    "./node_modules/@nextui-org/theme/dist/components/avatar.js",
    "./node_modules/@nextui-org/theme/dist/components/table.js",
    "./node_modules/@nextui-org/theme/dist/components/input.js",
    "./node_modules/@nextui-org/theme/dist/components/date-picker.js",

  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#111827',
        'main-orange': '#F5A524',
        'danger': '#FF0000',
        'gray-blue': '#23272F'
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)']
      }
    },
  },
  darkMode: 'class',
  plugins: [nextui({ darkMode: 'class' })],
}