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
// 	school_year : 2015,
//     departments  : {
//     	department_name : 'AS',
//     	department_des : 'Arts and Science',
//     	courses: [
// 	    	{
// 	    		course_name : 'BSOA',
// 	    		course_des : 'Bachelor of office Administration',
// 	    		year_levels: [
// 	    			{
// 		    			year_level: 4,
// 		    			terms: [
// 			    			{
// 			    				term : 1,
// 			    				subjects: {
// 			    					subject_name: 'Softwen',
// 			    					subject_des: 'Software Engineering',
// 			    					units: 3,
// 			    					cost_perUnits: 30,
// 			    					pre_requisite: ''
// 			    				}
// 			    			},
// 			    			{
// 			    				term : 2,
// 			    				subjects: {
// 			    					subject_name: 'addprog',
// 			    					subject_des: 'Addvance Programming',
// 			    					units: 3,
// 			    					cost_perUnits: 30,
// 			    					pre_requisite: ''
// 			    				}
// 			    			}
// 		    			]
// 		    		},
// 		    		{
// 		    			year_level: 1,
// 		    			terms: [
// 			    			{
// 			    				term : 1,
// 			    				subjects: {
// 			    					subject_name: 'Softwen',
// 			    					subject_des: 'Software Engineering',
// 			    					units: 4,
// 			    					cost_perUnits: 40,
// 			    					pre_requisite: ''
// 			    				}
// 			    			},
// 			    			{
// 			    				term : 2,
// 			    				subjects: {
// 			    					subject_name: 'addprog',
// 			    					subject_des: 'Addvance Programming',
// 			    					units: 5,
// 			    					cost_perUnits: 50,
// 			    					pre_requisite: ''
// 			    				}
// 			    			}
// 		    			]
// 		    		}
// 	    		]
// 	    	},
// 	    	{
// 	    		course_name : 'BSOA',
// 	    		course_des : 'Bachelor of office Administration',
// 	    		year_levels: [
// 	    			{
// 		    			year_level: 4,
// 		    			terms: [
// 			    			{
// 			    				term : 1,
// 			    				subjects: {
// 			    					subject_name: 'Softwen',
// 			    					subject_des: 'Software Engineering',
// 			    					units: 3,
// 			    					cost_perUnits: 30,
// 			    					pre_requisite: ''
// 			    				}
// 			    			},
// 			    			{
// 			    				term : 2,
// 			    				subjects: {
// 			    					subject_name: 'addprog',
// 			    					subject_des: 'Addvance Programming',
// 			    					units: 3,
// 			    					cost_perUnits: 30,
// 			    					pre_requisite: ''
// 			    				}
// 			    			}
// 		    			]
// 		    		},
// 		    		{
// 		    			year_level: 1,
// 		    			terms: [
// 			    			{
// 			    				term : 1,
// 			    				subjects: {
// 			    					subject_name: 'Softwen',
// 			    					subject_des: 'Software Engineering',
// 			    					units: 4,
// 			    					cost_perUnits: 40,
// 			    					pre_requisite: ''
// 			    				}
// 			    			},
// 			    			{
// 			    				term : 2,
// 			    				subjects: {
// 			    					subject_name: 'addprog',
// 			    					subject_des: 'Addvance Programming',
// 			    					units: 5,
// 			    					cost_perUnits: 50,
// 			    					pre_requisite: ''
// 			    				}
// 			    			}
// 		    			]
// 		    		}
// 	    		]
// 	    	}
//     	]
// 	},
//     keywords:['Robert', 'Strong'] 
// });
// addCurriculum.save();

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
