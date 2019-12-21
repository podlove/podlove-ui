/* eslint no-console: 0 */
import fetch from 'unfetch'

export const json = async url => {
  if (typeof url !== 'string') {
    return url
  }

  try {
    const response = await fetch(url)

    if (response.status !== 200) {
      return null
    }

    if (!response.headers.get('content-type').includes('application/json')) {
      return null
    }

    return response.json()
  } catch (err) {
    console.warn(err)
    return null
  }
}

export const html = async url => {
  if (typeof url !== 'string') {
    return url
  }

  try {
    const response = await fetch(url)

    if (response.status !== 200) {
      return null
    }

    if (!response.headers.get('content-type').includes('text/html')) {
      return null
    }

    return response.text()
  } catch (err) {
    console.warn(err)
    return null
  }
}
