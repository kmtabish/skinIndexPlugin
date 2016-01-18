'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetWeatherCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'WeatherUndergroundApi',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, WeatherUndergroundApi) {
        var WidgetWeather = this;

        /*Init method call, it will bring all the pre saved data*/
        WidgetWeather.init = function () {
          console.log("*******************");
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
            console.log("Weather data ::::::::::::::::", result.data.current_observation);
            if (result.data && result.data.current_observation)
              WidgetWeather.info = result.data.current_observation;
          };

          WidgetWeather.errorWeather = function (error) {
            console.log("Error while fetching weather data ::::::::::::::::", error);
          };

          WeatherUndergroundApi.getWeatherData("USA").then(WidgetWeather.successWeather, WidgetWeather.errorWeather);
        };

        WidgetWeather.init();
      }]);
})(window.angular);