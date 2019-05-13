import * as cheerio from 'cheerio'
import HtmlParser from '../../src/libs/html-parser'

describe('HtmlParser', () => {

  describe('findElement', () => {
    it('is defined', () => {
      expect(HtmlParser.findElement).toBeDefined()
    })
    it('calls \'cheerio.load()\'', () => {
      spyOn(cheerio, 'load')
      HtmlParser.findElement('', '')
      expect(cheerio.load).toHaveBeenCalled()
    })
    it('returns expected \'div\' element from cheerio', () => {
      const expectedResult = '<div class="crow">Crow</div>'
      const html = `<div class="sparrow">Sparrow</div>${expectedResult}<div class="raven">Raven</div>`
      const selector = '.crow'
      const result = HtmlParser.findElement(html, selector)
      expect(result).toBe(expectedResult)
    })
    it('returns a string', () => {
      const result = HtmlParser.findElement('', '')
      expect(typeof result === 'string').toBeTruthy()
    })
  })

})
