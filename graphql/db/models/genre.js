const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Genre = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,    
    maxLength: 30
  }
});

module.exports = mongoose.model('Genre', Genre);
