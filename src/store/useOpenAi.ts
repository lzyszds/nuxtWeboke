//获取AI摘要

import { defineStore } from 'pinia'

export const useOpenaiStore = defineStore('openai', () => {
  const content = ref<string>('AI摘要还在生成中，请稍等...')

  const getAbstract = (aid: number) => {
    return new Promise<any>(async (resolve, reject) => {

      try {
        const response: any = await fetch(`/api/openai/getAiFox?aid=${aid}`)
        if (response.status != 200) {
          content.value = '摘要生成失败，请重试！'
          return reject("出错了看看怎么解决吧！")
        }
        const textDecoder = new TextDecoder()
        const reader = response.body?.getReader()!
        content.value = ''
        while (true) {
          const { done, value } = await reader.read()
          if (done) {
            resolve(content.value)
            break
          }
          const text = textDecoder.decode(value)
          const lines = text.split('\n'); // 将部分数据与新数据合并后再按行分割

          for (let line of lines) { // 逐行处理数据
            // 添加延迟，单位为毫秒（例如延迟 100 毫秒） 一帧等于 16.67 毫秒
            // await new Promise(resolve => setTimeout(resolve, 30));
            if (line) {
              content.value += line.replace("data: ", ""); // 将逐字生成的数据拼接到 aiContent 中
            }
          }
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  return { content, getAbstract }
}, {
  persist: {
    storage: persistedState.localStorage
  }
})