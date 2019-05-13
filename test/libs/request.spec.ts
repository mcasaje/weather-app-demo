import * as requestPromise from 'request-promise'
import Request from '../../src/libs/request'

describe('request', () => {
  describe('get', () => {
    it('is defined', () => {
      expect(Request.get).toBeDefined()
    })

    it("calls request-promise 'get()'", () => {
      spyOn(requestPromise, 'get')
      Request.get('')
      expect(requestPromise.get).toHaveBeenCalled()
    })
  })
})
