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
    it("returns same time as time from 'new Date()'", () => {
      const result = Time.getCurrentTime()
      const timeNow = new Date()
      const hour = timeNow.getHours()
      const minutes = timeNow.getMinutes()
      const seconds = timeNow.getSeconds()
      const formattedHour = hour < 10 ? `0${hour}` : hour
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds
      const expectedTime = `${formattedHour}:${formattedMinutes}:${formattedSeconds}`
      expect(result).toBe(expectedTime)
    })
  })
})
