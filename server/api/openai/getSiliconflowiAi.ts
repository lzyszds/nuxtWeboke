export default defineEventHandler(async (event) => {
  const { aid } = getQuery(event);
  return await request({
    url: '/openAI/getSiliconflowiAi?aid=' + aid,
    method: 'get',
  })
})
