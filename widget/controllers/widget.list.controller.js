'use strict';

(function (angular) {
    angular
        .module('skinIndexPluginWidget')
        .controller('WidgetListCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
            function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
                var WidgetList = this;
            }]);
})(window.angular);