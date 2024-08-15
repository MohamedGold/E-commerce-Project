/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1500px',

        },
       
      },
      boxShadow: {
        '3xl': '1px 1px 10px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

