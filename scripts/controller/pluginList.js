'use strict';

angular.module('npm-plugin-browser')
    .controller('PluginListCtrl', function ($scope, $http) {
      $http.get('http://npmsearch.com/query', {
        params: {
          q: 'keywords:gulpplugin,gulpfriendly',
          fields: 'name,keywords,rating,description,author,modified,homepage,version,license',
          start: 0,
          size: 10000,
          sort: 'rating:desc'

        }})
          .then(function (response) {
            $scope.data = response.data;
          });
    });