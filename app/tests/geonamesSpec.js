//Tests for geonamesApiLibrary.geonamesRequest factory
var $rootscope, 
	$httpBackend, 
	geonamesPrefix, 
	geonamesUser, 
	countriesEndpoint, 
	searchEndPoint, 
	neighboursEndpoint, 
	geonamesRequest,
    
	//mock array country data
	countries = [{
        "countryCode": "AU",
        "countryName": "Australia",
        "capital": "Canberra",
        "areaInSqKm" : "7686850.0",
        "population" : "21515754",
        "geonameId" : "2077456",
        "capitalPopulation" : "367752"
    },
    {
        "countryCode": "GB",
        "countryName": "United Kingdom",
        "capital": "London",
        "areaInSqKm" : "244820.0",
        "population" : "62348447",
        "geonameId" : "2635167",
        "capitalPopulation" : "7556900"
    }],
    neighbours =[{
		'countryCode': "DZ",
		'countryId': "2589581",
		'countryName': "Algeria",
		'geonameId': '2589581',
		'lat': "28",
		'lng': "3",
		'name': "Algeria",
		'population': '34586184',
		'toponymName': 'People’s Democratic Republic'
	},
	{
		'countryCode': "BF",
		'countryId': "2361809",
		'countryName': "Burkina Faso",
		'geonameId': '2361809',
		'lat': "12.5",
		'lng': "-1.6667",
		'name': "Burkina Faso",
		'population': '16241811',
		'toponymName': 'Burkina Faso'

    }],
    countryCode = 'country=GB';

//beforeEach to instantiate module
beforeEach(function(){
	module('geonamesApiLibrary');

	//inject angular services and module constants & geonamesRequestService
	inject(function(_$rootScope_, _$httpBackend_, _GEONAMES_API_PREFIX_, _GEONAMES_USER_, 
		_COUNTRIES_ENDPOINT_, _SEARCH_ENDPOINT_, _NEIGHBOURS_ENDPOINT_, _geonamesRequest_) {
		
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;
		geonamesRequest = _geonamesRequest_;
		geonamesPrefix = _GEONAMES_API_PREFIX_;
		geonamesUser = _GEONAMES_USER_;
		countriesEndpoint = _COUNTRIES_ENDPOINT_;
		searchEndPoint = _SEARCH_ENDPOINT_;
		neighboursEndpoint = _NEIGHBOURS_ENDPOINT_;
	});	

});

describe('geonamesRequest', function(){

	it('should return array of countries', function(){

		//build api url from injected constants from geoNames Module
		var countriesUrl = geonamesPrefix + countriesEndpoint + '?type=JSON&username='+ geonamesUser;

		//mock http get and response
		$httpBackend.expect('GET', countriesUrl).respond(countries);

		geonamesRequest(countriesEndpoint).then(function(result){
			expect(result.length).toEqual(1);
		});

		//trigger angular's digest cycle (how & when angular updates models and scope)
		$rootScope.$digest();
		//.flush() ensures the HTTP mock code is triggered
		$httpBackend.flush();

	});

	it('should return a single country', function(){

		var	params = {
				country: 'GB'
			},

			//build api url from injected constants from geoNames Module
			countryUrl = geonamesPrefix + countriesEndpoint + '?' + countryCode + '&type=JSON&username=' + geonamesUser;

		//mock http get and response
		$httpBackend.expect('GET', countryUrl).respond(countries[1]);

		geonamesRequest(countriesEndpoint, params).then(function(result){
			expect(result.countryCode).toEqual('GB');
		});

		//trigger angular's digest cycle (how & when angular updates models and scope)
		$rootScope.$digest();
		//.flush() ensures the HTTP mock code is triggered
		$httpBackend.flush();

	});

	it('should return a country capital population', function(){

		var params = {
					country: 'GB',
					q: 'capital',
					style: 'FULL'
				},

			capitalUrl = geonamesPrefix + searchEndPoint + '?' + countryCode + '&q=capital&style=FULL&type=JSON&username=' + geonamesUser;

		//mock http get and response
		$httpBackend.expect('GET', capitalUrl).respond(countries[1]);

		geonamesRequest(searchEndPoint, params).then(function(result){
			expect(result.capitalPopulation).toEqual('7556900');
		});

		//trigger angular's digest cycle (how & when angular updates models and scope)
		$rootScope.$digest();
		//.flush() ensures the HTTP mock code is triggered
		$httpBackend.flush();
	});

	it('should return a list of neighbours', function(){

		var params = {
					country: 'GB'
				},

			capitalUrl = geonamesPrefix + neighboursEndpoint + '?' + countryCode + '&type=JSON&username=' + geonamesUser;

		//mock http get and response
		$httpBackend.expect('GET', capitalUrl).respond(neighbours);

		geonamesRequest(neighboursEndpoint, params).then(function(result){
			expect(result.length).toEqual(2);
		});

		//trigger angular's digest cycle (how & when angular updates models and scope)
		$rootScope.$digest();
		//.flush() ensures the HTTP mock code is triggered
		$httpBackend.flush();
	});
});