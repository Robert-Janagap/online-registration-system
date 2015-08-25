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

var curriculums = mongoose.model('curriculum', require('./app/models/curriculums.js'));

// var addCurriculum = new curriculums({
//  	school_year : 2014,
//     departments  : [
//         {
//             department_name : 'testing',
//             department_des : 'test1',
//             course_name: 'BSIT',
//             course_des: 'Bachelor of information technology',
//             subjects: [
//                 {
//                     subject_name: 'Addprog',
//                     subject_des: 'Addvance Programming',
//                     units: '3',
//                     cost_perUnits: '30',
//                     pre_requisite: ''
//                 },
//                   {
//                     subject_name: 'Addbase',
//                     subject_des: 'Addvance Database',
//                     units: '3',
//                     cost_perUnits: '30',
//                     pre_requisite: ''
//                 }
//             ],
//             term: '2',
//             year_level: '4'
//         },
//          {
//             department_name : 'test',
//             department_des : 'Arts and Science',
//             course_name: 'BSHM',
//             course_des: 'Bachelor of Home management',
//             subjects: [
//                 {
//                     subject_name: 'engl1',
//                     subject_des: 'english 1',
//                     units: '3',
//                     cost_perUnits: '30',
//                     pre_requisite: ''
//                 },
//                   {
//                     subject_name: 'engl2',
//                     subject_des: 'english 2',
//                     units: '3',
//                     cost_perUnits: '30',
//                     pre_requisite: ''
//                 }
//             ],
//             term: '2',
//             year_level: '3'
//         }
//     ],
//     keywords:['ok doki'] 
// });
//  addCurriculum.save();

//use middleware
app.use( express.static( path.join( __dirname,'/public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended :false } ) );

//define routes
var index =require( './app/routes/index.js' ),
	curriculum =require( './app/routes/curriculum.js' );
	departmentSettings =require( './app/routes/curriculumSettings.js' );

//for admin
app.use( '/',index );
app.use( '/curriculum',curriculum );
app.use( '/departments/settings',departmentSettings );

app.get( '/database',function ( req,res ) {

    curriculums.find( {},function ( err,data ) {

        res.json( data );

    } );

} );

//server listening
http.createServer( app ).listen( port,function() {

    console.log( 'the server now listen at port ' +port );

} );
