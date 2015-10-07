app.controller('eventsCalendarCtrl', ['$scope', '$http', function($scope, $http){
	$scope.test2 = "events-calendar ctrl";
	$scope.save = function(test){
		$http.post('/events-calendar', test).success(function(data){
			console.log(data);
		});		
	};
}]);