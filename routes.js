// routes ======================================================================
module.exports = function(app, passport){


  require('./routes/passport_routes.js')(app, passport);
  require('./api/users.js')(app);
  //=================================
  app.get('/', function(req, res) {
         res.render('/public/views/index.ejs'); // load the single view file (angular will handle the page changes on the front-end)
  });
  app.get('/views/:requestedFile', function(req, res) {
    var address = req.params.requestedFile;
      res.sendfile(address);
  });


  //TESTING FILE WITH USERS
  app.get('/users', function(req, res) {
        res.sendfile('./public/views/users.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
}
