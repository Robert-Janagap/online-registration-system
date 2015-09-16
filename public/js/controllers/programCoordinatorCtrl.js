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
		$scope.sectionClick = false;
		$scope.termClick = false;
		$scope.sections = null;
		$scope.sectionName = null;
		$scope.schedules = null;

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
		$scope.sectionClick = false;
		$scope.sectionName = null;
		$scope.termClick = true;
		$scope.schedules = null;
		// get sections
		$scope.sectionsRefresh();

	}
	// get class schedule
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
	// get teacher
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
		$scope.subjectSchedule.teacher = teacher.name;
	}
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
		});
	}
	// pick section
	$scope.pickSection = function(section){
		$scope.selectedSection = section._id;
		$scope.sectionName = section.section;
		$scope.sectionClick = true;

		var schedules = [];

		for (var b = section.schedule.length - 1; b >= 0; b--) {

			if(section.schedule[b].subject_code == $scope.subjects[b].subject_name){
				schedules.push({
					subject_name: $scope.subjects[b].subject_name,
					subject_des:  $scope.subjects[b].course_des,
					units: section.schedule[b].units,
					time: section.schedule[b].time,
					days: section.schedule[b].days,
					room: section.schedule[b].room,
					instructor: section.schedule[b].instructor
				})
			}
		};

		$scope.schedules = schedules;
	}
	// set schedule in selected subject
	$scope.setSched = function(subject){
		$scope.selectedSubject = subject;
	}
	// save schedule
	$scope.saveSched = function(schedule){
    	var newSchedule = {
    		subject_code: $scope.selectedSubject.subject_name,
			subject_des: $scope.selectedSubject.subject_des,
			units: $scope.selectedSubject.units,
			schedule_time: schedule.schedule_time,
			days: schedule.day,
			room: schedule.room,
			instructor: schedule.teacher
    	}
    	$http.put('/program-coordinator/newSchedule/' + $scope.selectedSection, newSchedule).success(function(newSchedule){
    		$scope.subjectSchedule = null;
    	});
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
		template: "<div>Back</div>",
		link: function(scope, element, attrs){
			element.addClass('btn');
		 	element.on( 'click',function ( event ){
		 		$('.setSchedule').toggleClass('show');
		 		$('.course_subjects').toggle();
		    } );
		}
	}
});