'use strict';
(function (angular) {
    angular
        .module('skinIndexPluginWidget', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'templates/step1.html',
                    controllerAs: 'WidgetHome',
                    controller: 'WidgetHomeCtrl'
                })
                .when('/select', {
                    templateUrl: 'templates/step2.html',
                    controllerAs: 'WidgetList',
                    controller: 'WidgetListCtrl'
                })
                .when('/location', {
                    templateUrl: 'templates/step2.html',
                    controllerAs: 'WidgetLocation',
                    controller: 'WidgetLocationCtrl'
                })
                .otherwise('/');
        }])
})(window.angular);

