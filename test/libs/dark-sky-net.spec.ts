import * as requestPromise from 'request-promise'
import Weather, {default as DarkSkyNet} from '../../src/libs/dark-sky-net'

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

  describe('fetchGeoCoordinatesForLocationName', () => {
    it('is defined', () => {
      expect(DarkSkyNet.fetchGeoCoordinatesForLocationName).toBeDefined()
    })
    it('returns geocodes from DarkSky.Net', () => {
      const locationName = 'Vancouver, BC'
      const expectedLatitude = 49.2609
      const expectedLongitude = -123.114
      const mockGeoQueryResponse = {
        latitude: expectedLatitude,
        longitude: expectedLongitude,
      }
      spyOn(requestPromise, 'get').and.returnValue(mockGeoQueryResponse)
      const geoLocation = DarkSkyNet.fetchGeoCoordinatesForLocationName(locationName)
      expect(geoLocation.latitude).toBe(expectedLatitude)
      expect(geoLocation.longitude).toBe(expectedLongitude)
    })
  })

  describe('fetchGeoCoordinatesForPostalCode', () => {
    it('is defined', () => {
      expect(DarkSkyNet.fetchGeoCoordinatesForPostalCode).toBeDefined()
    })
    it('returns geocodes from DarkSky.Net', () => {
      const postalCode = 'V5A 1P2'
      const expectedLatitude = 49.2634
      const expectedLongitude = -122.955
      const mockGeoQueryResponse = {
        latitude: expectedLatitude,
        longitude: expectedLongitude,
      }
      spyOn(requestPromise, 'get').and.returnValue(mockGeoQueryResponse)
      const geoLocation = DarkSkyNet.fetchGeoCoordinatesForPostalCode(postalCode)
      expect(geoLocation.latitude).toBe(expectedLatitude)
      expect(geoLocation.longitude).toBe(expectedLongitude)
    })
  })
})
