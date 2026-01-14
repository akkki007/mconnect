/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat_700Bold", "Montserrat_600SemiBold", "Montserrat_500Medium"],
        "montserrat-bold": ["Montserrat_800ExtraBold", "Montserrat_700Bold"],
        opensans: ["OpenSans_400Regular", "OpenSans_600SemiBold"],
      },
    },
  },
  plugins: [],
}
