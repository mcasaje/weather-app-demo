import Request from './request'

namespace DarkSkyNet {
  const HTML_SELECTOR_FOR_WEATHER_STRING = '#title .currently .desc .swap'
  const URL_GEO_QUERY: string = `https://darksky.net/geo?q=%`

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

  export const fetchGeoCoordinatesForLocationName = async (locationName: string): Promise<any> => {
    return fetchGeoCoordinates(locationName)
  }

  export const fetchGeoCoordinatesForPostalCode = async (postalCode: string): Promise<any> => {
    return fetchGeoCoordinates(postalCode)
  }

  const fetchGeoCoordinates = async (query: string): Promise<any> => {
    const geoQueryUrl = URL_GEO_QUERY.replace('%', query)
    const response = await Request.get(geoQueryUrl)
    return response
  }
}

export default DarkSkyNet
