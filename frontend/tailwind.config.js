/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {
        height: {
          'sc': '22.5vh',
        },
        boxShadow: {
          'left-up': '-70px -70px 100px #BBA5F4',
          'right-up': '70px -70px 100px #BBA5F4',
        },
        fontFamily: {
          'sans': ['Poppins', 'sans-serif'],
          'code': 'Fira Code',
        },
        animation: {
          marquee: "marquee 5s linear infinite",
        },
        keyframes: {
          marquee: {
            "0%": { transform: "translateX(100%)" },
            "100%": { transform: "translateX(-100%)" },
          },
        },
      },
    },
    plugins: [],
  }