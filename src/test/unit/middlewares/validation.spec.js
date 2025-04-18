const validationMiddleware = require('~/middlewares/validation')
const { validateFunc, validateRequired } = require('~/utils/validationHelper')

jest.mock('~/utils/errorsHelper', () => ({
  createError: jest.fn((status, message) => ({ status, message }))
}))

jest.mock('~/utils/validationHelper', () => ({
  validateRequired: jest.fn(),
  validateFunc: {
    minLength: jest.fn(),
    isEmail: jest.fn(),
    required: jest.fn()
  }
}))

describe('validationMiddleware', () => {
  let req, res, next

  beforeEach(() => {
    req = { body: {} }
    res = {}
    next = jest.fn()
    jest.clearAllMocks()
  })

  it('should throw an error if req.body is not defined', () => {
    req.body = undefined

    const middleware = validationMiddleware({})
    expect(() => middleware(req, res, next)).toThrow(
      expect.objectContaining({
        status: 422,
        message: {
          code: 'BODY_IS_NOT_DEFINED',
          message: 'request body should not be null or undefined'
        }
      })
    )
  })

  it('should call validateRequired for each schema field', () => {
    const schema = {
      name: { required: true },
      email: { required: true }
    }

    req.body = {
      name: 'John',
      email: 'john@example.com'
    }

    const middleware = validationMiddleware(schema)
    middleware(req, res, next)

    expect(validateRequired).toHaveBeenCalledTimes(2)
    expect(validateRequired).toHaveBeenCalledWith('name', true, 'John')
    expect(validateRequired).toHaveBeenCalledWith('email', true, 'john@example.com')
    expect(next).toHaveBeenCalled()
  })

  it('should call validateFunc validators when field exists', () => {
    const schema = {
      password: {
        required: true,
        minLength: 6
      },
      email: {
        required: true,
        isEmail: true
      }
    }

    req.body = {
      password: '123456',
      email: 'user@example.com'
    }

    const middleware = validationMiddleware(schema)
    middleware(req, res, next)

    expect(validateFunc.minLength).toHaveBeenCalledWith('password', 6, '123456')
    expect(validateFunc.isEmail).toHaveBeenCalledWith('email', true, 'user@example.com')
    expect(next).toHaveBeenCalled()
  })

  it('should skip validateFunc if body field is missing', () => {
    const schema = {
      username: {
        required: true,
        minLength: 4
      }
    }

    req.body = {}

    const middleware = validationMiddleware(schema)
    middleware(req, res, next)

    expect(validateFunc.minLength).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalled()
  })
})
