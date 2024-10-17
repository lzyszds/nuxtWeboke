export default defineEventHandler(async (event) => {
  return await request({
    url: '/comment/getCommentAvatar',
    method: 'get',
  })
})
