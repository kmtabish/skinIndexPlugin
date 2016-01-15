'use strict';
(function (angular) {
    angular
        .module('skinIndexPluginDesign', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/home.html',
                    controllerAs: 'DesignHome',
                    controller: 'DesignHomeCtrl',
                    resolve: {
                        skinIndexInfo: ['DB', 'COLLECTIONS', '$q', function (DB, COLLECTIONS, $q) {
                            var skinIndexInfo = new DB(COLLECTIONS.skinIndexInfo)
                                , deferred = $q.defer()
                                , success = function (result) {
                                    if (Object.keys(result.data).length > 0) {
                                        deferred.resolve(result);
                                    }
                                    else {
                                        deferred.resolve(null);
                                    }
                                }
                                , error = function (err) {
                                    deferred.resolve(null);
                                };
                            skinIndexInfo.get().then(success, error);
                            return deferred.promise;
                        }]
                    }
                })
                .otherwise('/');
        }])
})(window.angular);
