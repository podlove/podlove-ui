export const addQueryparams = (
  url: string,
  params: { [key: string]: string | number | boolean | null }
) => {
  const tmp = new URL(url);

  Object.entries(params).forEach(([key, value]) => {
    if (value === null) {
      return;
    }
    tmp.searchParams.append(key, value.toString());
  });

  return tmp.toString();
};

export const proxy = (url: string) => `/proxy?` + new URLSearchParams({ url })
