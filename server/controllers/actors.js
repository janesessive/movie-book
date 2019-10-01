const express = require('express');
const actorRoutes = express.Router();
const ObjectID = require('mongodb').ObjectID;

// Require Actor model in our routes module
let Actor = require('../models/actor');

// Defined store route
actorRoutes.route('/').post(function(req, res) {
  console.log(req.body);
  let business = new Actor(req.body);
  business
    .save()
    .then(actor => {
      res.status(200).json({ actor: 'actor is added successfully' });
    })
    .catch(err => {
      res.status(400).send('unable to save to database');
    });
});

// Defined get data(index or listing) route
actorRoutes.route('/').get(function(req, res) {
  Actor.find((err, actors) => {
    if (err) {
      console.log(err);
    } else {
      res.json(actors);
    }
  });
});

actorRoutes.get('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Actor.findById(id)
    .then(actor => {
      if (!actor) {
        return res.status(404).send();
      }

      res.send(actor);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
});



//  Defined update route
actorRoutes.route('/:id').put(function(req, res) {
  Actor.findById(req.params.id, function(err, actor) {
    if (!actor) res.status(404).send('data is not found');
    else {
      actor.firstName = req.body.firstName;
      actor.lastName = req.body.lastName

      actor
        .save()
        .then(actor => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send('unable to update the database');
        });
    }
  });
});

// Defined delete | remove | destroy route
actorRoutes.route('/:id').delete(function(req, res) {
  Actor.findByIdAndRemove({ _id: req.params.id }, function(err, actor) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = actorRoutes;
