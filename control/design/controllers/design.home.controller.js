'use strict';

(function (angular, window) {
  angular
    .module('skinIndexPluginDesign')
    .controller('DesignHomeCtrl', ['TAG_NAMES', 'DataStore', '$scope', 'Buildfire', function (TAG_NAMES, DataStore, $scope, Buildfire) {

      var DesignHome = this;
      DesignHome.masterData = null;


      DesignHome.saveData = function (newObj, tag) {
          console.log('DesignHome.saveData ---------->',newObj);
        if (typeof newObj === 'undefined') {
          return;
        }
        DesignHome.success = function (result) {
            console.log('DesignHome.saveData success---------->',result);
          console.info('Saved data result: ', result);
          updateMasterItem(newObj);
        };
        DesignHome.error = function (err) {
          console.error('Error while saving data : ', err);
        };
        DataStore.save(newObj, tag).then(DesignHome.success, DesignHome.error);
      };

      var background = new Buildfire.components.images.thumbnail("#background");

      background.onChange = function (url) {

        DesignHome.data.design.secListBGImage = url;
        DesignHome.success = function (response) {
          console.log(response)
        };
        DesignHome.error = function (error) {
          console.log(error)
        };
        DataStore.save(DesignHome, TAG_NAMES.UVO_INFO).then(DesignHome.success, DesignHome.error);
        console.log('bg change :', url);
      };


      background.onDelete = function () {
        DesignHome.data.design.secListBGImage = "";
        if (!$scope.$$phase && !$scope.$root.$$phase) {
          $scope.$apply();
        }
      };

      function updateMasterItem(data) {
          console.log('Design home updateMasterItem---->',data);
        DesignHome.masterData = angular.copy(data);
      }


      /*Init method call, it will bring all the pre saved data*/
      DesignHome.init = function () {
        DesignHome.success = function (result) {
          console.info('init success result:', result);
          if (result) {
            DesignHome.data = result.data;
              if (!DesignHome.data.design)
                  DesignHome.data.design = {};
                }
            if (DesignHome.data.design.secListBGImage)
            background.loadbackground(DesignHome.data.design.secListBGImage);

        };
        DesignHome.error = function (err) {
          console.error('Error while getting data', err);
        };
        DataStore.get(TAG_NAMES.UVO_INFO).then(DesignHome.success, DesignHome.error);
      };

      DesignHome.init();


      function isUnchanged(data) {
          console.log('Design home isUnchanged---->',data);
        return angular.equals(data, DesignHome._lastSaved);
      }

      var tmrDelay = null;
      var saveDataWithDelay = function (newObj) {
          console.log('Design home saveDataWithDelay---->',newObj);
        if (newObj) {
          if (isUnchanged(newObj)) {
            return;
          }
          if (tmrDelay) {
            clearTimeout(tmrDelay);
          }
          tmrDelay = setTimeout(function () {
              console.log('Design home saveDataWithDelay---->',newObj);
            DesignHome.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.UVO_INFO);
          }, 500);
        }
      };


      $scope.$watch(function () {
          console.log('  $scope.$watch ----------->');
        return DesignHome.data;
      }, saveDataWithDelay, true);

    }]);
})(window.angular, window);