var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
let mongooseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/movies';

module.exports = {mongoose, mongooseUri};
