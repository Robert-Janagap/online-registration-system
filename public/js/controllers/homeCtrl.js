app.controller('homeCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test = "ok master";
	$scope.save = function(fit){
		$http.post('/', fit).success(function(data){
			console.log(data);
		});		
	};
}]);