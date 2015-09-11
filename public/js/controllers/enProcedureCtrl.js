app.controller('enProcedureCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "enrollemt procedure info ctrl";
	$scope.save = function(test){
		$http.post('/enrollment-procedure', test).success(function(data){
			console.log(data);
		});		
	}
}]);