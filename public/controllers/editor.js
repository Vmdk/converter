var currencyEditor = angular.module('currencyEditor', []);
currencyEditor.controller('mainController', function($scope, dataFactory) {
  $scope.formData = {};
  // when landing on the page, get all todos and show them
  getCurrencies();
  //dataFactory.createCurrency({name: "EUR", rate:1.33});

  function getCurrencies() {
    dataFactory.getCurrencies()
        .success(function(data) {
            $scope.currencies = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  }

  $scope.createCurrency = function () {
      dataFactory.createCurrency($scope.formData)
        .success(function(data) {
            $scope.formData = {}; // clear the form so our currency is ready to enter another
            $scope.currencies = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
  };

  $scope.deleteCurrency = function (id) {
      dataFactory.deleteCurrency(id)
        .success(function(data) {
            $scope.currencies = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data)
            .success(function(data) {
                $scope.currencies = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        });
  };

  $scope.update = function (currency) {
    dataFactory.updateCurrency(currency);
  }
});
currencyEditor.factory('dataFactory', ['$http', function($http) {
  var urlBase = '/api/currencies/';
  var dataFactory = {};

  dataFactory.getCurrencies = function () {
      return $http.get(urlBase);
  };

  dataFactory.getCurrency = function (id) {
      return $http.get(urlBase + id);
  };

  dataFactory.createCurrency = function (currency) {
      return $http.post(urlBase, currency);
  };

  dataFactory.updateCurrency = function (currency) {
      return $http.put(urlBase + currency._id, currency)
  };

  dataFactory.deleteCurrency = function (id) {
      return $http.delete(urlBase + id);
  };

  return dataFactory;
}]);
