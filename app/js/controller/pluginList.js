'use strict';

angular.module('npm-plugin-browser')
    .controller('PluginListCtrl', function ($scope, $http, $location, ngProgress, blackList) {

      var makeRequest = function (start, size) {
        return $http.get('http://npmsearch.com/query', {
          params: {
            q: 'keywords:gulpplugin,gulpfriendly',
            fields: 'name,keywords,rating,description,author,modified,homepage,version,license',
            start: start,
            size: size,
            sort: 'rating:desc'
          }});
      },
          initialFetchSize = 15;

      $scope.blackList = blackList;

      // make first request for quick load
      ngProgress.start();
      makeRequest(0, initialFetchSize)
          .then(function (response) {
            $scope.data = response.data.results;
            return response.data.total;
          })
          .then(function (total) {
            return makeRequest(initialFetchSize, total);
          })
          .then(function (response) {
            $scope.data =  $scope.data.concat(response.data.results);
          })
          .then(function(){
            if (angular.isString(($location.search()).q)) {
              $scope.search = ($location.search()).q;
            }
          })
          .then(ngProgress.complete);

      $scope.orderByGulpKeywords = function (item) {
        return (item === 'gulpplugin' || item === 'gulpfriendly') ? -1 : 0;
      };
    });