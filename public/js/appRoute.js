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
		})//for users
		.when('/administrator',{
			templateUrl: 'views/administrator.html',
			controller: 'administratorCtrl'
		})
		.otherwise({
			redirectTo: 'views/home.html'
		})
});