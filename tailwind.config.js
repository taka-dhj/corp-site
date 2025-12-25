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
        'normal': '600',
        'medium': '600',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800'
      },
      fontSize: {
        'xs': ['1.1rem', { lineHeight: '1rem' }],
        'sm': ['1rem', { lineHeight: '1.25rem' }],
        '3xl': ['2.9rem', { lineHeight: '2.25rem' }],
        '5xl': ['2.8rem', { lineHeight: '1' }],
      },
      animation: {
        'zoom-in': 'zoom-in 5s ease-out forwards',
      }
    },
  },
  plugins: [],
};