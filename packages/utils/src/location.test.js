import { locationParams, urlParameters } from './location'

describe('location', () => {
  beforeEach(() => {
    global.window = Object.create(window)
    Object.defineProperty(window, 'location', {
      value: {
        search: '?t=10:00,50:00&episode=episode.json&config=config.json&autoplay=1&somefoo=blaa'
      }
    })
  })

  describe('locationParams()', () => {
    it('should have the query parameters', () => {
      expect(locationParams()).toEqual({
        autoplay: '1',
        config: 'config.json',
        episode: 'episode.json',
        t: '10:00,50:00',
        somefoo: 'blaa'
      })
    })
  })

  describe('urlParameters()', () => {
    it('should extract the time from url parameters', () => {
      expect(urlParameters().starttime).toEqual(600000)
      expect(urlParameters().stoptime).toEqual(3000000)
    })

    it('should extract the episode configuration', () => {
      expect(urlParameters().episode).toEqual('episode.json')
    })

    it('should extract the config configuration', () => {
      expect(urlParameters().config).toEqual('config.json')
    })

    it('should extract the autoplay param', () => {
      expect(urlParameters().autoplay).toEqual(true)
    })
  })
})
