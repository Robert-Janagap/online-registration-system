var express =require( 'express' ),
	mongoose = require('mongoose'),
	curriculums = mongoose.model('curriculums'),
	router =express.Router();

router.get( '/',function ( req,res ){

    res.render( 'curriculumSettings' );

} );
//find department corresponds in its year
router.get( '/:id',function ( req,res ){

    curriculums.find({school_year: req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});

} );
//add department
router.post('/:id', function(req, res){
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
///add and delete courses
router.put('/:id', function(req, res){
	if (req.body.status){
		curriculums.findByIdAndUpdate(req.params.id,{$pull:{courses:{_id:req.body._id}}}, function(err, data){
			res.json(data);
		});
	}else{
		curriculums.findByIdAndUpdate(req.params.id,{$addToSet:{courses:{course_name:req.body.courseName,course_des:req.body.courseDes,totalYears: req.body.courseYears, totalTerms: req.body.courseTerms}}} ,function(err, data){
		if (err){
			return err;
		};
		res.json(data);
		});
	}
});


module.exports =router;