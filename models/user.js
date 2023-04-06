const mongoose = require('mongoose');
const validator = require('validator'); // Import validator library

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'The "name" field must be filled in.'],
    minlength: [2, 'The minimum length of name is 2'],
    maxlength: [30, 'The maximum length of name is 30'],
  },
  about: {
    type: String,
    required: [true, 'The "About" field must be filled in.'],
    minlength: [2, 'The minimum length of About is 2'],
    maxlength: [30, 'The maximum length of About is 30'],
  },
  avatar: {
    type: String,
    required: [true, 'The "Avatar" field must be filled in.'],
    validate: {
      validator: (value) => validator.isURL(value), // Use validator.isURL to validate URLs
      message: 'Invalid URL',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
