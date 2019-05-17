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

  describe('formatOutput', () => {
    it('is defined', () => {
      expect(Weather.formatOutput).toBeDefined()
    })
    it('returns expected string', () => {
      const time: string = '12:59:59'
      const forecast: string = 'Cloudy'
      const temperatureInCelsius: string = '14˚'
      const temperatureInFahrenheit: string = '57˚'
      const formattedString = Weather.formatOutput(time, forecast, temperatureInCelsius, temperatureInFahrenheit)
      expect(formattedString).toBe(`Time: ${time}\nForecast: ${forecast}\nTemp: ${temperatureInCelsius}C / ${temperatureInFahrenheit}F`)
    })
  })

})
