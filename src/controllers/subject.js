const subjectService = require('~/services/subject')

const getSubjectById = async (req, res) => {
  const { id } = req.params

  const subject = await subjectService.getSubjectById(id)

  res.status(200).json(subject)
}

module.exports = {
  getSubjectById
}
