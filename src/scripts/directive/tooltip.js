'use strict';

angular.module('npm-plugin-browser')
    .directive('tooltip', function () {
      return {
        link: function (scope, element, attrs) {
          element
              .attr('title', attrs.tooltip)
              .tooltip({placement: attrs.tooltipPlacement || 'right'});
        }
      }
    });