var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentSchoolInfo = mongoose.model('studentSchoolInfo');
var studentList = mongoose.model('studentList');
var classSchedules = mongoose.model('classSchedules');
var users = mongoose.model('users');

//add grades

router.get('/class-schedules/:id', function(req, res){
	users.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

router.get('/student-list/:id', function(req, res){
	users.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

router.get('/find-teacher/:id', function(req, res){
	users.findOne({username: req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

router.put('/students-grade/:id', function(req, res){
	var gradingTerm = req.body.gradingTerm; 

	if(gradingTerm === "Prelim"){

		updateGrade = {$set:{"subjects.$.Prelim": req.body.grade} };
		studentGrade = {$set:{"studentList.$.Prelim": req.body.grade} };

	}else if(gradingTerm === "Midterm"){

		updateGrade = {$set:{"subjects.$.Midterm": req.body.grade} };
		studentGrade = {$set:{"studentList.$.Midterm": req.body.grade} };

	}else if(gradingTerm === "PreFinal"){

		updateGrade = {$set:{"subjects.$.PreFinal": req.body.grade} };
		studentGrade = {$set:{"studentList.$.PreFinal": req.body.grade} };

	}else{

		updateGrade = {$set:{"subjects.$.Final": req.body.grade} };
		studentGrade = {$set:{"studentList.$.Final": req.body.grade} };

	}
	// teacher grade record
	users.update({_id: req.body.teacher_id, "studentList.student_no": req.params.id}, studentGrade, function(err, data){
		if(err){
			return err;
		}
	});
	// student grade record
	studentList.update({student_no: req.params.id, "subjects.subject_name":req.body.subject_name}, updateGrade , function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});	

});

module.exports = router;