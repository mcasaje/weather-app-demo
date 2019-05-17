import Weather from '../src/weather'
import DarkSkyNet from '../src/libs/dark-sky-net'

describe('Weather', () => {

  describe('parseArgs', () => {
    it('is defined', () => {
      expect(Weather.parseArgs).toBeDefined()
    })
    it('returns object with property "location"', () => {
      const argumentVector: string[] = [
        '/usr/bin/node',
        'dist/lib/weather.js',
        'Vancouver, BC',
        'V7A 1W3'
      ]
      const args = Weather.parseArgs(argumentVector)
      expect(args).toBeDefined()
      expect(args.locations).toBeDefined()
    })
  })

  describe('fetchWeatherForLocations', () => {
    it('is defined', () => {
      expect(Weather.fetchWeatherForLocations).toBeDefined()
    })
    it('returns an array of object containing forecast and temperatures', async () => {
      const locations: string[] = ['Vancouver, BC']
      const mockGeoLocation = {latitude: 10, longitude: -10}
      const mockCelsius = '14˚'
      const mockFahrenheit = '57˚'
      const mockForecast = 'Light Rain'
      const mockWeatherStringCelsius = `${mockCelsius} ${mockForecast}.`
      const mockWeatherStringFahrenheit = `${mockFahrenheit} ${mockForecast}.`
      spyOn(DarkSkyNet, 'fetchGeoCoordinatesForQuery').and.returnValue(Promise.resolve(mockGeoLocation))
      spyOn(DarkSkyNet, 'fetchWeatherInCelsius').and.returnValue(Promise.resolve(mockWeatherStringCelsius))
      spyOn(DarkSkyNet, 'fetchWeatherInFahrenheit').and.returnValue(Promise.resolve(mockWeatherStringFahrenheit))
      spyOn(DarkSkyNet, 'readForecast').and.returnValue(mockForecast)
      spyOn(DarkSkyNet, 'readTemperature').and.returnValues(mockCelsius, mockFahrenheit)
      const weatherData = await Weather.fetchWeatherForLocations(locations)
      expect(weatherData).toBeDefined()
      expect(weatherData[0]).toBeDefined()
      expect(weatherData[0].location).toBeDefined()
      expect(weatherData[0].forecast).toBeDefined()
      expect(weatherData[0].temperature).toBeDefined()
      expect(weatherData[0].temperature.celsius).toBeDefined()
      expect(weatherData[0].temperature.fahrenheit).toBeDefined()
    })
    it('returns an array containing weather for each location', async () => {
      const locations: string[] = ['Vancouver, BC', 'Calgary, AB', 'Toronto, ON']
      const weatherData = await Weather.fetchWeatherForLocations(locations)
      expect(weatherData).toBeDefined()
      expect(weatherData.length).toEqual(3)
    })
  })

  describe('formatWeatherOutput', () => {
    it('is defined', () => {
      expect(Weather.formatWeatherOutput).toBeDefined()
    })
    it('returns expected string', () => {
      const location: string = 'Whistler, BC'
      const forecast: string = 'Cloudy'
      const temperatureInCelsius: string = '14˚'
      const temperatureInFahrenheit: string = '57˚'
      const formattedString = Weather.formatWeatherOutput(location, forecast, temperatureInCelsius, temperatureInFahrenheit)
      expect(formattedString).toBe(
        `Location: ${location}\n`
        + `Forecast: ${forecast}\n`
        + `Temp: ${temperatureInCelsius}C / ${temperatureInFahrenheit}F\n\n`)
    })
  })

})
