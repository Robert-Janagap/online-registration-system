app.controller('evaluatorCtrl', ['$scope', '$http','$filter','$rootScope', function($scope, $http, $filter,$rootScope){
	// add new student
	// how to get the year in system
	// how to get the current curriculum by finding the highest year
	$scope.addNewStudent = function(newStudent){
		// correct the format of Date of Birth
		var birthday = $filter('date')(newStudent.date, "yyyy-MM-dd");
		// for student random number
		var student_no = Math.floor((Math.random()*9000000 ) + 1000000) + Math.floor((Math.random()*999999 ) + 1000000);
		
		newStudent.birthday = birthday;
		newStudent.student_no = student_no;

		$http.post('/evaluator/newStudent', newStudent).success(function(data){
			$scope.newStudent = null;
			$scope.viewNewStudents();
		});
	}
	//view new students 
	$scope.viewNewStudents = function(){
		$http.get('/evaluator/newStudents').success(function(newStudents){
			$scope.newStudents = newStudents;
		})
	}
	$scope.viewNewStudents();

	// view specific new student information
	$scope.viewInfo = function(newStudentInfo_id){
		$http.get('/evaluator/newStudentInfo/' + newStudentInfo_id).success(function(newStudentInfo){
			$scope.newStudentInfo = newStudentInfo;
		});
	}
	// current curriculum
	$http.get('/evaluator/currentCurriculum').success(function(currentCurriculum){
		$currentCur = currentCurriculum.curriculumYear;
		// get courses in current curriculum
		$http.get('/evaluator/courses/' + $currentCur).success(function(department){
			var courses = [];
			for (var i = department.length - 1; i >= 0; i--) {
				courses.push.apply(courses, department[i].courses);
			};
			$scope.courses = courses;
		});
	});
	
}]);