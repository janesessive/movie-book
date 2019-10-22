const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var Movie = new Schema({
  

  title: {
      type: String,
      maxLength: 60
  },
  year: {
      type: Number,
      required: true,
  },

  genre: { type: Schema.Types.ObjectId, ref: 'Genre' },

  actors: { type: Schema.Types.ObjectId, ref: 'Actor'},
  
  description:{
      type: String,
      maxLength: 500
  }

});

module.exports = mongoose.model('Movie', Movie);
