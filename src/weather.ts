import DarkSkyNet from './libs/dark-sky-net'
import Time from './libs/time'

namespace Weather {

  export const main = async () => {
    const args = parseArgs(process.argv)
    const currentTime: string = Time.getCurrentTime()
    const weatherData: any[] = await fetchWeatherForLocations(args.locations)
    console.log(`Time: ${currentTime}\n`)
    weatherData.map((weather) => formatWeatherOutput(
      weather.location,
      weather.forecast,
      weather.temperature.celsius,
      weather.temperature.fahrenheit))
      .forEach((weatherString) => console.log(weatherString))
  }

  export const parseArgs = (argsVector: string[]): any => {
    const locations = argsVector.slice(2, argsVector.length)
      .join(' ')
      .split(',')
      .map(location => location.trim())
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
      return createWeatherDataObject(location, forecast, celsius, fahrenheit)
    }))
  }

  export const formatWeatherOutput = (location: string, forecast: string, celsius: string, fahrenheit: string): string => {
    return `Location: ${location}\n`
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

Weather.main()
