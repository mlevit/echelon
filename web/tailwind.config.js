module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // primary: {
        //   light: "#fc144d",
        //   DEFAULT: "#fc144d",
        //   dark: "#3b82f6",
        // },
        accent: { light: "#fc144d", DEFAULT: "#fc144d", dark: "#3b82f6" },
        background: {
          lightest: "#ffffff", // white
          light: "#f9fafb", // gray-50
          DEFAULT: "#f9fafb", // gray-50
          dark: "#374151", // gray-700
          darker: "#111827", // gray-900
          darkest: "#030712", // gray-950
        },
        inputBorder: {
          light: "#d1d5db", // gray-300
          DEFAULT: "#d1d5db", // gray-300
          dark: "#4b5563", // gray-600
        },
        inputBg: {
          light: "#f9fafb", // gray-50
          DEFAULT: "#f9fafb", // gray-50
          dark: "#374151", // gray-700
        },
        tableBorder: {
          light: "#d1d5db", // gray-300
          DEFAULT: "#d1d5db", // gray-300
          dark: "#4b5563", // gray-600
        },
        tableHeadBg: {
          light: "#f9fafb", // gray-50
          DEFAULT: "#f9fafb", // gray-50
          dark: "#374151", // gray-700
        },
        tableText: {
          light: "#6b7280", // gray-500
          DEFAULT: "#6b7280", // gray-500
          dark: "#9ca3af", // gray-400
        },
        border: {
          lighter: "#e5e7eb", // gray-200
          light: "#d1d5db", // gray-300
          DEFAULT: "#d1d5db", // gray-300
          dark: "#4b5563", // gray-600
          darker: "#374151", // gray-700
        },
        hover: {
          light: "#f3f4f6", // gray-100
          DEFAULT: "#f3f4f6", // gray-100
          dark: "#374151", // gray-700
        },
        textPrimary: {
          light: "#111827", // gray-900
          DEFAULT: "#111827", // gray-900
          dark: "#f9fafb", // gray-50
        },
        textSecondary: {
          light: "#374151", // gray-700
          DEFAULT: "#374151", // gray-700
          dark: "#9ca3af", // gray-400
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
