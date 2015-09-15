var express =require( 'express' ),
	http =require( 'http' ),
	path =require( 'path' ),
	mongoose =require( 'mongoose' ),
	bodyParser =require( 'body-parser' ),
	passport = require('passport'),
	localStrategy = require('passport-local').Strategy,
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	app =express(),
	port =process.env.PORT ||3000;
//set config
app.set( 'views',path.join( __dirname,'app/views' ) );
app.set( 'view engine','ejs' );

// connect to database
mongoose.connect( 'mongodb://127.0.0.1/onlineRegistrationSystem' );

//database
var curriculums = mongoose.model('curriculums', require('./app/models/curriculums.js'));
var assestments = mongoose.model('assestments', require('./app/models/assestments.js'));
var curriculumList = mongoose.model('curriculumList', require('./app/models/curriculumList.js'));
var users = mongoose.model('users', require('./app/models/users.js'));

// var admin = new users({username: 'admin', password: 'admin', name: 'Robert Janagap', roles: 'administrator'});
// var evaluator = new users({username: 'eva', password: 'eva', name: 'Rhoi Abello', roles: 'program-coordinator'});
// admin.save();
// evaluator.save();

//use middleware
app.use( express.static( path.join( __dirname,'/public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended :true } ) );
app.use(session({
	secret: 'This is the secret',
	resave: false,
  	saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
// authenticate the user login
passport.use(new localStrategy(
	function(username, password, done){
		users.findOne({username: username, password: password}, function(err, user){
			if(user){
				return done(null, user);
			}
			return done(null, false, {message: 'unable to login'});
		});
	}
));
passport.serializeUser(function(user, done){
	done(null, user);
});
passport.deserializeUser(function(user, done){
	done(null, user);
});

//define routes
var administrator =require( './app/routes/administrator.js' );
// server side routes
var programCoordinator =require( './app/routes/programCoordinator.js' );
// client side routes
var news = require('./app/routes/news.js');
var index = require('./app/routes/index.js');
var alumni = require('./app/routes/alumni.js');
// about nav
var administration = require('./app/routes/administration.js');
var schoolInfo = require('./app/routes/schoolInfo.js');
var supportServices = require('./app/routes/supportServices.js');
// admission nav
var registration = require('./app/routes/registration.js');
var policies = require('./app/routes/policies.js');
var adRequirements = require('./app/routes/adRequirements.js');
var enProcedure = require('./app/routes/enProcedure.js');
// academics nav
var eventsCalendar = require('./app/routes/eventsCalendar.js');
var coursesOffered = require('./app/routes/coursesOffered.js');
// login
var login = require('./app/routes/login.js')

// page url
//for admin
app.use( '/administrator',administrator );
//for staff
app.use( '/program-coordinator',programCoordinator );

//evaluator


// client side
app.use( '/',index );
app.use( '/news',news );
app.use( '/alumni',alumni );
// about nav
app.use( '/administration',administration );
app.use( '/school-info',schoolInfo );
app.use( '/support-services',supportServices );
// admission nav
app.use( '/registration',registration );
app.use( '/policies',policies );
app.use( '/admission-requirements',adRequirements );
app.use( '/enrollment-procedure',enProcedure );
// academics nav
app.use( '/courses-offered',coursesOffered );
app.use( '/events-calendar',eventsCalendar );
// login
app.use( '/login',login );

//log out
app.post('/logout', function(req, res){
	req.logOut();
	res.sendStatus(200);
});

//authentication for database access
var auth = function(req, res, next){
	if(!req.isAuthenticated()){
		res.sendStatus(401);
	}else{
		next();
	}
}
// use auth for restricting user to see the db
// databases
app.get( '/database',function ( req,res ) {

    curriculums.find( {},function ( err,data ) {

        res.json( data );

    } );

} );
app.get( '/database/assestment',auth,function ( req,res ) {

    assestments.find( {},function ( err,data ) {

        res.json( data );

    } );

} );
app.get( '/database/curriculum-list',function ( req,res ) {

    curriculumList.find( {},function ( err,data ) {

        res.json( data );

    } );

} );
app.get( '/database/users',function ( req,res ) {

    users.find( {},function ( err,data ) {

        res.json( data );

    } );

} );

//server listening
http.createServer( app ).listen( port,function() {

    console.log( 'the server now listen at port ' +port );

} );
