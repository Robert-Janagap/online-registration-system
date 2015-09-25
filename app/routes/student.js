var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentSchoolInfo = mongoose.model('studentSchoolInfo');
var studentList = mongoose.model('studentList');
var assestments = mongoose.model('assestments');

// get student schedules
router.get('/studentSchedules/:id', function( req, res) {
	studentSchoolInfo.findOne({student_no:req.params.id },function(err, data){
		if(err){
			return err;
		}
		res.json(data.schedule);
	});
});
// get student subjects
router.get('/studentSubjects/:id', function( req, res) {
	studentList.findOne({student_no:req.params.id },function(err, data){
		if(err){
			return err;
		}
		res.json(data.subjects);
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

module.exports = router;