import * as cheerio from 'cheerio'
import HtmlParser from '../../src/libs/html-parser'

describe('HtmlParser', () => {

  describe('findElement', () => {
    it('is defined', () => {
      expect(HtmlParser.findElement).toBeDefined()
    })
    it("calls 'cheerio.load()'", () => {
      spyOn(cheerio, 'load')
      HtmlParser.findElement('', '')
      expect(cheerio.load).toHaveBeenCalled()
    })
    it('returns a string', () => {
      const result = HtmlParser.findElement('', '')
      expect(typeof result === 'string').toBeTruthy()
    })
  })

})
