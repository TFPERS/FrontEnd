module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-coquelicot': "#FA4616",
        'primary-light-yellow': "#FFC72C",
        'primary-white': "#FFFFFF",
        'primary-black': "#000000",
        'secondary-gray': "#C4C4C4",
        'secondary-green': "#17A87B",
        'secondary-red': "#FA2816",
        secondary: "#FFC72C",
        tertiary: "#FFFFFF",
      },
      boxShadow: {
        "3xl": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "4xl": "0px 10px 10px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        "hero-pattern": "url('/images/BGHPage.png')",
      },
    },
  },
  plugins: [],
};
