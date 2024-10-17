export default defineEventHandler(async (event) => {
  const data = await readBody(event)
  return request({
    method: 'post',
    url: '/comment/addComment',
    data
  })
})
