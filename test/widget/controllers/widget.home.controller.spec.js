"use strict";
describe('Unit : Controller - WidgetHomeCtrl', function () {

// load the controller's module

    var WidgetHomeCtrl,$timeout, $q,scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE, ViewStack, $rootScope,uvoInfo;

    beforeEach(module('skinIndexPluginWidget'));

    beforeEach(inject(function ($controller,_$timeout_, _$q_, _Buildfire_, _DataStore_, _TAG_NAMES_, _STATUS_CODE_, _ViewStack_, _$rootScope_) {


        scope = _$rootScope_.$new();
        $timeout : _$timeout_
        $q = _$q_;
        uvoInfo={};
        Buildfire :_Buildfire_;


        WidgetHomeCtrl = $controller('WidgetHomeCtrl', {

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
            expect(WidgetHomeCtrl).toBeDefined();

        });

    });


    describe('Units: units should be Defined', function () {
        it('it should pass if ContentHome is defined', function () {

            scope.$digest();
        });

    });


    describe('WidgetHome.goToLocation  should be called ', function () {
        it('WidgetHome.goToLocation  should be called If', function () {
            WidgetHomeCtrl.data={
                settings:{
                    apikey:1234
                    }
            }
            ;
            WidgetHomeCtrl.goToLocation();
            //$timeout.flush(3000);
        });

        it('WidgetHome.goToLocation  should be called else', function () {
            WidgetHomeCtrl.data={
                settings:{
                    apikey:''
                }
            }
            ;
            WidgetHomeCtrl.goToLocation();
           // $timeout.flush();
        });

    });

});