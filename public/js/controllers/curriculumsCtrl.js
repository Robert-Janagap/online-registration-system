var app = angular.module('ors_app',[]);
app.controller('curriculumsCtrl', ['$scope', '$http', function($scope, $http){

	$http.get('/database').success(function(data){
		$scope.curriculum = data;
		$scope.departments = data[0].departments;
		$scope.subjects = data[1].departments[1].subjects;
	});

}]);