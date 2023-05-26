/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        active: "inset 0 -2px 0 0 ",
      },
      gridTemplateColumns: {
        layout: "1fr 2fr",
      },
    },
  },
  plugins: [],
};
