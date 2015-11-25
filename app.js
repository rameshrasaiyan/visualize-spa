var datavizApp = angular.module('datavizApp', ['ngRoute']);

datavizApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'homeController'
		})
});

datavizApp.controller('mainController', function($scope) {

});

datavizApp.controller('homeController', ['$scope', function($scope) {
	$scope.name = "Home Page";
}]);

datavizApp.controller('navController', [ '$scope', '$http', function($scope, $http) {
	$http.get('js/data/nav.json')
		.success(function(data) {
			$scope.navitems = data;
			console.log($scope.nav);
		})
}]);
