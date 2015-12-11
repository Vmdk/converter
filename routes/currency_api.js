module.exports = function(app){
  var express = require('express');
  var apiRoutes = express.Router();
  var mongoose = require('mongoose');
  var Currency   = require('../models/currency.js'); // get our mongoose model


  // get all Currencies
  apiRoutes.get('/', function(req, res) {

      // use mongoose to get all currencies in the database
      Currency.find(function(err, currencies) {
          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err)
              res.send(err)
          res.json(currencies); // return all currencies in JSON format
      });
  });

  // create currency and send back all currencies after creation
  apiRoutes.post('/', function(req, res) {

      // create a currency, information comes from AJAX request from Angular
      Currency.create({
          name : req.body.name,
          rate : req.body.rate
      }, function(err, currency) {
          if (err)
              res.send(err);

          // get and return all the currencies after you create another
          Currency.find(function(err, currencies) {
              if (err)
                  res.send(err)
              res.json(currencies);
          });
      });

  });

  apiRoutes.put('/:currency_id', function(req, res) {
      Currency.update({
          _id : req.params.currency_id
      },{
        name : req.body.name,
        rate : req.body.rate
      },
      function(err, currency) {
          if (err)
              res.send(err);

          // get and return all the currencies after you create another
          Currency.find(function(err, currencies) {
              if (err)
                  res.send(err)
              res.json(currencies);
          });
      });
  });

  // delete a currency

  apiRoutes.delete('/:currency_id', function(req, res) {
      Currency.remove({
          _id : req.params.currency_id
      }, function(err, currency) {
          if (err)
              res.send(err);

          // get and return all the currencies after you create another
          Currency.find(function(err, currencies) {
              if (err)
                  res.send(err)
              res.json(currencies);
          });
      });
  });
  app.use('/api/currencies', apiRoutes);
}
