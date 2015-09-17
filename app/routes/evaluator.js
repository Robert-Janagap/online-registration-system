var express =require( 'express' ),
	router =express.Router(),
	mongoose = require('mongoose');
	preEnrolledStudents = mongoose.model('preEnrolledStudents');

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

module.exports =router;
