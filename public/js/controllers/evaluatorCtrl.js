app.controller('evaluatorCtrl', ['$scope', '$http','$filter', function($scope, $http, $filter){
	// add new student
	$scope.addNewStudent = function(newStudent){
		// correct the format of Date of Birth
		var birthday = $filter('date')(newStudent.date, "yyyy-MM-dd");
		// for student random number
		var student_no = Math.floor((Math.random()*9000000 ) + 1) + Math.floor((Math.random()*999999 ) + 1);
		newStudent.birthday = birthday;
		newStudent.student_no = student_no;

		$http.post('/evaluator/newStudent', newStudent).success(function(data){
			console.log(data);
		});
	}	
	
	$http.get('/evaluator/newStudents').success(function(newStudents){
		$scope.newStudents = newStudents;
	})
}]);