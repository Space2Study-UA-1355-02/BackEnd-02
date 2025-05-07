const { createError } = require('~/utils/errorsHelper')
const { BODY_IS_NOT_DEFINED } = require('~/consts/errors')
const { validateRequired, validateFunc } = require('~/utils/validationHelper')

const validateObject = (schema, data, path = '') => {
  Object.entries(schema).forEach(([schemaFieldKey, schemaFieldValue]) => {
    const fullPath = path ? `${path}.${schemaFieldKey}` : schemaFieldKey
    const reqBodyField = data[schemaFieldKey]

    validateRequired(fullPath, schemaFieldValue?.required, reqBodyField)

    if (reqBodyField) {
      if (schemaFieldValue.type === 'object' && schemaFieldValue.schema) {
        validateObject(schemaFieldValue.schema, reqBodyField, fullPath)
      } else {
        Object.entries(schemaFieldValue).forEach(([validationType, validationValue]) => {
          validateFunc[validationType](schemaFieldKey, validationValue, reqBodyField)
        })
      }
    }
  })
}

const validationMiddleware = (schema) => {
  return (req, _res, next) => {
    const { body } = req
    if (!body) {
      throw createError(422, BODY_IS_NOT_DEFINED)
    }

    validateObject(schema, body)
    next()
  }
}

module.exports = validationMiddleware
