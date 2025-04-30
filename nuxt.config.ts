import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  devServer: {
    port: 1027,
  },
  

  runtimeConfig: {
    // 仅服务器端可用的配置
    apiSecret: 'my-secret',
    // 公开的配置，客户端和服务端均可访问
    public: {
      BASE_URL:
        process.env.NODE_ENV === 'production'
          ? 'https://www.api.lzyszds.cn'
          :'http://localhost:2024',// 'https://www.api.lzyszds.cn',//'http://localhost:2024',
      VITE_ROUTER_MODE: 'history',
    },
  },

  srcDir: './src',

  css: [
    '~/styles/animate.min.css',
    '~/styles/animation.css',
    '~/styles/font.css',
    '~/styles/default.css',
    '~/styles/globals.css',
    '@fancyapps/ui/dist/fancybox/fancybox.css',
  ],

  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',

    // "@nuxtjs/seo",
    // '@nuxtjs/robots',
    '@vueuse/motion/nuxt',
    '@nuxt/eslint',
    // 'nuxt-lodash',
    // '@element-plus/nuxt',
  ],

  plugins: ['~/plugins/v-transition.ts'],

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
    // preset: 'static', // 作用：开启静态部署
    routeRules: {
      // '/api/openai/getAiFox': { cors: true },  // 允许跨域
    },
    devProxy: {
      '/api': {
        target: 'http://localhost:2024/api', // 目标接口地址
        changeOrigin: true,
        prependPath: true // 是否保留路径前缀
      }
    }
  },
  vite: {
    // envDir: path.resolve(__dirname, './env'),
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
      title: 'Jz - 分享你的生活',
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",

      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
        // 网站图标
        { rel: 'shortcut icon', href: '/icon/logo.svg' },
        { rel: 'apple-touch-icon', href: '/icon/logo.svg' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap',
        },
      ],
      script: [
        // { src: "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js" },
      ],
    },
  },

  future: {
    // 启用 Nuxt 4 功能前瞻
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-07-19',
});
