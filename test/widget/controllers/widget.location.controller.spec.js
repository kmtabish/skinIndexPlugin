"use strict";
describe('Unit : Controller - WidgetLocationCtrl', function () {

// load the controller's module

    var WidgetLocationCtrl,$timeout, $q,scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack, $rootScope,uvoInfo,Modals;

    beforeEach(module('skinIndexPluginWidget'));

    beforeEach(inject(function ($controller,_$timeout_, _$q_, _Buildfire_, _DataStore_, _TAG_NAMES_, _STATUS_CODE_, _ViewStack_, _$rootScope_,_Modals_) {


        scope = _$rootScope_.$new();
        $timeout : _$timeout_
        $q = _$q_;
        uvoInfo={};
        Buildfire :_Buildfire_;
        Modals:_Modals_;

        WidgetLocationCtrl = $controller('WidgetLocationCtrl', {

            TAG_NAMES:_TAG_NAMES_,
            DB:_DataStore_,
            $scope: scope,
            Buildfire: {
                datastore: {
                    onUpdate: function () {

                    }
                }
            },
            uvoInfo:{
                data:{
                    design:{

                    }
                }
            }

        });
        DataStore=jasmine.createSpyObj('DataStore', ['get']);


    }));




    describe('Units: units should be Defined', function () {
        beforeEach(function(){
            DataStore.get.and.callFake(function(){
                var deferred = $q.defer();
                deferred.resolve ( deferred.promise);
                return deferred.promise;
            });
            scope.$digest();
        })
        it('it should pass if ContentHome is defined', function () {
            expect(WidgetLocationCtrl).toBeDefined();

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

    xdescribe(' WidgetLocationCtrl.setLocation  should be called ', function () {

        it(' WidgetLocationCtrl.setLocation should be called ', function () {
            WidgetLocationCtrl.setLocation(
            {location: "ASASAS", coordinates :[121,122]}
            );
         //   WidgetLocationCtrl={data:{widget:{location:"" ,location_coordinates:[] }}};
        });
    });

    describe(' WidgetLocationCtrl.getCurrentLocation  should be called ', function () {
        beforeEach(function(){

        })
        it(' WidgetLocationCtrl.getCurrentLocation should be called ', function () {
            WidgetLocationCtrl.getCurrentLocation({    });
        });
    });

});