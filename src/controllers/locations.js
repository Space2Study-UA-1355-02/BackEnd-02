const locationsService = require('~/services/locations')

const getCountries = async (req, res) => {
  const { limit, offset } = req.query
  const countries = await locationsService.getCountries(limit, offset)

  res.status(200).json(countries)
}

const getCitiesByCountry = async (req, res) => {
  const { country, limit, offset } = req.query
  const countries = await locationsService.getCitiesByCountry(country, limit, offset)

  res.status(200).json(countries)
}

module.exports = { getCountries, getCitiesByCountry }
