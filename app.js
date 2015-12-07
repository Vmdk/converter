// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var session = require('express-session');
    var flash    = require('connect-flash');


//setting passport==================
    var passport = require('passport');
    require('./configuration/passport.js')(passport);
    app.use(session({ secret: 'secret_converter' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session


    // configuration =================
    app.use(express.static(__dirname + '/public'));                 // set the static files location /view
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.set('view engine', 'ejs');

	  var mongoose = require('mongoose');        // module to comunicate with mongoDB
    var config = require('./configuration/config.js'); // get our config file
    mongoose.connect(config.database); // connection to db server
    // winston.log('debug',config.database);
    //mongoose.connect('mongodb://localhost/test'); // connection to db server

    require('./routes.js')(app, passport);
    // listen (start app with node server.js) ======================================
    app.listen(process.env.PORT || 4000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
