'use strict';

angular.module('npm-plugin-browser')
  .controller('PluginListCtrl', function ($scope, $http, $location, $q) {

    var fields = ['name','keywords','rating','description','author','modified','homepage','version'];

    var initialFetchSize = 20;

    var formatResult = function(data){
      fields.forEach(function(k){
        if (k === 'keywords') return;
        if (!Array.isArray(data[k])) return;
        data[k] = data[k][0];
      });
      return data;
    };

    var formatData = function(data){
      var out = {
        results: data.results.map(formatResult),
        total: data.total
      };
      return out;
    };

    var makeRequest = function (start, size) {
      return $http.get('http://npmsearch.com/query', {
        params: {
          q: ['keywords:zetta'],
          fields: fields.join(','),
          start: start,
          size: size,
          sort: 'rating:desc'
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
      });

    $scope.orderByGulpKeywords = function (item) {
      return (item === 'zetta') ? -1 : 0;
    };

    $scope.notBlacklisted = function (item) {
      return (item && !$scope.blackList[item.name]);
    };
  });
