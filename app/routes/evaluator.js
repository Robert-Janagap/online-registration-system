var express =require( 'express' ),
	router =express.Router(),
	mongoose = require('mongoose');
	preEnrolledStudents = mongoose.model('preEnrolledStudents'),
	curriculumList = mongoose.model('curriculumList'),
	curriculums = mongoose.model('curriculums');
// add new student
router.post( '/newStudent',function ( req,res ){
	var newStudent = new preEnrolledStudents(req.body);
	newStudent.save(function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
} );
// get new student list
router.get( '/newStudents',function ( req,res ){
	preEnrolledStudents.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
} );
// get new student info
router.get('/newStudentInfo/:id', function( req,res ){
	preEnrolledStudents.findById(req.params.id, function(err, data){
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
