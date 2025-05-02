const router = require('express').Router()

const idValidation = require('~/middlewares/idValidation')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const isEntityValid = require('~/middlewares/entityValidation')

const subjectController = require('~/controllers/subject')
const Subject = require('~/models/subject')

const params = [{ model: Subject, idName: 'id' }]

router.param('id', idValidation)

router.get('/:id', isEntityValid({ params }), asyncWrapper(subjectController.getSubjectById))

module.exports = router
