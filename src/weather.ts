import DarkSkyNet from './libs/dark-sky-net'
import Time from './libs/time'

namespace Weather {

  const NOT_FOUND_SYMBOL = '?'

  export const main = async (): Promise<void> => {
    const args = parseArgs(process.argv)
    const currentTime: string = Time.getCurrentTime()
    const weatherData: any[] = await fetchWeatherForLocations(args.locations)
    console.log(`Time: ${currentTime}\n`)
    weatherData
      .filter(weather => weather.success)
      .map(weather =>
        formatWeatherOutput(
          weather.location,
          weather.forecast,
          weather.temperature.celsius,
          weather.temperature.fahrenheit
        )
      )
      .forEach(weatherString => console.log(weatherString))
    weatherData
      .filter(weather => !weather.success)
      .forEach(weather => console.log(`Could not find location '${weather.location}'`))
  }

  export const parseArgs = (argsVector: string[]): any => {
    const locations = argsVector
      .slice(2, argsVector.length)
      .join(' ')
      .split(',')
      .map(location => location.trim())
      .filter(location => location.length > 0)
    return {locations}
  }

  export const fetchWeatherForLocations = async (locations: string[]): Promise<any[]> => {
    return Promise.all(locations.map(async (location) => {
      try {
        const geoLocation = await DarkSkyNet.fetchGeoCoordinatesForQuery(location)
        const forecastWithCelsius = await DarkSkyNet.fetchWeatherInCelsius(geoLocation.latitude, geoLocation.longitude)
        const forecastWithFahrenheit = await DarkSkyNet.fetchWeatherInFahrenheit(geoLocation.latitude, geoLocation.longitude)
        const forecast = DarkSkyNet.readForecast(forecastWithCelsius)
        const celsius = DarkSkyNet.readTemperature(forecastWithCelsius)
        const fahrenheit = DarkSkyNet.readTemperature(forecastWithFahrenheit)
        return createWeatherDataObject(true, location, forecast, celsius, fahrenheit)
      } catch (e) {
        return createWeatherDataObject(false, location)
      }
    }))
  }

  export const formatWeatherOutput = (location: string, forecast: string, celsius: string, fahrenheit: string): string => {
    return `Location: ${location}\n`
      + `Forecast: ${forecast}\n`
      + `Temp: ${celsius}C / ${fahrenheit}F\n`
  }

  const createWeatherDataObject = (success: boolean,
                                   location: string,
                                   forecast: string = NOT_FOUND_SYMBOL,
                                   celsius: string = NOT_FOUND_SYMBOL,
                                   fahrenheit: string = NOT_FOUND_SYMBOL) => {
    const weatherObject = {
      success,
      location,
      forecast,
      temperature: {
        celsius,
        fahrenheit
      }
    }
    return weatherObject
  }

}

export default Weather

Weather.main().then().catch()
