

export default defineEventHandler(async (event) => {
  // 获取查询参数（针对 GET 请求）
  const query = getQuery(event);

  //请求后台接口
  return await request({
    url: '/article/getArticleListForWeb',
    method: 'get',
    params: query
  })

})


// // 获取文章列表
// export function getArticleList(pages: number, limit: number) {
//   return request({
//     method: 'get',
//     url: "/article/getArticleList",
//     params: {
//       pages: pages,
//       limit: limit,
//       search: ''
//     },
//   })
// }


// // 获取文章详情
// export async function getArticleDetail(id: number) {
//   return await request({
//     method: 'get',
//     url: '/article/getArticleDetail',
//     params: {
//       id: id
//     }
//   })
// }
