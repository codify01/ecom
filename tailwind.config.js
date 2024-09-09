/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pry":"#9c1bb8",
        "sec":"#d494e6"
      }
    },
  },
  plugins: [],
}

