const router = require('express').Router()
const asyncWrapper = require('~/middlewares/asyncWrapper')
const countryNameValidation = require('~/middlewares/countryNameValidation')

const locationsController = require('~/controllers/locations')

router.get('/countries', asyncWrapper(locationsController.getCountries))

router.get('/cities', countryNameValidation(), asyncWrapper(locationsController.getCitiesByCountry))

module.exports = router
