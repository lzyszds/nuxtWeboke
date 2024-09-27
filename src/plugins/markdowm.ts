import { defineNuxtPlugin } from '#app'
// import 'highlight.js/lib/common'
import VueMarkdownEditor from '~/utils/markDownCreate'; //markdown配置

//@ts-ignore
import { Fancybox } from "@fancyapps/ui"


export default defineNuxtPlugin((nuxtApp) => {


  // 配置 Fancybox
  nuxtApp.vueApp.config.globalProperties.$fancyapps = { Fancybox }
  nuxtApp.vueApp.use(VueMarkdownEditor)
  // 返回一个包含你想在组件中使用的任何函数或变量的对象
  return {
    provide: {
      fancybox: Fancybox,
      VueMarkdownEditor
    }
  }
})
