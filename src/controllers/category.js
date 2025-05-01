const categoryService = require('~/services/category')

const createCategory = async (req, res) => {
  const categoryData = req.body

  const newCategory = await categoryService.createCategory(categoryData)

  res.status(201).json(newCategory)
}

module.exports = {
  createCategory
}
