var datavizApp = angular.module('datavizApp', ['ngRoute']);

datavizApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'homeController'
		})
		.when('/topmovies', {
			templateUrl: 'partials/topmovies.html',
			controller: 'topmoviesController'
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
		})
}]);

datavizApp.controller('topmoviesController', ['$scope', '$http', function($scope, $http) {
	$http.get('js/data/topmovies.json')
		.success(function(data) {
			$scope.topmovies = data;
			console.log($scope.topmovies);
		})
}]);

datavizApp.directive('topMovies', function() {
	return {
		restrict: 'E',
		replace: true,
		template: '<div id="chart"></div>',
		scope: {
			data: '=topmovies'
		},
		link: function(scope, element, attrs) {
			var data = attrs.data;

			var margin = {top: 20, right: 20, bottom: 30, left: 40},
  				width = 600 - margin.left - margin.right,
  				height = 400 - margin.top - margin.bottom;

			var x = d3.scale.ordinal()
	    	.rangeRoundBands([0, width], .1);

			var y = d3.scale.linear()
	    	.range([height, 0]);

			var xAxis = d3.svg.axis()
  			.scale(x)
  			.orient("bottom");

			var yAxis = d3.svg.axis()
  			.scale(y)
  			.orient("left");
  			// .ticks(10, "%");

			var svgContainer = d3.select('#chart')
				.append('svg')
				.attr("width", width + margin.left + margin.right)
  			.attr("height", height + margin.top + margin.bottom)
				.append("g")
  			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			d3.json('js/data/topmovies.json', function(error, data) {
				// TODO: Finding a way to call the reaplce the d3.json to attr

				x.domain(data.map(function(d) { return d.ranking; }));
  			y.domain([0, d3.max(data, function(d) { return d.rating; })]);

				svgContainer.append("g")
      		.attr("class", "x axis")
      		.attr("transform", "translate(0," + height + ")")
      		.call(xAxis);

				svgContainer.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)

				var barContainer = svgContainer.selectAll(".bar")
		      .data(data)
		    	.enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", function(d) { return x(d.ranking); })
		      .attr("width", x.rangeBand())
		      .attr("y", function(d) { return y(d.rating); })
		      .attr("height", function(d) { return height - y(d.rating); });

					svgContainer.selectAll("text.title")
						.data(data).enter()
						.append("text")
						.attr("transform", "rotate(-90)")
						.attr("y", function(d) { return x(d.ranking) + 15; })
						.attr("dx", "-24em")
						.attr("dy", ".71em")
						.text(function(d) { return d.title })
						.style("text-anchor", "start");

			});
		}
	}
});
