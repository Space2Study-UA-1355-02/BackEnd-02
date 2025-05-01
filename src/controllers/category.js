const categoryService = require('~/services/category')
const { DEFAULT_CATEGORY_LIMIT, DEFAULT_CATEGORY_SKIP } = require('~/consts/category')

const createCategory = async (req, res) => {
  const categoryData = req.body

  const newCategory = await categoryService.createCategory(categoryData)

  res.status(201).json(newCategory)
}

const getCategoryNames = async (req, res) => {
  const { limit, skip, sort, categories, name } = req.query

  const paginationLimit = Number.isInteger(Number(limit)) ? Number(limit) : DEFAULT_CATEGORY_LIMIT
  const paginationSkip = Number.isInteger(Number(skip)) ? Number(skip) : DEFAULT_CATEGORY_SKIP

  const sortOptions = sort?.orderBy ? { [sort.orderBy]: sort.order?.toLowerCase() === 'desc' ? -1 : 1 } : {}
  const validatedCategories =
    categories && (Array.isArray(categories) ? categories : categories.split(',').map((s) => s.trim()))

  const categoriesNames = await categoryService.getCategoryNames(
    paginationLimit,
    paginationSkip,
    sortOptions,
    validatedCategories,
    name
  )

  res.status(200).json({ categoriesNames: categoriesNames })
}

module.exports = {
  createCategory,
  getCategoryNames
}
