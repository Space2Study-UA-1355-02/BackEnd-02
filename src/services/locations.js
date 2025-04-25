const { getCountriesData, getCitiesDataByCountry } = require('~/utils/getLocationsApiData')
const { paginate } = require('~/utils/paginate')
const { filterBySearch } = require('~/utils/filterBySearch')

const locationsService = {
  getCountries: async (limit, offset, search) => {
    const paginationLimit = limit ? parseInt(limit) : 10
    const paginationOffset = offset ? parseInt(offset) : 0

    const countries = await getCountriesData()
    const filteredCountries = filterBySearch(countries, search)

    return {
      data: {
        countries: paginate(filteredCountries, paginationLimit, paginationOffset),
        total: countries.length,
        limit: limit || countries.length,
        offset: offset || 0
      }
    }
  },

  getCitiesByCountry: async (countryName, limit, offset, search) => {
    const paginationLimit = limit ? parseInt(limit) : 10
    const paginationOffset = offset ? parseInt(offset) : 0

    const cities = await getCitiesDataByCountry(countryName)
    const filteredCities = filterBySearch(cities, search)

    return {
      data: {
        countries: [countryName],
        cities: paginate(filteredCities, paginationLimit, paginationOffset),
        total: cities.length,
        limit: limit || cities.length,
        offset: offset || 0
      }
    }
  }
}

module.exports = locationsService
