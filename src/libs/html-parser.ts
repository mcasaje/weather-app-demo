import * as cheerio from 'cheerio'

namespace HtmlParser {
  export const findElement = (html: string, selector: string): string => {
    const htmlDom = cheerio.load(html)
    return selector
  }
}

export default HtmlParser