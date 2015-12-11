// routes ======================================================================
module.exports = function(app, passport){


  require('./routes/passport_routes.js')(app, passport);
  require('./routes/currency_api.js')(app);
  //=================================
  app.get('/editor', function(req, res) {
    res.sendfile('./public/views/editor.html');
  });
}
