import * as requestPromise from 'request-promise'
import Request from '../../src/libs/request'

describe('Request', () => {
  describe('get', () => {
    it('is defined', () => {
      expect(Request.get).toBeDefined()
    })
    it("calls request-promise 'get()'", () => {
      spyOn(requestPromise, 'get')
      Request.get('')
      expect(requestPromise.get).toHaveBeenCalled()
    })
    it('returns a Promise', () => {
      spyOn(requestPromise, 'get').and.returnValue(new Promise(resolve => 'promise'))
      const val = Request.get('')
      expect(val instanceof Promise).toBeTruthy()
    })
  })
})
