app.controller('studentCtrl', ['$scope', '$http','$rootScope', function($scope, $http, $rootScope){
	// view curriculum subjects
	// view grades
	// view assestment and tuition
	
	// get student schedules
	var student_id = $rootScope.currentUser.username;
	console.log(student_id);
	$http.get('/student/studentSchedules/' + student_id).success(function(schedules){
		$scope.schedules = schedules;
		$scope.getSubjects(schedules);
		$scope.getUnits(schedules);
	});

	// view curriculum subjects;
	$http.get('/student/studentSubjects/' + student_id).success(function(subjects){
		$scope.subjects = subjects;

		$scope.getTuition($scope.subjects);
	});
	// view tuition
	$scope.getTuition = function(subjects){
		var tuition = 0;

		for (var i = subjects.length - 1; i >= 0; i--) {
			tuition += (subjects[i].units *  subjects[i].cost_perUnits);
		};
		$scope.tuition =  tuition;
	}
	$scope.getUnits = function(schedules){
		var units = 0;

		for (var i = schedules.length - 1; i >= 0; i--) {
			units += schedules[i].units;
		};

		$scope.totalUnits =  units;
	}
	$scope.getSubjects = function(schedules){
		var units = 0;

		$scope.totalSubjects =  schedules.length;
	}

	// view assestment
	$http.get('/student/studentAssetment').success(function(assestments){
		for (var i = assestments.length - 1; i >= 0; i--) {
			var totalAmount = 0;
			for (var b = assestments[i].fees.length - 1; b >= 0; b--) {
				totalAmount += assestments[i].fees[b].amount;
				assestments[i].totalAmount = totalAmount;
			};
		};
		$scope.assestments = assestments;
	});

}]);