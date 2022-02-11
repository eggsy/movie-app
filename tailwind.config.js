module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        brand: {
          "dark-blue": "#1D556F",
          blue: "#288FB4",
          yellow: "#EFDDB2",
          red: "#FA360A",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
