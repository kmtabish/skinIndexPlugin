'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetWeatherCtrl', ['$rootScope', '$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'WorldWeatherApi', 'RECOMMENDATIONS', 'ViewStack',
      function ($rootScope, $scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, WorldWeatherApi, RECOMMENDATIONS, ViewStack) {
        var WidgetWeather = this;
        WidgetWeather.invalidApiKey = false;
        WidgetWeather.invalidLocation = false;

        WidgetWeather.resetLocation = function () {
          $rootScope.$broadcast('RESET_LOCATION');
          ViewStack.pop();
        };

        /*Init method call, it will bring all the pre saved data*/
        WidgetWeather.init = function () {
          WidgetWeather.success = function (result) {
            console.info('init success result:', result);
            if (result) {
              WidgetWeather.data = result.data;
              var loc = JSON.parse(localStorage.getItem('LocationObject'));
              if (loc) {
                WidgetWeather.currentLocation = loc.location;
                WidgetWeather.currentCoordinates = loc.coordinates;
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
            Buildfire.spinner.hide();
            if (result.data && result.data.data) {
              WidgetWeather.info = result.data.data;
              console.log("Weather data ::::::::::::::::", WidgetWeather.info);
              if (WidgetWeather.info.weather && WidgetWeather.info.weather.length) {
                WidgetWeather.info.condition = RECOMMENDATIONS[WidgetWeather.info.weather[0].uvIndex].condition;
                WidgetWeather.info.title = RECOMMENDATIONS[WidgetWeather.info.weather[0].uvIndex].title;
                WidgetWeather.info.steps = RECOMMENDATIONS[WidgetWeather.info.weather[0].uvIndex].steps;
              }
              else{
                WidgetWeather.invalidLocation = true;
                setTimeout(function () {
                  WidgetWeather.invalidLocation = false;
                  $scope.$digest();
                }, 5000);
              }
            }
          };

          WidgetWeather.errorWeather = function (error) {
            Buildfire.spinner.hide();
            console.log("Error while fetching weather data ::::::::::::::::", error);
            WidgetWeather.invalidApiKey = true;
            setTimeout(function () {
              WidgetWeather.invalidApiKey = false;
              $scope.$digest();
            }, 5000);

          };
          if (WidgetWeather.currentCoordinates && WidgetWeather.data.settings.apiKey && WidgetWeather.data.settings.type) {
            Buildfire.spinner.show();
            WorldWeatherApi.getWeatherData(WidgetWeather.currentCoordinates, WidgetWeather.data.settings.apiKey, WidgetWeather.data.settings.type)
              .then(WidgetWeather.successWeather, WidgetWeather.errorWeather);
          }
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