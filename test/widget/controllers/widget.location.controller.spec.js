"use strict";
describe('Unit : Controller - WidgetLocationCtrl', function () {

// load the controller's module

  var WidgetLocationCtrl, $timeout, $q, scope, Buildfire, Datastore, TAG_NAMES, STATUS_CODE, ViewStack, $rootScope, uvoInfo, Modals;

  beforeEach(module('skinIndexPluginWidget'));

  beforeEach(inject(function ($controller, _$timeout_, _$q_, _Buildfire_, _DataStore_, _TAG_NAMES_, _STATUS_CODE_, _ViewStack_, _$rootScope_, _Modals_) {

    Datastore = jasmine.createSpyObj('Datastore', ['save', 'get']);
    scope = _$rootScope_.$new(),
      $timeout = _$timeout_,
      $q = _$q_,
      uvoInfo = {},
      Buildfire = _Buildfire_,
      window.google = {
        maps: {
          Geocoder: function () {
            return {geocode: function(){

            }}
          },
          GeocoderStatus: {OK: ""}
        }
      },
      Modals = _Modals_;

    WidgetLocationCtrl = $controller('WidgetLocationCtrl', {

      TAG_NAMES: _TAG_NAMES_,
      DB: Datastore,
      $scope: scope,
      Buildfire: {
        datastore: {
          onUpdate: function () {

          }
        }
      },
      uvoInfo: {
        data: {
          design: {}
        }
      }

    });

  }));


  describe('Units: units should be Defined', function () {
    beforeEach(function () {

    });
    it('it should pass if ContentHome is defined', function () {
      Datastore.get.and.callFake(function () {
        var deferred = $q.defer();
        deferred.resolve({});
        return deferred.promise;
      });

      expect(WidgetLocationCtrl).toBeDefined();
      scope.$digest();
    });

  });


  describe('Units: units should be Defined', function () {
    it('it should pass if ContentHome is defined', function () {

      scope.$digest();
    });

  });


  describe(' WidgetLocationCtrl.getWeatherData  should be called ', function () {

    it(' WidgetLocationCtrl.getWeatherData should be called ', function () {
      WidgetLocationCtrl.getWeatherData();

    });
  });

  describe(' WidgetLocationCtrl.setLocation  should be called ', function () {
    beforeEach(function () {
      Datastore.save.and.callFake(function () {
        var defer = q.defer();
        defer.resolve({}, '');
        return defer.promise;
      });
    });
    it(' WidgetLocationCtrl.setLocation should be called ', function () {
      WidgetLocationCtrl.data = {
        widget: {}
      };
      WidgetLocationCtrl.setLocation(
        {location: "ASASAS", coordinates: [121, 122]}
      );
      scope.$digest();
    });
  });

  describe(' WidgetLocationCtrl.getCurrentLocation  should be called ', function () {
    beforeEach(function () {

    });
    it(' WidgetLocationCtrl.getCurrentLocation should be called ', function () {
      WidgetLocationCtrl.getCurrentLocation(google);
    });
  });

});