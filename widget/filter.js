/**
 * Created by vishnu on 15/1/16.
 */
(function (angular, buildfire, location) {
    angular
        .module('skinIndexPluginWidget')
    .filter('cropImage', [function () {
        return function (url, width, height, type) {
            return buildfire.imageLib.cropImage(url, {
                width: width,
                height: height
            });
        };
    }])
})(window.angular, window.buildfire, window.location);

