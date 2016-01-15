'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetLocationCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'ViewStack',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack) {
        var WidgetLocation = this;
        WidgetLocation.getWeatherData = function () {
          ViewStack.push({
            template: 'Info'
          });
        };

        WidgetLocation.setLocation = function (data) {
          WidgetLocation.data = {
            widget: {
              location: data.location,
              location_coordinates: data.coordinates
            }
          };
          WidgetLocation.currentLocation = WidgetLocation.data.widget.address.location;
          WidgetLocation.currentCoordinates = WidgetLocation.data.widget.address.location_coordinates;
          $scope.$digest();
        };
      }]);
})(window.angular);