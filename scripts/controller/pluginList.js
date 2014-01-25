'use strict';

angular.module('npm-plugin-browser')
  .controller('PluginListCtrl', function ($scope, $http) {

    var makeRequest = function (start, size) {
      return $http.get('http://npmsearch.com/query', {
        params: {
          q: 'keywords:gulpplugin,gulpfriendly',
          fields: 'name,keywords,rating,description,author,modified,homepage,version,license',
          start: start,
          size: size,
          sort: 'rating:desc'
        }});
    };

    // make first request for quick load
    makeRequest(0, 15).then(function (response) {
      $scope.data = response.data.results;
      // load everything fully
      makeRequest(0, response.data.total).then(function (response) {
        $scope.data = response.data.results;
      });
    });
  });