app.controller('evaluatorCtrl', ['$scope', '$http','$filter','$rootScope', function($scope, $http, $filter,$rootScope){
	// School year
	var currentYear = new Date().getFullYear();
	var nextYear = new Date().getFullYear() + 1;
	

	$scope.addNewStudent = function(newStudent){
		// correct the format of Date of Birth
		var birthday = $filter('date')(newStudent.date, "yyyy-MM-dd");
		// for student random number
		var student_no = Math.floor((Math.random()*9000000 ) + 999999) + Math.floor((Math.random()*9999 ) + 99);
		// for school year and curriculum
		newStudent.school_year = currentYear + '-' + nextYear;
		newStudent.curriculum = $currentCur;
		
		newStudent.birthday = birthday;
		newStudent.student_no = student_no;
		newStudent.enrolled = false;

		// get the course description
		for (var i = $scope.courses.length - 1; i >= 0; i--) {
			if($scope.courses[i].course_name == newStudent.course_name){
				newStudent.course_des = $scope.courses[i].course_des;
			}
		}
		// add new student
		$http.post('/evaluator/student', newStudent).success(function(data){
			console.log(data);
			$scope.newStudent = "";
		});
		// add student info
		$http.post('/evaluator/student-school-info', newStudent).success(function(data){
			console.log(data);
		});

		$scope.viewNewStudents();
	};

	//view new students 
	$scope.viewNewStudents = function(){
		$http.get('/evaluator/students').success(function(students){
			$scope.students = students;
		});
	};
	$scope.viewNewStudents();

	// view specific new student information
	$scope.viewInfo = function(student_id){
		$http.get('/evaluator/student-info/' + student_id).success(function(studentInfo){
			$scope.studentInfo = studentInfo;
		});
	};
	// current curriculum
	$http.get('/evaluator/currentCurriculum').success(function(currentCurriculum){
		$currentCur = currentCurriculum.curriculumYear;
		// get courses in current curriculum
		$http.get('/evaluator/courses/' + $currentCur).success(function(department){
			var courses = [];
			for (var i = department.length - 1; i >= 0; i--) {
				courses.push.apply(courses, department[i].courses);
			}
			$scope.courses = courses;
		});
	});
	
}]);