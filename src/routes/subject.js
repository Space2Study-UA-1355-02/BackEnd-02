const router = require('express').Router()

const idValidation = require('~/middlewares/idValidation')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const isEntityValid = require('~/middlewares/entityValidation')

const subjectController = require('~/controllers/subject')
const Subject = require('~/models/subject')
const Category = require('~/models/category')

const body = [{ model: Category, idName: 'categoryId' }]

const params = [{ model: Subject, idName: 'id' }]

router.param('id', idValidation)

router.get('/:id', isEntityValid({ params }), asyncWrapper(subjectController.getSubjectById))

router.get('/', asyncWrapper(subjectController.getSubjects))

router.post('/', isEntityValid({ body }), asyncWrapper(subjectController.createSubject))

router.patch('/:id', isEntityValid({ params }), asyncWrapper(subjectController.updateOffer))

router.delete('/:id', isEntityValid({ params }), asyncWrapper(subjectController.deleteSubject))

module.exports = router
