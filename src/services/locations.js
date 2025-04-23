const { getCountriesData, getCitiesDataByCountry } = require('~/utils/getLocationsApiData')

const locationsService = {
  getCountries: async () => {
    return getCountriesData()
  },

  getCitiesByCountry: async (countryName) => {
    return getCitiesDataByCountry(countryName)
  }
}

module.exports = locationsService
