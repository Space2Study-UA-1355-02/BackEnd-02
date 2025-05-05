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
  getCategoryById: async (id) => {
    return await Category.findById(id)
  }
}

module.exports = categoryService
