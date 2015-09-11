app.controller('administrationCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "administrationCtrl info ctrl";
	$scope.save = function(test){
		$http.post('/administration', test).success(function(data){
			console.log(data);
		});		
	}
}]);