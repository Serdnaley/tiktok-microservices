import { useAuthStore } from '@/stores/auth';

const { VITE_APP_API_URL: baseUrl } = import.meta.env;

const prepareData = (method, url, payload) => {
  const endpoint = new URL([
    ...new URL(baseUrl).pathname.split('/'),
    ...url.split('/'),
  ].filter(Boolean).join('/'), baseUrl);

  let body = undefined;

  if (method === 'GET') {
    for (const key in payload) {
      endpoint.searchParams.append(key, payload[key]);
    }
  } else {
    body = JSON.stringify(payload);
  }

  return {
    endpoint,
    body,
  };
};

export const request = async (method, url, payload) => {
  const {
    endpoint,
    body,
  } = prepareData(method, url, payload);

  const {
    accessToken,
    logout,
  } = useAuthStore();

  const res = await fetch(endpoint.toString(), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken ? `Bearer ${accessToken}` : null,
    },
    method,
    body,
  });
  if (!res) return null;

  if (res.status === 401) {
    await logout();
    return null;
  }

  const data = res.status.toString().startsWith('2') ? await res.json() : {};

  return {
    data,
  };
};

request.get = (url, payload) => request('GET', url, payload);
request.post = (url, payload) => request('POST', url, payload);
request.put = (url, payload) => request('PUT', url, payload);
request.delete = (url, payload) => request('DELETE', url, payload);
