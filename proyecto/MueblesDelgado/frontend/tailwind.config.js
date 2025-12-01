/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#253F70',
        customBlueLight: '#1A4A89',
        baseclr: '#253f70',
        lineclr: '#42434a',
        hoverclr: '#6591bdf0',
        textclr: '#e6e6ef',
        secondarytextclr: '#b0b3c1',
        backgroundprimary: '#ffffff',
        btnyellow: '#ffcb66',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}