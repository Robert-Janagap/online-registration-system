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

//use middleware
app.use( express.static( path.join( __dirname,'/public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended :true } ) );

//define routes
var administrator =require( './app/routes/administrator.js' ),
	curriculum =require( './app/routes/curriculum.js' );
	curriculumSettings =require( './app/routes/curriculumSettings.js' ),
	evaluator =require( './app/routes/evaluator.js' ),
	studentInfo =require( './app/routes/studentInfo.js' ),
	findCourse =require( './app/routes/findCourse.js' ),
	programCoordinator =require( './app/routes/programCoordinator.js' ),
	setSchedule =require( './app/routes/setSchedule.js' );

// page url
//for admin
app.use( '/administrator',administrator );
app.use( '/curriculum',curriculum );
app.use( '/departments/settings',curriculumSettings );
//for staff
app.use( '/evaluator',evaluator );
app.use( '/program-coordinator',programCoordinator );
app.use( '/program-coordinator/set-schedule',setSchedule );

//for student
app.use( '/student-info',studentInfo );
app.use( '/school-courses',findCourse );


app.get( '/database',function ( req,res ) {

    curriculums.find( {},function ( err,data ) {

        res.json( data );

    } );

} );

// testing area
// app.post('/', function(req, res) {
// 	var newData = {
// 		school_year : 2015,
// 	    department_name : "ICT",
// 	    department_des : "Information Techonoloy",
// 	    courses: [
// 	        {
// 	            course_name: "BSIT",
// 	            course_des: "BAchelor Of Information Technology",
// 	            totalYears: 4,
// 	            totalTerms: 2,
// 	        }
// 	    ],
// 	    subjects: [
// 	        {
// 	            course_name: "BSIT",
// 	            course_des: "BAchelor Of Information Technology",
// 	            year_level: 2,
// 	            term: 2,
// 	            subject_name: "Addprog",
// 	            subject_des: "Addvance Programming",
// 	            units: 3,
// 	            cost_perUnits: 30,
// 	            pre_requisite: ""
// 	        }
// 	    ],
// 	    keywords:["Addprog","Addvance"] 
// 	};

// 	var department_new = new curriculums(newData);

// 	department_new.save(function(err, data){
// 		if (err){
// 			console.log(data);
// 		};
// 		console.log("ati ok");
// 	});

// });



// ///maintainance departments and course
// //get the data
// app.get('/departments/settings/:id', function(req, res){
// 	curriculums.find( {school_year: req.params.id},function ( err,data ) {

//         res.json( data );

//     } );
// });
// //add department
// app.post('/departments/settings', function(req, res){
// 	var newData = {
// 		school_year : 2015,
// 	    department_name : req.body.depName,
// 	    department_des : req.body.depDes
// 	};
// 	var department_new = new curriculums(newData);

// 	department_new.save(function(err, data){
// 		if (err){
// 			return err;
// 		};
// 		res.json(data);
// 	});

// });
// //add courses
// app.put('/departments/settings/:id', function(req, res){
// 	curriculums.findByIdAndUpdate(req.params.id,{$addToSet:{courses:{course_name:req.body.courseName,course_des:req.body.courseDes,totalYears: req.body.courseYears, totalTerms: req.body.courseTerms}}} ,function(err, data){
// 		if (err){
// 			return err;
// 		};
// 		res.json(data);
// 	});
// });
// //delete course
// app.delete('/departments/settings/:id', function(req, res){
// 	curriculums.findByIdAndRemove(req.params.id, function(err, data){
// 		res.json(data);
// 	});
// });

//server listening
http.createServer( app ).listen( port,function() {

    console.log( 'the server now listen at port ' +port );

} );
