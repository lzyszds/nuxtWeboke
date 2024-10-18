
import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const headers = getRequestHeaders(event);

  return useApiFetch('/comment/getNewComment', {
    method: 'GET',
    headers,
    params: {
      limit: 5
    }
  });
});
