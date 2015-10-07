app.controller('policiesCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "polices info ctrl";
	$scope.save = function(test){
		$http.post('/policies', test).success(function(data){
			console.log(data);
		});		
	};
}]);