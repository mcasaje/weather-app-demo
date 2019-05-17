import Weather from '../src/weather'
import DarkSkyNet from '../src/libs/dark-sky-net'

describe('Weather', () => {

  describe('parseArgs', () => {
    it('is defined', () => {
      expect(Weather.parseArgs).toBeDefined()
    })
    it('returns locations separated by commas from process.argv', () => {
      const argumentVector: string[] = [
        '/usr/bin/node',
        'dist/lib/weather.js',
        'New',
        'York,',
        'San',
        'Francisco,',
        'New',
        'Orleans,'
      ]
      const expectedLocations = ['New York', 'San Francisco', 'New Orleans']
      const args = Weather.parseArgs(argumentVector)
      expect(args).toBeDefined()
      expect(args.locations).toBeDefined()
      expect(args.locations.length).toEqual(expectedLocations.length)
      expect(args.locations[0]).toBe(expectedLocations[0])
      expect(args.locations[1]).toBe(expectedLocations[1])
      expect(args.locations[2]).toBe(expectedLocations[2])
    })
  })

  describe('fetchWeatherForLocations', () => {

    describe('weather data when location is found', () => {

      const mockGeoLocation = {latitude: 10, longitude: -10}
      const mockCelsius = '14˚'
      const mockFahrenheit = '57˚'
      const mockForecast = 'Light Rain'
      const mockWeatherStringCelsius = `${mockCelsius} ${mockForecast}.`
      const mockWeatherStringFahrenheit = `${mockFahrenheit} ${mockForecast}.`

      beforeEach(() => {
        spyOn(DarkSkyNet, 'fetchGeoCoordinatesForQuery').and.returnValue(Promise.resolve(mockGeoLocation))
        spyOn(DarkSkyNet, 'fetchWeatherInCelsius').and.returnValue(Promise.resolve(mockWeatherStringCelsius))
        spyOn(DarkSkyNet, 'fetchWeatherInFahrenheit').and.returnValue(Promise.resolve(mockWeatherStringFahrenheit))
        spyOn(DarkSkyNet, 'readForecast').and.returnValue(mockForecast)
        spyOn(DarkSkyNet, 'readTemperature').and.returnValues(mockCelsius, mockFahrenheit)
      })

      it('is defined', () => {
        expect(Weather.fetchWeatherForLocations).toBeDefined()
      })
      it('returns an array containing weather for each location', async () => {
        const locations: string[] = ['Vancouver BC', 'Calgary AB', 'Toronto ON']
        const weatherData = await Weather.fetchWeatherForLocations(locations)
        expect(weatherData).toBeDefined()
        expect(weatherData.length).toEqual(3)
      })
      it('returns an array of object containing forecast and temperatures', async () => {
        const locations: string[] = ['Vancouver BC']
        const weatherData = await Weather.fetchWeatherForLocations(locations)
        expect(weatherData).toBeDefined()
        expect(weatherData[0]).toBeDefined()
        expect(weatherData[0].success).toBeTruthy()
        expect(weatherData[0].location).toBe(locations[0])
        expect(weatherData[0].forecast).toBe(mockForecast)
        expect(weatherData[0].temperature).toBeDefined()
        expect(weatherData[0].temperature.celsius).toBe(mockCelsius)
        expect(weatherData[0].temperature.fahrenheit).toBe(mockFahrenheit)
      })
    })

    describe('weather data when location is not found', () => {

      beforeEach(() => {
        spyOn(DarkSkyNet, 'fetchGeoCoordinatesForQuery').and.throwError('Location not found.')
      })

      it('returns "success=false" in weather data when location could not be found', async () => {
        const locations: string[] = ['Hogwarts']
        const weatherData = await Weather.fetchWeatherForLocations(locations)
        expect(weatherData).toBeDefined()
        expect(weatherData[0]).toBeDefined()
        expect(weatherData[0].success).toBeFalsy()
      })
      it('returns "?" for all string attributes when location could not be found', async () => {
        const errorSymbol = '?'
        const locations: string[] = ['Hogwarts']
        const weatherData = await Weather.fetchWeatherForLocations(locations)
        expect(weatherData).toBeDefined()
        expect(weatherData[0]).toBeDefined()
        expect(weatherData[0].location).toBe(locations[0])
        expect(weatherData[0].forecast).toBe(errorSymbol)
        expect(weatherData[0].temperature).toBeDefined()
        expect(weatherData[0].temperature.celsius).toBe(errorSymbol)
        expect(weatherData[0].temperature.fahrenheit).toBe(errorSymbol)
      })
    })
  })

  describe('formatWeatherOutput', () => {
    it('is defined', () => {
      expect(Weather.formatWeatherOutput).toBeDefined()
    })
    it('returns expected string', () => {
      const location: string = 'Whistler, BC'
      const forecast: string = 'Cloudy'
      const celsius: string = '14˚'
      const fahrenheit: string = '57˚'
      const formattedString = Weather.formatWeatherOutput(location, forecast, celsius, fahrenheit)
      expect(formattedString).toBe(
        `Location: ${location}\n`
        + `Forecast: ${forecast}\n`
        + `Temp: ${celsius}C / ${fahrenheit}F\n`)
    })
  })

})
