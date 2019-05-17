import * as requestPromise from 'request-promise'
import Request from '../../src/libs/request'

describe('Request', () => {
  describe('get', () => {
    it('is defined', () => {
      expect(Request.get).toBeDefined()
    })
    it('calls request-promise \'get()\'', () => {
      spyOn(requestPromise, 'get')
      Request.get('')
      expect(requestPromise.get).toHaveBeenCalled()
    })
    it('returns a Promise', () => {
      spyOn(requestPromise, 'get').and.returnValue(Promise.resolve('promise'))
      const val = Request.get('')
      expect(val instanceof Promise).toBeTruthy()
    })
  })

  describe('fetchTextFromHtmlPage', () => {
    it('is defined', () => {
      expect(Request.fetchTextFromHtmlPage).toBeDefined()
    })
    it('returns temperature from external endpoint', async () => {
      const url = 'http://www.fakeurl.com'
      const htmlSelector = '#a .b'
      const expectedText = '30'
      const htmlResponse = `<div id="a">A<span class="b">${expectedText}</span>C</div>`
      spyOn(requestPromise, 'get').and.returnValue(Promise.resolve(htmlResponse))
      const result = await Request.fetchTextFromHtmlPage(url, htmlSelector)
      expect(result).toBe(expectedText)
    })
  })
})
