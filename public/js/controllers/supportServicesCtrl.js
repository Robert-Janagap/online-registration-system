app.controller('supportServicesCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "Support Services ctrl";
	$scope.save = function(info){
		$http.post('/support-services', info).success(function(data){
			console.log(data);
		});		
	}
}]);