import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const data = getQuery(event)
  const headers = getRequestHeaders(event);

  return useApiFetch('/comment/getArticleComment', {
    method: 'GET',
    headers,
    params: {
      id: data.aid
    }
  });
});

