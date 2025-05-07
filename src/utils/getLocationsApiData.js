const { createError } = require('~/utils/errorsHelper')
const { INTERNAL_SERVER_ERROR } = require('~/consts/errors')
const API_URL = 'https://countriesnow.space/api/v0.1'

const getCountriesData = async () => {
  try {
    const response = await fetch(`${API_URL}/countries/states`)
    const result = await response.json()

    if (result.error === false && Array.isArray(result.data)) {
      return result.data.map((country) => country.name)
    } else {
      return []
    }
  } catch (error) {
    throw createError(500, INTERNAL_SERVER_ERROR)
  }
}

const getCitiesDataByCountry = async (countryName) => {
  try {
    const response = await fetch(`${API_URL}/countries/cities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: countryName.toLowerCase() })
    })
    const result = await response.json()

    if (result.error === false && Array.isArray(result.data)) {
      return result.data
    } else {
      return []
    }
  } catch (error) {
    throw createError(500, INTERNAL_SERVER_ERROR)
  }
}

module.exports = { getCountriesData, getCitiesDataByCountry }
