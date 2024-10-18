import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const loadingSpinKeyFrames = {
  '0%, 100%': {
    boxShadow:
      '0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0',
  },
  '12.5%': {
    boxShadow:
      '0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em',
  },
  '25%': {
    boxShadow:
      '0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em',
  },
  '37.5%': {
    boxShadow:
      '0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em',
  },
  '50%': {
    boxShadow:
      '0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em',
  },
  '62.5%': {
    boxShadow:
      '0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em',
  },
  '75%': {
    boxShadow:
      '0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0',
  },
  '87.5%': {
    boxShadow:
      '0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em',
  },
};

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        // NOTE: var(--content-max-width)だとtailwindcss側で認知できないため、べた書きする
        /* 978px = コンテンツを表示する最大の幅 */
        'content-max': '978px',
      },
      colors: {
        corporate: {
          dark: 'var(--corporate-dark)',
          semiLight: 'var(--corporate-semi-light)',
          light: 'var(--corporate-light)',
        },
        orange: {
          dark: 'var(--orange-dark)',
          semiLight: 'var(--orange-semiLight)',
          light: 'var(--orange-light)',
        },
        blue: {
          light: 'var(--blue-light)',
        },
        gray: {
          dark: 'var(--gray-dark)',
          semiDark: 'var(--gray-semi-dark)',
          default: 'var(--gray-default)',
          semiLight: 'var(--gray-semi-light)',
          light: 'var(--gray-light)',
        },
        yellow: {
          dark: 'var(--yellow-dark)',
          light: 'var(--yellow-light)',
        },
        attention: {
          dark: 'var(--attention-dark)',
          light: 'var(--attention-light)',
        },
        link: {
          default: 'var(--link-default)',
          hover: 'var(--link-hover)',
          visited: 'var(--link-visited)',
        },
        autofill: 'var(--autofill)',
      },
      borderRadius: {
        '1/2': '50%',
      },
      boxShadow: {
        'x-xs': '0 2px 0 rgba(0,0,0,0.2)',
      },
      fontSize: {
        '3xs': '0.25rem',
        '2xs': '0.5rem',
      },
      fontFamily: {
        'noto-sans': ['var(--font-noto-sans)'],
        body: [
          'var(--font-noto-sans)',
          '"メイリオ"',
          'Meiryo',
          '"ヒラギノ角ゴ Pro W3"',
          '"Hiragino Kaku Gothic Pro"',
          '"MS Ｐゴシック"',
          '"MS PGothic"',
          'sans-serif',
        ],
      },
      margin: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/4': '25%',
      },
      zIndex: {
        appBar: '1100',
        drawer: '1200',
        backdrop: '1201',
        modal: '1200',
        tooltip: '1500',
        header: '1500',
      },
      minWidth: {
        '200px': '200px',
        '150px': '150px',
        lg: '1024px',
        '1/2': '50%',
      },
      keyframes: {
        'loading-spin': loadingSpinKeyFrames,
      },
      animation: {
        'loading-spin': 'loading-spin 1.3s infinite linear',
      },
      maxWidth: {
        /* 978px = コンテンツを表示する最大の幅 */
        'content-max': 'var(--content-max-width)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.pt-safe-area': {
          paddingTop: 'env(safe-area-inset-top)',
        },
        '.pb-safe-area': {
          paddingBottom: 'env(safe-area-inset-bottom)',
        },
        '.mt-safe-area': {
          marginTop: 'env(safe-area-inset-top)',
        },
        '.mb-safe-area': {
          marginBottom: 'env(safe-area-inset-bottom)',
        },
        '.min-h-main-content-pc': {
          // NOTE: HeaderやFooterの高さが変更になった場合、合わせて修正すること
          minHeight: 'calc(100vh - 201px)',
        },
        '.min-h-main-content-sp': {
          // NOTE: HeaderやFooterの高さが変更になった場合、合わせて修正すること
          minHeight: 'calc(100vh - 169px)',
        },
      });
    }),
  ],
} satisfies Config;
