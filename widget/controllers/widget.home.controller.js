'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'ViewStack',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack) {
        var WidgetHome = this;
        WidgetHome.goToLocation = function () {
          ViewStack.push({
            template: 'Location'
          });
        };
      }]);
})(window.angular);