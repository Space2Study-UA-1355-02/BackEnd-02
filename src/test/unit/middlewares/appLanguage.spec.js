const { INVALID_LANGUAGE } = require('~/consts/errors')
const { createError } = require('~/utils/errorsHelper')
const langMiddleware = require('~/middlewares/appLanguage')
const {
  enums: { APP_LANG_ENUM }
} = require('~/consts/validation')

jest.mock('~/utils/errorsHelper', () => ({
  createError: jest.fn().mockReturnValue(new Error('Mocked Error'))
}))

describe('appLanguage valid languages check', () => {
  let req, res, next

  beforeEach(() => {
    req = { headers: {} }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()
  })

  it('should call next if language is valid', () => {
    APP_LANG_ENUM.forEach((validLang) => {
      req.acceptsLanguages = jest.fn().mockReturnValue(validLang)

      langMiddleware(req, res, next)

      expect(next).toHaveBeenCalled()
      expect(res.status).not.toHaveBeenCalled()
      next.mockClear()
    })
  })

  it('should throw an error if language is invalid', () => {
    req.acceptsLanguages = jest.fn().mockReturnValue(false)

    const error = new Error(INVALID_LANGUAGE)
    error.status = 400
    createError.mockReturnValue(error)

    expect(() => langMiddleware(req, res, next)).toThrowError(error)
    expect(createError).toHaveBeenCalledWith(400, INVALID_LANGUAGE)
  })
})
