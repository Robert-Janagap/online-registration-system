app.controller('programCoordinatorCtrl', ['$scope', '$http', function($scope, $http){
	/**
	 * note 
	 * 1.kulang pa search for teacher
	 * 2. search for different kind of inputs
	 */
	// get curriculum list
	$http.get('/program-coordinator/curriculum-list').success(function(curriculumList){
		$scope.curriculumList = curriculumList;
	});
	// get courses function
	$scope.getCourses = function(curriculum){
		$scope.curriculum = curriculum;
		var courses =[];
		// get courses
		for (var i = curriculum.length - 1; i >= 0; i--) {

			for (var b = curriculum[i].courses.length - 1; b >= 0; b--) {
				courses.push(curriculum[i].courses[b]);
			};

		};
		$scope.courses = courses;
	}
	// refresh courses
	$scope.refreshCourses = function(){
		$http.get('/program-coordinator/curriculum').success(function(curriculum){
			$scope.getCourses(curriculum)
		});
	}

	$scope.refreshCourses();
	// get curriculum courses
	$scope.selectCurYear = function(year){
		if(!year){
			$scope.refreshCourses();
			$scope.department_name = null;
		}
		$http.get('/program-coordinator/curriculum-courses/' + year ).success(function(curriculum){
			$scope.getCourses(curriculum);

			if($scope.department_name){
				$scope.department_name = null;
			}
		});
	}
	// get department courses
	$scope.selectDep = function(department_id){
		$http.get('/program-coordinator/department-courses/' + department_id ).success(function(curriculum){
			$scope.department_name = curriculum[0].department_name;
			var courses =[];
			// get courses
			for (var i = curriculum.length - 1; i >= 0; i--) {

				for (var b = curriculum[i].courses.length - 1; b >= 0; b--) {
					courses.push(curriculum[i].courses[b]);
				};

			};
			$scope.courses = courses;
		});
	}
	//get course subjects year and terms
	$scope.getSubjects = function(course_id){//get all years and terms and courses subjects
		$http.get('/administrator/courseSubjects/'+ course_id).success(function(data){
			var year = [],
				terms = [];
			for (var i = 1; data[0].courses[0].totalYears >= i; i++) {
				
				year.push(i);

			};
			for (var i = 1; data[0].courses[0].totalTerms >= i; i++) {
				
				terms.push(i);

			};
			// list of course years and its terms
			$scope.courseYears = year;
			$scope.courseTerms = terms;
			// selected course
			$scope.courseName = data[0].courses[0].course_name;
			$scope.courseDes = data[0].courses[0].course_des;

			// get course years and terms by department
			$scope.departmentId = data[0]._id;
			// course id
			$scope.courseId = data[0].courses[0]._id;
			// refresh the course subject if he/she choose other course
			$scope.subjects = null;

		});
	}
	// refresh after adding of schedule
	$scope.refreshGetSubjects = function(){
		$http.get('/administrator/courseSubjects/'+ $scope.courseId).success(function(data){
			var year = [],
				terms = [];
			for (var i = 1; data[0].courses[0].totalYears >= i; i++) {
				
				year.push(i);

			};
			for (var i = 1; data[0].courses[0].totalTerms >= i; i++) {
				
				terms.push(i);

			};

			// get course years and terms by department
			$scope.departmentId = data[0]._id;
			// course id
			$scope.courseId = data[0].courses[0]._id;
			// refresh the course subject if he/she choose other course
			$scope.subjects = null;

		});
	}
	// find subjects related in year and term
	$scope.subjectInYear = function(year, department_id){//subject in year
		$http.get('/administrator/findSubjectsByYear/' + department_id).success(function(data){
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
		$scope.sectionClick = false;
		$scope.termClick = false;
		$scope.sections = null;
		$scope.sectionName = null;
		// dont show the class schedule
		$scope.schedule = false;

	}
	$scope.subjectWithTerm = function(term, department_id){//subject in term
		$http.get('/administrator/findSubjectsByYear/' + department_id).success(function(data){
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
		$scope.sectionClick = false;
		$scope.sectionName = null;
		$scope.termClick = true;
		// dont show the class schedule
		$scope.schedule = false;
		// get sections
		$scope.sectionsRefresh();

	}
	// get sections and its class schedule
	$scope.sectionsRefresh = function(){
		$http.get('/program-coordinator/section').success(function(section){
			var sections =[];
			for (var i = section.length - 1; i >= 0; i--) {
				if(section[i].course_name == $scope.courseName && section[i].term == $scope.subjectsOfTerm && section[i].year_level == $scope.subjectsOfYear){
					sections.push(section[i]);
				}
			};
			$scope.sections = sections;

		});
	}
	/*
	sectioning
	 */
	// add section
	$scope.addSection = function(section){
		var newSection = {
			course_name: $scope.courseName,
			year_level: $scope.subjectsOfYear,
			term: $scope.subjectsOfTerm,
			section: section.section
		}

		$http.post('/program-coordinator/section', newSection).success(function(section){
			$scope.section = null;
			$scope.sectionsRefresh();
		});
	}
	// refresh class scheduling
	$scope.refreshClassScheduling = function(sectionId){
		$http.get('/program-coordinator/sectionSchedule/' + sectionId ).success(function(section){
			$scope.schedule = section;
			$scope.section_id = section._id;
		});
	}
	// pick section
	$scope.pickSection = function(section){
		// section id for scheduling 
		$scope.selectedSection = section._id;
		$scope.sectionName = section.section;
		$scope.sectionClick = true;

		$scope.refreshClassScheduling(section._id);
		
	}
	/*
	Scheduling
	 */
	// set schedule in selected subject
	$scope.setSched = function(subject){
		$scope.selectedSubject = subject;
	}
	// save schedule
	$scope.saveSched = function(schedule){
    	var newSchedule = {
    		subject_name: $scope.selectedSubject.subject_name,
			subject_des: $scope.selectedSubject.subject_des,
			units: $scope.selectedSubject.units,
			cpu: $scope.selectedSubject.cost_perUnits,
			schedule_time: schedule.schedule_time,
			days: schedule.day,
			room: schedule.room,
			instructor: $scope.teacher,
			section: $scope.sectionName
    	};
    	// add schedule in student
    	$http.put('/program-coordinator/newSchedule/' + $scope.selectedSection, newSchedule).success(function(newSchedule){
    		$scope.subjectSchedule = null;
    		$scope.teacher = null;
    		$scope.refreshClassScheduling($scope.selectedSection);
    	});
    	
    	// add schedule in teacher
    	$http.put('/program-coordinator/teacher-schedules/' + $scope.teacher_id, newSchedule).success(function(classSchedules){
			console.log(classSchedules);
		});
	}

	// delete schedule
	$scope.deleteSchedule = function(schedule){
		$http.put('/program-coordinator/deleteSchedule/'+ $scope.section_id, schedule).success(function(data){
			$scope.refreshClassScheduling($scope.selectedSection);
		});
	}
	$scope.viewLastSched = function(){
		$scope.refreshClassScheduling($scope.selSection);
	}
	
	// get teachers
	$http.get('/administrator/users').success(function(data){
		var teachers =[];
		for (var i = data.length - 1; i >= 0; i--) {
			if(data[i].roles === "teacher"){
				teachers.push(data[i]);
			}
		};
		$scope.teachers = teachers;
	});
	// teacher selected
	$scope.pickTeacher = function(teacher){
		$scope.teacher = teacher.name;
		$scope.teacher_id = teacher._id;
	}
}]);

app.directive('openClassSched', function(){
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
app.directive('closeClassSched', function(){
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
app.directive('setSchedule', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>set schedule</div>",
		link: function(scope, element, attrs){
			element.addClass('btn');
		 	element.on( 'click',function ( event ){
		 		$('.setSchedule').toggleClass('show');
		 		$('.course_subjects').toggle();
		    } );
		}
	}
});
app.directive('backToCourses', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			element.addClass('btn');
		 	element.on( 'click',function ( event ){
		 		$('.setSchedule').toggleClass('show');
		 		$('.course_subjects').toggle();
		    } );
		}
	}
});