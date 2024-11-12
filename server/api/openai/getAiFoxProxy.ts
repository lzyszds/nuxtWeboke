export default defineEventHandler(async (event) => {
  const { aid } = getQuery(event);
  const targetUrl = 'http://101.201.171.168:2024/api/openAI/getAifox?aid=' + aid  // 目标跨域接口的 URL

  // 通过 proxyRequest 代理请求
  return proxyRequest(event, targetUrl, {})
})