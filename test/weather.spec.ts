import Weather from '../src/weather'

describe('Weather', () => {

  describe('fetchTemperature', () => {
    it('is defined', () => {
      expect(Weather.fetchTemperature).toBeDefined()
    })
  })

  describe('fetchForecast', () => {
    it('is defined', () => {
      expect(Weather.fetchForecast).toBeDefined()
    })
  })

  describe('logString', () => {
    it('is defined', () => {
      expect(Weather.logString).toBeDefined()
    })
  })

})
