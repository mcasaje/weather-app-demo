namespace DarkSkyNet {
  export const HTML_SELECTOR_FOR_WEATHER_STRING = '#title .currently .desc .swap'

  export const readTemperature = (weatherString: string): string => {
    const weatherStringParts = weatherString.split(' ')
    const temperature = weatherStringParts.length > 0 ? weatherStringParts[0] : '?'
    return temperature
  }

  export const readForecast = (weatherString: string): string => {
    const weatherStringParts = weatherString.split(' ')
    let forecast = '?'
    if (weatherStringParts.length > 1) {
      forecast = weatherString.substr(weatherStringParts[0].length + 1, weatherString.length)
    }
    return forecast
  }
}

export default DarkSkyNet
