var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var curriculum = mongoose.model('curriculums');
var curriculumList = mongoose.model('curriculumList');
var classSchedules = mongoose.model('classSchedules');
// get all curriculum
router.get('/curriculum', function(req, res){
	curriculum.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
// curriculum list
router.get('/curriculum-list', function( req, res) {
	curriculumList.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// all course in specific curriculum
router.get('/curriculum-courses/:id', function(req, res){
	curriculum.find({school_year:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
// all course in specific department
router.get('/department-courses/:id', function(req, res){
	curriculum.find({_id:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
// all subject in specific course
router.get('/courseSubjects/:id', function(req, res){
	curriculum.find({'courses._id':req.params.id}, {courses:{$elemMatch:{_id:req.params.id}}},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get sections and class schedules
router.get('/section', function(req, res){
	classSchedules.find({},function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
// add section
router.post('/section', function(req, res){
	var newClassSchedule = new classSchedules({
		course_name: req.body.course_name,
		year_level: req.body.year_level,
		term: req.body.term,
		section: req.body.section
	});
	newClassSchedule.save(function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
// add schedule
router.put('/newSchedule/:id', function(req, res){
	classSchedules.findByIdAndUpdate(req.params.id, {$addToSet:{schedule:{
		subject_code: req.body.subject_code,
		subject_des: req.body.subject_des,
		units: req.body.units,
		time: req.body.schedule_time,
		days: req.body.days,
		room: req.body.room,
		instructor: req.body.instructor
	}}}, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});

});
module.exports = router;