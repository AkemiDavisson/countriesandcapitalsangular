var $location, 
	$rootScope, 
	$httpBackend, 
	$rootElement, 
	$compile,
	countriesList,
	controller,
	myScope;


	//beforeEach to instantiate module
beforeEach(function(){

	module('cac-app');
	module('geonamesApiLibrary');

	//inject angular services and module constants & geonamesRequestService
	inject(function(_$rootScope_, _$httpBackend_, _$location_, _$rootElement_, 
		_$compile_,$controller,_countriesService_) {
		
		$rootScope = _$rootScope_;
		myScope = _$rootScope_.$new();
		$httpBackend = _$httpBackend_;
		$location = _$location_;
		$rootElement = _$rootElement_;
		$compile = _$compile_;
		controller = $controller('countriesController', {
			$scope: myScope,
			$location: $location,
			countriesList: _countriesService_
		});
	});	

});


describe("/countries route", function() {
	it('should load page and controller', function() {
		//$compile service to mock the HTML ng-view
		var view = $compile('<div ng-view></div>')($rootScope),
			countriesUrl = 'http://api.geonames.org/countryInfo?type=JSON&username=adavis';

		$rootElement.append(view);
		//mock countries view
		$httpBackend.when('GET', '/countries.html').response('...');
		//mock http countries service get
		$httpBackend.when('GET', countriesUrl).respond({});
		
		$rootScope.$apply(function(){
			$location.path('/countries');
		});
		
		expect(myScope.countries).toBe({});
	})
})