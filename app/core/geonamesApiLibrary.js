//define geonames api structure 
//.constant() for api values
//.factory() to register services that use the api endpoints


//shared service builds the request object
(function (){

	'use strict';

	function geonamesRequest($http, $q, GEONAMES_API_PREFIX, GEONAMES_USER) {
		return function(endpoint, params) {

			params = params || {};

			var defer = $q.defer();

			//add username and type to params object
			angular.extend(params, {
				username: GEONAMES_USER,
				type: 'JSON'
			});		

			$http.get(GEONAMES_API_PREFIX + endpoint, {
				params: params, 
				cache: true
			})
			.success(function(data){
				defer.resolve(data);
			});

			return defer.promise;
		};
	}

	//get list countries
	function countriesService(geonamesRequest, COUNTRIES_ENDPOINT){
		return {
			getCountries: function(){
				return geonamesRequest(COUNTRIES_ENDPOINT);
			}
		};

	}

	//get country detail, capital pop and neighbors
	function countryService($http, $route, geonamesRequest, COUNTRIES_ENDPOINT, SEARCH_ENDPOINT, NEIGHBOURS_ENDPOINT){
		return {
			countryDetail: function(){
				var params = {
					country: $route.current.params.countryCode
				};
				return geonamesRequest(COUNTRIES_ENDPOINT, params);
			},

			capitalDetail: function(){

				var params = {
					country: $route.current.params.countryCode,
					q: 'capital',
					style: 'FULL'
				};

				return	geonamesRequest(SEARCH_ENDPOINT, params);
			},

			countryNeighbours: function(){

				var params = {
					country: $route.current.params.countryCode
				};

				return geonamesRequest(NEIGHBOURS_ENDPOINT, params);
			}

		};
	}

	//manually inject dependencies for minification
	geonamesRequest.$inject = ['$http', '$q', 'GEONAMES_API_PREFIX', 'GEONAMES_USER'];
	countriesService.$inject = ['geonamesRequest', 'COUNTRIES_ENDPOINT'];
	countryService.$inject = ['$http', '$route', 'geonamesRequest', 'COUNTRIES_ENDPOINT', 'SEARCH_ENDPOINT', 'NEIGHBOURS_ENDPOINT'];
	
	angular
	.module('geonamesApiLibrary', [])
	.constant('GEONAMES_API_PREFIX', 'http://api.geonames.org')
	.constant('COUNTRIES_ENDPOINT', '/countryInfo')
	.constant('SEARCH_ENDPOINT', '/search')
	.constant('NEIGHBOURS_ENDPOINT', '/neighbours')
	.constant('GEONAMES_USER', 'adavis')
	.factory('geonamesRequest', geonamesRequest)
	.factory('countriesService', countriesService)
	.factory('countryService', countryService);

})();