'use strict';
(function (angular) {
    angular
        .module('skinIndexPluginDesign', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/home.html',
                    controllerAs: 'DesignHome',
                    controller: 'DesignHomeCtrl'
                  /*  resolve: {
                        uvoInfo: ['DataStore', 'TAG_NAMES', '$q', function (DataStore, TAG_NAMES, $q) {
                            var uvInfoInfo = new DataStore(TAG_NAMES.UVO_INFO)
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
                            uvInfoInfo.get().then(success, error);
                            return deferred.promise;
                        }]
                    }*/
                })
                .otherwise('/');
        }])
})(window.angular);
