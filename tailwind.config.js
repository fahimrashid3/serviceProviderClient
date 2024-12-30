/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Specify the files Tailwind should scan for class usage
  theme: {
    extend: {
      colors: {
        // Custom dark color palette
        dark: {
          200: "#F3F3F3",
          300: "#E8E8E8",
          400: "#D0D0D0",
          500: "#A1A1A1",
          600: "#737373",
          700: "#444444",
          800: "#111827", // Darker shade for text or UI elements
          900: "#151515", // Almost black for backgrounds or text
        },
        // Custom primary color palette (lavender theme)
        primary: {
          100: "#F4F2FA", // Very light lavender for backgrounds
          200: "#E6DFF6", // Light lavender for subtle highlights
          300: "#C2B3E0", // Soft purple for secondary highlights
          400: "#8C66CC", // Base primary color, vibrant purple
          500: "#743BB0", // Slightly deeper base for emphasis
          600: "#5D2994", // Dark purple for active or hover states
          700: "#471F77", // Deep purple for buttons and important UI
          800: "#311559", // Rich, dark purple for shadows and accents
          900: "#1D0A3A", // Nearly black for text or strong contrast
        },
        // Uncomment the block below to switch to a yellow primary color theme
        // primary: {
        //   100: "#FFF9E1",  // Very soft yellow for subtle backgrounds
        //   200: "#FDF1B8",  // Light yellow for highlights
        //   300: "#FBE293",  // Soft pastel yellow for secondary elements
        //   400: "#F7D063",  // Base primary color, warm yellow
        //   500: "#E6BA50",  // Slightly deeper yellow for emphasis
        //   600: "#D1A746",  // Warm, light yellow for active or hover states
        //   700: "#BA933C",  // Light golden yellow for buttons and key UI elements
        //   800: "#A37F32",  // Muted yellow for shadows and accents
        //   900: "#8A6B28",  // Soft brown-yellow for strong contrast
        // }
      },
    },
  },
  plugins: [daisyui], // Include daisyUI plugin for additional UI components
};
