app.controller('registrationCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "registration ctrl";
	$scope.save = function(test){
		$http.post('/registration', test).success(function(data){
			console.log(data);
		});		
	};
}]);