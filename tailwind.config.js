/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    fontFamily: {
      sans: ["CircularStd", "sans-serif", "serif"],
    },
    extend: {
      minWidth: {
        640: "640px",
        200: "200px",
        1280: "1280px",
      },
    },
  },
  plugins: [],
};
