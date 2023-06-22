import { Paged, Image } from './model';

function fetchOrThrow(info: RequestInfo, init?: RequestInit) {
  return fetch(info, init).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });
}

function getDefaultHeaders(accessToken: string) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;
  headers.append('Authorization', bearer);
  headers.append('Content-Type', 'application/json; charset=utf-8');
  return headers;
}

type GetImagesArgs = {
  mode?: string;
  query?: string;
  order?: string;
  limit?: number;
  offset?: number;
  accessToken: string;
};

export async function getImages({
  mode,
  query,
  order,
  limit,
  offset,
  accessToken,
}: GetImagesArgs) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const headers = getDefaultHeaders(accessToken);

  try {
    const params = [
      ['limit', limit],
      ['offset', offset],
      ['query', query],
      ['order', order],
      ['mode', mode],
    ]
      .filter((p) => p[1])
      .map((p) => `${p[0]}=${p[1]}`)
      .join('&');

    const response = await fetchOrThrow(`${baseUrl}/images?${params}`, {
      method: 'GET',
      headers,
    });
    return response as Paged<Image>;
  } catch (e) {
    throw new Error(`Failed to get images`);
  }
}
