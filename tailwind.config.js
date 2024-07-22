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

  ],
  theme: {
    extend: {
      colors: {
        'main-color': '#0E1116',
        'main-orange': '#F5A524',
      }
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}