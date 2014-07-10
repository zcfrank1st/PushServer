angular
  .module('controllers', [])
  .controller('fullController', function ($scope, $http) {
    "use strict";
    $scope.register = function () {
      $http({
        method: 'GET',
        url: 'http://localhost:1337/a?channel=5'
      })
        .success(function (data) {
          $scope.hahah = data;
          $scope.register();
        })
        .error(function (data) {});
    }

    $scope.register();
  });