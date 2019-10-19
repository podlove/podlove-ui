export const removeHttps = url => (url ? url.replace(/^https:\/\//gm, 'http://') : null)

export const removeProtocol = url => (url ? url.replace(/(^\w+:|^)\/\//, '') : null)
