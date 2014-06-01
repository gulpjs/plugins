'use strict';

angular.module('npm-plugin-browser')
  .controller('PluginListCtrl', function ($scope, $http, $location, $q, ngProgress) {

    var fields = ['name','keywords','rating','description','author','modified','homepage','version'];

    var initialFetchSize = 15;

    var formatResult = function(data){
      fields.forEach(function(k){
        if (k === 'keywords') return;
        if (!Array.isArray(data.fields[k])) return;
        data.fields[k] = data.fields[k][0];
      });
      return data.fields;
    };

    var formatData = function(data){
      var out = {
        results: data.hits.hits.map(formatResult),
        total: data.hits.total
      };
      return out;
    };

    var makeRequest = function (start, size) {
      return $http.get('http://registry.gulpjs.com/_search', {
        params: {
          q: 'keywords:gulpplugin,gulpfriendly',
          fields: fields.join(','),
          from: start,
          size: size
        },
        transformResponse: $http.defaults.transformResponse.concat([formatData])
      });
    };

    var sortBy = function () {
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
    };

    var sortResults = function (results) {
      return results.sort(sortBy(
        // Sort blackList plugins to bottom
        function (plugin) {
          return $scope.blackList[plugin.name] ? 1 : 0;
        },
        // Sort highly-rated plugins to top
        function (plugin) {
          return -plugin.rating;
        },
        // Fall back to sort by name
        function (plugin) {
          return plugin.name;
        }
      ));
    };

    ngProgress.start();
    $q.all([$http.get('blackList.json'), makeRequest(0, initialFetchSize)])
      .then(function (responses) {
        $scope.blackList = responses[0].data;
        $scope.data = sortResults(responses[1].data.results);
        return makeRequest(initialFetchSize, responses[1].data.total);
      })
      .then(function (response) {
        $scope.data = sortResults($scope.data.concat(response.data.results));
        if (angular.isString(($location.search()).q)) {
          $scope.search = ($location.search()).q;
        }
        ngProgress.complete();
      });

    $scope.orderByGulpKeywords = function (item) {
      return (item === 'gulpplugin' || item === 'gulpfriendly') ? -1 : 0;
    };

    $scope.notBlacklisted = function (item) {
      return (item && !$scope.blackList[item.name]);
    };
  });
