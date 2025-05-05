const categoryService = require('~/services/category')

const { DEFAULT_CATEGORY_LIMIT, DEFAULT_CATEGORY_SKIP } = require('~/consts/category')

const createCategory = async (req, res) => {
  const categoryData = req.body

  const newCategory = await categoryService.createCategory(categoryData)

  res.status(201).json(newCategory)
}


const getCategories = async (req, res) => {
  const { limit = DEFAULT_CATEGORY_LIMIT, skip = DEFAULT_CATEGORY_SKIP, sort, categories, name } = req.query

  const categoriesFromDB = await categoryService.getCategories(limit, skip, sort, categories, name)

  res.status(200).json(categoriesFromDB)
}

module.exports = {
  createCategory,
  getCategories
}
