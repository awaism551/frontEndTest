'use strict';

angular.module('myApp.success', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/success', {
    templateUrl: 'success/success.html',
    controller: 'SuccessController as vm'
  }).when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'WizardController as vm'
  });
}])

.controller("SuccessController", ["$scope", "$location", successController]);

function successController($scope, $location) {

    var vm = this;
    vm.goBack = function () {
        $location.path("#!/view1");
    }
}