import Weather from '../../src/libs/dark-sky-net'

describe('DarkSkyNet', () => {
  describe('readTemperature', () => {
    it('is defined', () => {
      expect(Weather.readTemperature).toBeDefined()
    })
    it('returns temperature from string', () => {
      const expectedTemperature = '56˚'
      const weatherText = `${expectedTemperature} Overcast.`
      const temperature = Weather.readTemperature(weatherText)
      expect(temperature).toBe(expectedTemperature)
    })
  })

  describe('readForecast', () => {
    it('is defined', () => {
      expect(Weather.readForecast).toBeDefined()
    })
    it('returns forecast from string', () => {
      const expectedForecast = 'Mostly Cloudy.'
      const weatherText = `55˚ ${expectedForecast}`
      const forecast = Weather.readForecast(weatherText)
      expect(forecast).toBe(expectedForecast)
    })
  })
})
