/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",
        secondary: "#EF4444", // 🔥 你想要的 text-secondary
      },
    },
  },
  plugins: [],
}

