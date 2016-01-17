'use strict';

(function (angular) {
  angular
    .module('skinIndexPluginWidget')
    .controller('WidgetLocationCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', 'ViewStack','Location','Modals',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack,Location,Modals) {
        var WidgetLocation = this;
        WidgetLocation.getWeatherData = function () {
          ViewStack.push({
            template: 'Info'
          });
        };

        WidgetLocation.setLocation = function (data) {
          WidgetLocation.data = {
            widget: {
              location: data.location,
              location_coordinates: data.coordinates
            }
          };
          WidgetLocation.currentLocation = WidgetLocation.data.widget.address.location;
          WidgetLocation.currentCoordinates = WidgetLocation.data.widget.address.location_coordinates;
          $scope.$digest();
        };

        WidgetLocation.getCurrentLocation=function(){
          console.log("WidgetLocation.getCurrentLocation called");

          Modals.showMoreOptionsModal({})
              .then(function (data) {
                var locationPromise=Location.getCurrentLocation();
                locationPromise.then(function(response){
                  var geocoder = new google.maps.Geocoder;
                  var latlng = {lat: parseFloat(response.coords.latitude), lng: parseFloat(response.coords.longitude)};
                  geocoder.geocode({'location': latlng}, function(results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                      if (results[1]) {
                        console.log(results[1].formatted_address);
                        WidgetLocation.currentLocation=results[1].formatted_address;
                        $scope.$digest();
                      } else {
                        console.log('No results found');
                      }
                    } else {
                      console.log('Geocoder failed due to: ' + status);
                    }
                  });

                },function(err){

                });
              },function(err){
                console.log(err);
              });


        }

      }]);
})(window.angular);