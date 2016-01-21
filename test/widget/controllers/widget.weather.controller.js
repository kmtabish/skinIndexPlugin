"use strict";
describe('Unit : Controller - WidgetWeatherCtrl', function () {

// load the controller's module

    var WidgetWeatherCtrl,$timeout, $q,scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack, $rootScope,uvoInfo,Modals;

    beforeEach(module('skinIndexPluginWidget'));

    beforeEach(inject(function ($controller,_$timeout_, _$q_, _Buildfire_, _DataStore_, _TAG_NAMES_, _STATUS_CODE_, _ViewStack_, _$rootScope_,_Modals_) {


        scope = _$rootScope_.$new();
        $timeout : _$timeout_
        $q = _$q_;
        uvoInfo={};
        Buildfire :_Buildfire_;
        Modals:_Modals_;
        ViewStack:_ViewStack_
        WidgetWeatherCtrl = $controller('WidgetWeatherCtrl', {

            TAG_NAMES:_TAG_NAMES_,
            DB:_DataStore_,
            $scope: scope,
            Buildfire: {
                datastore: {
                    onUpdate: function () {

                    }
                },
                spinner: {
                    show: function () {

                    }
                },
                uvoInfo: {
                    data: {
                        design: {}
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
            expect(WidgetWeatherCtrl).toBeDefined();
        });

        xit(' WidgetWeatherCtrl.resetLocation should be called', function () {
            ViewStack.push({template:{}});
            WidgetWeatherCtrl.resetLocation();

        });

        it(' WidgetWeatherCtrl.error should be called', function () {

            WidgetWeatherCtrl.error({});

        });

        it(' WidgetWeatherCtrl.getWeatherData should be called', function () {
            WidgetWeatherCtrl.data={
                widget:{
                    location_coordinates:[12121,12212]
                },
                settings:{
                    apiKey:'1212121'
                }
            };
   /*         WidgetWeatherCtrl.data.widget={location_coordinates:'121'};
            WidgetWeatherCtrl.data.settings.apiKey='12121';*/
            WidgetWeatherCtrl.getWeatherData({});

        });
    });




});