import * as cheerio from 'cheerio'
import HtmlParser from '../../src/libs/html-parser'

describe('HtmlParser', () => {

  describe('findElementText', () => {
    it('is defined', () => {
      expect(HtmlParser.findElementText).toBeDefined()
    })
    it('calls \'cheerio.load()\'', () => {
      const mockCheerio = cheerio.load('')
      spyOn(cheerio, 'load').and.returnValue(mockCheerio)
      HtmlParser.findElementText('', '')
      expect(cheerio.load).toHaveBeenCalled()
    })
    it('returns expected \'div\' element from cheerio', () => {
      const expectedResult = 'Crow'
      const html = `<div class="sparrow">Sparrow</div><div class="crow">${expectedResult}</div><div class="raven">Raven</div>`
      const selector = '.crow'
      const result = HtmlParser.findElementText(html, selector)
      expect(result).toBe(expectedResult)
    })
    it('returns a string', () => {
      const result = HtmlParser.findElementText('', '')
      expect(typeof result === 'string').toBeTruthy()
    })
  })

})
