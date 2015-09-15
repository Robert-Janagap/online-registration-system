app.controller('loginCtrl', ['$scope', '$http','$location','$rootScope', function($scope, $http, $location, $rootScope){
	$scope.login = function(user){
		$http.post('/login', user).success(function(data){
			$rootScope.currentUser = data;
			userRoutes = ["administrator", "evaluator", "registrar", "teacher", "program-coordinator"];
			for (var i = userRoutes.length - 1; i >= 0; i--) {
				
				if(data.roles == userRoutes[i]){
					$location.url('/' + userRoutes[i]);
				}
		
			};
		});
		
	}
}]);