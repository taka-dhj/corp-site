/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Zen Maru Gothic', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif'],
        'body': ['Zen Maru Gothic', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif'],
        'elegant': ['Zen Maru Gothic', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif'],
        'elegant-serif': ['Zen Maru Gothic', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'sans-serif']
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