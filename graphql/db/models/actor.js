const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Actor = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 30
  },
  gender: {
    type: Number    
  }

});

module.exports = mongoose.model('Actor', Actor);
