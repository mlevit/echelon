module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#fc144d",
          DEFAULT: "#fc144d",
          dark: "#3b82f6",
        },
        border: {
          light: "#d1d5db", // grey-300
          DEFAULT: "#d1d5db", // grey-300
          dark: "#4b5563", // grey 600
        },
        hover: {
          light: "#f3f4f6", // grey-100
          DEFAULT: "#f3f4f6", // grey-100
          dark: "#374151", // grey-700
        },
        textPrimary: {
          light: "#111827", // grey-900
          DEFAULT: "#111827", // grey-900
          dark: "#f9fafb", // grey-50
        },
        textSecondary: {
          light: "#374151", // grey-700
          DEFAULT: "#374151", // grey-700
          dark: "#9ca3af", // grey-400
        },
        background: {
          light: "#f9fafb", // grey-50
          DEFAULT: "#f9fafb", // grey-50
          dark: "#374151", // grey-700
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
