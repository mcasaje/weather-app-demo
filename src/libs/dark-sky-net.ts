import Request from './request'

namespace DarkSkyNet {
  const HTML_SELECTOR_FOR_WEATHER_STRING = '#title .currently .desc .swap'
  const URL_GEO_QUERY: string = 'https://darksky.net/geo?q=%'
  const URL_FORECAST_IN_CELSIUS = 'https://darksky.net/forecast/%/ca12/en'
  const URL_FORECAST_IN_FAHRENHEIT = 'https://darksky.net/forecast/%/us12/en'

  export const readTemperature = (weatherString: string): string => {
    const weatherStringParts = weatherString.split(' ')
    return weatherStringParts.length > 0 ? weatherStringParts[0] : '?'
  }

  export const readForecast = (weatherString: string): string => {
    const weatherStringParts = weatherString.split(' ')
    let forecast = '?'
    if (weatherStringParts.length > 1) {
      forecast = weatherString.substr(weatherStringParts[0].length + 1, weatherString.length)
    }
    return forecast
  }

  export const fetchGeoCoordinatesForLocationName = async (locationName: string): Promise<any> => {
    return fetchGeoCoordinates(locationName)
  }

  export const fetchGeoCoordinatesForPostalCode = async (postalCode: string): Promise<any> => {
    return fetchGeoCoordinates(postalCode)
  }

  export const fetchWeatherInCelsius = async (latitude: number, longitude: number): Promise<any> => {
    const geoLocationUrlParam = `${latitude},${longitude}`
    const celsiusForecastUrl = URL_FORECAST_IN_CELSIUS.replace('%', `${geoLocationUrlParam}`)
    return Request.fetchTextFromHtmlPage(celsiusForecastUrl, HTML_SELECTOR_FOR_WEATHER_STRING)
  }

  export const fetchWeatherInFahrenheit = async (latitude: number, longitude: number): Promise<any> => {
    const geoLocationUrlParam = `${latitude},${longitude}`
    const fahrenheitForecastUrl = URL_FORECAST_IN_FAHRENHEIT.replace('%', `${geoLocationUrlParam}`)
    return Request.fetchTextFromHtmlPage(fahrenheitForecastUrl, HTML_SELECTOR_FOR_WEATHER_STRING)
  }

  const fetchGeoCoordinates = async (query: string): Promise<any> => {
    const geoQueryUrl = URL_GEO_QUERY.replace('%', query)
    return Request.get(geoQueryUrl)
  }
}

export default DarkSkyNet
