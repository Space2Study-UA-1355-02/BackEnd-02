const mongoose = require('mongoose')

const { DEFAULT_CATEGORY_LIMIT, DEFAULT_CATEGORY_SKIP } = require('~/consts/category')

const normalizeCategoryQueryParams = (req, res, next) => {
  const { limit, skip, sort, categories } = req.query

  req.query.limit = Number.isInteger(Number(limit)) ? Number(limit) : DEFAULT_CATEGORY_LIMIT

  req.query.skip = Number.isInteger(Number(skip)) ? Number(skip) : DEFAULT_CATEGORY_SKIP

  req.query.sort = sort?.orderBy ? { [sort.orderBy]: sort.order?.toLowerCase() === 'desc' ? -1 : 1 } : {}

  const categoryArr =
    categories && (Array.isArray(categories) ? categories : categories.split(',').map((s) => s.trim()))

  req.query.categories = categories && categoryArr.filter((id) => mongoose.Types.ObjectId.isValid(id))

  next()
}

module.exports = {
  normalizeCategoryQueryParams
}
