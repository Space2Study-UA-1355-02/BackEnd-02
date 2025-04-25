const { getCountriesData, getCitiesDataByCountry } = require('~/utils/getLocationsApiData')
const { paginate } = require('~/utils/paginate')

const locationsService = {
  getCountries: async (limit, offset) => {
    const paginationLimit = limit ? parseInt(limit) : 10
    const paginationOffset = offset ? parseInt(offset) : 0

    const countries = await getCountriesData()
    return {
      data: {
        countries: paginate(countries, paginationLimit, paginationOffset),
        total: countries.length,
        limit: limit || countries.length,
        offset: offset || 0
      }
    }
  },

  getCitiesByCountry: async (countryName, limit, offset) => {
    const cities = await getCitiesDataByCountry(countryName)
    const paginationLimit = limit ? parseInt(limit) : 10
    const paginationOffset = offset ? parseInt(offset) : 0

    return {
      data: {
        countries: [countryName],
        cities: paginate(cities, paginationLimit, paginationOffset),
        total: cities.length,
        limit: limit || cities.length,
        offset: offset || 0
      }
    }
  }
}

module.exports = locationsService
