/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
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
  plugins: [],
};
