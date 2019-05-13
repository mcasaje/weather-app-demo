import Request from '../../src/libs/request'

describe('request', () => {
  describe('get', () => {
    it('is defined', () => {
      expect(Request.get).toBeDefined()
    })
  })
})
