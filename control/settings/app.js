'use strict';
(function (angular) {
  angular
    .module('skinIndexPluginSettings', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'templates/home.html',
          controllerAs: 'SettingsHome',
          controller: 'SettingsHomeCtrl'
        })
        .otherwise('/');
    }])
})(window.angular);
