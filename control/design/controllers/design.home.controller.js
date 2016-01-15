'use strict';

(function (angular,buildfire) {
    angular
        .module('skinIndexPluginDesign')
        .controller('DesignHomeCtrl', ['COLLECTIONS','DB','$scope', '$timeout', 'Buildfire','skinIndexInfo', function (COLLECTIONS,DB,$scope, $timeout, Buildfire,skinIndexInfo) {
            var DesignHome = this,
                _data = {

                    design: {

                        secListBGImage: ""
                    }
                };
            var background = new Buildfire.components.images.thumbnail("#background");

            if (skinIndexInfo) {
                DesignHome.skinIndexInfo = skinIndexInfo;
                DesignHome._lastSaved = angular.copy(DesignHome.skinIndexInfo);
            }
            else {
                DesignHome.skinIndexInfo = {data: angular.copy(_data)};
                DesignHome._lastSaved = angular.copy(DesignHome.skinIndexInfo);
            }

            if (DesignHome.skinIndexInfo.data && DesignHome.skinIndexInfo.data.design && DesignHome.skinIndexInfo.data.design.secListBGImage) {
                background.loadbackground(DesignHome.skinIndexInfo.data.design.secListBGImage);
            }

            var tmrDelay=null;
            DesignHome._skinIndexInfo = new DB(COLLECTIONS.skinIndexInfo);

            background.onChange = function (url) {


                DesignHome.skinIndexInfo.data.design.secListBGImage = url;
                    console.log('DesignHomeCtrl bfURL saved :');
                    if (!$scope.$$phase && !$scope.$root.$$phase) {
                        $scope.$apply();
                    }

                console.log('bg change :',url);
            };



            background.onDelete = function (url) {
                DesignHome.skinIndexInfo.data.design.secListBGImage = url;
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
                            DesignHome._skinIndexInfo.update(newObj.id, newObj.data).then(function (result) {
                                DesignHome._lastSaved = angular.copy(DesignHome.skinIndexInfo);
                            }, function (err) {
                                console.log(err);
                                DesignHome.skinIndexInfo = angular.copy(DesignHome._lastSaved);
                            });
                        }, 500);
                    } else {
                        tmrDelay = $timeout(function () {
                            DesignHome._skinIndexInfo.save(DesignHome.skinIndexInfo.data).then(function success(result) {
                            }, function fail(err) {
                                console.log(err);
                            });
                        }, 500);
                    }
                }
            };


            $scope.$watch(function () {
                return DesignHome.skinIndexInfo;
            }, updatefn, true);

        }]);
})(window.angular,buildfire);