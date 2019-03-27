// MODULE
var myApp = angular.module('myApp', ['ngRoute']);

// CONFIG
myApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        })
        .when('/second', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        })
        .when('/second/:param', {
            templateUrl: 'pages/second.html',
            controller: 'secondController'
        });

});

myApp.service('nameService', function () {
    this.name = 'Awais Nasir';
    this.nameLength = function () {
        return this.name.length;
    }
});

// CONTROLLERS
myApp.controller('mainController', ['$scope', '$log', 'nameService', function ($scope, $log, nameService) {
    $scope.person = {
        name: 'Tahir',
        city: 'Lahore',
        country: 'Pakistan'
    };
    $scope.originalAddress = function (person) {
        return person.city + ', ' + person.country;
    }
    $scope.name = nameService.name;
}]);

myApp.controller('secondController', ['$scope', '$log', '$routeParams', 'nameService', function ($scope, $log, $routeParams, nameService) {
    $scope.name = nameService.name;
    $scope.num = $routeParams.param || 1;
    $scope.$watch('name', function () {
        nameService.name = $scope.name;
    });
}]);

myApp.directive('searchResult', ['$log', function ($log) {
    return {
        restrict: 'AEC',
        templateUrl: 'templates/searchResult.html',
        replace: false,
        scope: {
            personObject: "=",
            originalAddressFunction: "&"
        },
        transclude: true
    };
}]);