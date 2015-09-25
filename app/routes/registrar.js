var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var classSchedules = mongoose.model('classSchedules');
var studentList = mongoose.model('studentList');
var studentSchoolInfo = mongoose.model('studentSchoolInfo');
var curriculums = mongoose.model('curriculums');
var users = mongoose.model('users');

// get student list
router.get('/students', function( req, res) {
	studentList.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get student info
router.get('/student-info/:id', function( req,res ){
	studentList.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get student school info
router.get('/school-info/:id', function( req,res ){
	studentSchoolInfo.findOne({student_no:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// find section based on course, year, and term
router.get('/student-section/:course', function(req, res){
	classSchedules.find({course_name:req.params.course}, function( err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// find section schedules
router.get('/class-schedule/:id', function(req, res){
	classSchedules.findById(req.params.id, function( err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// enroll student
router.put('/enroll-student/:id', function( req, res){

	studentSchoolInfo.update({student_no:req.params.id}, {$set:{enrolled: req.body.enrolled, status:req.body.status, section: req.body.sectionId}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data)
	});

})

//student schedules regular
router.put('/student-schedules/:id', function( req, res){
    var data = req.body;

	studentSchoolInfo.findByIdAndUpdate(req.params.id, {$addToSet:{schedule:{section_name:data.section_name,subject_name: data.subject_name,subject_des: data.subject_des,units: data.units,instructor: data.instructor,room: data.room,year_level: data.year_level,term: data.term,time: data.time,days: data.days, cost_perUnits: data.cost_perUnits}}}, function(err, data){
		if(err){	
			return err;
		}
		res.json(data);
	});

});
//student schedules irregular
router.get('/studentIrregular-schedules/:id', function( req, res){
    studentSchoolInfo.findById(req.params.id, function(err, data){
    	if(err){
			return err;
		}
		res.json(data.schedule);
    });
    
});

// find student curriculum subjects
router.get('/student-curriculum/:id', function(req, res){
	curriculums.find({school_year: req.params.id}, function( err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// add student curriculum subjects
router.put('/student-subjects/:id', function(req, res){
	studentList.findByIdAndUpdate(req.params.id,{$addToSet:{subjects:{subject_name: req.body.subject_name,subject_des: req.body.subject_des,units: req.body.units,year_level: req.body.year_level,term: req.body.term, cost_perUnits:req.body.cost_perUnits, pre_requisite:req.body.pre_requisite}}}, function( err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add student user Access
router.post('/student-access', function(req, res){
	var newStudentUser = new users(req.body);

	newStudentUser.save(function( err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// set student Schedule
router.get('/studentSchedule/:id', function(req, res){
	studentList.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

module.exports = router;