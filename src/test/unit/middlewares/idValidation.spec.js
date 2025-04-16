const mongoose = require('mongoose')
const { createError } = require('~/utils/errorsHelper')
const { INVALID_ID } = require('~/consts/errors')
const idValidation = require('~/middlewares/idValidation')

jest.mock('~/utils/errorsHelper', () => ({
  createError: jest.fn().mockReturnValue(new Error('Mocked Error'))
}))

describe('idValidation middleware', () => {
  let req, res, next

  beforeEach(() => {
    req = {}
    res = {}
    next = jest.fn()
  })

  it('should call next if id is valid', () => {
    const validId = new mongoose.Types.ObjectId().toString()
    req.params = { id: validId }

    idValidation(req, res, next, req.params.id)

    expect(next).toHaveBeenCalled()
  })

  it('should throw an error if id is invalid', () => {
    const invalidId = 'some-invalid-id'
    req.params = { id: invalidId }

    const error = new Error(INVALID_ID)
    error.status = 400
    createError.mockReturnValue(error)

    expect(() => idValidation(req, res, next, req.params.id)).toThrowError(error)

    expect(createError).toHaveBeenCalledWith(400, INVALID_ID)
  })
})
