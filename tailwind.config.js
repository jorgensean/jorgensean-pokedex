/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      rotate: {
        30: "30deg",
      },
      colors: {
        normal: "#a8a77a",
        bug: "#a6b91a",
        dark: "#705746",
        dragon: "#6f35fc",
        electric: "#f7d02c",
        fairy: "#d685ad",
        fighting: "#c22e28",
        fire: "#ee8130",
        flying: "#a98ff3",
        ghost: "#735797",
        grass: "#7ac74c",
        ground: "#e2bf65",
        ice: "#96d9d6",
        poison: "#a33ea1",
        psychic: "#f95587",
        rock: "#b6a136",
        steel: "#b7b7ce",
        water: "#6390f0",
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
  safelist: [{ pattern: /bg-./ }, { pattern: /text-./ }],
}
