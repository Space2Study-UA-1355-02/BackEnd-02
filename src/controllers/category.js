const mongoose = require('mongoose')

const categoryService = require('~/services/category')

const { createBadRequestError, createNotFoundError } = require('~/utils/errorsHelper')

const createCategory = async (req, res) => {
  const categoryData = req.body

  const newCategory = await categoryService.createCategory(categoryData)

  res.status(201).json(newCategory)
}

const getCategoryById = async (req, res) => {
  const id = req.params.id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw createBadRequestError()
  }

  const category = await categoryService.getCategoryById(id)

  if (!category) {
    throw createNotFoundError()
  }

  res.status(200).json(category)
}

module.exports = {
  createCategory,
  getCategoryById
}
