const Category = require('~/models/category')

const { createError } = require('~/utils/errorsHelper')

const { DOCUMENT_ALREADY_EXISTS } = require('~/consts/errors')
const { DEFAULT_CATEGORY_SKIP } = require('~/consts/category')

const categoryService = {
  createCategory: async (data) => {
    const {
      name,
      appearance: { icon, color }
    } = data

    const duplicate = await Category.findOne({ name })

    if (duplicate) {
      throw createError(409, DOCUMENT_ALREADY_EXISTS('name'))
    }

    return await Category.create({
      name,
      appearance: {
        icon,
        color
      }
    })
  },

  getCategoryById: async (id) => {
    return await Category.findById(id)
  },

  getCategoryNames: async (limit, skip, sort, categories, name) => {
    const query = {}
    if (categories) query._id = { $in: categories }
    if (name) query.name = { $regex: name, $options: 'i' }

    const [data, total] = await Promise.all([
      Category.find(query, 'name').sort(sort).skip(skip).limit(limit).lean(),
      Category.countDocuments(query)
    ])

    const mappedData = data.map(({ _id, name }) => ({ id: _id.toString(), name }))

    return {
      data: mappedData,
      total,
      limit: limit || total,
      skip: skip || DEFAULT_CATEGORY_SKIP
    }
  },

  getCategories: async (limit, skip, sort, categories, name) => {
    const query = {}
    if (categories) query._id = { $in: categories }
    if (name) query.name = { $regex: name, $options: 'i' }

    const [data, total] = await Promise.all([
      Category.find(query).sort(sort).skip(skip).limit(limit).lean(),
      Category.countDocuments(query)
    ])

    const mappedData = data.map(({ _id, name, appearance }) => ({ id: _id.toString(), name, appearance }))

    return {
      data: mappedData,
      total,
      limit: limit || total,
      skip: skip || DEFAULT_CATEGORY_SKIP
    }
  }
}

module.exports = categoryService
