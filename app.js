// MODULE
var myApp = angular.module('myApp', ['ngRoute']);

// CONFIG
myApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'pages/main.html',
            controller: 'mainController'
        });
});

// SERVICE
myApp.service('genreService', function () {
    
});

// CONTROLLERS
myApp.controller('mainController', ['$scope', 'genreService', function ($scope, genreService) {
    
}]);