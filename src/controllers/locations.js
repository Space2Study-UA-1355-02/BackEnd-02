const locationsService = require('~/services/locations')

const getCountries = async (req, res) => {
  const { limit, offset, search } = req.query
  const countries = await locationsService.getCountries(limit, offset, search)

  res.status(200).json(countries)
}

const getCitiesByCountry = async (req, res) => {
  const { country, limit, offset, search } = req.query
  const countries = await locationsService.getCitiesByCountry(country, limit, offset, search)

  res.status(200).json(countries)
}

module.exports = { getCountries, getCitiesByCountry }
