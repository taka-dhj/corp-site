/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Klee One', 'Noto Sans JP', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 'sans-serif'],
        'display': ['Klee One', 'Noto Sans JP', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 'sans-serif'],
        'body': ['Klee One', 'Noto Sans JP', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 'sans-serif'],
        'elegant': ['Klee One', 'Noto Sans JP', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 'sans-serif'],
        'elegant-serif': ['Klee One', 'Noto Sans JP', 'Yu Gothic', 'YuGothic', 'Hiragino Kaku Gothic ProN', 'Hiragino Kaku Gothic Pro', 'sans-serif']
      },
      fontWeight: {
        'ultralight': '100',
        'thin': '200',
        'light': '300',
        'normal': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800'
      },
      animation: {
        'zoom-in': 'zoom-in 5s ease-out forwards',
      }
    },
  },
  plugins: [],
};