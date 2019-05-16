import Request from './libs/request'
import HtmlParser from './libs/html-parser'

namespace Weather {
  export const readTemperature = (weatherString: string): string => {
    const weatherStringParts = weatherString.split(' ')
    const temperature = weatherStringParts.length > 0 ? weatherStringParts[0] : '?'
    return temperature
  }

  export const readForecast = (weatherString: string): string => {
    const weatherStringParts = weatherString.split(' ')
    let forecast = '?'
    if (weatherStringParts.length > 1) {
      forecast = weatherString.substr(weatherStringParts[0].length+1, weatherString.length)
    }
    return forecast
  }

  export const fetchTextFromHtmlPage = async (url: string, htmlSelector: string): Promise<string> => {
    const htmlResponse = await Request.get(url)
    const text = HtmlParser.findElementText(htmlResponse, htmlSelector)
    return text
  }

  export const logString = (messageToLog: string): void => {
    console.log(messageToLog)
  }
}

export default Weather
