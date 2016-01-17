'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'ViewStack',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack) {
        var WidgetHome = this;
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

            WidgetHome.bgImage = {background: "url("+event.data.design.secListBGImage+") background-size:cover"};
            if (!$scope.$$phase)$scope.$digest();
          }
        });





      }]);
})(window.angular);