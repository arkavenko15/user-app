angular.module('userApp')
  .controller('UserViewController', function($scope, $routeParams) {
    // Just bind the route param to pass into the <user-form> via ng-controller
    $scope.userId = $routeParams.id || 'new';
  });
