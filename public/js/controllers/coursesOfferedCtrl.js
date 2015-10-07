app.controller('coursesOfferedCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "courses-offered ctrl";
	$scope.save = function(test){
		$http.post('/courses-offered', test).success(function(data){
			console.log(data);
		});		
	};
}]);