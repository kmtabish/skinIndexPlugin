'use strict';

(function (angular,window) {
    angular
        .module('skinIndexPluginDesign')
        .controller('DesignHomeCtrl', ['TAG_NAMES','DataStore','$scope', '$timeout', 'Buildfire', function (TAG_NAMES,DataStore,$scope, $timeout, Buildfire) {

            var DesignHome = this;
            DesignHome.masterData = null;

            var background = new Buildfire.components.images.thumbnail("#background");

            background.onChange = function (url) {

                DesignHome.data.design.secListBGImage = url;
                DesignHome.success=function(response){
                    console.log(response)
                }
                DesignHome.error=function(error){
                    console.log(error)
                }
                DataStore.save(DesignHome, TAG_NAMES.UVO_INFO).then(DesignHome.success, DesignHome.error);
                console.log('bg change :',url);
            };



            background.onDelete = function () {
                DesignHome.data.design.secListBGImage = "";
                if (!$scope.$$phase && !$scope.$root.$$phase) {
                    $scope.$apply();
                }

                DesignHome.success=function(response){
                    console.log(response)
                }
                DesignHome.error=function(error){
                    console.log(error)
                }
                DataStore.save(DesignHome, TAG_NAMES.UVO_INFO).then(DesignHome.success, DesignHome.error);
                // console.log('bg deleted :',url);
            };

            function updateMasterItem(data) {
                DesignHome.masterData = angular.copy(data);
            }


            /*Init method call, it will bring all the pre saved data*/
            DesignHome.init = function () {
                DesignHome.success = function (result) {
                    console.info('init success result:', result);
                    if (result) {
                        DesignHome.data = result.data;
                        background.loadbackground(DesignHome.data.design.secListBGImage);
                        if (!DesignHome.data.design)
                            DesignHome.data.design = {};
                    }
                };
                DesignHome.error = function (err) {
                    if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                        console.error('Error while getting data', err);
                    }
                    else if (err && err.code === STATUS_CODE.NOT_FOUND) {
                        DesignHome.saveData(JSON.parse(angular.toJson(DesignHome.data)), TAG_NAMES.UVO_INFO);
                    }
                };
                DataStore.get(TAG_NAMES.UVO_INFO).then(DesignHome.success, DesignHome.error);
            };

            DesignHome.init();


            function isUnchanged(data) {
                return angular.equals(data, DesignHome._lastSaved);
            }

            DesignHome.saveData = function (newObj, tag) {
                if (typeof newObj === 'undefined') {
                    return;
                }
                DesignHome.success = function (result) {
                    console.info('Saved data result: ', result);
                    updateMasterItem(newObj);
                };
                DesignHome.error = function (err) {
                    console.error('Error while saving data : ', err);
                };
                DataStore.save(newObj, tag).then(DesignHome.success, DesignHome.error);
            };



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
                        DesignHome.saveData(JSON.parse(angular.toJson(newObj)), TAG_NAMES.UVO_INFO);
                    }, 500);
                }
            };


            $scope.$watch(function () {
                return DesignHome.data;
            }, saveDataWithDelay, true);

        }]);
})(window.angular,window);