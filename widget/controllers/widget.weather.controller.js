'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetWeatherCtrl', ['$rootScope', '$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'WorldWeatherApi', 'RECOMMENDATIONS',
      function ($rootScope, $scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, WorldWeatherApi, RECOMMENDATIONS) {
        var WidgetWeather = this;
        /*Init method call, it will bring all the pre saved data*/
        WidgetWeather.init = function () {
          WidgetWeather.success = function (result) {
            console.info('init success result:', result);
            if (result) {
              WidgetWeather.data = result.data;
              if (!WidgetWeather.data.widget)
                WidgetWeather.data.widget = {};
              if (WidgetWeather.data.widget.location) {
                WidgetWeather.currentLocation = WidgetWeather.data.widget.location;
                WidgetWeather.getWeatherData();
              }
            }
          };
          WidgetWeather.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
          };
          DataStore.get(TAG_NAMES.UVO_INFO).then(WidgetWeather.success, WidgetWeather.error);
        };

        WidgetWeather.getWeatherData = function () {
          WidgetWeather.successWeather = function (result) {
            if (result.data && result.data) {
              WidgetWeather.info = result.data.data;
              console.log("Weather data ::::::::::::::::", WidgetWeather.info);
              WidgetWeather.info.condition = RECOMMENDATIONS[WidgetWeather.info.weather[0].uvIndex].condition;
              WidgetWeather.info.title = RECOMMENDATIONS[WidgetWeather.info.weather[0].uvIndex].title;
              WidgetWeather.info.steps = RECOMMENDATIONS[WidgetWeather.info.weather[0].uvIndex].steps;
            }
          };

          WidgetWeather.errorWeather = function (error) {
            console.log("Error while fetching weather data ::::::::::::::::", error);
          };
          if (WidgetWeather.data.widget.location_coordinates)
            WorldWeatherApi.getWeatherData(WidgetWeather.data.widget.location_coordinates).then(WidgetWeather.successWeather, WidgetWeather.errorWeather);
        };

        WidgetWeather.init();

        Buildfire.datastore.onUpdate(function (event) {
          if (event.tag == TAG_NAMES.UVO_INFO) {
            console.log(">>>>>>>>>>>>>>>", event.data);
            if (event.data && event.data && event.data.design) {
              $rootScope.itemDetailsBackgroundImage = event.data.design.secListBGImage;
              if (!$rootScope.$$phase)$rootScope.$digest();
            }
          }
        });
      }]);
})(window.angular);