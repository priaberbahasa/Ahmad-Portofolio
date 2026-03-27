/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Lora"', "Georgia", "serif"],
        sans: ['"Source Sans 3"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        page: { bg: "#FAFAF8", card: "#FFFFFF", muted: "#F5F3EF" },
        ink: { DEFAULT: "#1a1a2e", light: "#4a4a5a", muted: "#8a8a9a", faint: "#c5c5cf" },
        navy: { DEFAULT: "#1e3a5f", light: "#2a5080", dark: "#132847" },
        gold: { DEFAULT: "#b08d57", light: "#c9a96e", dark: "#8a6d3b" },
      },
    },
  },
  plugins: [],
};
