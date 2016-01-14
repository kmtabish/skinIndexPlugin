'use strict';

(function (angular) {
    angular
        .module('skinIndexPluginDesign')
        .controller('DesignHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES',
            function ($scope, Buildfire, DataStore, TAG_NAMES) {
                var DesignHome = this;
                DesignHome.background = "Background Image"
            }]);
})(window.angular);