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
      },
    },
    plugins: [],
  }