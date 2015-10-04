var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentSchoolInfo = mongoose.model('studentSchoolInfo');
var studentList = mongoose.model('studentList');
var assestments = mongoose.model('assestments');
var curriculums = mongoose.model('curriculums');

// get student schedules
router.get('/studentSchedules/:id', function( req, res) {
	studentSchoolInfo.findOne({student_no:req.params.id },function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get student subjects
router.get('/studentSubjects/:id', function( req, res) {
	studentList.findOne({student_no:req.params.id },function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// get student assestment
router.get('/studentAssetment', function( req, res) {
	assestments.find({},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// get course years and terms
router.put('/course-yearsAndTerms/:id', function( req, res) {

	curriculums.findOne({school_year:req.params.id},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});

});

module.exports = router;