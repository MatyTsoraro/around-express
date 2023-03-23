const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Regex to validate URL format
        return /^(https?:\/\/)(www\.)?([\w\-\.]+)\.([a-z]{2,6})(\/[\w\-\.~:?#[\]@!$&'()*+,;=]*)?#?$/.test(v);
      },
      message: 'Invalid URL format'
    }
  },
});

module.exports = mongoose.model('user', userSchema);