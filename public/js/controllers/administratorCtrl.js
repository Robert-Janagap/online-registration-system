var app = angular.module('ors_app',[]);

app.controller('administratorCtrl', ['$scope', '$http', function($scope, $http){
	//get curriculum list
	$http.get('/administrator/curriculum-list').success(function(data){
		$scope.curriculumList = data;
	});
	$scope.viewCur = function(cursYear){
		$scope.cursYear = cursYear;
		
		$http.get('/administrator/curriculumSel/' + cursYear).success(function(data){
			$scope.curriculum = data;
			$scope.curYear = data[0].school_year;
			$scope.dep = "";
		});	
	}
	//test
	// $http.get('/administrator/curriculumSel/' + 2015).success(function(data){
	// 		$scope.curriculum = data;
	// 		$scope.curYear = data[0].school_year;
	// 		$scope.dep = "";
	// 	});	
	//adding of departments
	//add department
	$scope.addDep = function(year){
		$http.post('/administrator/curriculumSel/'+year, $scope.dep).success(function(data){
			$scope.viewCur(year);
			console.log(data);
		});
	}
	// delete department
	$scope.deleteDep = function(id, year){
		$http.delete('/administrator/curriculumSel/'+id).success(function(data){
			$scope.viewCur(year);
		});
	}
	//add course
	$scope.addCourse = function(id, info, year){
		$http.put('/administrator/curriculumSel/'+ id, info).success(function(data){
			$scope.viewCur(year);
		});
	}
	//delete course
	$scope.deleteCourse = function(id, course, year){
		var status = 'delete';
		course.status = status;

		$http.put('/administrator/curriculumSel/'+ id, course).success(function(data){
			$scope.viewCur(year);
		});
	}
	// course subjects
	$scope.getSubjects = function(id){
		$http.get('/administrator/courseSubjects/'+ id).success(function(data){
			var year = [],
				terms = [];
			for (var i = 1; data[0].courses[0].totalYears >= i; i++) {
				
				year.push(i);

			};
			for (var i = 1; data[0].courses[0].totalTerms >= i; i++) {
				
				terms.push(i);

			};
			$scope.courseYears = year;
			$scope.courseTerms = terms;
			$scope.courseName = data[0].courses[0].course_name;
			$scope.courseDes = data[0].courses[0].course_des;
			$scope.departmentId = data[0]._id;
		});
	}
	// find subjects related in year and term
	$scope.findSubjects = function(id,year, term, courseName){
		var yearAndTerm = {year: year, term: term, id:id, courseName:courseName};
		$http.get('/administrator/findSubjects/' + id, yearAndTerm).success(function(data){
			var object = [];
			for (var i = data.length - 1; i >= 0; i--) {

				if(data[i].course_name == courseName & data[i].year_level == year & data[i].term == term){
					object.push(data[i]);
				}
			};    
			$scope.subjects = object;
		});
	}
	// add course subjects
	$scope.addSubjects = function(id,year, term, courseName, courseDes, subject){
		var year_level = {year_level: year};
		var level_term = {term: term};
		var course_name = {course_name: courseName};
		var course_des = {course_des: courseDes};

		var content={year_level: year,term: term,course_name: courseName,course_des: courseDes,subject};

		$http.put('/administrator/courseSubjects/'+id,content).success(function(data){
			console.log(data);
		});

		$scope.subject = "";
	}
	//edit course not done yet
	$scope.editCourse = function(id){
		console.log(id);
	}

	// get assestment
	$http.get('/administrator/assestments').success(function(data){
		$scope.assestments = data;
	});
	$scope.viewFees = function(id){
		$http.get('/administrator/assestments/'+ id).success(function(data){
			$scope.fees = data;
			$scope.typeOfFee = data.typeOfFee;
			$scope.typeOfFee_id = data._id;
		});
	}
	$scope.newFee = function(id){
		$http.put('/administrator/assestments/'+ id, $scope.fee).success(function(data){
			$scope.viewFees(id);
		});
	}
	$scope.deleteFee = function(typeOfFee_id, fee){
		var status = 'delete';
		fee.status = status;
		$http.put('/administrator/assestments/'+ typeOfFee_id, fee).success(function(data){
			$scope.viewFees(typeOfFee_id);
		});
	}
}]);
//showing assestment fees
app.directive('showFees', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>View</div>",
		link: function(scope, element, attrs){
			element.addClass('btn');
			element.addClass('btn--blue');
			element.addClass('assestment_formView');
		 	element.on( 'click',function ( event ){

		        event.preventDefault();
		        $( '.assestment--overlay' ).toggle();

		    } );
		}
	}
});
// show departments
app.directive('showDepartments', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>View</div>",
		link: function(scope, element, attrs){
			element.addClass('curriculum_box_btn');
			element.addClass('btn');
		 	element.on( 'click',function ( event ){

		       $('.departmentList').slideUp(300)
		       $('.departmentList').slideDown(400);
		    } );
		}
	}
});
// show course subjects
app.directive('showSubjects', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>Subjects</div>",
		link: function(scope, element, attrs){
			element.addClass('btn');
		 	element.on( 'click',function ( event ){

		       $('.course_subjects').toggle();

		    } );
		}
	}
});