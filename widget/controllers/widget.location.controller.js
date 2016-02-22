'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetLocationCtrl', ['$rootScope', '$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'ViewStack', 'Location', 'Modals',
      function ($rootScope, $scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack, Location, Modals) {
        var WidgetLocation = this;

        WidgetLocation.listeners = {};

        /*Init method call, it will bring all the pre saved data*/
        WidgetLocation.init = function () {
          WidgetLocation.success = function (result) {
            console.info('init success result:', result);
            if (result) {
              WidgetLocation.data = result.data;
              var loc = JSON.parse(localStorage.getItem('LocationObject'));
              if (loc) {
                WidgetLocation.currentLocation = loc.location;
                WidgetLocation.currentCoordinates = loc.coordinates;
              }
            }
          };
          WidgetLocation.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
          };
          DataStore.get(TAG_NAMES.UVO_INFO).then(WidgetLocation.success, WidgetLocation.error);
        };

        WidgetLocation.init();

        WidgetLocation.getWeatherData = function () {
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({"address": WidgetLocation.currentLocation}, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var lat = results[0].geometry.location.lat(),
                lng = results[0].geometry.location.lng();
              WidgetLocation.setLocation({
                location: WidgetLocation.currentLocation,
                coordinates: [lat,lng]
              });
              if (JSON.parse(localStorage.getItem('LocationObject'))) {
                ViewStack.push({
                  template: 'Weather'
                });
              }
            }
            else {
              localStorage.setItem('LocationObject', null);
              console.log("Invalid location");
            }
          });
        };

        WidgetLocation.setLocation = function (data, redirectToNext) {
          if (data) {
            WidgetLocation.currentLocation = data.location;
            WidgetLocation.currentCoordinates = data.coordinates;
            localStorage.setItem('LocationObject', JSON.stringify(data));
          }

          if (redirectToNext) {
            ViewStack.push({
              template: 'Weather'
            });
          }
          console.log("++++", redirectToNext, data);
          $scope.$digest();
        };

        WidgetLocation.getCurrentLocation = function () {
          console.log("WidgetLocation.getCurrentLocation called");

          Modals.showMoreOptionsModal({})
            .then(function (data) {
              var locationPromise = Location.getCurrentLocation();
              locationPromise.then(function (response) {
                console.log("^^^^^^^^^^^^^^^", response);
                var geocoder = new google.maps.Geocoder;
                var latitude = parseFloat(response.coords.latitude);
                var longitude = parseFloat(response.coords.longitude);
                var latlng = {
                  lat: latitude,
                  lng: longitude
                };
                var latLngArray = [latitude, longitude];
                geocoder.geocode({'location': latlng}, function (results, status) {
                  if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                      WidgetLocation.currentLocation = results[1].formatted_address;
                      WidgetLocation.setLocation({
                        location: WidgetLocation.currentLocation,
                        coordinates: latLngArray
                      }, true);
                      $scope.$digest();
                    } else {
                      console.log('No results found');
                    }
                  } else {
                    console.log('Geocoder failed due to: ' + status);
                  }
                });

              }, function (err) {

              });
            }, function (err) {
              console.log(err);
            });
        };

        $scope.$on("$destroy", function () {
          console.log(">>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<");
          for (var i in WidgetLocation.listeners) {
            if (WidgetLocation.listeners.hasOwnProperty(i)) {
              WidgetLocation.listeners[i]();
            }
          }
          DataStore.clearListener();
        });

        Buildfire.datastore.onUpdate(function (event) {
          if (event.tag == TAG_NAMES.UVO_INFO) {
            console.log(">>>>>>>>>>>>>>>", event.data);
            if (event.data && event.data.design) {
              $rootScope.itemDetailsBackgroundImage = event.data.design.secListBGImage;
              if (!$rootScope.$$phase)$rootScope.$digest();
            }
          }
        });

        WidgetLocation.listeners['RESET_LOCATION'] = $rootScope.$on('RESET_LOCATION', function (e) {
          WidgetLocation.setLocation({});
        });

        WidgetLocation.listeners['BEFORE_POP'] = $rootScope.$on('BEFORE_POP', function (e) {
          Modals.dismiss();
        });

      }]);
})(window.angular);