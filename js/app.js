'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module("nvd3TestApp", ['nvd3ChartDirectives']);

angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
	'nvd3TestApp',
    'ngRoute',
    'ngCookies'
])

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/mycredit', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })
 
        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
		
		.when('/register', {
            controller: 'LoginController',
            templateUrl: 'modules/home/views/register.html'
        })
		
		.when('/mystrategies', {
            controller: 'ExampleCtrl',
            templateUrl: 'modules/graph/views/strategy.html'
        })
 
        .otherwise({ redirectTo: '/mycredit' });
}])
 
.run(['$rootScope','$templateCache', '$location', '$cookieStore', '$http',
    function ($rootScope,$templateCache, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
			
        $rootScope.globals = $cookieStore.get('globals') || {};
		
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
			$templateCache.removeAll();
            // redirect to login page if not logged in
			//alert($rootScope.globals.currentUser.username);
			//alert($location.path);
            if (!$rootScope.globals.currentUser) {
				
				
				$location.path('/mycredit');
            }
			else if($rootScope.globals.currentUser && $location.path()==='/mycredit')
			{
				$location.path('/');
			}
			
			
        });
    }]);
	