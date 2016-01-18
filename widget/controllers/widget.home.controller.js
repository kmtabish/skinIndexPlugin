'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'ViewStack','$rootScope',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack , $rootScope) {
        var WidgetHome = this;
        $rootScope.itemDetailsBackgroundImage = "";
        WidgetHome.bgImage="";
        WidgetHome.deviceHeight = window.innerHeight;
        WidgetHome.deviceWidth = window.innerWidth;

        WidgetHome.goToLocation = function () {
          ViewStack.push({
            template: 'Location'
          });
        };

        var clearOnUpdateListener = Buildfire.datastore.onUpdate(function (event) {

          if(event.tag==TAG_NAMES.UVO_INFO){

            WidgetHome.bgImage = event.data.design.secListBGImage;
            $rootScope.itemDetailsBackgroundImage =  WidgetHome.bgImage;
            if (!$scope.$$phase)$scope.$digest();
          }
        });

      }]);
})(window.angular);