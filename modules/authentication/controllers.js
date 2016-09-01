'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
	
       // AuthenticationService.ClearCredentials();
 
        $scope.login = function () {
            $scope.dataLoading = true;
		
				
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
			
                if(response.response=='success') {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
				
                    $location.path('/');
                } 
				else
				{
                    $scope.error = 'Please Login Again';
				}
                  
              
            });
        };
		
		$scope.register = function () {
            AuthenticationService.Register($scope.email, $scope.firstName,$scope.lastName,$scope.password ,$scope.phone,function(response) {
				console.log(response);
                if(response.response=='success') {
                    $scope.success ='Successfully registered';
					
                    
                } else {
					 $scope.error ='There was a problem registering';
                    //$scope.error = response.message;
                   // $scope.dataLoading = false;
                }
            });
		
                   
               
        };
		
		
		
    }]);