const router = require('express').Router()

const { authMiddleware, restrictTo } = require('~/middlewares/auth')
const asyncWrapper = require('~/middlewares/asyncWrapper')

const categoryController = require('~/controllers/category')

const {
  roles: { ADMIN }
} = require('~/consts/auth')

router.use(authMiddleware)
router.get('/names', asyncWrapper(categoryController.getCategoryNames))

router.use(restrictTo(ADMIN))
router.post('/', asyncWrapper(categoryController.createCategory))

module.exports = router
