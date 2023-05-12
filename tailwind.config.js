/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.hmtl',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily:{
        satoshi:["Satoshi",'sans-serif'],
        inter:["Inter",'sans-serif'],
      }
    },
  },
  plugins: [],
}

