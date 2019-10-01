const express = require('express');
const expenseRoutes = express.Router();
const ObjectID = require('mongodb').ObjectID;

// Require Expense model in our routes module
const Expense = require('../models/expense');

// Defined get data(index or listing) route
expenseRoutes.route('/').get(function(req, res) {
  const query = req.query;
  console.log('query comes:', req.query);
  
  if (req.query.datefrom) {
    
    query.date = { $gte: new Date(req.query.datefrom) };
    delete query.datefrom;
  }
  if (req.query.dateto) {
    
    if (!query.date) {
      query.date = {};
      
    }
    query.date.$lte = new Date(req.query.dateto);
    delete query.dateto;
  }

  console.log('query', query);
  Expense.find(query)
    .populate('category')
    .then(expense => {
      if (!expense) {
        return res.status(404).send();
      }

      res.send(expense);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
});

// Defined store route
expenseRoutes.route('/').post(function(req, res) {
  let business = new Expense(req.body);

  business
    .save()
    .then(expense => {
      res.status(200).json({ expense: ' is added successfully' });
    })
    .catch(err => {
      res.status(400).send('Unable to save to database');
    });
});

// expenseRoutes.get('/category/:category', (req, res) => {
//   var categoryId= req.params.category;

//   if (!ObjectID.isValid(categoryId)) {
//     return res.status(404).send('Not valid category ID');
//   }

//   Expense.find({category: categoryId})
//   .populate('category')
//     .then(expense => {
//       if (!expense) {
//         return res.status(404).send();
//       }

//       res.send(expense);
//     })
//     .catch(e => {
//       console.log(e);
//       res.status(400).send();
//     });
// });

expenseRoutes.get('/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Expense.findById(id)
    .then(expense => {
      if (!expense) {
        return res.status(404).send();
      }

      res.send(expense);
    })
    .catch(e => {
      console.log(e);
      res.status(400).send();
    });
});

// // Defined edit route
// categoryRoutes.route('/edit/:id').get(function (req, res) {
//   let id = req.params.id;
//   Category.findById(id, function (err, categories){
//       res.json(categories);
//   });
// });

//  Defined update route
expenseRoutes.route('/:id').put(function(req, res) {
  Expense.findById(req.params.id, function(err, expense) {
    if (!expense) res.status(404).send('data is not found');
    else {
      expense.amount = req.body.amount;
      expense.category = req.body.category;
      expense.date = req.body.date;
      expense.note = req.body.note;

      expense
        .save()
        .then(expense => {
          res.json('Update complete');
        })
        .catch(err => {
          res.status(400).send('unable to update the database');
        });
    }
  });
});

// Defined delete | remove | destroy route
expenseRoutes.route('/:id').delete(function(req, res) {
  Expense.findByIdAndRemove({ _id: req.params.id }, function(err, category) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});

module.exports = expenseRoutes;
