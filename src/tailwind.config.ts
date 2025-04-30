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
      'dark-primary': '#5161ce',
      'dark-color-level-b': '#c6c6c6',
      'dark-color-level-d': '#d5d5d5',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))'
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))'
      },
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))'
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      chart: {
        '1': 'hsl(var(--chart-1))',
        '2': 'hsl(var(--chart-2))',
        '3': 'hsl(var(--chart-3))',
        '4': 'hsl(var(--chart-4))',
        '5': 'hsl(var(--chart-5))'
      },
      sidebar: {
        DEFAULT: 'hsl(var(--sidebar-background))',
        foreground: 'hsl(var(--sidebar-foreground))',
        primary: 'hsl(var(--sidebar-primary))',
        'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
        accent: 'hsl(var(--sidebar-accent))',
        'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        border: 'hsl(var(--sidebar-border))',
        ring: 'hsl(var(--sidebar-ring))'
      }
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
  plugin(function ({ addUtilities }) {
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
