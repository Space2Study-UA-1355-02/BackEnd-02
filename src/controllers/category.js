const mongoose = require('mongoose')

const categoryService = require('~/services/category')

const { createBadRequestError, createError } = require('~/utils/errorsHelper')

const { DATA_NOT_FOUND } = require('~/consts/errors')
const subjectService = require('~/services/subject')

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
    throw createError(404, DATA_NOT_FOUND)
  }

  res.status(200).json(category)
}

const getCategoryNames = async (req, res) => {
  const { limit, skip, sort, categories, name } = req.query

  const result = await categoryService.getCategoryNames(limit, skip, sort, categories, name)

  res.status(200).json(result.data)
}

const getCategories = async (req, res) => {
  const { limit, skip, sort, categories, name } = req.query

  const result = await categoryService.getCategories(limit, skip, sort, categories, name)

  res.status(200).json(result)
}

const getSubjects = async (req, res) => {
  const { id } = req.params
  const { name, limit, skip } = req.query

  const { data } = await subjectService.getSubjects(limit, skip, name, id)

  res.status(200).json({ items: data.subjects, count: data.total })
}

const getSubjectsNames = async (req, res) => {
  const { id } = req.params
  const { limit, skip, sort, name } = req.query

  const { data } = await subjectService.getSubjectsNames(limit, skip, sort, name, id)

  res.status(200).json({ items: data.subjects, count: data.total })
}

module.exports = {
  createCategory,
  getCategories,
  getCategoryNames,
  getCategoryById,
  getSubjects,
  getSubjectsNames
}
