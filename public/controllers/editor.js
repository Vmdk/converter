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

  var previousData = {};

  $scope.update = function (currency, index) {
    var button = document.getElementById("edit-" + index);
    if (button.innerHTML === "Edit") {
      button.innerHTML = "Submit";
      $("#name-" + index).prop("readonly", false);
      $("#rate-" + index).prop("readonly", false);
      $("#name-" + index).removeClass("nothing");
      $("#rate-" + index).removeClass("nothing");
      $("#edit-" + index).removeClass("btn-warning");
      $("#edit-" + index).addClass("btn-success");
      previousData[index] = {
        name : currency.name,
        rate : currency.rate
      };
    }
    else {
      $("#name-" + index).prop("readonly", true);
      $("#rate-" + index).prop("readonly", true);
      $("#name-" + index).addClass("nothing");
      $("#rate-" + index).addClass("nothing");
      $("#edit-" + index).removeClass("btn-success");
      if (/^[A-Z]{3}$/.test(currency.name) && currency.rate > 0){
          dataFactory.updateCurrency(currency);
          button.innerHTML = "Edit";
          $("#edit-" + index).addClass("btn-warning");
      } else {
        currency.name = previousData[index].name;
        currency.rate = previousData[index].rate;
        button.innerHTML = "Failed to update";
        $("#edit-" + index).addClass("btn-danger");
        $("#edit-" + index).prop("disabled", true);
        setTimeout(function(){
          button.innerHTML = "Edit";
          $("#edit-" + index).removeClass("btn-danger");
          $("#edit-" + index).addClass("btn-warning");
          $("#edit-" + index).prop("disabled", false);
        }, 2500);
      }
    }
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
