import * as requestPromise from 'request-promise'
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

  describe('fetchTextFromUrl', () => {
    it('is defined', () => {
      expect(Weather.fetchTextFromUrl).toBeDefined()
    })
    it('returns temperature from external endpoint', () => {
      const url = 'http://www.fakeurl.com'
      const htmlSelector = '#a .b'
      const expectedText = '30'
      const htmlResponse = `<div id="a">A<span class="b">${expectedText}</span>C</div>`
      spyOn(requestPromise, 'get').and.returnValue(Promise.resolve(htmlResponse))
      const result = Weather.fetchTextFromUrl(url, htmlSelector)
      expect(result).toBe(expectedText)
    })
  })

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
