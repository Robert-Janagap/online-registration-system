app.controller('teacherCtrl', ['$scope', '$http', function($scope, $http){
	// get class schedules
	// get student list
	// add grades
	var id = '55f9403dba844b981463ceb9';
	
	$http.get('/teacher/class-schedules/' + id).success(function(classSchedules){
		$scope.classSchedules = classSchedules;
	});

	$scope.getStudents = function(classSchedule){	
		$http.get('/teacher/student-list/' + id).success(function(students){
			console.log(students);
		});
	}
}]);