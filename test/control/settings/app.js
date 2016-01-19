describe('skinIndexPluginSettings: App', function () {
    beforeEach(module('skinIndexPluginSettings'));
    var location, route, rootScope,Buildfire;
    beforeEach(inject(
        function( _$location_, _$route_, _$rootScope_ ) {
            location = _$location_;
            route = _$route_;
            rootScope = _$rootScope_;
         /*   Buildfire = {
                datastore: {
                    get: function () {
                        return true
                    },
                    insert: function () {
                        return true
                    }
                },
                messaging: {

                },
                getContext:function(){

                }
            };
         Buildfire.datastore = jasmine.createSpyObj('datastore', ['get', 'update', 'save']);
*/

        }));
    describe('Home route', function() {
        beforeEach(inject(
            function($httpBackend) {
                $httpBackend.expectGET('templates/home.html')
                    .respond(200);
                $httpBackend.expectGET('/')
                    .respond(200);
            }));

        it('should load the home page on successful load of /', function() {
            location.path('/');
            rootScope.$digest();
           // expect(route.current.controller).toBe('DesignHomeCtrl')
        });
    });
});