app.controller('administratorCtrl', ['$scope', '$http','$rootScope', function($scope, $http, $rootScope){
	// add users
	$scope.refreshUsers = function(){
		$http.get('/administrator/users').success(function(data){
			$scope.userList = data; 
		});
		$scope.user = null;
	}
	$scope.refreshUsers();
	$scope.addUser = function(user){
		$http.post('/administrator/newUser/', user).success(function(data){
			if(data != null){
				$scope.refreshUsers();
				$scope.user = "";
				$scope.errorUser="";
			}else{
				$scope.errorUser = "User " + user.name + " already exist";
			}
		});
	}
	$scope.deleteUser = function(user_id){
		$http.delete('/administrator/deleteUser/'+user_id).success(function(data){
			$scope.refreshUsers();
		});
	}
	// current curriculum
	$http.get('/administrator/currentCurriculum').success(function(currentCurriculum){
		$currentCur = currentCurriculum.curriculumYear;
	});

	/*
	For curriculums
	 */
	$scope.refreshCurList = function(){
		$http.get('/administrator/curriculum-list').success(function(data){
			$scope.curriculumList = data;
		});
	}
	$scope.refreshCurList();
	// refresh adding of departments
	$scope.viewCur = function(cursYear){
		
		$http.get('/administrator/curriculumSel/' + cursYear).success(function(data){
			if(data.length){
				$scope.curriculum = data;
				$scope.curYear = data[0].school_year;
				$scope.dep = "";
				$scope.courses = "";
			}else{
				$scope.curYear = cursYear;
				$scope.dep = "";
				$scope.curriculum = "";
			}
		});	
		$scope.departmentClick = false;
	}
	//add curriculum year 
	$scope.addCurriculum = function(year) {
		$http.post('/administrator/newCurriculum/',year).success(function(data){
			if(data != null){
				$scope.refreshCurList();
				$scope.curriculumError = ""
			}else{
				$scope.curriculumError = year.curriculum_year + " " + "curriculum is already exist.";
			}
			$scope.curriculum_new.curriculum_year = "";
		});
	}
	// delete curriculum
	$scope.deleteCur = function(curriculum){
		// delete the curriculum
		$http.delete('/administrator/deleteCurriculum/' + curriculum._id).success(function(data){
			$scope.refreshCurList();
		});
		// delete its departments
		$http.delete('/administrator/deleteCurriculumDep/' + 2015 ).success(function(data){
		});
	}
	/**
	 * For departments
	 */
	
	//add department
	$scope.addDep = function(year){
		$http.post('/administrator/curriculumSel/'+year, $scope.dep).success(function(data){
			$scope.viewCur(year);
		});
	}
	// delete department
	$scope.deleteDep = function(id, year){
		$http.delete('/administrator/curriculumSel/'+id).success(function(data){
			$scope.viewCur(year);
		});
	}
	// close departments
	$scope.closeDepartments = function(){
		$scope.courses = "";
		$scope.department_code = "";
	}
	/**
	 * for courses
	 */
	//get courses
	$scope.getCourses = function(dep_id, department){
		$http.get('/administrator/department-courses/' + dep_id).success(function(data){
			$scope.courses = data;
			$scope.departmentId = data._id;
		});	
		$scope.dep =null;
		$scope.departmentClick = true;
		$scope.department_code = department.department_name;
	}
	//add course
	$scope.addCourse = function(new_course){
		$http.put('/administrator/course/'+ $scope.departmentId, new_course).success(function(data){
			$scope.getCourses($scope.departmentId);
		});
	}
	//delete course
	$scope.deleteCourse = function(course){
		var status = 'delete';
		course.status = status;

		$http.put('/administrator/course/'+ $scope.departmentId, course).success(function(data){
			$scope.getCourses($scope.departmentId);
		});

	}
	// edit course
	$scope.editCourse = function(id){
		$http.get('/administrator/course/' + id).success(function(data){
			$scope.dep = data[0];
		});
	}
	//update course
	$scope.updateCourse = function(course){
		$http.put('/administrator/update-course/'+ $scope.departmentId, course).success(function(data){
			$scope.getCourses($scope.departmentId);
		});
	}

	/**
	 * for subjects
	 */
	// refresh subjects in year
	$scope.refreshSubjects = function(department_id){
		$http.get('/administrator/findSubjectsByYear/' + department_id).success(function(data){
			var objects = [];
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].year_level === $scope.subjectsOfYear && $scope.courseName === data[i].course_name){
					objects.push(data[i]);
				}
			};
			$scope.subjects = objects;
		});
	}
	//get course subjects year and terms
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
			$scope.subjects = null;
		});
	}
	// find subjects related in year and term
	$scope.subjectInYear = function(year, id){
		$http.get('/administrator/findSubjectsByYear/' + id).success(function(data){
			var objects = [];
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].year_level === year && $scope.courseName === data[i].course_name){
					objects.push(data[i]);
				}
			};
			$scope.subjects = objects;
		});
		// utilities
		$scope.subjectsOfYear = year;
		$scope.semesterClick = false;
		$scope.yearClick = true;
	}
	$scope.subjectWithTerm = function(term, id){
		$http.get('/administrator/findSubjectsByYear/' + id).success(function(data){
			var objects = [];
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].year_level === $scope.subjectsOfYear && data[i].term === term && $scope.courseName === data[i].course_name){
					objects.push(data[i]);
				}
			};
			$scope.subjects = objects;

		});
		// utilities
		$scope.subjectsOfTerm = term;
		$scope.semesterClick = true;
	}
	// refresh
	$scope.addSubjectRefresh = function(id){
		$http.get('/administrator/findSubjectsByYear/' + id).success(function(data){
			var objects = [];
			for (var i = data.length - 1; i >= 0; i--) {
				if(data[i].year_level === $scope.subjectsOfYear && data[i].term === $scope.subjectsOfTerm && $scope.courseName === data[i].course_name){
					objects.push(data[i]);
				}
			};
			$scope.subjects = objects;
			$scope.subject = "";
		});
	}
	// add subjects
	$scope.addSubjects = function(id,year, term, courseName, courseDes, subject){

		var content={year_level: $scope.subjectsOfYear,term: $scope.subjectsOfTerm,course_name: courseName,course_des: courseDes,subject};

		$http.put('/administrator/courseSubjects/'+id,content).success(function(data){
			$scope.addSubjectRefresh(id);
		});	
	}
	// delete subjects
	$scope.deleteSubject = function(department_id,subject){

		$http.put('/administrator/deleteSubjects/'+ department_id, subject).success(function(data){
			$scope.refreshSubjects(department_id);
		});

	}
	/**
	 * for assestments
	 */
	
	// get assestment
	$scope.refreshAssestment = function(){
		$http.get('/administrator/assestments').success(function(data){
			// view total amount of fees
			for (var i = data.length - 1; i >= 0; i--) {
				var totalAmount = 0;
				for (var b = data[i].fees.length - 1; b >= 0; b--) {
					totalAmount += data[i].fees[b].amount;
					data[i].totalAmount = totalAmount;
				};
			};
			$scope.assestments = data;
		});
	}
	$scope.refreshAssestment();
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
			$scope.refreshAssestment();
		});
	}
	$scope.addSchoolFee = function(feeName){
		$http.post('/administrator/assestments', feeName).success(function(data){
			if(data != null){
				$scope.refreshAssestment();
				$scope.errorAssestment = null;
				$scope.schoolFee = "";
			}else{
				$scope.errorAssestment = "school fee name already exist please try other name";
				$scope.schoolFee = "";
			}
		});
	}
	$scope.deleteFee = function(typeOfFee_id, fee){
		var status = 'delete';
		fee.status = status;
		$http.put('/administrator/assestments/'+ typeOfFee_id, fee).success(function(data){
			$scope.viewFees(typeOfFee_id);
			$scope.refreshAssestment();
		});
	}
	$scope.deleteAssestment = function(fee_id){
		$http.delete('/administrator/deleteAssestment/' + fee_id).success(function(data){
			$scope.refreshAssestment();
		});
	}
}]);
/**
 * directives
 */
// add curriculum
app.directive('addCur', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<span>+</span>",
		link: function(scope, element, attrs){
			element.addClass('btn');
			element.addClass('btn--blue');
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
		template: "<span>+</span>",
		link: function(scope, element, attrs){
			element.addClass('btn');
			element.addClass('btn--blue');
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
		link: function(scope, element, attrs){
			if(element.text() == "X"){
				element.addClass('btn--close');
			}

		 	element.on( 'click',function ( event ){

		        $('.curriculum_year,.curriculum_add--overlay').toggle();

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
		link: function(scope, element, attrs){
			if(element.text() == "X"){
				element.addClass('btn--close');
			}
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
// close  staff and teacher modal

// open assestment fees
app.directive('openfees', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<span>+</span>",
		link: function(scope, element, attrs){
			element.addClass('btn');
			element.addClass('btn--blue');
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
// open  staff and teacher modal
app.directive('facultyStuff', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			if(element.text() == "X"){
				element.addClass('btn--close');
			}else{
				element.addClass('btn');
				element.addClass('btn--blue');
			}
		 	element.on( 'click',function ( event ){

		       $('.addFacultyStaff, .overlay').toggle();

		    } );
		}
	}
});