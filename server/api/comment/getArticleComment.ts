export default defineEventHandler(async (event) => {
  const data = getQuery(event)
  //请求后台接口
  return await request({
    url: '/comment/getArticleComment',
    method: 'get',
    params: {
      id: data.aid
    }
  })
})
