const router = require('express').Router()

const { authMiddleware, restrictTo } = require('~/middlewares/auth')
const asyncWrapper = require('~/middlewares/asyncWrapper')
const { normalizeCategoryQueryParams } = require('~/middlewares/normalizeCategoryQueryParams')
const validationMiddleware = require('~/middlewares/validation')

const categoryController = require('~/controllers/category')
const { addCategorySchema } = require('~/validation/schemas/addCategory')

const {
  roles: { ADMIN }
} = require('~/consts/auth')

router.use(authMiddleware)
router.get('/', normalizeCategoryQueryParams, asyncWrapper(categoryController.getCategories))
router.get('/names', normalizeCategoryQueryParams, asyncWrapper(categoryController.getCategoryNames))
router.get('/subjects', asyncWrapper(categoryController.getSubjects))
router.get('/subjects/names', normalizeCategoryQueryParams, asyncWrapper(categoryController.getSubjectsNames))
router.get('/:id', asyncWrapper(categoryController.getCategoryById))
router.get('/:id/subjects', asyncWrapper(categoryController.getSubjects))
router.get('/:id/subjects/names', normalizeCategoryQueryParams, asyncWrapper(categoryController.getSubjectsNames))

router.use(restrictTo(ADMIN))
router.post('/', validationMiddleware(addCategorySchema), asyncWrapper(categoryController.createCategory))

module.exports = router
