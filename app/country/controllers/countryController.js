//countryController.js
//loads country detail page

(function(){

	'use strict';

	function countryController($scope, country, capital, neighbours){

		//country service
		$scope.country = country.geonames[0];

		//capital service
		$scope.capital = capital.geonames[0];

		//neighbours service
		$scope.neighbours = neighbours.geonames;
	}

	//manually inject dependencies for minification
	countryController.$inject = ['$scope', 'country', 'capital', 'neighbours'];

	angular
		.module('cac-app')
		.controller('countryController', countryController);

})();