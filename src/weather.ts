namespace Weather {

  export const parseArgs = (argsVector: string[]) => {
    const locations = argsVector.slice(2, argsVector.length)
    const params = {locations}
    return params
  }

  export const formatOutput = (time: string, forecast: string, tempInCelsius: string, tempInFahrenheit: string) => {
    return `Time: ${time}\nForecast: ${forecast}\nTemp: ${tempInCelsius}C / ${tempInFahrenheit}F`
  }

}

export default Weather
