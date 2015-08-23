var app = angular.module('ors_app',[]);
app.controller('curriculumsCtrl', ['$scope', '$http', function($scope, $http){

	$http.get('/database').success(function(data){
		$scope.curriculums = data;
		console.log(data);
	});

}]);