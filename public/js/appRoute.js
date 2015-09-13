var app = angular.module('clientSideApp',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html',
			controller: 'homeCtrl'
		})//for about nav
		.when('/administration',{
			templateUrl: 'views/administration.html',
			controller: 'administrationCtrl'
		})
		.when('/school-info',{
			templateUrl: 'views/schoolInfo.html',
			controller: 'schoolInfoCtrl'
		})
		.when('/support-services',{
			templateUrl: 'views/supportServices.html',
			controller: 'supportServicesCtrl'
		})//for admission nav
		.when('/registration',{
			templateUrl: 'views/registration.html',
			controller: 'registrationCtrl'
		})
		.when('/admission-requirements',{
			templateUrl: 'views/admissionRequirements.html',
			controller: 'adRequirementsCtrl'
		})
		.when('/enrollment-procedure',{
			templateUrl: 'views/enrollmentProcedure.html',
			controller: 'enProcedureCtrl'
		})
		.when('/policies',{
			templateUrl: 'views/policies.html',
			controller: 'policiesCtrl'
		})//for academics nav
		.when('/courses-offered',{
			templateUrl: 'views/coursesOffered.html',
			controller: 'coursesOfferedCtrl'
		})
		.when('/events-calendar',{
			templateUrl: 'views/eventsCalendar.html',
			controller: 'eventsCalendarCtrl'
		})
		.when('/news',{
			templateUrl: 'views/news.html',
			controller: 'newsCtrl'
		})
		.when('/alumni',{
			templateUrl: 'views/alumni.html',
			controller: 'alumniCtrl'
		})//login
		.when('/login',{
			templateUrl: 'views/login.html',
			controller: 'loginCtrl'
		})//for users
		.when('/administrator',{
			templateUrl: 'views/administrator.html',
			controller: 'administratorCtrl',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/program-coordinator',{
			templateUrl: 'views/programCoordinator.html',
			controller: 'programCoordinatorCtrl',
			resolve:{
				logincheck: checkLogin
			}
		})
		.otherwise({
			redirectTo: '/'
		})
});

var checkLogin = function($q, $timeout, $http, $location, $rootScope){
	var deferred = $q.defer();
	$http.get('/login/loggedin').success(function(data){
		$rootScope.errorMessage = null;
		//user is authenticated
		if(data !=='0'){
			$rootScope.currentUser = data;
			deferred.resolve();
		}else{ //user is not authenticated
			$rootScope.errorMessage = "you need to log in";
			deferred.reject();
			$location.url('/login');
		}
	});
	return deferred.promise;
}
// navigation links access
app.controller('navCtrl',['$scope','$http','$location','$rootScope', function($scope, $http, $location, $rootScope){
	$scope.logOut = function(){
		$http.post('/logout').success(function(data){
			$rootScope.currentUser = null;
			$location.url('/')
		});
	}
}]);