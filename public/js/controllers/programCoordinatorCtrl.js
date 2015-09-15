app.controller('programCoordinatorCtrl', ['$scope', '$http', function($scope, $http){

	// get curriculum list
	$http.get('/program-coordinator/curriculum-list').success(function(curriculumList){
		$scope.curriculumList = curriculumList;
	});
	// get courses function
	$scope.getCourses = function(curriculum){
		$scope.curriculum = curriculum;
		var courses =[];
		// get courses
		for (var i = curriculum.length - 1; i >= 0; i--) {

			for (var b = curriculum[i].courses.length - 1; b >= 0; b--) {
				courses.push(curriculum[i].courses[b]);
			};

		};
		$scope.courses = courses;
	}
	// refresh courses
	$scope.refreshCourses = function(){
		$http.get('/program-coordinator/curriculum').success(function(curriculum){
			$scope.getCourses(curriculum)
		});
	}

	$scope.refreshCourses();
	// get curriculum courses
	$scope.selectCurYear = function(year){
		if(!year){
			$scope.refreshCourses();
			$scope.department_name = null;
		}
		$http.get('/program-coordinator/curriculum-courses/' + year ).success(function(curriculum){
			$scope.getCourses(curriculum);

			if($scope.department_name){
				$scope.department_name = null;
			}
		});
	}
	// get department courses
	$scope.selectDep = function(department_id){
		$http.get('/program-coordinator/department-courses/' + department_id ).success(function(curriculum){
			console.log(curriculum);
			$scope.department_name = curriculum[0].department_name;
			var courses =[];
			// get courses
			for (var i = curriculum.length - 1; i >= 0; i--) {

				for (var b = curriculum[i].courses.length - 1; b >= 0; b--) {
					courses.push(curriculum[i].courses[b]);
				};

			};
			$scope.courses = courses;
		});
	}
}]);

app.directive('openClassSched', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>Set Schedule</div>",
		link: function(scope, element, attrs){
			element.addClass('btn');
		 	element.on( 'click',function ( event ){

		        $( '.setSchedule, .overlay' ).toggle();

		    } );
		}
	}
});
app.directive('closeClassSched', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>X</div>",
		link: function(scope, element, attrs){
			element.addClass('btn--close');
		 	element.on( 'click',function ( event ){

		       $('.setSchedule, .overlay').toggle();

		    } );
		}
	}
});