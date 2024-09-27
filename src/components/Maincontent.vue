<!-- 详情页主要内容 -->

<script setup lang='ts'>
import { onMounted, getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'
import { useEventListener } from '@vueuse/core';
//@ts-ignore
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'

const { proxy } = getCurrentInstance() as any
const props = defineProps({
  main: String,
  aid: Number,
});

const emit = defineEmits(['update'])
const aiContent = ref('AI摘要还在生成中，请稍等...')
const aiContentHtml = computed(() => {
  return xss.process(
    VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(aiContent.value)
  )
})
const doneFlag = ref(false)

onMounted(() => {
  setTimeout(async () => {
    const elimg = document.querySelector('#articleMain') as HTMLDivElement
    if (elimg) {
      //给当前页面所有图片添加data-fancybox属性，让其可以点击放大
      elimg.querySelectorAll('img').forEach((element: any) => {
        element.setAttribute('data-fancybox', 'true')
        proxy.$fancyapps.Fancybox.bind('data-fancybox', {
          dragToClose: false,
          Image: {
            zoom: false,
          },
        })
        element.src = element.src.replace('http://localhost:1027/firstHonoApi', 'http://localhost:2024')
        const wrapper = document.createElement('div')
        wrapper.className = 'img-wrapper'
        element.parentNode.insertBefore(wrapper, element)
        wrapper.appendChild(element)
        useEventListener(wrapper, 'click', () => {
          element.click()
        })

        const pseudo = document.createElement('div')
        pseudo.className = 'img-pseudo'
        pseudo.setAttribute('data-clipboard-text', element.src.split('/').pop())
        wrapper.appendChild(pseudo)
      })
    }
    //给当前页面所有代码块复制按钮添加复制声明
    const copys = document.querySelectorAll('button.v-md-copy-code-btn') as any
    copys.forEach((element: any) => {
      useEventListener(element, 'click', (e: any) => {
        const text = e.target.parentElement.firstChild.innerText
        //将text复制到剪切板
        navigator.clipboard.writeText(text).then(() => {
          ElNotification.closeAll()
          ElNotification({
            dangerouslyUseHTMLString: true,
            message: `<i class="fa fa-copy"></i> 复制成功,转载请声明来源！`,
            position: 'bottom-right',
            duration: 2000,
            customClass: 'copy-success',
          })
        }, function (res) {
          console.log("lzy ~ res", res)
        });
      })
    })
    emit('update', 1)

    getAbstract('/firstHonoApi/api/openAI/getAifox?aid=' + props.aid)

  }, 500)
})


//获取AI摘要
function getAbstract(url: string) {
  return new Promise<any>(async (_resolve, reject) => {

    try {
      const result = await fetch(url)
      if (result.status != 200) {
        aiContent.value = '摘要生成失败，请重试！'
        return reject("出错了看看怎么解决吧！")
      }
      const textDecoder = new TextDecoder()
      const reader = result.body?.getReader()!
      aiContent.value = ''
      while (true) {
        const { done, value } = await reader.read()
        doneFlag.value = done
        if (done) {
          break
        }
        const text = textDecoder.decode(value)
        const lines = text.split('\n'); // 将部分数据与新数据合并后再按行分割

        for (let line of lines) { // 逐行处理数据
          // 添加延迟，单位为毫秒（例如延迟 100 毫秒） 一帧等于 16.67 毫秒
          // await new Promise(resolve => setTimeout(resolve, 30));
          if (line) {
            aiContent.value += line.replace("data: ", ""); // 将逐字生成的数据拼接到 aiContent 中
          }
        }
      }
    } catch (e) {
      reject(e)
    }
  })
}
</script>

<template>
  <article id="markdownMain" class="mt-10 bg-themeColor p-2.5 text-lg rounded-2xl border-4 border-black text-[#2c3e50]">
    <div class="bg-white p-2.5 px-6 text-lg rounded-2xl border-4 border-black text-[15px] ">
      <p class="bg-borderColor text-black rounded-lg mt-0 px-4 font-dindin flex items-center" id="abstract">
        <LzyIcon name="mdi:robot-excited-outline" size="18" class="mr-1.5"></LzyIcon>文章摘要
      </p>
      <div
        class="min-h-10 mt-4 flex justify-center items-center font-semibold tracking-wider border border-[#ddd] shadow-[0_0_4px_#eee] rounded-xl text-sm py-2 px-4 break-all">
        <span class="float-left vuepress-markdown-body" v-html="aiContentHtml"></span>
        <LzyIcon class="float-left" v-if="!doneFlag" name="ph:fan-duotone" size="20"></LzyIcon>
      </div>
      <p class="affirm text-xs font-dindin indent-1.5 mt-2 font-medium">此内容根据文章生成，未经过人工审核，仅用于文章内容的解释与总结，不承担任何法律责任！</p>
    </div>
    <div class="mainHtml bg-white rounded-3xl mt-3 px-8 py-5 border-4 border-black">
      <content id="articleMain" class="vuepress-markdown-body" v-html="props.main">

      </content>

    </div>
  </article>
</template>

<!-- <style scoped>
p {
  margin: 10px 0;
  text-indent: 2em
}
</style> -->
