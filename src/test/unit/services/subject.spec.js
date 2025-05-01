const subjectService = require('~/services/subject')
const SubjectSpec = require('~/models/subject')
const { NOT_FOUND } = require('~/consts/errors')

jest.mock('~/models/subject')

describe('subjectService.getSubjectById', () => {
  afterEach(() => jest.clearAllMocks())

  it('should return subject if it is exist', async () => {
    const mockSubject = { _id: '123', name: 'Math' }
    SubjectSpec.findById.mockResolvedValue(mockSubject)

    const result = await subjectService.getSubjectById('123')
    expect(result).toEqual(mockSubject)
    expect(SubjectSpec.findById).toHaveBeenCalledWith('123')
  })

  it('should return error if subject was not found', async () => {
    SubjectSpec.findById.mockResolvedValue(null)

    await expect(subjectService.getSubjectById('123')).rejects.toThrow(NOT_FOUND)
  })
})
