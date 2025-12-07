/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'seed-blue-dark': '#063472',
        'seed-blue': '#0162b3',
        'seed-lime': '#aebd24',
        'seed-lime-light': '#d8ea32',
        'seed-white': '#fbfafc',
      },
    },
  },
  plugins: [],
}
