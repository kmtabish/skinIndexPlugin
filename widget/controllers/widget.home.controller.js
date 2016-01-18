'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'ViewStack','$rootScope',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack , $rootScope) {
        var WidgetHome = this;

        $rootScope.deviceHeight = window.innerHeight;
        $rootScope.deviceWidth = window.innerWidth;
        $rootScope.itemDetailsBackgroundImage = "";
        WidgetHome.bgImage="";
        WidgetHome.deviceHeight = window.innerHeight;
        WidgetHome.deviceWidth = window.innerWidth;

        var init = function () {
          var success = function (result) {
                WidgetHome.data = result.data;
                if (!WidgetHome.data.design)
                  WidgetHome.data.design = {};

                if (!WidgetHome.data.design.secListBGImage) {
                  $rootScope.itemListbackgroundImage = "";
                } else {
                  $rootScope.itemListbackgroundImage = WidgetHome.data.design.secListBGImage;
                }
                if (!WidgetHome.data.design.secListBGImage) {
                  $rootScope.itemDetailsBackgroundImage = "";
                } else {
                  $rootScope.itemDetailsBackgroundImage = WidgetHome.data.design.secListBGImage;
                }
              }
              , error = function (err) {
                console.error('Error while getting data', err);
              };
          DataStore.get(TAG_NAMES.UVO_INFO).then(success, error);

        };

        init();

        WidgetHome.goToLocation = function () {
          ViewStack.push({
            template: 'Location'
          });
        };

        var clearOnUpdateListener = Buildfire.datastore.onUpdate(function (event) {

          if(event.tag==TAG_NAMES.UVO_INFO){
            if(event.data.design && event.data.design.secListBGImage){
                WidgetHome.bgImage = event.data.design.secListBGImage;
                $rootScope.itemDetailsBackgroundImage =  WidgetHome.bgImage;
                if (!$scope.$$phase)$scope.$digest();
            }

          }
        });

      }]);
})(window.angular);