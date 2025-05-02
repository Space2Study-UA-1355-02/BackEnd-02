const Subject = require('~/models/subject')
const { createError } = require('~/utils/errorsHelper')
const { NOT_FOUND } = require('~/consts/errors')

const subjectService = {
  getSubjectById: async (id) => {
    const subject = await Subject.findById(id)

    if (!subject) {
      throw createError(404, NOT_FOUND)
    }

    return subject
  }
}

module.exports = subjectService
