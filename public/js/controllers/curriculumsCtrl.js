var app = angular.module('ors_app',[]);
app.controller('curriculumsCtrl', ['$scope', '$http', function($scope, $http){

	$http.get('/database').success(function(data){
		// change this later
		$scope.curriculum = data;
		$scope.departments = data[4].departments;
		$scope.subjects = data[1].departments[1].subjects;
	});
	var refresh = function(){

	};
	$http.get('/tmdatabase').success(function(data){
		for (var i = 0; i < data.length; i++) {
			$scope.selections = data[i];
			console.log($scope.selections);
		};
	});

	$scope.curriculum_add = function(){
		$http.post('/', $scope.curriculum_new).success(function(data){
			
		});
	};
}]);