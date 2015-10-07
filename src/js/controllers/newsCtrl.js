app.controller('newsCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "Good morning master robert";
	$scope.add = function(test){
		$http.post('/news', test).success(function(data){
			console.log(data);
		});		
	};
}]);