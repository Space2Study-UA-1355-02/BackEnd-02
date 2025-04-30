const { Schema, model } = require('mongoose')

const { CATEGORY } = require('~/consts/models')

const {
  FIELD_CANNOT_BE_EMPTY,
  DOCUMENT_ALREADY_EXISTS,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER
} = require('~/consts/errors')

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('name')],
    unique: [true, DOCUMENT_ALREADY_EXISTS('name')],
    minLength: [1, FIELD_CANNOT_BE_SHORTER('name', 1)],
    maxLength: [150, FIELD_CANNOT_BE_LONGER('name', 150)]
  },
  appearance: {
    icon: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('icon')],
      default: 'Language'
    },
    color: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('color')],
      default: '#66C42C'
    }
  }
})

module.exports = model(CATEGORY, categorySchema)
