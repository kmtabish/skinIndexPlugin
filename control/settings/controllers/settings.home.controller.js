'use strict';

(function (angular, window) {
  angular
    .module('skinIndexPluginSettings')
    .controller('SettingsHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
        var SettingsHome = this;
        SettingsHome.masterData = null;

        function updateMasterItem(data) {
          SettingsHome.masterData = angular.copy(data);
        }

        function isUnchanged(data) {
          return angular.equals(data, SettingsHome.masterData);
        }

        SettingsHome.gotToPage = function () {
          window.open('http://www.worldweatheronline.com/api/', '_blank');
        };

        SettingsHome.saveData = function (newObj, tag) {
          if (typeof newObj === 'undefined') {
            return;
          }
          SettingsHome.success = function (result) {
            console.info('Saved data result: ', result);
            updateMasterItem(newObj);
          };
          SettingsHome.error = function (err) {
            console.error('Error while saving data : ', err);
          };
          DataStore.save(newObj, tag).then(SettingsHome.success, SettingsHome.error);
        };

        /*Init method call, it will bring all the pre saved data*/
        SettingsHome.init = function () {
          SettingsHome.success = function (result) {
            console.info('init success result:', result);
            if (result) {
              SettingsHome.data = result.data;
              if (!SettingsHome.data.settings)
                SettingsHome.data.settings = {};
            }
          };
          SettingsHome.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
            else if (err && err.code === STATUS_CODE.NOT_FOUND) {
              SettingsHome.saveData(JSON.parse(angular.toJson(SettingsHome.data)), TAG_NAMES.UVO_INFO);
            }
          };
          DataStore.get(TAG_NAMES.UVO_INFO).then(SettingsHome.success, SettingsHome.error);
        };
        SettingsHome.init();

        /*
         * create an artificial delay so api isnt called on every character entered
         * */
        var tmrDelay = null;
        var saveDataWithDelay = function (newObj) {
          if (newObj) {
            if (isUnchanged(newObj)) {
              return;
            }
            if (tmrDelay) {
              clearTimeout(tmrDelay);
            }
            tmrDelay = setTimeout(function () {
              SettingsHome.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.UVO_INFO);
            }, 500);
          }
        };

        $scope.$watch(function () {
          return SettingsHome.data;
        }, saveDataWithDelay, true);

      }]);
})(window.angular, window);