const { Schema, model, Types } = require('mongoose')
const { RESOURCES_CATEGORY } = require('~/consts/models')
const { FIELD_CANNOT_BE_EMPTY } = require('~/consts/errors')

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, FIELD_CANNOT_BE_EMPTY('name')]
    },
    category: {
      type: Types.ObjectId,
      ref: RESOURCES_CATEGORY,
      required: [true, FIELD_CANNOT_BE_EMPTY('category')]
    },
    totalOffers: {
      student: { type: Number, default: 0 },
      tutor: { type: Number, default: 0 }
    }
  },
  { timestamps: true, versionKey: false }
)

module.exports = model('Subject', subjectSchema)
