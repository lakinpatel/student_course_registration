var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    passport = require('passport');
   

module.exports = function () {
    var app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    }
    else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    
    require('../app/routes/index.server.routes.js')(app);  //index route
    
    //require('../app/routes/student.server.routes.js')(app);     // routes for student controller
    //require('../app/routes/experience.server.routes.js')(app);  // routes for experience controller
    
    require('../app/routes/staff.server.routes.js')(app);
    require('../app/routes/course.server.routes.js')(app);
    require('../app/routes/grade.server.routes.js')(app);
    
    
    app.use(express.static('./public'));

    return app;
}