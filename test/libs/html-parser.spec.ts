import HtmlParser from '../../src/libs/html-parser'

describe('HtmlParser', () => {

  describe('findElement', () => {
    it('is defined', () => {
      expect(HtmlParser.findElement).toBeDefined()
    })
    it('returns a string', () => {
      const result = HtmlParser.findElement('')
      expect(typeof result === 'string').toBeTruthy()
    })
  })

})
