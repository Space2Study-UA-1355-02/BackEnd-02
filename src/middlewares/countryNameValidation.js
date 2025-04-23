const { getCountriesData } = require('~/utils/getLocationsApiData')
const { createError } = require('~/utils/errorsHelper')
const { NOT_FOUND, BAD_REQUEST } = require('~/consts/errors')

const countryNameValidation = () => {
  return async (req, _res, next) => {
    const { country } = req.query
    const validCountries = await getCountriesData()

    if (!country) {
      next(createError(400, BAD_REQUEST))
    }

    const isValid = validCountries.includes(country.trim())

    if (!isValid) {
      next(createError(404, NOT_FOUND))
    }

    next()
  }
}

module.exports = countryNameValidation
