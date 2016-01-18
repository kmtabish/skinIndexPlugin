'use strict';

(function (angular,window) {
    angular
        .module('skinIndexPluginDesign')
        .controller('DesignHomeCtrl', ['TAG_NAMES','DataStore','$scope', '$timeout', 'Buildfire','uvoInfo', function (TAG_NAMES,DataStore,$scope, $timeout, Buildfire,uvoInfo) {
            var DesignHome = this,
                _data = {

                    design: {

                        secListBGImage: ""
                    }
                };
            var background = new Buildfire.components.images.thumbnail("#background");

            if (uvoInfo.data.design) {
                DesignHome.uvoInfo = uvoInfo;
                DesignHome._lastSaved = angular.copy(DesignHome.uvoInfo);
            }
            else {
                DesignHome.uvoInfo = {data: angular.copy(_data)};
                DesignHome._lastSaved = angular.copy(DesignHome.uvoInfo);
            }

            if (DesignHome.uvoInfo.data && DesignHome.uvoInfo.data.design && DesignHome.uvoInfo.data.design.secListBGImage) {
                background.loadbackground(DesignHome.uvoInfo.data.design.secListBGImage);
            }

            var tmrDelay=null;
            DesignHome._uvoInfo = new DataStore(TAG_NAMES.UVO_INFO);

            background.onChange = function (url) {


                DesignHome.uvoInfo.data.design.secListBGImage = url;
                console.log('DesignHomeCtrl bfURL saved :');
                if (!$scope.$$phase && !$scope.$root.$$phase) {
                    $scope.$apply();
                }

                console.log('bg change :',url);
            };



            background.onDelete = function (url) {
                DesignHome.uvoInfo.data.design.secListBGImage = url;
                if (!$scope.$$phase && !$scope.$root.$$phase) {
                    $scope.$apply();
                }
                console.log('bg deleted :',url);
            };

            function isUnchanged(data) {
                return angular.equals(data, DesignHome._lastSaved);
            }

            var updatefn = function (newObj) {
                if (newObj) {
                    if (tmrDelay) {
                        clearTimeout(tmrDelay);
                    }
                    if (isUnchanged(newObj)) {
                        return;
                    }
                    if (newObj.id) {
                        tmrDelay = $timeout(function () {
                            DesignHome._uvoInfo.update(newObj.id, newObj.data).then(function (result) {
                                DesignHome._lastSaved = angular.copy(DesignHome.uvoInfo);
                            }, function (err) {
                                console.log(err);
                                DesignHome.uvoInfo = angular.copy(DesignHome._lastSaved);
                            });
                        }, 500);
                    } else {
                        tmrDelay = $timeout(function () {
                            DesignHome._uvoInfo.save(DesignHome.uvoInfo.data).then(function success(result) {
                            }, function fail(err) {
                                console.log(err);
                            });
                        }, 500);
                    }
                }
            };


            $scope.$watch(function () {
                return DesignHome.uvoInfo;
            }, updatefn, true);

        }]);
})(window.angular,window);