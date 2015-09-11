app.controller('alumniCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test = "ok senior robert";
	$scope.save = function(fit){
		$http.post('/alumni', fit).success(function(data){
			console.log(data);
		});		
	}
}]);