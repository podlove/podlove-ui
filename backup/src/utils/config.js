import { getOr } from 'lodash/fp'

/**
 * Player Config Parser with defaults
 * {
 *  playtime: 1337,
 *  duration: 8008,
 *  chapters: [{
 *    start: '00:01:08',
 *    title: 'Some Chapter',
 *    href: 'http://foo.bar'
 *  }]
 * }
 */

export const chapters = getOr([], 'chapters')
export const playtime = getOr(0, 'playtime')
export const duration = getOr(0, 'duration')
