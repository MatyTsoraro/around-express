const mongoose = require('mongoose');
const validator = require('validator'); // Import validator library

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'The "name" field must be filled in.'],
      minlength: [2, 'The minimum length of name is 2'],
      maxlength: [30, 'The maximum length of name is 2'],
    },
    link: {
      type: String,
      required: [true, 'The "Link" field must be filled in.'],
      validate: {
        validator: (value) => validator.isURL(value), // Use validator.isURL to validate URLs
        message: 'Invalid URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'The "Owner" field must be filled in.'],
    },
    likes: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
