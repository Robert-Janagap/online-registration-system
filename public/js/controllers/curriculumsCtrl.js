var app = angular.module('ors_app',[]);
app.controller('curriculumsCtrl', ['$scope', '$http', function($scope, $http){

	$http.get('/database').success(function(data){
		//$scope.curriculum = data;
	});
	//get department dynamic
	$scope.refresh = function(){
		$http.get('/administrator/curriculum/settings/' + 2016).success(function(data){
			$scope.curriculum = data;
			$scope.curYear = data[0].school_year;
			$scope.dep = "";
		});	
	}
	$scope.refresh();
	//add department
	$scope.addDep = function(year){
		$http.post('/administrator/curriculum/settings/'+year, $scope.dep).success(function(data){
			$scope.refresh();
			console.log(data);
		});
	}
	//add course
	$scope.addCourse = function(id, info){
		$http.put('/administrator/curriculum/settings/'+ id, info).success(function(data){
			$scope.refresh();
		});
	}
	//delete course
	$scope.deleteCourse = function(id, course){
		var status = 'delete';
		course.status = status;

		$http.put('/administrator/curriculum/settings/'+ id, course).success(function(data){
			$scope.refresh();
		});
	}
	//edit course not done yet
	$scope.editCourse = function(id){
		console.log(id);
	}

}]);