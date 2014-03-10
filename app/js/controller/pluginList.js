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
          initialFetchSize = 15,
          sortBy = function () {
            var args = arguments;

            return function (a, b) {
              var scoreA, scoreB;

              for (var i = 0, len = args.length; i < len; i++) {
                scoreA = args[i](a);
                scoreB = args[i](b);
                if (scoreA < scoreB) {
                  return -1;
                } else if (scoreA > scoreB) {
                  return 1;
                }
              }

              return 0;
            };
          },
        sortResults = function (results) {
          return results.sort(sortBy(
            // Sort blackList plugins to bottom
            function (plugin) { return blackList[plugin.name] ? 1 : 0; },
            // Sort highly-rated plugins to top
            function (plugin) { return -plugin.rating; },
            // Fall back to sort by name
            function (plugin) { return plugin.name; }
          ));
        };

      $scope.blackList = blackList;

      // make first request for quick load
      ngProgress.start();
      makeRequest(0, initialFetchSize)
          .then(function (response) {
            $scope.data = sortResults(response.data.results);
            return response.data.total;
          })
          .then(function (total) {
            return makeRequest(initialFetchSize, total);
          })
          .then(function (response) {
            $scope.data = sortResults($scope.data.concat(response.data.results));
          })
          .then(function(){
            if (angular.isString(($location.search()).q)) {
              $scope.search = ($location.search()).q;
            }
          })
          .then(function(){
              ngProgress.complete();
              });

      $scope.orderByGulpKeywords = function (item) {
        return (item === 'gulpplugin' || item === 'gulpfriendly') ? -1 : 0;
      };
    });
