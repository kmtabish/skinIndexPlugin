'use strict';

(function (angular) {
    angular
        .module('skinIndexPluginWidget')
        .controller('WidgetLocationCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
            function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
                var WidgetLocation = this;
            }]);
})(window.angular);