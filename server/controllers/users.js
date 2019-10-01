const express = require('express');
const userRoutes = express.Router();

userRoutes.route('/').get(function(req, res) {
  res.json({
    data: [
      { firstName: 'Bob', lastName: 'Sponge' },
      { firstName: 'Patrik', lastName: 'Star' }
    ]
  });
});

module.exports = userRoutes;
