const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var Expense = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category' },

  
  amount: {
      type: Number,
      required: true,
  },
  date: {
      type: Date,
      default: Date.now
  },
  note:{
      type: String,
      maxLength: 100
  }

});

module.exports = mongoose.model('Expense', Expense);
