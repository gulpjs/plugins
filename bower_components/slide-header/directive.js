'use strict';

angular.module('slide-header', []).directive('slideHeader', function() {
  return {
    restrict: 'A',
    link: function(scope, el, attr) {
      new SlideHeader(el[0]);
    }
  }
});
