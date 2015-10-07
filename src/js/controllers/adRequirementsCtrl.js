app.controller('adRequirementsCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "admission requirements ctrl";
	$scope.save = function(test){
		$http.post('/admission-requirements', test).success(function(data){
			console.log(data);
		});		
	};
}]);