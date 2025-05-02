const Subject = require('~/models/subject')
const { createError } = require('~/utils/errorsHelper')
const { NOT_FOUND } = require('~/consts/errors')
const filterAllowedFields = require('~/src/utils/filterAllowedFields')
const { allowedSubjectFieldsForUpdate } = require('~/src/validation/services/subject')
const { paginate } = require('~/utils/paginate')
const { filterBySearch } = require('~/utils/filterBySearch')

const subjectService = {
  getSubjectById: async (id) => {
    const subject = await Subject.findById(id)

    if (!subject) {
      throw createError(404, NOT_FOUND)
    }

    return subject
  },

  getSubjects: async (limit, offset, search) => {
    const limitNumber = parseInt(limit)
    const offsetNumber = parseInt(offset)

    const paginationLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber : 10
    const paginationOffset = !isNaN(offsetNumber) && offsetNumber >= 0 ? offsetNumber : 0

    const subjects = await Subject.find().lean()
    const filteredSubjects = filterBySearch(subjects, search)

    return {
      data: {
        subjects: paginate(filteredSubjects, paginationLimit, paginationOffset),
        total: subjects.length,
        limit: limit,
        offset: offset || 0
      }
    }
  },

  createSubject: async (name, categoryId) => {
    const subject = new Subject({
      name,
      category: categoryId
    })

    await subject.save()

    return subject
  },

  updateSubject: async (id, updateData) => {
    const filteredUpdateData = filterAllowedFields(updateData, allowedSubjectFieldsForUpdate)

    const subject = await subjectService.getSubjectById(id)

    for (let field in filteredUpdateData) {
      subject[field] = filteredUpdateData[field]
    }

    await subject.validate()
    await subject.save()

    return subject
  },

  deleteSubject: async (id) => {
    const subject = await Subject.findByIdAndRemove(id).exec()

    if (!subject) {
      throw createError(404, NOT_FOUND)
    }

    return subject
  }
}

module.exports = subjectService
