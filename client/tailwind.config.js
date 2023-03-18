/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
    backgroundColor: {
      modalBackground: ' rgba(0, 0, 0, 0.75)',
      dashboardBackground: '#e2e8f0',
      white: 'rgba(255,255,255, 1)',
      darkBlue: 'rgb(29 78 216)',
      blue: 'rgb(59 130 246)'
    }
  },
  plugins: [],
}
