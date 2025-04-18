const errorMiddleware = require('~/middlewares/error')
const getUniqueFields = require('~/utils/getUniqueFields')

const {
  DOCUMENT_ALREADY_EXISTS,
  MONGO_SERVER_ERROR,
  VALIDATION_ERROR,
  INTERNAL_SERVER_ERROR
} = require('~/consts/errors')

jest.mock('~/logger/logger', () => ({
  error: jest.fn()
}))

jest.mock('~/utils/getUniqueFields', () => jest.fn())

describe('errorMiddleware', () => {
  const mockReq = {}
  const mockNext = jest.fn()

  const createRes = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }

  it('handles MongoServerError with code 11000 (duplicate key)', () => {
    const err = {
      name: 'MongoServerError',
      code: 11000,
      message: 'E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "test@example.com" }'
    }

    getUniqueFields.mockReturnValue(['email'])

    const res = createRes()
    errorMiddleware(err, mockReq, res, mockNext)

    const expected = DOCUMENT_ALREADY_EXISTS(['email'])

    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      ...expected
    })
  })

  it('handles MongoServerError with unknown code', () => {
    const err = {
      name: 'MongoServerError',
      code: 123,
      message: 'Unknown mongo error'
    }

    const res = createRes()
    errorMiddleware(err, mockReq, res, mockNext)

    const expected = MONGO_SERVER_ERROR('Unknown mongo error')

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      ...expected
    })
  })

  it('handles ValidationError', () => {
    const err = {
      name: 'ValidationError',
      message: 'Bad input'
    }

    const res = createRes()
    errorMiddleware(err, mockReq, res, mockNext)

    const expected = VALIDATION_ERROR('Bad input')

    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({
      status: 409,
      ...expected
    })
  })

  it('handles unknown error without status/code', () => {
    const err = {
      name: 'UnknownError',
      message: 'Boom'
    }

    const res = createRes()
    errorMiddleware(err, mockReq, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({
      status: 500,
      code: INTERNAL_SERVER_ERROR.code,
      message: 'Boom'
    })
  })

  it('handles custom error with status/code', () => {
    const err = {
      name: 'Whatever',
      message: 'Custom message',
      status: 403,
      code: 'ACCESS_DENIED'
    }

    const res = createRes()
    errorMiddleware(err, mockReq, res, mockNext)

    expect(res.status).toHaveBeenCalledWith(403)
    expect(res.json).toHaveBeenCalledWith({
      status: 403,
      code: 'ACCESS_DENIED',
      message: 'Custom message'
    })
  })
})
