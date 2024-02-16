export default async (title: string, feed: string): Promise<string | null> => {
  const query = new URLSearchParams({
    media: 'podcast',
    term: title,
    entity: 'podcast',
    attribute: 'titleTerm'
  });

  return fetch(`https://itunes.apple.com/search?${query.toString()}`)
    .then((res) => res.json())
    .then(({results}) => results || [])
    .then((entries) => entries.find(({ feedUrl }) => feedUrl === feed) || {})
    .then(entry => entry?.trackId || null)
    .catch(() => null);
};
