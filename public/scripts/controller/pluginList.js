'use strict';

angular.module('npm-plugin-browser')
    .controller('PluginListCtrl', function ($scope, $http) {
      $http.get('data.json')
          .then(function (response) {
            $scope.data = response.data;
          });
    });