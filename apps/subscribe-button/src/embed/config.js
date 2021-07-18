/* eslint-disable no-console */
import { mergeDeepRight } from 'ramda'

const request = async (url) => fetch(url).then((res) => res.json())

export default async (input = {}, additional = {}) => {
  let config

  try {
    config = typeof input === 'string' ? await request(input) : input
  } catch (err) {
    throw new Error(`Couldn't parse configuration "${input}"`)
  }

  return mergeDeepRight(config, additional)
}
