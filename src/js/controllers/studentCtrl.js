app.controller('studentCtrl', ['$scope', '$http','$rootScope', function($scope, $http, $rootScope){
	// view grades
	// get course years and term
	// filter course subjects based on yeaer and term

	// student_id
	// var student_id = $rootScope.currentUser.username;
	// testing
	var student_id = 4248671;
	
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

	});
	// by year level schedule
	$scope.year_level_schedules = function(year){
		$http.get('/student/course-schedules/' + year).success(function(schedules){
			var course_schedules = [];
			for (var i = schedules.length - 1; i >= 0; i--) {
				// the one is the 1 sem its statis find a way to be dynamic
				if(schedules[i].term == 1){
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
	// get subject in year
	$scope.subjectInYear = function(year){
		$scope.sel_course_year = year;
	};
	// get subject in term
	$scope.subjectInTerm = function(term){
		$scope.sel_course_term = term;
	};

	// view curriculum subjects;
	$http.get('/student/studentSubjects/' + student_id).success(function(subjects){
		$scope.subjects = subjects.subjects;

		$scope.getTuition($scope.subjects);

	});
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

}]);