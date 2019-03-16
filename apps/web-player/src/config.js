import { mergeDeepRight } from 'ramda'

const request = async url => fetch(url).then(res => res.json())

export const parseConfig = async (input = {}, additional = {}) => {
  let config, chapters, transcripts

  try {
    config = typeof input === 'string' ? await request(input) : input
  } catch (err) {
    throw new Error(`Couldn't parse configuration "${input}"`)
  }

  try {
    chapters = typeof config.chapters === 'string' ? await(request(config.chapters)) : config.chapters
  } catch (err) {
    console.warn(`Couldn't parse chapters "${chapters}", falling back to empty list`)
    chapters = []
  }

  try {
    transcripts = typeof config.transcripts === 'string' ? await(request(config.transcripts)) : config.transcripts
  } catch (err) {
    console.warn(`Couldn't parse transcripts "${transcripts}", falling back to empty list`)
    transcripts = []
  }

  return mergeDeepRight(Object.assign({}, config, {
    chapters,
    transcripts
  }), additional)
}
