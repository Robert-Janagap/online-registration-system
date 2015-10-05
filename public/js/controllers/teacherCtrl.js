app.controller('teacherCtrl', ['$scope', '$http', function($scope, $http){
	// get class schedules
	// get student list
	// add grades
	var id = '560e1d954da6c4a40b0ec3c3';
	
	$http.get('/teacher/class-schedules/' + id).success(function(classSchedules){
		$scope.classSchedules = classSchedules.schedules;
	});

	$scope.getStudents = function(classSchedule){	
		$http.get('/teacher/student-list/' + id).success(function(students){
			var studentsList = [];
			for (var i = students.studentList.length - 1; i >= 0; i--) {
				
				if(students.studentList[i].section == classSchedule.section && students.studentList[i].subject_name == classSchedule.subject_name){
					studentsList.push(students.studentList[i]);
				}
			
			};
			$scope.studentList = studentsList;
		});
		$scope.subject_code = classSchedule.subject_name;
	}
	// utilities
	$scope.closeStudentList = function(){
		$scope.studentList = false;
	}
}]);