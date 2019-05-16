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

  describe('fetchGeoCoordinatesForLocationName', () => {
    it('is defined', () => {
      expect(DarkSkyNet.fetchGeoCoordinatesForLocationName).toBeDefined()
    })
    it('returns geo location from DarkSky.Net', async () => {
      const locationName = 'Vancouver, BC'
      const expectedLatitude = 49.2609
      const expectedLongitude = -123.114
      const mockGeoQueryResponse = {
        latitude: expectedLatitude,
        longitude: expectedLongitude,
      }
      spyOn(Request, 'get').and.returnValue(Promise.resolve(mockGeoQueryResponse))
      const geoLocation = await DarkSkyNet.fetchGeoCoordinatesForLocationName(locationName)
      expect(geoLocation.latitude).toBe(expectedLatitude)
      expect(geoLocation.longitude).toBe(expectedLongitude)
    })
  })

  describe('fetchGeoCoordinatesForPostalCode', () => {
    it('is defined', () => {
      expect(DarkSkyNet.fetchGeoCoordinatesForPostalCode).toBeDefined()
    })
    it('returns geo location from DarkSky.Net', async () => {
      const postalCode = 'V5A 1P2'
      const expectedLatitude = 49.2634
      const expectedLongitude = -122.955
      const mockGeoQueryResponse = {
        latitude: expectedLatitude,
        longitude: expectedLongitude,
      }
      spyOn(Request, 'get').and.returnValue(Promise.resolve(mockGeoQueryResponse))
      const geoLocation = await DarkSkyNet.fetchGeoCoordinatesForPostalCode(postalCode)
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
