const {
  lengths: { MAX_NAME_LENGTH, MIN_NAME_LENGTH },
  regex: { TITLE_PATTERN, HEX_COLOR_CODE_PATTERN }
} = require('~/consts/validation')

const addCategorySchema = {
  name: {
    type: 'string',
    regex: TITLE_PATTERN,
    required: true,
    length: {
      min: MIN_NAME_LENGTH,
      max: MAX_NAME_LENGTH
    }
  },
  appearance: {
    type: 'object',
    schema: {
      icon: {
        type: 'string'
      },
      color: {
        type: 'string',
        regex: HEX_COLOR_CODE_PATTERN
      }
    }
  }
}

module.exports = { addCategorySchema }
