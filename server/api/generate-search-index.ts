import { defineEventHandler } from 'h3'
import fs from 'fs'
import path from 'path'
import { glob } from 'glob'
import matter from 'gray-matter'
import { stripHtml } from 'string-strip-html'

export default defineEventHandler(async (event) => {
  // 只允许在开发环境或构建时运行
  if (process.env.NODE_ENV !== 'development' && !process.env.GENERATE_SEARCH_INDEX) {
    return { error: 'This endpoint is only available in development mode or during build time' }
  }

  try {
    const contentDir = path.join(process.cwd(), 'content')
    const outputPath = path.join(process.cwd(), 'public', 'search-index.json')

    // 获取所有Markdown文件
    const files = glob.sync('**/*.md', { cwd: contentDir })

    const searchIndex = await Promise.all(
      files.map(async (file) => {
        const filePath = path.join(contentDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data, content: markdownContent } = matter(content)

        // 从文件路径生成URL路径
        const slug = file.replace(/\.md$/, '').replace(/\/index$/, '')
        const url = `/${slug}`

        // 清理HTML标签
        const plainText = stripHtml(markdownContent).result

        return {
          title: data.title || slug,
          path: url,
          content: plainText.substring(0, 300), // 限制内容长度
          tags: data.tags || [],
          date: data.date || null
        }
      })
    )

    // 写入搜索索引文件
    fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2))

    return {
      success: true,
      count: searchIndex.length,
      message: `Search index generated with ${searchIndex.length} entries`
    }
  } catch (error: any) {
    console.error('Error generating search index:', error)
    return {
      success: false,
      error: error.message
    }
  }
})