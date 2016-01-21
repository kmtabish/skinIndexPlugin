describe('Unit: skinIndexPluginWidget: Services', function () {
    beforeEach(module('skinIndexPluginWidget'));


    describe('Unit : Buildfire service', function () {
        var Buildfire;
        beforeEach(inject(
            function (_Buildfire_) {
                Buildfire = _Buildfire_;
            }));
        it('Buildfire should exists', function () {
            expect(Buildfire).toBeDefined();
        });
    });

    describe('Unit : DataStore Factory', function () {
        var DataStore, Buildfire, STATUS_MESSAGES, STATUS_CODE, q, TAG_NAMES, $rootScope;
        beforeEach(module('skinIndexPluginWidget', function ($provide) {
            $provide.service('Buildfire', function () {
                this.datastore = jasmine.createSpyObj('datastore', ['get', 'search', 'onUpdate', 'save']);
                this.datastore.get.and.callFake(function (_tagName, callback) {
                    if (_tagName) {
                        callback(null, 'Success');
                    } else {
                        callback('Error', null);
                    }
                });
                this.datastore.save.and.callFake(function (item, _tagName, callback) {
                    if (item, _tagName) {
                        callback(null, 'Success');
                    } else {
                        callback('Error', null);
                    }
                });
                this.datastore.search.and.callFake(function (item, _tagName, callback) {
                    if (item, _tagName) {
                        callback(null, 'Success');
                    } else {
                        callback('Error', null);
                    }
                });

                this.datastore.onUpdate.and.callFake(function (callback) {

                    callback(null, 'Success');


                });
            });
        }));
        beforeEach(module('skinIndexPluginWidget'));
        beforeEach(inject(function (_DataStore_, _STATUS_CODE_, _STATUS_MESSAGES_, _TAG_NAMES_, _$rootScope_) {
            DataStore = _DataStore_;
            STATUS_CODE = _STATUS_CODE_;
            STATUS_MESSAGES = _STATUS_MESSAGES_;
            TAG_NAMES = _TAG_NAMES_;
            $rootScope = _$rootScope_;
            Buildfire = {
                datastore: {}
            };


        }));
        it('DataStore should exist and be an object', function () {
            expect(typeof DataStore).toEqual('object');
        });
        it('DataStore.get should exist and be a function', function () {
            expect(typeof DataStore.get).toEqual('function');
        });
        it('DataStore.save should exist and be a function', function () {
            expect(typeof DataStore.save).toEqual('function');
        });

        it('DataStore.get should return error', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = err;
                };
            DataStore.get(null).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Error');
        });
        xit('DataStore.get should return success', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = err;
                };
            DataStore.get(TAG_NAMES.TIMER_INFO).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Success');
        });

        it('DataStore.save should return error', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = err;
                };
            DataStore.save( null,null, null).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Error');
        });

        xit('DataStore.save should return success', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = err;
                };
            DataStore.save( 123, TAG_NAMES.TIMER_INFO, null).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Success');
        });

        it('DataStore.onUpdate should return error', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = err;
                };
            DataStore.onUpdate().then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('');
        });

        it('DataStore.clearListener should return success', function () {

            DataStore.clearListener();

           // expect(result).toEqual('Success');
        });

        xit('DataStore.search should return error', function () {
            var result = ''
                , success = function (response) {
                    result = response;
                }
                , error = function (err) {
                    result = err;
                };
            DataStore.search( null,null, null).then(success, error);
            $rootScope.$digest();
            expect(result).toEqual('Error');
        });
    });

    describe('Unit : ViewStack service', function () {
        var ViewStack;
        beforeEach(inject(
            function (_ViewStack_) {
                ViewStack = _ViewStack_;
            }));
        it('ViewStack should exists', function () {
            expect(ViewStack).toBeDefined();
        });

        it('ViewStack.push should be called', function () {
            ViewStack.push({template:{}});
           // expect(ViewStack).toBeDefined();
        });

        it('ViewStack.pop should be called', function () {
            ViewStack.push({template:{}});
            ViewStack.pop();
            // expect(ViewStack).toBeDefined();
        });

        it('ViewStack.pop should be called', function () {
            ViewStack.push({template:{}});
            ViewStack.pop();
            // expect(ViewStack).toBeDefined();
        });

        it('ViewStack.pop should be called', function () {
            ViewStack.hasViews();
        });

        it('ViewStack.getPreviousView should be called', function () {
            ViewStack.getPreviousView();
        });

        it('ViewStack.getCurrentView should be called', function () {
            ViewStack.getCurrentView();
        });


        it('ViewStack.popAllViews should be called', function () {
            ViewStack.popAllViews({});
        });


    });

    describe('Unit : Location service', function () {
        var Location;
        beforeEach(inject(
            function (_Location_) {
                Location = _Location_;
            }));
        it('Location should exists', function () {
            expect(Location).toBeDefined();
        });

        it('Location should exists', function () {
            Location.getCurrentLocation();
        });
    });

    describe('Unit : WorldWeatherApi service', function () {
        var WorldWeatherApi,$httpBackend;
        beforeEach(inject(function($injector) {
            // Set up the mock http service responses
            $httpBackend = $injector.get('$httpBackend');
        }));
        beforeEach(inject(
            function (_WorldWeatherApi_) {
                WorldWeatherApi = _WorldWeatherApi_;
            }));
        it('WorldWeatherApi should exists', function () {
            expect(WorldWeatherApi).toBeDefined();
            console.log('###############################',WorldWeatherApi);
        });

        it('WorldWeatherApi should exists', function () {
            WorldWeatherApi.getWeatherData('1000,1000','121211','free');
            $httpBackend.expectGET('http://api.worldweatheronline.com/free/v2/weather.ashx?key=121211&q=1,0&num_of_days=1&format=json').respond(201, '');;
            //$httpBackend.expectGET('http://api.worldweatheronline.com/free/v2/weather.ashx?key=121211&q=1,0&num_of_days=1&format=json').respond(201, '');;
            $httpBackend.flush();
        });
    });


});