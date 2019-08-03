'use strict';

angular.module('myApp.books', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/books', {
    templateUrl: 'books/books.html',
    controller: 'WizardController as vm'
  }).when('/success', {
    templateUrl: 'success/success.html',
    controller: 'SuccessController as vm'
  });
}])

.run(['genreService', function(genreService) {
    genreService.getDataFromFile();
}])

.controller("WizardController", ["genreService", "$scope", "$location", wizardController])

function wizardController(genreService, $scope, $location) {

    var vm = this;

    vm.genreData = genreService.getGenreData();
    vm.totalSubgenres = genreService.getLastSubgenreId() + 1;

    //Model
    vm.currentStep = 1;
    vm.steps = [{
        step: 1,
        name: "Genre",
        template: "steps/step1.html"
        }, {
        step: 2,
        name: "Subgenre",
        template: "steps/step2.html"
        }, {
        step: 3,
        name: "Add new Subgenre",
        template: "steps/step3.html"
        }, {
        step: 4,
        name: "Information",
        template: "steps/step4.html"
    }];
    vm.currentGenre = {};

    vm.selectGenre = function(genre) {
        vm.currentGenre.selectedGenre = genre.id;
        vm.currentGenre.currentSubgenres = genre.subgenres;
    }

    vm.selectSubgenre = function(subgenre) {
            vm.currentGenre.currentSubgenre = subgenre;
    }

    vm.gotoStep = function(newStep) {
        if(newStep === 4) {
            vm.currentGenre.currentSubgenre.id = ++vm.totalSubgenres;
        }
        if (newStep === 3 && !angular.equals(vm.currentGenre.currentSubgenre, {})) {
            newStep++;
            vm.skippedStep = true;
        }
        if (newStep === 1) {
            vm.currentGenre = {};
        }
        vm.currentStep = newStep;
    }
    
    vm.getStepTemplate = function() {
        for (var i = 0; i < vm.steps.length; i++) {
            if (vm.currentStep == vm.steps[i].step) {
                return vm.steps[i].template;
            }
        }
    }
    
    vm.save = function() {
        genreService.updateGenres(vm.currentGenre, vm.currentGenre.selectedGenre).then(function (msg) {
            $location.path("success");
            $scope.$apply();
        }).catch(function(err) {
            alert(err);
            vm.gotoStep(1);
            $scope.$apply();
        });
    }
}