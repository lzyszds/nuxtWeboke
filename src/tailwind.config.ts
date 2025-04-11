// tailwind config file
import plugin from 'tailwindcss/plugin';

// const Rem = generateRem()
// console.log(`generateRem successful,1 = ${Rem[1]}`)

export const mode = 'jit';
export const darkMode = 'class';
export const theme = {
  extend: {
    colors: {
      'light-background': '#FFFFFF',
      'themeColor': '#5161ce',
      'themeColor-hover': '#5161ce40',
      'borderColor': '#ffe14d',
      'color': '#2c3e50'/*light*/,

      /*dark*/
      'dark-background': 'rgb(29,29,36)',
      'dark-color': '#c2c2c2',
      'dark-color-level-b': '#c6c6c6',
      'dark-color-level-d': '#d5d5d5',
    },
    backgroundImage: {
      // 'lattice': 'linear-gradient(#e0e0e0 2px, transparent 0), linear-gradient(90deg, #e0e0e0 1px, transparent 0)'
    },
    text: {},
    fontFamily: {
      sans: ['HarmonyOS_Regular'],
      dindin: ['dindin'],
    },
    dropShadow: {
      'text': '0 0 1px #000000',
    },
    animation: {
      'spin-slow': 'spin 3s linear infinite',
      'jackInTheBox': 'jackInTheBox .5s both',
    },
    // spacing: {
    //   'banner-height': '494px',
    //   ...Rem,
    // },
    // lineHeight: {
    //   ...Rem,
    // },
    // fontSize: {
    //   ...Rem,
    // },
    // minHeight: {
    //   ...Rem,
    // },
    // minWidth: {
    //   ...Rem,
    // },
    // maxWidth: {
    //   ...Rem,
    // },
    // maxHeight: {
    //   ...Rem,
    // },
    letterSpacing: {
      doublewidest: '.2em',
    },
  },
  screens: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const plugins = [
  plugin(function({ addUtilities }) {
    addUtilities({
      '.scrollbar-hide': {
        /* IE and Edge */
        '-ms-overflow-style': 'none',

        /* Firefox */
        'scrollbar-width': 'none',

        /* Safari and Chrome */
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
    });
  }),
];
export const content = ['app.vue', '/pages/**/*.vue'];

/**1 = 1/16rem */
// function generateRem() {
//   const result = {}
//   console.log('generating width')
//   for (let i = 0; i <= 1920; i++) {
//     result[i] = `${i / 16}rem`
//   }
//   return result
// }
