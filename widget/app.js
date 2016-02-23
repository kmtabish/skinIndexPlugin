'use strict';
(function (angular, buildfire) {
  angular
    .module('skinIndexPluginWidget', ['ngRoute', 'skinIndexModals'])
    .config(['$routeProvider', '$compileProvider', function ($routeProvider, $compileProvider) {

      /**
       * To make href urls safe on mobile
       */
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|cdvfile|file):/);

    }])
    .directive("viewSwitcher", ["ViewStack", "$rootScope", '$compile',
      function (ViewStack, $rootScope, $compile) {
        return {
          restrict: 'AE',
          link: function (scope, elem, attrs) {
            var views = 0,
              currentView = null;
            manageDisplay();
            $rootScope.$on('VIEW_CHANGED', function (e, type, view, noAnimation) {
              if (type === 'PUSH') {
                console.log("VIEW_CHANGED>>>>>>>>");
                currentView = ViewStack.getPreviousView();

                var _el = $("<a/>").attr("href", "javascript:void(0)"),
                  oldTemplate = $('#' + currentView.template);

                oldTemplate.append(_el);

                oldTemplate.find("input[type=number],input[type=text]").each(function () {
                  $(this).blur().attr("disabled", "disabled");
                });

                $(document.activeElement).blur();
                _el.focus();

                var newScope = $rootScope.$new();
                var _newView;
                if (view.template == "Location") {
                  _newView = '<div  id="' + view.template + '" ><div class="slide content ng-enter ng-enter-active"  ng-include="\'templates/' + view.template + '.html\'"></div></div>';
                } else {
                  _newView = '<div  id="' + view.template + '" ><div class="slide infopage content" data-back-img="{{itemDetailsBackgroundImage}}" ng-include="\'templates/' + view.template + '.html\'"></div></div>';
                }
                var parTpl = $compile(_newView)(newScope);

                $(elem).append(parTpl);

                setTimeout(function () {
                  parTpl.children("div").eq(0).removeClass("ng-enter");
                  newScope.$apply();
                }, 200);
                views++;

              } else if (type === 'POP') {
                var _elToRemove = $(elem).find('#' + view.template),
                  _child = _elToRemove.children("div").eq(0);

                _child.addClass("ng-leave ng-leave-active");
                _child.one("webkitTransitionEnd transitionend oTransitionEnd", function (e) {
                  _elToRemove.remove();
                  views--;
                });

                currentView = ViewStack.getCurrentView();
                $('#' + currentView.template).find("input[type=number], input[type=text]").each(function () {
                  $(this).removeAttr("disabled");
                });

              } else if (type === 'POPALL') {
                angular.forEach(view, function (value, key) {
                  var _elToRemove = $(elem).find('#' + value.template),
                    _child = _elToRemove.children("div").eq(0);

                  if (!noAnimation) {
                    _child.addClass("ng-leave ng-leave-active");
                    _child.one("webkitTransitionEnd transitionend oTransitionEnd", function (e) {
                      _elToRemove.remove();
                      views--;
                    });
                  } else {
                    _elToRemove.remove();
                    views--;
                  }
                });
              }
              manageDisplay();
            });

            function manageDisplay() {
              if (views) {
                $(elem).removeClass("ng-hide");
              } else {
                $(elem).addClass("ng-hide");
              }
            }

          }
        };
      }])
    .filter('cropImage', [function () {
      return function (url, width, height, noDefault) {
        if (noDefault) {
          if (!url)
            return '';
        }
        return buildfire.imageLib.cropImage(url, {
          width: width,
          height: height
        });
      };
    }])
    .directive('backImg', ["$filter", "$rootScope", function ($filter, $rootScope) {
      return function (scope, element, attrs) {
        attrs.$observe('backImg', function (value) {
          var img = '';
          if (value) {
            img = $filter("cropImage")(value, $rootScope.deviceWidth, $rootScope.deviceHeight, true);
            element.attr("style", 'background:url(' + img + ') !important; background-size: cover !important;');
          }
          else {
            img = "";
            element.attr("style", 'background-color:white; background:url(' + img + ') !important; background-size: cover !important;');
          }
        });
      };
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
        }
      };
    })
    .run(['Location', '$location', '$rootScope', 'ViewStack',
      function (Location, $location, $rootScope, ViewStack) {
        buildfire.navigation.onBackButtonClick = function () {
          if (ViewStack.hasViews()) {
            ViewStack.pop();
          } else {
            buildfire.navigation.navigateHome();
          }
        };
      }])
})(window.angular, window.buildfire);