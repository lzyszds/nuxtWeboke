export default defineEventHandler(async (event) => {
  // 获取诗句
  return await request({
    url: '/toolkit/getPoetry',
    method: 'get',
  })
})
