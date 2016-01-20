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
              if (!WidgetLocation.data.widget)
                WidgetLocation.data.widget = {};
              if (WidgetLocation.data.widget.location)
                WidgetLocation.currentLocation = WidgetLocation.data.widget.location;
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
          if (WidgetLocation.currentLocation){
            ViewStack.push({
              template: 'Weather'
            });
          }
        };

        WidgetLocation.setLocation = function (data, redirectToNext) {
          WidgetLocation.success = function (result) {
            if (result) {
              WidgetLocation.data = result.data;
              if (!WidgetLocation.data.widget)
                WidgetLocation.data.widget = {};
              if (redirectToNext) {
                ViewStack.push({
                  template: 'Weather'
                });
              }
            }
          };
          WidgetLocation.error = function (err) {
            console.error('Error while saving data:', err);
          };
          WidgetLocation.data.widget = {
            location: data.location,
            location_coordinates: data.coordinates
          };
          WidgetLocation.currentLocation = WidgetLocation.data.widget.location;
          WidgetLocation.currentCoordinates = WidgetLocation.data.widget.location_coordinates;
          DataStore.save(WidgetLocation.data, TAG_NAMES.UVO_INFO).then(WidgetLocation.success, WidgetLocation.error);
        };

        WidgetLocation.getCurrentLocation = function () {
          console.log("WidgetLocation.getCurrentLocation called");

          Modals.showMoreOptionsModal({})
            .then(function (data) {
              var locationPromise = Location.getCurrentLocation();
              locationPromise.then(function (response) {
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
                      console.log(results[1]);
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

      }]);
})(window.angular);