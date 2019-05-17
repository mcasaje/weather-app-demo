import Weather from '../src/weather'

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
    it('returns an array of object containing forecast and temperatures', () => {
      const locations: string[] = ['Vancouver, BC']
      const weatherData = Weather.fetchWeatherForLocations(locations)
      expect(weatherData[0]).toBeDefined()
      expect(weatherData[0].forecast).toBeDefined()
      expect(weatherData[0].temperature).toBeDefined()
      expect(weatherData[0].temperature.celsius).toBeDefined()
      expect(weatherData[0].temperature.fahrenheit).toBeDefined()
    })
    it('returns an array containing weather for each location', () => {
      const locations: string[] = ['Vancouver, BC', 'Calgary, AB', 'Toronto, ON']
      const weatherData = Weather.fetchWeatherForLocations(locations)
      expect(weatherData).toBeDefined()
      expect(weatherData.length).toEqual(3)
    })
  })

  describe('formatOutput', () => {
    it('is defined', () => {
      expect(Weather.formatOutput).toBeDefined()
    })
    it('returns expected string', () => {
      const location: string = 'Whistler, BC'
      const time: string = '12:59:59'
      const forecast: string = 'Cloudy'
      const temperatureInCelsius: string = '14˚'
      const temperatureInFahrenheit: string = '57˚'
      const formattedString = Weather.formatOutput(location, time, forecast, temperatureInCelsius, temperatureInFahrenheit)
      expect(formattedString).toBe(
        `Location: ${location}\n`
        + `Time: ${time}\n`
        + `Forecast: ${forecast}\n`
        + `Temp: ${temperatureInCelsius}C / ${temperatureInFahrenheit}F\n\n`)
    })
  })

})
