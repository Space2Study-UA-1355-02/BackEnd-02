const Subject = require('~/models/subject')
const { createError } = require('~/utils/errorsHelper')
const { NOT_FOUND } = require('~/consts/errors')
const filterAllowedFields = require('~/utils/filterAllowedFields')
const { allowedSubjectFieldsForUpdate } = require('~/validation/services/subject')
const { paginate } = require('~/utils/paginate')

const subjectService = {
  getSubjectById: async (id) => {
    const subject = await Subject.findById(id)

    if (!subject) {
      throw createError(404, NOT_FOUND)
    }

    return subject
  },

  getSubjects: async (limit, offset, search, categoryId) => {
    const limitNumber = parseInt(limit)
    const offsetNumber = parseInt(offset)

    const paginationLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber : 10
    const paginationOffset = !isNaN(offsetNumber) && offsetNumber >= 0 ? offsetNumber : 0

    const query = {}
    if (categoryId) query.category = categoryId
    if (search) query.name = { $regex: search, $options: 'i' }

    const subjects = await Subject.find(query).lean()

    return {
      data: {
        subjects: paginate(subjects, paginationLimit, paginationOffset),
        total: subjects.length,
        limit: limit,
        offset: offset || 0
      }
    }
  },

  getSubjectsNames: async (limit, skip, sort, name, id) => {
    const query = {}
    if (id) query.category = id
    if (name) query.name = { $regex: name, $options: 'i' }

    const [data, total] = await Promise.all([
      Subject.find(query, 'name').sort(sort).skip(skip).limit(limit).lean(),
      Subject.countDocuments(query)
    ])

    return {
      data,
      total
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
