app.controller('teacherCtrl', ['$scope', '$http','$rootScope', function($scope, $http, $rootScope){
	// add grades
	
	// var name = $rootScope.currentUser.username;
	// 
	var name = "bb";
	
	// find teacher and its schedule
	$http.get('/teacher/find-teacher/' + name).success(function(teacher){
		$scope.teacherId = teacher._id;
		
		$http.get('/teacher/class-schedules/' + teacher._id).success(function(classSchedules){
			$scope.classSchedules = classSchedules.schedules;
		});

	});


	$scope.getStudents = function(classSchedule){	
		$http.get('/teacher/student-list/' + $scope.teacherId).success(function(students){
			var studentsList = [];
			for (var i = students.studentList.length - 1; i >= 0; i--) {
				
				if(students.studentList[i].section == classSchedule.section && students.studentList[i].subject_name == classSchedule.subject_name){
					studentsList.push(students.studentList[i]);
				}
			
			}
			$scope.studentList = studentsList;
		});
		$scope.subject_code = classSchedule.subject_name;
	};
	// utilities
	$scope.closeStudentList = function(){
		$scope.studentList = false;
	};
	//students grade
	$scope.studentGrade = function(grading){

		$scope.gradingTerm = grading;

	}
	$scope.gradings = ["Prelim", "Midterm", "Pre-final", "Final"];
	// add students grade
	$scope.studentsGrades = [];
	$scope.inputGrades = function(students){
		students.gradingTerm = $scope.gradingTerm;
		$scope.studentsGrades.push(students);
	}
	$scope.saveGrades = function(){
		console.log($scope.studentsGrades);
		$scope.studentsGrades = [];
		// for (var i = $scope.studentsGrades.length - 1; i >= 0; i--) {
		// 	$http.post
		// };
	}	
}]);

app.directive('studentGrades', function(){
	return{
		scope:{},
		link: function(scope, element, attrs){
			element.on('click', function(){
				$('.student_grades').toggle();
				$('.overlay').toggle();
			});
		}
	};
});