'use strict';

(function (angular, buildfire) {
  angular.module('skinIndexPluginWidget')
    .provider('Buildfire', [function () {
      var Buildfire = this;
      Buildfire.$get = function () {
        return buildfire
      };
      return Buildfire;
    }])
    .factory("DataStore", ['Buildfire', '$q', 'STATUS_CODE', 'STATUS_MESSAGES', function (Buildfire, $q, STATUS_CODE, STATUS_MESSAGES) {
      var onUpdateListeners = [];
      return {
        get: function (_tagName) {
          var deferred = $q.defer();
          Buildfire.datastore.get(_tagName, function (err, result) {
            if (err) {
              return deferred.reject(err);
            } else if (result) {
              return deferred.resolve(result);
            }
          });
          return deferred.promise;
        },
        save: function (_item, _tagName) {
          var deferred = $q.defer();
          if (typeof _item == 'undefined') {
            return deferred.reject(new Error({
              code: STATUS_CODE.UNDEFINED_DATA,
              message: STATUS_MESSAGES.UNDEFINED_DATA
            }));
          }
          Buildfire.datastore.save(_item, _tagName, function (err, result) {
            if (err) {
              return deferred.reject(err);
            } else if (result) {
              return deferred.resolve(result);
            }
          });
          return deferred.promise;
        },
        onUpdate: function () {
          var deferred = $q.defer();
          var onUpdateFn = Buildfire.datastore.onUpdate(function (event) {
            if (!event) {
              return deferred.notify(new Error({
                code: STATUS_CODE.UNDEFINED_DATA,
                message: STATUS_MESSAGES.UNDEFINED_DATA
              }), true);
            } else {
              return deferred.notify(event);
            }
          }, true);
          onUpdateListeners.push(onUpdateFn);
          return deferred.promise;
        },
        clearListener: function () {
          onUpdateListeners.forEach(function (listner) {
            listner.clear();
          });
          onUpdateListeners = [];
        }
      }
    }])
    .factory('ViewStack', ['$rootScope', function ($rootScope) {
      var views = [];
      var viewMap = {};
      return {
        push: function (view) {
          if (viewMap[view.template]) {
            this.pop();
          } else {
            viewMap[view.template] = 1;
            views.push(view);
            $rootScope.$broadcast('VIEW_CHANGED', 'PUSH', view);
          }
          return view;
        },
        pop: function () {
          $rootScope.$broadcast('BEFORE_POP', views[views.length - 1]);
          var view = views.pop();
          delete viewMap[view.template];
          $rootScope.$broadcast('VIEW_CHANGED', 'POP', view);

          return view;
        },
        hasViews: function () {
          return !!views.length;
        },
        getPreviousView: function () {
          return views.length && views[views.length - 2] || {};
        },
        getCurrentView: function () {
          return views.length && views[views.length - 1] || {};
        },
        popAllViews: function (noAnimation) {
          $rootScope.$broadcast('BEFORE_POP', null);
          $rootScope.$broadcast('VIEW_CHANGED', 'POPALL', views, noAnimation);
          views = [];
          viewMap = {};
        }
      };
    }])
    .factory("Location", ['Buildfire', '$q', function (Buildfire, $q) {
      return {
        getCurrentLocation: function () {
          var deferred = $q.defer();
          Buildfire.geo.getCurrentPosition(
            null,
            function (err, position) {
              if (err)
                deferred.reject(err);
              else
                deferred.resolve(position);
            }
          );
          return deferred.promise;
        }
      }

    }])
    .factory('WorldWeatherApi', ['WORLD_WEATHER', '$q', '$http', 'STATUS_CODE', 'STATUS_MESSAGES',
      function (WORLD_WEATHER, $q, $http, STATUS_CODE, STATUS_MESSAGES) {
        var getWeatherData = function (coordinates, apiKey, type) {
          var deferred = $q.defer();
          if (!(coordinates && apiKey && type)) {
            deferred.reject(new Error({
              code: STATUS_CODE.UNDEFINED_DATA,
              message: STATUS_MESSAGES.UNDEFINED_DATA
            }));
          } else {
            var _url = "";
            if (type == "premium")
              _url = "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=" + apiKey + "&q=" + coordinates[0] + "," + coordinates[1] + "&num_of_days=1&format=json";
            else
              _url = "http://api.worldweatheronline.com/free/v2/weather.ashx?key=" + apiKey + "&q=" + coordinates[0] + "," + coordinates[1] + "&num_of_days=1&format=json";
            var req = {
              method: 'GET',
              url: _url
            };
            $http(req).then(function (response) {
              // this callback will be called asynchronously
              // when the response is available
              deferred.resolve(response);
            }, function (error) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
              deferred.reject(error);
            });
          }
          return deferred.promise;
        };
        return {
          getWeatherData: getWeatherData
        };
      }])
})(window.angular, window.buildfire);