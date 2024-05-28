/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: '#010101',
        light: '#ffffff',
        'dark-gray': '#1d1e22',
        'light-gray': '#444857',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        'custom-w-h': { raw: '((max-width: 768px) and (max-height: 732px))' },
      },
    },
  },
  plugins: [],
}
