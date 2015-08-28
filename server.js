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

// mongoose.connect( 'mongodb://127.0.0.1/onlineRegistrationSystem' );

var curriculums = mongoose.model('curriculums', require('./app/models/curriculums.js'));
var courseSelection = mongoose.model('courseSelection', require('./app/models/courseSelection.js'));

//use middleware
app.use( express.static( path.join( __dirname,'/public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended :false } ) );

//define routes
var index =require( './app/routes/index.js' ),
	curriculum =require( './app/routes/curriculum.js' );
	departmentSettings =require( './app/routes/curriculumSettings.js' ),
	evaluator =require( './app/routes/evaluator.js' ),
	studentInfo =require( './app/routes/studentInfo.js' ),
	studentCourse =require( './app/routes/studentCourse.js' ),
	programCoordinator =require( './app/routes/programCoordinator.js' ),
	setSchedule =require( './app/routes/setSchedule.js' );

// page url
//for admin
app.use( '/',index );
app.use( '/curriculum',curriculum );
app.use( '/departments/settings',departmentSettings );
//for staff
app.use( '/evaluator',evaluator );
app.use( '/program-coordinator',programCoordinator );
app.use( '/program-coordinator/set-schedule',setSchedule );

//for student
app.use( '/student-info',studentInfo );
app.use( '/student-course',studentCourse );


app.get( '/database',function ( req,res ) {

    curriculums.find( {},function ( err,data ) {

        res.json( data );

    } );

} );
app.get( '/tmdatabase',function ( req,res ) {

    courseSelection.find( {},function ( err,data ) {

        res.json( data );

    } );

} );
// flow to add data
app.post('/', function(req, res) {
	// var dataKeywords= [
	// req.body.department_name,
	// req.body.department_des,
	// req.body.course_name,
	// req.body.course_des];

	// var newData = {
	// 	school_year :  req.body.school_year,
	// 	departments  : [
	//         {
	//             department_name : req.body.department_name,
	//             department_des : req.body.department_des,
	//             course_name: req.body.course_name,
	//             course_des: req.body.course_des,
	//             subjects: [
	//                 {
	//                     subject_name: '',
	//                     subject_des: '',
	//                     units: '',
	//                     cost_perUnits: '',
	//                     pre_requisite: ''
	//                 }
	//             ],
	//             term: req.body.term,
	//             year_level: req.body.year_level
	// 	    }
	//     ],
	//     keywords:dataKeywords
	// };

	// var department_new = new curriculums(newData);

	// department_new.save(function(err, data){
	// 	if (err){
	// 		console.log('there was an error');
	// 	};
	// 	res.json(data)
	// });
	console.log({
		school_year : req.body.school_year,
    	departments  : [
	        {
	            department_name : req.body.department_name,
	            department_des : req.body.department_des,
	            course_name: req.body.course_name,
	            course_des: req.body.course_des,
	            term: req.body.term,
	            year_level: req.body.year_level
	        }
   		]
	});
	var selection = {
		school_year : req.body.school_year,
    	departments  : [
	        {
	            department_name : req.body.department_name,
	            department_des : req.body.department_des,
	            course_name: req.body.course_name,
	            course_des: req.body.course_des,
	            term: req.body.term,
	            year_level: req.body.year_level
	        }
   		]
	};
	var newSelection = new courseSelection(selection);
	newSelection.save(function(err, data){
		if(err){
			console.log('there was an error');
		}
		res.json(data);
	});
	
});

//server listening
http.createServer( app ).listen( port,function() {

    console.log( 'the server now listen at port ' +port );

} );
