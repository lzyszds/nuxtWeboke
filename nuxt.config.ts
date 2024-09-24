import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 1027,

  },
  srcDir: './src',

  css: [
    '~/assets/css/animate.min.css',
    '~/assets/css/animation.css',
    '~/assets/fonts/index.css',
    '~/assets/styles/default.css'
  ],
  modules: [
    "@vueuse/nuxt",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@nuxtjs/tailwindcss",
    // "@nuxtjs/seo",
    // '@nuxtjs/robots',
    'dayjs-nuxt',
    '@nuxt/eslint',
    "nuxt-lodash",
    '@element-plus/nuxt'
  ],

  plugins: [
    '~/plugins/v-transition.ts'
  ],

  tailwindcss: {
    configPath: './src/tailwind.config',
  },

  colorMode: {
    preference: 'light',
    classSuffix: '',
  },

  // Sitemap module configuration: https://nuxtseo.com/site-config/getting-started/how-it-works
  // site: {
  //   url: process.env.NODE_ENV === 'production'
  //     ? 'https://your-production-url.com'
  //     : 'http://localhost:3000', // FIXME: Your website URL
  //   name: 'My Awesome Site',
  //   description: 'This is my great Nuxt.js website',
  //   defaultLocale: 'zh', // 默认语言
  //   trailingSlash: false, // URL 是否以斜杠结尾 

  // },

  ssr: true,
  nitro: {
    compressPublicAssets: { brotli: true, gzip: true },
    preset: 'static'
  },
  vite: {

    vue: {
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    },
    plugins: [
      Components({
        dts: 'types/components.d.ts',
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
      AutoImport({
        imports: ['pinia'],
        dts: 'types/auto-imports.d.ts',
        dirs: ['hooks/**', 'store', 'constants', 'utils/**', 'layouts'],
        vueTemplate: true,
        resolvers: [
          TDesignResolver({
            library: 'vue-next',
          }),
        ],
      }),
    ],
  },

  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap' },
      ],
      script: [
        // { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js" },
      ]
    }
  },

  future: {
    // 启用 Nuxt 4 功能前瞻
    compatibilityVersion: 4,
  },


  compatibilityDate: '2024-07-19',
})
