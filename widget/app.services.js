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
          var onUpdateFn = Buildfire.datastore.onUpdate(function (data) {
            if (!data) {
              return deferred.notify(new Error({
                code: STATUS_CODE.UNDEFINED_DATA,
                message: STATUS_MESSAGES.UNDEFINED_DATA
              }), true);
            } else {
              return deferred.notify(event);
            }
          });
          return deferred.promise;
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
    .factory('WeatherUndergroundApi', ['WEATHER_UNDERGROUND', '$q', '$http', 'STATUS_CODE', 'STATUS_MESSAGES',
      function (WEATHER_UNDERGROUND, $q, $http, STATUS_CODE, STATUS_MESSAGES) {
        var getWeatherData = function (location) {
          var deferred = $q.defer();
          if (!location) {
            deferred.reject(new Error({
              code: STATUS_CODE.UNDEFINED_DATA,
              message: STATUS_MESSAGES.UNDEFINED_DATA
            }));
          } else {
            var req = {
              method: 'GET',
              url: "http://api.wunderground.com/api/" + WEATHER_UNDERGROUND.API_KEY + "/conditions/q/CA/San_Francisco.json"
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