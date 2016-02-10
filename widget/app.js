'use strict';
(function (angular) {
  angular
    .module('skinIndexPluginWidget', ['ngRoute'])
    .config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {

      /**
       * To make href urls safe on mobile
       */
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|cdvfile|file):/);

    }])
    .directive('googleLocationSearch', function () {
      return {
        restrict: 'A',
        scope: {setLocationInController: '&callbackFn'},
        link: function (scope, element, attributes) {
          var options = {
            types: ['(regions)']
          };
          var autocomplete = new google.maps.places.Autocomplete(element[0], options);

          google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var location = autocomplete.getPlace().formatted_address;
            if (autocomplete.getPlace().geometry) {
              var coordinates = [autocomplete.getPlace().geometry.location.lat(), autocomplete.getPlace().geometry.location.lng()];
              scope.setLocationInController({
                data: {
                  location: location,
                  coordinates: coordinates
                }
              });
            }
          });

          setTimeout(function() {
            $("body").find(".pac-container").on("mousedown", ".pac-item", function(e) {
              console.log("*********************");
              e.preventDefault();
              // $("input").blur();
               document.activeElement.blur();
              // e.stopPropagation();
              // $(element).blur();
            });
          }, 2000);
        }
      };
    })
})(window.angular);