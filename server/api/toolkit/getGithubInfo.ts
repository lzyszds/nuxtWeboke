export default defineEventHandler(async (event) => {
  // 获取诗句
  return await request({
    url: '/toolkit/getGithubInfo',
    method: 'get',
  })
})
