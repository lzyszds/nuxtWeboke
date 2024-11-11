import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import prismjs from 'vite-plugin-prismjs';
import path from 'path';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  devServer: {
    port: 1027,
  },

  runtimeConfig: {
    // 仅服务器端可用的配置
    apiSecret: 'my-secret',
    // 公开的配置，客户端和服务端均可访问
    public: {
      baseURL: process.env.BASE_URL || 'http://39.108.89.65:2024/',
    },
  },
  srcDir: './src',

  css: [
    '~/assets/styles/animate.min.css',
    '~/assets/styles/animation.css',
    '~/assets/fonts/index.css',
    '~/assets/styles/default.css',
    'highlight.js/styles/atom-one-dark.css',
    '@fancyapps/ui/dist/fancybox.css'
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
    '@vueuse/motion/nuxt',
    '@nuxt/eslint',
    "nuxt-lodash",
    // '@element-plus/nuxt',
  ],

  plugins: [
    '~/plugins/v-transition.ts',
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
    preset: 'static',
    routeRules: {
      // '/api/openai/getAiFox': { cors: true },  // 允许跨域
    },
  },
  vite: {
    // envDir: path.resolve(__dirname, './env'),
    server: {
      proxy: {
        '/hono': {
          target: 'http://localhost:2024',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/hono/, '')
        },
      },
    },

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
      prismjs({
        languages: ['json', 'js', 'ts', 'css', 'less', 'html', 'markdown', 'sql', 'typescript', 'vim', "git", "bash"],
        plugins: ['line-numbers', 'show-language', 'copy-to-clipboard', 'inline-color'],
        theme: 'okaidia',// 主题
        css: true,
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

  runtimeConfig: {
    public: {
      VITE_BASE_URL: process.env.VITE_BASE_URL,
      VITE_APP_API_BASE_NAME: process.env.VITE_APP_API_BASE_NAME,
      VITE_ROUTER_MODE: process.env.VITE_ROUTER_MODE,
    }
  },

  future: {
    // 启用 Nuxt 4 功能前瞻
    compatibilityVersion: 4,
  },


  compatibilityDate: '2024-07-19',
})
