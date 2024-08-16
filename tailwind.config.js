/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "#FEFDED",
      secondary: "#C6EBC5",
      veg: "#A1C398",
      nonveg: "#FA7070",
      white: "#FFFFFF",
      maroon: "#C70039",
      green: "#5bb450",
      black: "#000000",
      gray: "#EDEDED",
      orange:"#FF7400",
      yellow:"#FFAA00"
    },
  },
  plugins: [],
};
