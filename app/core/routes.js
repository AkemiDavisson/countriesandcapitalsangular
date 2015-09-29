//routes.js 
//config routes for cac-app module
//loading gif timeout setup

(function(){

	'use strict';

	function config($routeProvider){
		$routeProvider

			.when('/', {
				templateUrl: 'home/views/home.html'
			})
			.when('/countries',{
				templateUrl:'countries/views/countries.html',
				controller:'countriesController',
				resolve: {
					countriesList: function(countriesService){
						return countriesService.getCountries();
					}
				}
			})
			.when('/countries/:countryCode',{
				templateUrl:'country/views/country.html',
				controller:'countryController',
				resolve: {
					country: function(countryService){
						return countryService.countryDetail();
					},
					capital: function(countryService){
						return countryService.capitalDetail();
					},
					neighbours: function(countryService){
						return countryService.countryNeighbours();
					}
				}
			})
			.otherwise({ redirectTo: '/' });
	}

	//loading gif timeout
	function run($rootScope, $location, $timeout) {
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path("/");
	    });
	    $rootScope.$on('$routeChangeStart', function() {
	        $rootScope.isLoading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function() {
	      $timeout(function() {
	        $rootScope.isLoading = false;
	      }, 1500);
	    });
	}

	//manually inject dependencies for minification
	config.$inject = ['$routeProvider'];
	run.$inject = ['$rootScope', '$location', '$timeout'];

	angular
		.module('cac-app')
		.config(config)
		.run(run);	

})();
