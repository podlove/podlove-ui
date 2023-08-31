const getHeaders = <T>(header: string, fallback: T, response: Response): T => {
  if (!response.headers) {
    return fallback;
  }

  return response.headers.get(header) as T;
}

export const json = async <T>(url: string | T): Promise<T | null> => {
  if (!url || typeof url !== 'string') {
    return url as T;
  }

  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      return null;
    }

    if (!getHeaders<string[]>('content-type', [], response).includes('application/json')) {
      return null
    }

    return response.json();
  } catch (err) {
    console.warn(err);
    return null;
  }
};

export const html = async (url): Promise<string | null> => {
  if (typeof url !== 'string') {
    return url;
  }

  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      return null;
    }

    if (!getHeaders<string[]>('content-type', [], response).includes('text/html')) {
      return null
    }


    return response.text();
  } catch (err) {
    console.warn(err);
    return null;
  }
};
