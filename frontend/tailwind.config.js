/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
       colors: {
        'pink-start': '#ff75a0',
        'purple-mid': '#a362e5',
        'orange-end': '#ff8c42',
      },
    },
  },
  plugins: [],
};

