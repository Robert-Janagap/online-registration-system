var app = angular.module('clientSideApp',['ngRoute']);
/*
	restart the curriculum
 */
app.config(function($routeProvider){
	$routeProvider
		.when('/',{
			templateUrl: 'views/home.html',
			controller: 'homeCtrl',
			title: 'Bacolod City College'
		})//for about nav
		.when('/administration',{
			templateUrl: 'views/administration.html',
			controller: 'administrationCtrl',
			title: 'Administration'
		})
		.when('/school-info',{
			templateUrl: 'views/schoolInfo.html',
			controller: 'schoolInfoCtrl',
			title: 'School Info'
		})
		.when('/support-services',{
			templateUrl: 'views/supportServices.html',
			controller: 'supportServicesCtrl',
			title: 'Support Services'
		})//for admission nav
		.when('/registration',{
			templateUrl: 'views/registration.html',
			controller: 'registrationCtrl',
			title: 'Registration'
		})
		.when('/admission-requirements',{
			templateUrl: 'views/admissionRequirements.html',
			controller: 'adRequirementsCtrl',
			title: 'Admission Requirements'
		})
		.when('/enrollment-procedure',{
			templateUrl: 'views/enrollmentProcedure.html',
			controller: 'enProcedureCtrl',
			title: 'Enrollment Procedure'
		})
		.when('/policies',{
			templateUrl: 'views/policies.html',
			controller: 'policiesCtrl',
			title: 'Policies'
		})//for academics nav
		.when('/courses-offered',{
			templateUrl: 'views/coursesOffered.html',
			controller: 'coursesOfferedCtrl',
			title: 'Courses Offered'
		})
		.when('/events-calendar',{
			templateUrl: 'views/eventsCalendar.html',
			controller: 'eventsCalendarCtrl',
			title: 'Events Calendar'
		})
		.when('/news',{
			templateUrl: 'views/news.html',
			controller: 'newsCtrl',
			title: 'News'
		})
		.when('/alumni',{
			templateUrl: 'views/alumni.html',
			controller: 'alumniCtrl',
			title: 'Alumni'
		})//login
		.when('/login',{
			templateUrl: 'views/login.html',
			controller: 'loginCtrl',
			title: 'Login'
		})//for users
		.when('/administrator',{
			templateUrl: 'views/administrator.html',
			controller: 'administratorCtrl',
			title: 'Administrator',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/program-coordinator',{
			templateUrl: 'views/programCoordinator.html',
			controller: 'programCoordinatorCtrl',
			title: 'Program Coordinator',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/evaluator',{
			templateUrl: 'views/evaluator.html',
			controller: 'evaluatorCtrl',
			title: 'Evaluator',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/registrar',{
			templateUrl: 'views/registrar.html',
			controller: 'registrarCtrl',
			title: 'Registrar',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/teacher',{
			templateUrl: 'views/teacher.html',
			controller: 'teacherCtrl',
			title: 'Teacher',
			resolve:{
				logincheck: checkLogin
			}
		})
		.when('/student',{
			templateUrl: 'views/student.html',
			controller: 'studentCtrl',
			title: 'Student',
			resolve:{
				logincheck: checkLogin
			}
		})
		.otherwise({
			redirectTo: '/'
		});
});

// check if the user login
var checkLogin = function($q, $timeout, $http, $location, $rootScope){
	var deferred = $q.defer();
	$http.get('/login/loggedin').success(function(data){
		$rootScope.errorMessage = null;
		//user is authenticated
		if(data !=='0'){
			$rootScope.currentUser = data;
			deferred.resolve();
		}else{ //user is not authenticated
			$rootScope.errorMessage = "can't find the username or password";
			$location.url('/login');
			deferred.reject();
		}
	});
	return deferred.promise;
};
// logout
app.controller('navCtrl',['$scope','$http','$location','$rootScope', function($scope, $http, $location, $rootScope){
	$scope.logOut = function(){
		$http.post('/logout').success(function(data){
			$rootScope.currentUser = null;
			$location.url('/');
		});
	};
}]);

/*
	global directives
 */
// for input group animation
app.directive('inputGroup', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
			element.addClass('input_groups');
			
			if($('.input_groups input').val() === null) {
				$(this).removeClass('has--value');
			}

			$('.input_groups input').on('focusout',function(){
			var input = $(this).val();

			    if(input === "") {

			   		$(this).removeClass('has--value');
			      
			    } else{

			    	$(this).addClass('has--value');
			      
			    }
			});

		}
	};
});
// toggle student information
app.directive('toggleStudentInfo', function(){
	return{
		scope:{},
		restrict:"E",
		link: function(scope, element, attrs){
		 	var x = (element.text() !=="X") ? element.addClass('btn'):element.addClass('btn--close');
			
		 	element.on( 'click',function ( event ){

				$('.student_info').toggle();
		   		$('.overlay').toggle();
		    } );
		}
	};
});
// add dynamic title page
app.run(['$location', '$rootScope', function($location, $rootScope){
	$rootScope.$on('$routeChangeSuccess', function(event, current, previous){
		$rootScope.title = current.$$route.title;
	});
}]);