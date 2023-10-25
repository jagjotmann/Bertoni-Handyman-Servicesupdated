const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "custom-gray": "#2D333A",
      },
      boxShadow: {
        "custom-shadow": "4px 4px 15px rgba(0, 0, 0, 0.20)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
