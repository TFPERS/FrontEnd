module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FA4616",
        secondary: "#FFC72C",
        tertiary: "#FFFFFF",
      },
      boxShadow: {
        "3xl": "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "4xl": "0px 10px 10px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
};
