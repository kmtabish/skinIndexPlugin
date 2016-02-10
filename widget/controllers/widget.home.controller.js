'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', '$rootScope',
      function ($scope, $rootScope) {
        var WidgetHome = this;

        WidgetHome.setLocation = function (data, redirectToNext) {
          if (data) {
            WidgetHome.currentLocation = data.location;
            WidgetHome.currentCoordinates = data.coordinates;
          }
        };
      }]);
})(window.angular);