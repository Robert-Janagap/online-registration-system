app.controller('registrarCtrl', ['$scope', '$http', function($scope, $http){
	
	// get student list
	$http.get('/registrar/students').success(function(students){
		$scope.students = students;
	});

	// view specific student information
	$scope.viewInfo = function(student_id){
		$http.get('/registrar/student-info/' + student_id).success(function(studentInfo){
			$scope.studentInfo = studentInfo;
		});
	}

	// set student Schedule
	$scope.studentSchedule = function(student_id){
		// get student info
		$http.get('/registrar/studentSchedule/'+ student_id).success(function(student){

			$scope.student = student;
			
			// get student school info
			$http.get('/registrar/school-info/'+ student.student_no).success(function(data){

				$scope.studentSchoolInfo = data;
				
				// find student section based on year, course, and term
				$http.get('/registrar/student-section/'+ $scope.studentSchoolInfo.course_name).success(function(sections){
					var sectionList = [];
						for (var i = sections.length - 1; i >= 0; i--) {

							if(sections[i].term == data.term && sections[i].year_level == data.year_level){
								sectionList.push(sections[i]);
							}
						};
					$scope.sectionList = sectionList;
				});

			});

		});
	}

	// find student section schedule
	$scope.enrollStudent = function(section_id){
		$http.get('/registrar/class-schedule/'+ section_id).success(function(schedules){
			$scope.sectionSchedules = schedules;
		});
	}





	//get subject schedules
	$scope.getSubjectSchedule = function(studentCourse){
		var schedules = [];
		$http.get('registrar/studentSubjectSchedule/'+ studentCourse).success(function(subjectSchedules){
			for (var i = subjectSchedules.length - 1; i >= 0; i--) {
				for (var b = subjectSchedules[i].schedule.length - 1; b >= 0; b--) {
					schedules.push(subjectSchedules[i].schedule[b]);
				};
			};
			$scope.schedules = schedules;
		});
	
	}
	// close StudentInfo
	$scope.closeStudentInfo = function(){
		$scope.studentInfo = null;
	}
}]);