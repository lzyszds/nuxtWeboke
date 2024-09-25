export default defineEventHandler(async (event) => {
  //请求后台接口
  return await request({
    url: '/comment/getNewComment',
    method: 'get',
    params: {
      limit: 5
    }
  })
})
