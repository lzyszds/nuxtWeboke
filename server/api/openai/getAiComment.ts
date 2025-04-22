export default defineEventHandler(async (event) => {
  const { aid, cid } = getQuery(event);
  return await request({
    url: `/openAI/getAiComment?aid=${aid}&cid=${cid}`,
    method: 'get',
  })
})
