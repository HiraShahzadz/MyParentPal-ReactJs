/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      colors: {
        // ... other colors ...
        customPurple: '#B089BE',
        customColor: {
          DEFAULT: '#B089BE', // Set your custom color here
          
        },
      }

    },
  },
  plugins: [],
});
