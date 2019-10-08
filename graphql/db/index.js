var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/movies';

const connect = function() {
  return mongoose.connect(mongooseUri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
};

module.exports = { connect };
