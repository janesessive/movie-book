const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Category = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxLength: 30
  }
});

module.exports = mongoose.model('Category', Category);
