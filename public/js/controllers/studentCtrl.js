app.controller('studentCtrl', ['$scope', '$http','$rootScope', function($scope, $http, $rootScope){
	// view grades
	// get course years and term
	// filter course subjects based on yeaer and term

	// student_id
	var student_id = $rootScope.currentUser.username;
	
	// testing
	// var student_id = 3816206;
	
	// get student schedules
	$http.get('/student/studentSchedules/' + student_id).success(function(student){
		$scope.schedules = student.schedule;
		$scope.student_schoolInfo = student;

		// show reserved subject btn for irregular student only
		if (student.status == "regular") {
			$scope.regular = true;
		}

		// functions
		$scope.getSubjects(student.schedule);
		$scope.getUnits(student.schedule);
		$scope.filterCourses(student.curriculum, student);
		$scope.getTuition(student.schedule);
		$scope.getGrades(student, student_id)
	});
	// by year level schedule
	$scope.year_level_schedules = function(year){
		$http.get('/student/course-schedules/' + year).success(function(schedules){
			var course_schedules = [];
			for (var i = schedules.length - 1; i >= 0; i--) {
				if(schedules[i].term === $scope.student_schoolInfo.term){
					for (var b = schedules[i].schedule.length - 1; b >= 0; b--) {
						course_schedules.push(schedules[i].schedule[b]);
					}
				}

			}
			$scope.course_schedules= course_schedules;
		});
	};

	// get course years and terms
	$scope.filterCourses = function(curriculum_year, student){

		var years = [];
		var terms = [];
		$http.post('/student/course-yearsAndTerms/' + curriculum_year, student).success(function(curriculum){
			for (var i = curriculum.length - 1; i >= 0; i--) {

				for (var b = curriculum[i].courses.length - 1; b >= 0; b--) {

					if(curriculum[i].courses[b].course_name == student.course_name){

						$scope.courseInfo = curriculum[i].courses[b];

						for (var y = 1; $scope.courseInfo.totalYears >= y; y++) {
							years.push(y);
						}

						for (var x = 1; $scope.courseInfo.totalTerms >= x; x++) {
							terms.push(x);
						}
						
						$scope.course_years = years;
						$scope.course_terms = terms;
					}	

				}
				
			}
			
		});
	};
	// get curriculum subjects
	$scope.getCourseSubjects = function(year, term){

		var subjectsByYear = [];

		$http.get('/student/studentSubjects/' + student_id).success(function(student){

			if(!term){
				for (var i = student.subjects.length - 1; i >= 0; i--) {
					if(student.subjects[i].year_level == year){
						subjectsByYear.push(student.subjects[i]);
					}
				}
			}else{
				for (var i = student.subjects.length - 1; i >= 0; i--) {
					if(student.subjects[i].year_level == year && student.subjects[i].term == term){
						subjectsByYear.push(student.subjects[i]);
					}
				}
			}
			$scope.courseSubjects = subjectsByYear;
		});

	}
	// get subject in year
	$scope.subjectInYear = function(year){
		$scope.selCourseLevel = year
		$scope.getCourseSubjects(year, 0);
	};
	// get subjects in year with term
	$scope.subjectInTerm = function(term){
		year = $scope.selCourseLevel;
		$scope.getCourseSubjects(year, term);
	};

	// view tuition
	$scope.getTuition = function(subjects){
		var tuition = 0;

		for (var i = subjects.length - 1; i >= 0; i--) {
			tuition += (subjects[i].units *  subjects[i].cost_perUnits);
		}
		$scope.tuition =  tuition;
	};
	$scope.getUnits = function(schedules){
		var units = 0;

		for (var i = schedules.length - 1; i >= 0; i--) {
			units += schedules[i].units;
		}

		$scope.totalUnits =  units;
	};
	$scope.getSubjects = function(schedules){
		var units = 0;

		$scope.totalSubjects =  schedules.length;
	};

	// view assestment
	$http.get('/student/studentAssetment').success(function(assestments){
		for (var i = assestments.length - 1; i >= 0; i--) {
			var totalAmount = 0;
			for (var b = assestments[i].fees.length - 1; b >= 0; b--) {
				totalAmount += assestments[i].fees[b].amount;
				assestments[i].totalAmount = totalAmount;
			}
		}
		$scope.assestments = assestments;
	});

	// view student grades
	$scope.getGrades = function(student_schoolInfo, student_id){
		$http.get('/student/studentSubjects/' + student_id).success(function(student){

			var studentSchedule = student_schoolInfo;
			var studentGrades = [];
			for (var i = studentSchedule.schedule.length - 1; i >= 0; i--) {
				
				for (var x = student.subjects.length - 1; x >= 0; x--) {
					
					if(studentSchedule.schedule[i].subject_name === student.subjects[x].subject_name){
						studentGrades.push(student.subjects[x])
					}

				}

			}
			$scope.studentGrades = studentGrades;

		});
	};

	// student subjects request
	$scope.requested_schedules = [];
	$scope.requestSched = function(schedule){
		
		$scope.requested_schedules.push(schedule);
		
	};
	$scope.removeReq = function(schedule){

		var reqList = $scope.requested_schedules;

		var removeReq = reqList.filter(function(element){
			
			return element.subject_name !== schedule.subject_name;

		});
		$scope.requested_schedules = removeReq;
	};
	$scope.saveRequest = function(){

		var subjectRequest = $scope.requested_schedules;

		$http.put('/student/request-delete/' + student_id).success(function(data){
			$scope.request = false;
		});

		subjectRequest.forEach(function(element, index){		
			$http.post('/student/subjects-request/' + student_id, element).success(function(data){
				$scope.request = false;
			})
		});

	};
	$scope.closeReq = function(){
		$scope.request = false;
	}
	$scope.viewReq = function(){
		$scope.request = true;
		$http.get('/student/request-list/'+student_id ).success(function(student){
				
				$scope.requested_schedules = student.request;

		});
	};
}]);

app.directive('subjectRequest', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			var el = element.attr('id');
			
			element.on('click', function(){
				element.hide();
				if(element.attr('id')){
					console.log(el);
				}
			});
		}
	}
});