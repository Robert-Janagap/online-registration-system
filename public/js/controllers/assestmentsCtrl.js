var app = angular.module('ors_app',[]);

app.controller('assestmentsCtrl', ['$scope', '$http', function($scope, $http){
	
	// get assestment
	$http.get('administrator/assestments').success(function(data){
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