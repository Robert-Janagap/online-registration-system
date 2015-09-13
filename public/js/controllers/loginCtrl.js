app.controller('loginCtrl', ['$scope', '$http','$location','$rootScope', function($scope, $http, $location, $rootScope){
	$scope.login = function(user){
		$http.post('/login', user).success(function(data){
			console.log(data);
			$rootScope.currentUser = data;
			if(data.roles == "administrator"){
				$location.url('/administrator');
			}else if(data.roles == "program-coordinator"){
				$location.url('/program-coordinator');
			}
		});
		
	}
}]);