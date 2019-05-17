import DarkSkyNet from './libs/dark-sky-net'

namespace Weather {

  export const parseArgs = (argsVector: string[]): any => {
    const locations = argsVector.slice(2, argsVector.length)
    return {locations}
  }

  export const fetchWeatherForLocations = async (locations: string[]): Promise<any[]> => {
    return Promise.all(locations.map(async (location) => {
      const geoLocation = await DarkSkyNet.fetchGeoCoordinatesForQuery(location)
      const forecastWithCelsius = await DarkSkyNet.fetchWeatherInCelsius(geoLocation.latitude, geoLocation.longitude)
      const forecastWithFahrenheit = await DarkSkyNet.fetchWeatherInFahrenheit(geoLocation.latitude, geoLocation.longitude)
      const forecast = DarkSkyNet.readForecast(forecastWithCelsius)
      const celsius = DarkSkyNet.readTemperature(forecastWithCelsius)
      const fahrenheit = DarkSkyNet.readTemperature(forecastWithFahrenheit)
      const data = createWeatherDataObject(location, forecast, celsius, fahrenheit)
      return data
    }))
  }

  export const formatOutput = (location: string, time: string, forecast: string, celsius: string, fahrenheit: string) => {
    return `Location: ${location}\n`
      + `Time: ${time}\n`
      + `Forecast: ${forecast}\n`
      + `Temp: ${celsius}C / ${fahrenheit}F\n\n`
  }

  const createWeatherDataObject = (location: string, forecast: string, celsius: string, fahrenheit: string) => {
    const weatherObject = {
      location,
      forecast,
      temperature: {
        celsius,
        fahrenheit,
      }
    }
    return weatherObject
  }

}

export default Weather
