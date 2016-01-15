'use strict';

(function (angular) {
    angular
        .module('skinIndexPluginWidget')
        .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
            function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
                var WidgetHome = this;
            }]);
})(window.angular);