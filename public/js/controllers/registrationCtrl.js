app.controller('registrationCtrl', ['$scope', '$http','$filter', function($scope, $http, $filter){
	// verify it through email

	// School year
	var currentYear = new Date().getFullYear();
	var nextYear = new Date().getFullYear() + 1;
	// current curriculum
	$http.get('/registration/currentCurriculum').success(function(currentCurriculum){
		$currentCur = currentCurriculum.curriculumYear;

		// get courses in current curriculum
		$http.get('/registration/courses/' + $currentCur).success(function(department){
			$scope.departments = department;
		});

	});
	$scope.studentDepartment = function(selDepartment){
		var courses = [];
		var department = $scope.departments;
			for (var i = department.length - 1; i >= 0; i--) {
				if(department[i].department_name === selDepartment){

					courses.push.apply(courses, department[i].courses);
					
				}
			}
			$scope.courses = courses;
	};
	$scope.submitRegistrationForm = function(newStudent){
		var birthday = $filter('date')(newStudent.date, "yyyy-MM-dd");
		// for student random number
		var student_no = Math.floor((Math.random()*9000000 ) + 999999) + Math.floor((Math.random()*9999 ) + 99);
		// for school year and curriculum
		newStudent.school_year = currentYear + '-' + nextYear;
		newStudent.curriculum = $currentCur;
		
		newStudent.birthday = birthday;
		newStudent.student_no = student_no;

		// get the course description
		for (var i = $scope.courses.length - 1; i >= 0; i--) {
			if($scope.courses[i].course_name == newStudent.course_name){
				newStudent.course_des = $scope.courses[i].course_des;
			}
		}

		// add new student
		$http.post('/registration/student', newStudent).success(function(data){
			
		});

		// add student info
		$http.post('/registration/student-school-info', newStudent).success(function(data){
			console.log(data);
		});
		
		
	};
}]);