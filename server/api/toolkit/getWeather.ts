export default defineEventHandler(async (event) => {
  const clientIp = getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() || event.node.req.socket.remoteAddress; 

  //请求后台接口
  return await request({
    url: '/toolkit/getWeather',
    method: 'get',
    headers: {
      'X-Forwarded-For': clientIp,
    },
  })
})
