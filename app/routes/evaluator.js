var express =require( 'express' ),
	router =express.Router(),
	mongoose = require('mongoose'),
	curriculumList = mongoose.model('curriculumList'),
	curriculums = mongoose.model('curriculums'),
	studentList = mongoose.model('studentList');
	studentSchoolInfo = mongoose.model('studentSchoolInfo');

// add new student
router.post( '/student',function ( req,res ){
	// for student list db
	var new_student = new studentList(req.body);
	new_student.save(function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});

} );

//add student School Info
router.post( '/student-school-info',function ( req,res ){
	var new_studentSchoolInfo = new studentSchoolInfo(req.body);
	console.log(req.body);
	new_studentSchoolInfo.save(function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});

} );
// get student list
router.get( '/students',function ( req,res ){
	studentList.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
} );

// get student info
router.get('/student-info/:id', function( req,res ){
	studentList.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
// current curriculum
router.get('/currentCurriculum', function( req, res){
	curriculumList.aggregate({$sort:{curriculumYear:-1}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data[0]);
	})
});
// get courses in current curriculum
router.get('/courses/:id', function(req, res){
	curriculums.find({school_year: req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
module.exports =router;
