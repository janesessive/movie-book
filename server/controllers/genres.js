const express = require('express');
const genreRoutes = express.Router();
const ObjectID = require('mongodb').ObjectID;

// Require Genre model in our routes module
let Genre = require('../models/genre');

// Defined store route
genreRoutes.route('/').post(function(req, res) {
  console.log(req.body);
  let business = new Genre(req.body);
  business
    .save()
    .then(genre => {
      res.status(200).json({ genre: 'genre in added successfully' });
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});

// Defined get data(index or listing) route
genreRoutes.route('/').get(function(req, res) {

  Genre.find((err, genres) => {
    if (err) {
      console.log(err);
    } else {
      res.json(genres);
    }
  });
});

genreRoutes.get('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Genre.findById(id)
    .then(genre => {
      if (!genre) {
        return res.status(404).send();
      }

      res.send(genre);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
});



//  Defined update route
genreRoutes.route('/:id').put(function(req, res) {
  Genre.findById(req.params.id, function(err, genre) {
    if (!genre) res.status(404).send('data is not found');
    else {
      genre.name = req.body.name;

      genre
        .save()
        .then(genre => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send('unable to update the database');
        });
    }
  });
});

// Defined delete | remove | destroy route
genreRoutes.route('/:id').delete(function(req, res) {
  Genre.findByIdAndRemove({ _id: req.params.id }, function(err, genre) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = genreRoutes;
