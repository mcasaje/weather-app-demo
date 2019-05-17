import DarkSkyNet from '../../src/libs/dark-sky-net'
import Request from '../../src/libs/request'
import HtmlParser from '../../src/libs/html-parser'

describe('DarkSkyNet', () => {
  describe('readTemperature', () => {
    it('is defined', () => {
      expect(DarkSkyNet.readTemperature).toBeDefined()
    })
    it('returns temperature from string', () => {
      const expectedTemperature = '56˚'
      const weatherText = `${expectedTemperature} Overcast.`
      const temperature = DarkSkyNet.readTemperature(weatherText)
      expect(temperature).toBe(expectedTemperature)
    })
  })

  describe('readForecast', () => {
    it('is defined', () => {
      expect(DarkSkyNet.readForecast).toBeDefined()
    })
    it('returns forecast from string', () => {
      const expectedForecast = 'Mostly Cloudy.'
      const weatherText = `55˚ ${expectedForecast}`
      const forecast = DarkSkyNet.readForecast(weatherText)
      expect(forecast).toBe(expectedForecast)
    })
  })

  describe('fetchGeoCoordinatesForQuery', () => {
    it('is defined', () => {
      expect(DarkSkyNet.fetchGeoCoordinatesForQuery).toBeDefined()
    })
    it('returns geo location from DarkSky.Net', async () => {
      const locationName = 'Vancouver, BC'
      const expectedLatitude = 49.2609
      const expectedLongitude = -123.114
      const mockGeoQueryResponse = {
        latitude: expectedLatitude,
        longitude: expectedLongitude,
      }
      const mockGeoQueryResponseString = JSON.stringify(mockGeoQueryResponse)
      spyOn(Request, 'get').and.returnValue(Promise.resolve(mockGeoQueryResponseString))
      const geoLocation = await DarkSkyNet.fetchGeoCoordinatesForQuery(locationName)
      expect(geoLocation.latitude).toBe(expectedLatitude)
      expect(geoLocation.longitude).toBe(expectedLongitude)
    })
  })

  describe('fetchWeatherInCelsius', () => {
    it('is defined', () => {
      expect(DarkSkyNet.fetchWeatherInCelsius).toBeDefined()
    })
    it('returns expected weather string', async () => {
      const latitude = 49.2634
      const longitude = -122.955
      const expectedWeatherString = '14˚ Light Rain.'
      spyOn(Request, 'get').and.returnValue(Promise.resolve())
      spyOn(HtmlParser, 'findElementText').and.returnValue(expectedWeatherString)
      const weatherString = await DarkSkyNet.fetchWeatherInCelsius(latitude, longitude)
      expect(weatherString).toBe(expectedWeatherString)
    })
  })

  describe('fetchWeatherInFahrenheit', () => {
    it('is defined', () => {
      expect(DarkSkyNet.fetchWeatherInFahrenheit).toBeDefined()
    })
    it('returns expected weather string', async () => {
      const latitude = 49.2634
      const longitude = -122.955
      const expectedWeatherString = '57˚ Light Rain.'
      spyOn(Request, 'get').and.returnValue(Promise.resolve())
      spyOn(HtmlParser, 'findElementText').and.returnValue(expectedWeatherString)
      const weatherString = await DarkSkyNet.fetchWeatherInFahrenheit(latitude, longitude)
      expect(weatherString).toBe(expectedWeatherString)
    })
  })
})
