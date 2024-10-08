import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgba(var(--background))",
        textColor: "rgba(var(--text-color))",
        sidebarBg: "rgba(var(--sidebar-bg))",
        commentBg: "rgba(var(--comment-bg))",
        makeCommentBg: "rgba(var(--make-comment-bg))",
        starColor: "#eab308",
        white: "#fff",
        dark: "#0A0D17",
        darkBlue: "#0A2540",
        brandColor: "#1399FF",
        btnColor: "#4682B4",
        primary: "#1399FF",
        secondary: "#4682B4",
      },
      fontFamily: {
        sans: "Poppins",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
