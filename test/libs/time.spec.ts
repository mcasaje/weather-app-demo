import Time from '../../src/libs/time'

fdescribe('Time', () => {
  describe('getCurrentTime', () => {
    it('is defined', () => {
      expect(Time.getCurrentTime).toBeDefined()
    })
  })
})
