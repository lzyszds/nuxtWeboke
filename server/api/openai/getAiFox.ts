export default defineEventHandler(async (event) => {
  const { aid } = getQuery(event);
  return await request({
    url: '/openAI/getAifox?id=' + aid,
    method: 'get',
  })
})
