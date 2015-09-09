var app = angular.module('ors_app',[]);

app.controller('administratorCtrl', ['$scope', '$http', function($scope, $http){
	//get curriculum list
	$http.get('/administrator/curriculum-list').success(function(data){
		$scope.curriculumList = data;
	});
	$scope.viewCur = function(cursYear){
		$scope.cursYear = cursYear;
		
		$http.get('/administrator/curriculumSel/' + cursYear).success(function(data){
			$scope.curriculum = data;
			$scope.curYear = data[0].school_year;
			$scope.dep = "";
		});	
	}
	//test
	// $http.get('/administrator/curriculumSel/' + 2015).success(function(data){
	// 		$scope.curriculum = data;
	// 		$scope.curYear = data[0].school_year;
	// 		$scope.dep = "";
	// 	});	
	//adding of departments
	//add department
	$scope.addDep = function(year){
		$http.post('/administrator/curriculumSel/'+year, $scope.dep).success(function(data){
			$scope.viewCur(year);
			console.log(data);
		});
	}
	//add course
	$scope.addCourse = function(id, info, year){
		$http.put('/administrator/curriculumSel/'+ id, info).success(function(data){
			$scope.viewCur(year);
		});
	}
	//delete course
	$scope.deleteCourse = function(id, course){
		var status = 'delete';
		course.status = status;

		$http.put('/administrator/curriculumSel/'+ id, course).success(function(data){
			$scope.refresh();
		});
	}
	//edit course not done yet
	$scope.editCourse = function(id){
		console.log(id);
	}


	// get assestment
	$http.get('/administrator/assestments').success(function(data){
		$scope.assestments = data;
	});
	$scope.viewFees = function(id){
		$http.get('/administrator/assestments/'+ id).success(function(data){
			$scope.fees = data;
			$scope.typeOfFee = data.typeOfFee;
			$scope.typeOfFee_id = data._id;
		});
	}
	$scope.newFee = function(id){
		$http.put('/administrator/assestments/'+ id, $scope.fee).success(function(data){
			$scope.viewFees(id);
		});
	}
	$scope.deleteFee = function(typeOfFee_id, fee){
		var status = 'delete';
		fee.status = status;
		$http.put('/administrator/assestments/'+ typeOfFee_id, fee).success(function(data){
			$scope.viewFees(typeOfFee_id);
		});
	}
}]);
//showing assestment fees
app.directive('showFees', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>View</div>",
		link: function(scope, element, attrs){
			element.addClass('btn');
			element.addClass('btn--blue');
			element.addClass('assestment_formView');
		 	element.on( 'click',function ( event ){

		        event.preventDefault();
		        $( '.assestment--overlay' ).toggle();

		    } );
		}
	}
});
app.directive('showDepartments', function(){
	return{
		scope:{},
		restrict:"E",
		template: "<div>View</div>",
		link: function(scope, element, attrs){
			element.addClass('curriculum_box_btn');
			element.addClass('btn');
		 	element.on( 'click',function ( event ){

		       $('.departmentList').slideUp(300)
		       $('.departmentList').slideDown(400);
		    } );
		}
	}
});