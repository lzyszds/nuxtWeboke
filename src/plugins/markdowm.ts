import { defineNuxtPlugin } from '#app'
//@ts-ignore
import { Fancybox } from "@fancyapps/ui"

export default defineNuxtPlugin((nuxtApp) => {

  // 配置 Fancybox
  nuxtApp.vueApp.config.globalProperties.$fancyapps = { Fancybox }

})
