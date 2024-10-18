import type { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event): Promise<any> => {
  const body = await readBody(event);
  const headers = getRequestHeaders(event);

  return useApiFetch('/comment/addComment', {
    method: 'POST',
    body,
    headers,
  });
});
