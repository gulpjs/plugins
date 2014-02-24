'use strict';

angular.module('npm-plugin-browser')
    .directive('showhover', function () {
      return {
        link: function (scope, element, attrs) {
          var el = element.find(attrs.showhover);
          el.hide();
          element.hover(function () {
            el.show();
          }, function () {
            el.hide();
          });
        }
      }
    });
