app.controller('schoolInfoCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "School info ctrl";
	$scope.save = function(test){
		$http.post('/school-info', test).success(function(data){
			console.log(data);
		});		
	}
}]);