app.controller('evaluatorCtrl', ['$scope', '$http','$filter', function($scope, $http, $filter){
	$scope.addNewStudent = function(newStudent){
		var birthday = $filter('date')(newStudent.date, "yyyy-MM-dd");
	}	
}]);