var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var assestments = mongoose.model('assestments');
var curriculumList = mongoose.model('curriculumList');
var curriculums = mongoose.model('curriculums');
var users = mongoose.model('users');

//for selected curriculum
router.get('/curriculumSel/:id', function( req, res) {
	curriculums.find({school_year: req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
/**
 * Curriculum
 */
// add curriculum
router.post('/newCurriculum', function(req, res){
	curriculumList.findOne({curriculumYear: req.body.curriculum_year} , function(err,data){
		if(data == null) {
			var new_curriculum = new curriculumList({curriculumYear: req.body.curriculum_year});
			new_curriculum.save(function(err, data){
				if (err){
					return err;
				};
				res.json(data);
			});
		}else{
			res.json(null);
		}
	});
});
//for curriculums list
router.get('/curriculum-list', function( req, res) {
	curriculumList.aggregate({$sort:{curriculumYear:-1}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
//delete curriculum
router.delete('/deleteCurriculum/:id', function( req, res) {
	curriculumList.findByIdAndRemove(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
//delete curriculum and its departments
router.delete('/deleteCurriculumDep/:id', function( req, res) {
	curriculums.remove({school_year:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
// current Curriculum
router.get('/currentCurriculum', function( req, res){
	curriculumList.aggregate({$sort:{curriculumYear:-1}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data[0]);
	})
});
/**
 * departments
 */
//add department
router.post('/curriculumSel/:id', function(req, res){
	var newData = {
		school_year : req.params.id,
	    department_name : req.body.depName,
	    department_des : req.body.depDes
	};
	var department_new = new curriculums(newData);

	department_new.save(function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
// delete department
router.delete('/curriculumSel/:id', function(req, res){
	curriculums.findByIdAndRemove(req.params.id, function(err, data){
		res.json(data);
	})
});
/**
 * courses
 */
//get department courses
router.get('/department-courses/:id', function(req, res){
	curriculums.findById(req.params.id, function(err, data){
		if (err){
			return err;
		};
		res.json(data);
	});
});
//add and delete courses
router.put('/course/:id', function(req, res){
	//delete course
	if (req.body.status == "delete"){
		curriculums.findByIdAndUpdate(req.params.id,{$pull:{courses:{_id:req.body._id}}}, function(err, data){
			if (err){
				return err;
			};
			res.json(data);
		});
	}else{ //add course
		curriculums.findByIdAndUpdate(req.params.id,{$addToSet:{courses:{course_name:req.body.course_name,course_des:req.body.course_des,totalYears: req.body.totalYears, totalTerms: req.body.totalTerms}}} ,function(err, data){
		if (err){
			return err;
		};
		res.json(data);
		});
	}
});
// test
// update courses
router.put('/update-course/:id', function(req, res){
	curriculums.update({
		_id:req.params.id, "courses._id": req.body._id},
		{$set:{"courses.$.course_name":req.body.course_name, 
		"courses.$.course_des":req.body.course_des, 
		"courses.$.totalYears":req.body.totalYears,
		"courses.$.totalTerms":req.body.totalTerms}}, function(err, data){

			if(err){

				return err;

			};

			res.json(data);

		});
});

/**
 * course subjects
 */
// get course subjects
router.get('/courseSubjects/:id', function(req, res){
	curriculums.find({'courses._id':req.params.id}, {courses:{$elemMatch:{_id:req.params.id}}},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add course subjects
router.put('/courseSubjects/:id', function(req, res){
	curriculums.findByIdAndUpdate(req.params.id,{$addToSet:{subjects:{course_name:req.body.course_name,course_des:req.body.course_des,year_level: req.body.year_level, term: req.body.term,subject_name:req.body.subject_name,subject_des:req.body.subject_des,units:req.body.units,cost_perUnits:req.body.cost_perUnits,pre_requisite:req.body.pre_requisite}}} ,function(err, data){
		if (err){
			return err;
		};
		res.json(data);
		});
});
// delete course subjects
router.put('/deleteSubjects/:id', function(req, res){
	curriculums.findByIdAndUpdate(req.params.id,{$pull:{subjects:{_id:req.body._id}}}, function(err, data){
			if (err){
				return err;
			};
			res.json(data);
		});
});
// find subjects related in year and term
router.get('/findSubjectsByYear/:id', function(req, res){
	curriculums.findById(req.params.id, function(err, data){
		if (err){
			return err;
		};
		res.json(data.subjects);
		});
});

/**
 * Assestments
 */

router.get('/assestments', function( req, res) {
	assestments.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add new school fees
router.post('/assestments', function( req, res){
	assestments.findOne({typeOfFee: req.body.name}, function(err, data){
		if(data == null){
			var newAssestment = new assestments({typeOfFee:req.body.name});

			newAssestment.save(function(err, data){
				if(err){
					return err;
				}
				res.json(data);
			});
		}else{
			res.json(null);
		}
	});
});
// get fees of selected school fee
router.get('/assestments/:id', function( req, res) {
	assestments.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add and delete fees in school fee
router.put('/assestments/:id', function( req, res) {
	if (req.body.status){
		assestments.findByIdAndUpdate(req.params.id,{$pull:{fees:{_id:req.body._id}}}, function(err, data){
			res.json(data);
		});
	}else{
		assestments.findByIdAndUpdate(req.params.id,{$addToSet:{fees:{fee_name:req.body.fee_name,amount:req.body.amount, date_created: req.body.created}}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});
	}
});
router.delete('/deleteAssestment/:id', function(req,res){
	assestments.findByIdAndRemove(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

/**
 * Users
 */

// get users list
router.get('/users', function(req, res){
	users.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// add User staff or faculty
router.post('/newUser', function(req, res){
	users.findOne({name: req.body.name}, function(err, data){
		if(data == null){
			var new_user = new users(req.body);
			new_user.save(function(err, data){
				if(err){
					return err;
				}
				res.json(data);
			});
		}else{
			res.json(null);
		}
	});
});
// delete User staff or faculty
router.delete('/deleteUser/:id', function(req, res){
	users.findByIdAndRemove(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});


/**
 *	testing 
 */

router.put('/update-department/:id', function(req, res){
	curriculums.findByIdAndUpdate(req.params.id, {$set:{department_name: req.body.department_name, department_des: req.body.department_des}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

router.put('/update-assestment/:id', function(req, res){

	assestments.update({_id:req.params.id, 'fees._id':req.body._id}, {$set:{"fees.$.fee_name": req.body.fee_name, "fees.$.amount": req.body.amount}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
	
});

router.put('/update-subject/:id', function(req, res){
	console.log(req.body);
	console.log(req.params.id);
	curriculums.update({_id:req.params.id, "subjects._id": req.body.id}, {$set:{
		"subjects.$.subject_name": req.body.subName,
		"subjects.$.subject_des": req.body.subDes,
		"subjects.$.units": req.body.subUnits,
		"subjects.$.cost_perUnits": req.body.subCpu,
		"subjects.$.pre_requisite": req.body.subPreRequisite
	}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
module.exports = router;