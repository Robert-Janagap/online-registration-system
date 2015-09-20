app.controller('registrarCtrl', ['$scope', '$http', function($scope, $http){
	// find a way to store a global sy
	// get pre enrolled students
	$http.get('/registrar/preEnrolledStudents').success(function(students){
		$scope.preEnrolledStudents = students;
		$scope.studentList = $scope.preEnrolledStudents;
	});

	// view specific new student information
	$scope.viewInfo = function(student_id){
		$http.get('/registrar/student/' + student_id).success(function(student){
			$scope.student = student;
		});
	}

	// set student Schedule
	$scope.studentSchedule = function(student_id){
		
		$http.get('/registrar/studentSchedule/'+ student_id).success(function(student){

			$scope.studentInfo = student;
			// get subject Schedules
			$scope.getSubjectSchedule(student.prefferedCourse);
		});
	}
	//get subject schedules
	$scope.getSubjectSchedule = function(studentCourse){
		var subjectSchedule = [];
		$http.get('registrar/studentSubjectSchedule/'+ studentCourse).success(function(subjectSchedules){
			// get the section
			
		});
	}
	// close StudentInfo
	$scope.closeStudentInfo = function(){
		$scope.studentInfo = null;
	}
}]);