'use strict';

angular.module('npm-plugin-browser')
  .directive('tooltip', function () {
    return {
      link: function (scope, element, attrs) {
        var placement = attrs.tooltipPlacement || 'right';
        element
          .attr('title', attrs.tooltip)
          .tooltip({placement: placement});
      }
    }
  });