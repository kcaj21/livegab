/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#282A3A',
      }
    },
  },
  plugins: [require("daisyui")],
}

