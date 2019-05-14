import Request from './libs/request'
import HtmlParser from './libs/html-parser'

namespace Weather {
  export const fetchTemperature = (): string => {
    return ''
  }

  export const fetchForecast = (): string => {
    return ''
  }

  export const fetchTextFromUrl = async (url: string, htmlSelector: string): Promise<string> => {
    const htmlResponse = await Request.get(url)
    const text = HtmlParser.findElementText(htmlResponse, htmlSelector)
    return text
  }

  export const logString = (messageToLog: string): void => {
    console.log(messageToLog)
  }
}

export default Weather
