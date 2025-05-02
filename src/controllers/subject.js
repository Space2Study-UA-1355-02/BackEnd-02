const subjectService = require('~/services/subject')

const getSubjectById = async (req, res) => {
  const { id } = req.params

  const subject = await subjectService.getSubjectById(id)

  res.status(200).json(subject)
}

const getSubjects = async (req, res) => {
  const { limit, offset, search } = req.query
  const subjects = await subjectService.getSubjects(limit, offset, search)

  res.status(200).json(subjects)
}

const createSubject = async (req, res) => {
  const { name, categoryId } = req.body

  const newSubject = await subjectService.createOffer(name, categoryId)

  res.status(201).json(newSubject)
}

const updateSubject = async (req, res) => {
  const { id } = req.params
  const updateData = req.body

  await subjectService.updateSubject(id, updateData)

  res.status(204).end()
}

const deleteSubject = async (req, res) => {
  const { id } = req.params

  await subjectService.deleteSubject(id)

  res.status(204).end()
}

module.exports = {
  getSubjectById,
  getSubjects,
  createSubject,
  updateSubject,
  deleteSubject
}
