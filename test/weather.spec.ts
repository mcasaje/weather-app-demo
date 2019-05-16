import * as requestPromise from 'request-promise'
import Weather from '../src/weather'

describe('Weather', () => {
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

  describe('fetchTextFromHtmlPage', () => {
    it('is defined', () => {
      expect(Weather.fetchTextFromHtmlPage).toBeDefined()
    })
    it('returns temperature from external endpoint', async () => {
      const url = 'http://www.fakeurl.com'
      const htmlSelector = '#a .b'
      const expectedText = '30'
      const htmlResponse = `<div id="a">A<span class="b">${expectedText}</span>C</div>`
      spyOn(requestPromise, 'get').and.returnValue(Promise.resolve(htmlResponse))
      const result = await Weather.fetchTextFromHtmlPage(url, htmlSelector)
      expect(result).toBe(expectedText)
    })
  })

  // TODO: Consider removing fn altogether
  describe('logString', () => {
    it('is defined', () => {
      expect(Weather.logString).toBeDefined()
    })
    it("calls 'console.log'", () => {
      const stringToLog = 'i-am-log'
      spyOn(console, 'log')
      Weather.logString(stringToLog)
      expect(console.log).toHaveBeenCalledWith(stringToLog)
    })
  })
})
