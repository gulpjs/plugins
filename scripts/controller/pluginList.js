'use strict';

angular.module('npm-plugin-browser')
  .controller('PluginListCtrl', function ($scope, $http, $filter) {

    var total = 0;

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

    $scope.numPlugins = 0;
    $scope.search = '';

    // moves and colorizes some keywords
    var handleKeywords = function (plugin) {
      var keywords = plugin.keywords;

      var kindex = keywords.indexOf('gulpfriendly');
      if(kindex != -1) {
        keywords.splice(kindex, 1);
        keywords.unshift({name: 'gulpfriendly', color: 'success'});
      }

      var pindex = keywords.indexOf('gulpplugin');
      if(pindex != -1) {
        keywords.splice(pindex, 1);
        keywords.unshift({name: 'gulpplugin', color: 'info'});
      }

      plugin.keywords = plugin.keywords.map(function (keyword) {
        if(!keyword.name) {
          return {name: keyword, color: 'default'};
        } else return keyword;
      });

      return plugin;
    };

    // make first request for quick load
    makeRequest(0, 15).then(function (response) {
      $scope.data = response.data.results.map(handleKeywords);
      total = response.data.total;
      $scope.numPlugins = total;
      // load everything fully
      makeRequest(0, total).then(function (response) {
        $scope.data = response.data.results.map(handleKeywords);
        $scope.numPlugins = $filter('filter')($scope.data, $scope.search).length;
      });
    });
  });