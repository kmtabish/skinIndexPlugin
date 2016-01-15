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
      }]);
})(window.angular);