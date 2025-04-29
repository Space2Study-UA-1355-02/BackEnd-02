const Subject = require('~/models/subject')

const subjectService = {
  getSubjectById: async (id) => {
    const subject = await Subject.findById(id)

    return subject
  }
}

module.exports = subjectService
