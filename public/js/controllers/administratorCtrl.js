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
	$scope.addCurriculum = function(year) {
		$http.post('/administrator/newCurriculum/',year).success(function(data){
			console.log(data);
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
	// course subjects year and terms
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
	$scope.subjectInYear = function(year, id){
		$http.get('/administrator/findSubjectsByYear/' + id).success(function(data){
			var objects = [];
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].year_level === year){
					objects.push(data[i]);
				}
			};

			$scope.subjects = objects;
		});
		$scope.subjectsOfYear = year;
	}
	$scope.subjectWithTerm = function(term, id){
		$http.get('/administrator/findSubjectsByYear/' + id).success(function(data){
			var objects = [];
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].year_level === $scope.subjectsOfYear && data[i].term === term){
					objects.push(data[i]);
				}
			};
			$scope.subjects = objects;

		});
		$scope.subjectsOfTerm = term;
	}
	// refresh
	$scope.addSubjectRefresh = function(id){
		$http.get('/administrator/findSubjectsByYear/' + id).success(function(data){
			var objects = [];
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].year_level === $scope.subjectsOfYear && data[i].term === $scope.subjectsOfTerm ){
					objects.push(data[i]);
				}
			};
			$scope.subjects = objects;
		});
	}
	// add course subjects
	$scope.addSubjects = function(id,year, term, courseName, courseDes, subject){

		var content={year_level: $scope.subjectsOfYear,term: $scope.subjectsOfTerm,course_name: courseName,course_des: courseDes,subject};

		$http.put('/administrator/courseSubjects/'+id,content).success(function(data){
			$scope.addSubjectRefresh(id);
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
	$scope.refreshAssestment = function(){
		$http.get('/administrator/assestments').success(function(data){
			$scope.assestments = data;
		});
	}
	$scope.viewFees = function(id){
		$http.get('/administrator/assestments/'+ id).success(function(data){
			$scope.fees = data;
			$scope.typeOfFee = data.typeOfFee;
			$scope.typeOfFee_id = data._id;
		});
	}
	$scope.closeFees = function(){
		$scope.fees = " ";
		$scope.typeOfFee ="";
		$scope.typeOfFee_id =""
	}
	$scope.newFee = function(id){
		$http.put('/administrator/assestments/'+ id, $scope.fee).success(function(data){
			$scope.fee = "";
			$scope.viewFees(id);
		});
	}
	$scope.addSchoolFee = function(feeName){
		$http.post('/administrator/assestments', feeName).success(function(data){
			$scope.refreshAssestment();
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
// add curriculum
app.directive('addCur', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<span>add</span>",
		link: function(scope, element, attrs){
			element.addClass('content_title_btn');
		 	element.on( 'click',function ( event ){

		        $('.curriculum_year,.curriculum_add--overlay').toggle();
		    } );
		}
	}
});
// add department
app.directive('addDepartment', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<span>add</span>",
		link: function(scope, element, attrs){
			element.addClass('content_title_btn');
		 	element.on( 'click',function ( event ){

		        $('.newDepartment').toggle();
        		$('.newDepartment--overlay').toggle();

		    } );
		}
	}
});
// close buttons
// close add curriculum
app.directive('closeaddCur', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>X</div>",
		link: function(scope, element, attrs){
			element.addClass('btn--close');
		 	element.on( 'click',function ( event ){

		        $('.curriculum_year,.curriculum_add--overlay').toggle();
		        console.log('ok dokie');
		    } );
		}
	}
});
// close departmentList
app.directive('closedepartmentList', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>X</div>",
		link: function(scope, element, attrs){
			element.addClass('btn--close');
		 	element.on( 'click',function ( event ){

		        $('.departmentList').slideUp();

		    } );
		}
	}
});
// close assestment fees
app.directive('closefees', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>X</div>",
		link: function(scope, element, attrs){
			element.addClass('btn--close');
		 	element.on( 'click',function ( event ){

		        $( '.assestment--overlay' ).toggle();

		    } );
		}
	}
});
// close add department module
app.directive('closeaddDepartment', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>X</div>",
		link: function(scope, element, attrs){
			element.addClass('btn--close');
		 	element.on( 'click',function ( event ){

		        $('.newDepartment').toggle();
        		$('.newDepartment--overlay').toggle();

		    } );
		}
	}
});
// close school fees
app.directive('closeSchoolFees', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>X</div>",
		link: function(scope, element, attrs){
			element.addClass('btn--close');
		 	element.on( 'click',function ( event ){

		        $( '.assestment_add, .assestment_add--overlay' ).toggle();

		    } );
		}
	}
});
// close course subjects
app.directive('closeCourseSubjects', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>X</div>",
		link: function(scope, element, attrs){
			element.addClass('btn--close');
		 	element.on( 'click',function ( event ){

		       $('.course_subjects, .overlay').toggle();

		    } );
		}
	}
});
// open assestment fees
app.directive('openfees', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<span>add</span>",
		link: function(scope, element, attrs){
			element.addClass('content_title_btn');
		 	element.on( 'click',function ( event ){

		        $( '.assestment_add, .assestment_add--overlay' ).toggle();

		    } );
		}
	}
});

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

		       $('.course_subjects, .overlay').toggle();

		    } );
		}
	}
});