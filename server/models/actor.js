const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Actor = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxLength: 30
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxLength: 30
  }
});

module.exports = mongoose.model('Actor', Actor);
