export default defineEventHandler(async (event) => {
  const clientIp = getHeader(event, 'x-forwarded-for')?.split(',')[0].trim() || event.node.req.socket.remoteAddress;

  //请求后台接口
  return await request({
    url: '/toolkit/getWeather',
    method: 'get',
    headers: {
      'X-Forwarded-For': clientIp == '127.0.0.1' ? '113.16.248.209,' : clientIp, // 这里使用了一个广西的IP地址
    },
    params:{
      _t: new Date().getTime(),
    }
  })
})
