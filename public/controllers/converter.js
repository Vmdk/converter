angular.module('ForEx', [])
.controller('ConvertCtrl', ['$scope','$http', function ($scope,$http) {
	var base = this;
	$scope.rates= {};
    $http.get('/api/currencies/')
        .success(function(data) {
            $scope.rates= data;
            $scope.toType= $scope.rates;
            $scope.fromType = $scope.rates;
            $scope.fromValue =1;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

	$scope.forExConvert = function(){
	    var a = $scope.fromValue * ($scope.toType.rate * (1 / $scope.fromType.rate));
	    var a1 = $scope.fromValue;
	    var a2 = $scope.toType;
	    var a3 = $scope.fromType;
		$scope.toValue = a;
	};
}]);

