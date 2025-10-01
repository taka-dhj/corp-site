/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif'],
        'body': ['Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif'],
        'elegant': ['Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif'],
        'elegant-serif': ['Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif']
      },
      fontWeight: {
        'ultralight': '100',
        'thin': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700'
      },
      animation: {
        'zoom-in': 'zoom-in 5s ease-out forwards',
      }
    },
  },
  plugins: [],
};