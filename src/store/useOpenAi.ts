/**
 * 定义并导出名为 `useOpenaiStore` 的 Pinia store。
 */
export const useOpenaiStore = defineStore('openai', () => {
  /**
   * 默认消息常量，用于在生成AI摘要时显示提示信息。
   */
  const DEFAULT_MESSAGE = 'AI内容生成中，请稍等...'

  /**
   * 错误消息常量，用于在生成AI摘要失败时显示错误信息。
   */
  const ERROR_MESSAGE = '内容生成失败，请重试！'

  /**
   * 可变的 Map 对象，用于存储内容，键为文章ID，值为内容。
   */
  const contentMap = ref<Map<number, string>>(new Map())

  /**
   * 获取当前路由信息。
   */
  const route = useRoute()

  /**
   * 计算属性，根据路由ID获取对应的内容。
   * 如果没有找到对应的内容，则返回默认消息。
   */
  const content = computed(() => {
    return contentMap.value.get(Number(route.params.id)) ?? DEFAULT_MESSAGE
  })

  // ai生成的评论内容。
  const commentContent = ref("")

  /**
   * 监听路由变化，当路径包含 `/detail` 时，清空内容。
   */
  watchEffect(() => {
    if (route.path.includes('/detail/')) {
      contentMap.value.clear()
      console.log(contentMap.value);

    }
  })

  /**
   * 处理流式响应。
   * @param reader - 可读流的读取器。
   * @param aid - 文章ID。
   * @returns 处理后的内容字符串。
   */
  const processStream = async (reader: ReadableStreamDefaultReader<Uint8Array>, aid: number, type: 'abstract' | 'comment') => {
    const decoder = new TextDecoder()
    let temporaryContent = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const text = decoder.decode(value)
        const lines = text.split('\n')

        for (const line of lines) {
          if (!line) continue
          await new Promise(resolve => requestAnimationFrame(resolve))
          temporaryContent += line.replace('data: ', '')
          if (type === 'abstract') {
            contentMap.value.set(aid, temporaryContent)
          }else if (type === 'comment') {
            commentContent.value = temporaryContent
          }
        }
      }
      return temporaryContent
    } catch (error) {
      throw new Error('处理流数据失败')
    }
  }

  /**
   * 获取AI摘要。
   * @param aid - 文章ID。
   * @returns 生成的摘要内容。
   */
  const getAbstract = async (aid: number) => {
    if (!contentMap.value.has(aid)) {
      contentMap.value.set(aid, DEFAULT_MESSAGE)
    } else {
      return
    }

    try {
      const response = await fetch(`/api/openAI/getSiliconflowiAi?aid=${aid}`)
      if (!response.ok) {
        throw new Error('API请求失败')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('无法获取响应流')
      }

      return await processStream(reader, aid, 'abstract')
    } catch (error) {
      contentMap.value.set(aid, ERROR_MESSAGE)
      throw error
    }
  }

  /**
   * 获取ai评论
   * @param aid - 文章ID
   * @param cid - 评论ID
  */
  const getAiComment = async (aid: number, cid: number) => {
    console.log(aid, cid);
    
    try {
      const response = await fetch(`/api/openAI/getAiComment?aid=${aid}&cid=${cid}`)
      if (!response.ok) {
        throw new Error('API请求失败')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('无法获取响应流')
      }

      return await processStream(reader, aid, 'comment')
    } catch (error) {
      throw error
    }
  }


  return {
    content, // ai生成的摘要内容
    getAbstract, // 获取ai生成的摘要
    commentContent, // ai生成的评论内容
    getAiComment // 获取ai生成的评论
  }
})