const Category = require('~/models/category')
const { createError } = require('~/utils/errorsHelper')

const { DOCUMENT_ALREADY_EXISTS } = require('~/consts/errors')

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

  getCategoryNames: async (limit, skip, sortOptions, categories, name) => {
    const query = {}
    if (categories) query._id = { $in: categories }
    if (name) query.name = { $regex: name, $options: 'i' }

    return await Category.find(query, 'name').sort(sortOptions).skip(skip).limit(limit)
  }
}

module.exports = categoryService
