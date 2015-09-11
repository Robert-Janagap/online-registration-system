var express =require( 'express' ),
	http =require( 'http' ),
	path =require( 'path' ),
	mongoose =require( 'mongoose' ),
	bodyParser =require( 'body-parser' ),
	app =express(),
	port =process.env.PORT ||3000;
//set config
app.set( 'views',path.join( __dirname,'app/views' ) );
app.set( 'view engine','ejs' );

mongoose.connect( 'mongodb://127.0.0.1/onlineRegistrationSystem' );
//database
var curriculums = mongoose.model('curriculums', require('./app/models/curriculums.js'));
var assestments = mongoose.model('assestments', require('./app/models/assestments.js'));
var curriculumList = mongoose.model('curriculumList', require('./app/models/curriculumList.js'));

//use middleware
app.use( express.static( path.join( __dirname,'/public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended :true } ) );

//define routes
var administrator =require( './app/routes/administrator.js' ),
	evaluator =require( './app/routes/evaluator.js' ),
	studentInfo =require( './app/routes/studentInfo.js' ),
	findCourse =require( './app/routes/findCourse.js' ),
	programCoordinator =require( './app/routes/programCoordinator.js' ),
	setSchedule =require( './app/routes/setSchedule.js' ),
	recSubjects =require( './app/routes/recSubjects.js' );
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

// page url
//for admin
app.use( '/administrator',administrator );
//for staff
app.use( '/evaluator',evaluator );
app.use( '/program-coordinator',programCoordinator );
app.use( '/program-coordinator/set-schedule',setSchedule );

//evaluator
app.use( '/student-info',studentInfo );
app.use( '/school-courses',findCourse );
app.use( '/subjects-recommended',recSubjects );

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

// databases
app.get( '/database',function ( req,res ) {

    curriculums.find( {},function ( err,data ) {

        res.json( data );

    } );

} );
app.get( '/database/assestment',function ( req,res ) {

    assestments.find( {},function ( err,data ) {

        res.json( data );

    } );

} );
app.get( '/database/curriculum-list',function ( req,res ) {

    curriculumList.find( {},function ( err,data ) {

        res.json( data );

    } );

} );

//server listening
http.createServer( app ).listen( port,function() {

    console.log( 'the server now listen at port ' +port );

} );
