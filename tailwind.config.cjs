/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      colors: {
        MyPurple: {
          400: "#B089BE",
          600: "#B089BE",
        },
      },

    },
  },
  plugins: [],
});
