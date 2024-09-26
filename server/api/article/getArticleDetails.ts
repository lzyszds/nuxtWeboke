export default defineEventHandler(async (event) => {
  // 获取查询参数（针对 GET 请求）
  const { id } = getQuery(event);
  //请求后台接口
  return await request({
    method: 'get',
    url: '/article/getArticleDetail?id=' + id,
  })
})
