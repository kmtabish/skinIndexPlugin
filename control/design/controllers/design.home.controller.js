'use strict';

(function (angular,window) {
    angular
        .module('skinIndexPluginDesign')
        .controller('DesignHomeCtrl', ['TAG_NAMES','DataStore','$scope', 'Buildfire', function (TAG_NAMES,DataStore,$scope, Buildfire) {

             var DesignHome = this;
             DesignHome.masterData = null;
             DesignHome.data={

                    design :{


                }
            };


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
            };

            function updateMasterItem(data) {
                DesignHome.masterData = angular.copy(data);
            }


            /*Init method call, it will bring all the pre saved data*/
            DesignHome.init = function () {
                DesignHome.success = function (result) {
                    console.info('init success result:', result);
                    if (result && result.data && result.data.design && result.data.design.secListBGImage) {
                        DesignHome.data = result.data;
                        background.loadbackground(DesignHome.data.design.secListBGImage);
                        if (!DesignHome.data.design)
                            DesignHome.data.design = {};
                    }
                };
                DesignHome.error = function (err) {
                        console.error('Error while getting data', err);
                };
                DataStore.get(TAG_NAMES.UVO_INFO).then(DesignHome.success, DesignHome.error);
            };

            DesignHome.init();


            function isUnchanged(data) {
                return angular.equals(data, DesignHome._lastSaved);
            }

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