import Time from '../../src/libs/time'

fdescribe('Time', () => {

  describe('getCurrentTime', () => {
    it('is defined', () => {
      expect(Time.getCurrentTime).toBeDefined()
    })
    it('returns a string', () => {
      const result = Time.getCurrentTime()
      expect(typeof result === 'string').toBeTruthy()
    })
    it("returns time in the format of 'hh:mm:ss'", () => {
      const result = Time.getCurrentTime()
      expect(result).toMatch(/\d\d:\d\d:\d\d/)
    })
  })

})
