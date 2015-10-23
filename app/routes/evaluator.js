var express =require( 'express' ),
	router =express.Router(),
	mongoose = require('mongoose'),
	curriculumList = mongoose.model('curriculumList'),
	curriculums = mongoose.model('curriculums'),
	studentList = mongoose.model('studentList');
	studentSchoolInfo = mongoose.model('studentSchoolInfo');
var sendgrid  = require('sendgrid')('robert_janagap', 'janagaprainhard01');

// add new student
router.post( '/student',function ( req,res ){
	// for student list db
	
	// send email
	sendgrid.send({
	  to:       req.body.email,
	  from:     'janagaprobert@gmail.com',
	  subject:  'Email Verification',
	  text:     'Thank you for Registering in BCC and we work together for your better future thank you'
	}, function(err, json) {
	  if (err) { return console.error(err); }
	  console.log(json);
	});

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
// register old student
router.put('/register_oldStudent/:id', function(req, res){
	studentSchoolInfo.update({student_no: req.params.id},{$set:{
		course_name:req.body.course_name,
		year_level:req.body.year_level,
		term:req.body.term,
	}} ,function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
module.exports =router;
