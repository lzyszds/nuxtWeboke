export default defineEventHandler(async (event) => {
  //请求后台接口
  return await request({
    url: '/system/getFooterInfo',
    method: 'get',
  })
})
