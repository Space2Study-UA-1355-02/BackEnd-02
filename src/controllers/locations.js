const locationsService = require('~/services/locations')

const getCountries = async (req, res) => {
  const countries = await locationsService.getCountries()

  res.status(200).json(countries)
}

const getCitiesByCountry = async (req, res) => {
  const { country } = req.query
  const countries = await locationsService.getCitiesByCountry(country)

  res.status(200).json(countries)
}

module.exports = { getCountries, getCitiesByCountry }
