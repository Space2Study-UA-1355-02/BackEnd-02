const { Schema, model } = require('mongoose')

const { DEFAULT_CATEGORY_ICON, DEFAULT_CATEGORY_ICON_COLOR } = require('~/consts/category')
const {
  FIELD_CANNOT_BE_EMPTY,
  DOCUMENT_ALREADY_EXISTS,
  FIELD_CANNOT_BE_SHORTER,
  FIELD_CANNOT_BE_LONGER
} = require('~/consts/errors')
const { CATEGORY } = require('~/consts/models')
const {
  regex: { HEX_COLOR_CODE_PATTERN, NAME_PATTERN }
} = require('~/consts/validation')

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, FIELD_CANNOT_BE_EMPTY('name')],
    unique: [true, DOCUMENT_ALREADY_EXISTS('name')],
    regex: NAME_PATTERN,
    minLength: [1, FIELD_CANNOT_BE_SHORTER('name', 1)],
    maxLength: [150, FIELD_CANNOT_BE_LONGER('name', 150)]
  },
  appearance: {
    icon: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('icon')],
      default: DEFAULT_CATEGORY_ICON
    },
    color: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('color')],
      regex: HEX_COLOR_CODE_PATTERN,
      default: DEFAULT_CATEGORY_ICON_COLOR
    }
  }
})

module.exports = model(CATEGORY, categorySchema)
