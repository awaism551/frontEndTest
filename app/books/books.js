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

.controller("WizardController", ["genreService", "$scope", "$location", wizardController])

.service("genreService", [genreService]);

    function wizardController(genreService, $scope, $location) {

        // console.log(genreService);
        var vm = this;
        vm.genreData = genreService.getGenreData();

        //Model
        vm.currentStep = 1;
        vm.steps = [
          {
            step: 1,
            name: "Genre",
            template: "steps/step1.html"
          },
          {
            step: 2,
            name: "Subgenre",
            template: "steps/step2.html"
          },   
          {
            step: 3,
            name: "Add new Subgenre",
            template: "steps/step3.html"
          },
          {
            step: 4,
            name: "Information",
            template: "steps/step4.html"
          }             
        ];
        vm.currentGenre = {};
        // vm.newSubgenre = {};
        vm.totalSubgenres = genreService.getLastSubgenreId() + 1;

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
            }
            if (newStep === 1) {
                vm.currentGenre = {};
            }
            vm.currentStep = newStep;
        }
        
        vm.getStepTemplate = function(){
          for (var i = 0; i < vm.steps.length; i++) {
                if (vm.currentStep == vm.steps[i].step) {
                    return vm.steps[i].template;
                }
            }
        }
        
        vm.save = function() {
            genreService.updateGenres(vm.currentGenre, vm.currentGenre.selectedGenre).then(function (msg) {
                $location.path("success");
                // alert(msg);
                // vm.gotoStep(1);
                $scope.$apply();
            }).catch(function(err) {
                alert(err);
                vm.gotoStep(1);
                $scope.$apply();
            });
        }
    }

    function genreService() {
        this.genreData = {
            "genres": [
              {
                "id": 1,
                "name": "Genre 1",
                "subgenres": [
                  {
                    "id": 10,
                    "name": "Subgenre 1",
                    "isDescriptionRequired": true
                  },
                  {
                    "id": 11,
                    "name": "Subgenre 2",
                    "isDescriptionRequired": false
                  },
                  {
                    "id": 12,
                    "name": "Subgenre 3",
                    "isDescriptionRequired": true
                  },
                  {
                    "id": 13,
                    "name": "Subgenre 4",
                    "isDescriptionRequired": true
                  },
                  {
                    "id": 14,
                    "name": "Subgenre 5",
                    "isDescriptionRequired": true
                  }
                ]
              },
              {
                "id": 2,
                "name": "Genre 2",
                "subgenres": [
                  {
                    "id": 15,
                    "name": "Subgenre 1",
                    "isDescriptionRequired": true
                  },
                  {
                    "id": 16,
                    "name": "Subgenre 2",
                    "isDescriptionRequired": false
                  },
                  {
                    "id": 17,
                    "name": "Subgenre 3",
                    "isDescriptionRequired": true
                  }
                ]
              },
              {
                "id": 3,
                "name": "Genre 3",
                "subgenres": [
                  {
                    "id": 18,
                    "name": "Subgenre 1",
                    "isDescriptionRequired": true
                  },
                  {
                    "id": 19,
                    "name": "Subgenre 2",
                    "isDescriptionRequired": true
                  },
                  {
                    "id": 20,
                    "name": "Subgenre 3",
                    "isDescriptionRequired": true
                  }
                ]
              },
              {
                "id": 4,
                "name": "Genre 4",
                "subgenres": [
                  {
                    "id": 21,
                    "name": "Subgenre 1",
                    "isDescriptionRequired": false
                  },
                  {
                    "id": 22,
                    "name": "Subgenre 2",
                    "isDescriptionRequired": false
                  },
                  {
                    "id": 23,
                    "name": "Subgenre 3",
                    "isDescriptionRequired": false
                  }
                ]
              },
              {
                "id": 5,
                "name": "Genre 5",
                "subgenres": [
                  {
                    "id": 24,
                    "name": "Subgenre 1",
                    "isDescriptionRequired": true
                  }
                ]
              }
            ]
        };

        this.updateGenres = function (genre, id) {
            for (var i = 0; i < this.genreData.genres.length; i++) {
                if (this.genreData.genres[i].id === id) {
                    for(var j = 0; j < this.genreData.genres[i].subgenres.length; j++) {
                        // update scenario
                        if (this.genreData.genres[i].subgenres[j].id === genre.currentSubgenre.id) {
                            this.genreData.genres[i].subgenres[j] = genre.currentSubgenre;
                            return Promise.resolve("Book Updated Successfully!");
                            // break;
                        }
                    }
                    if (j === this.genreData.genres[i].subgenres.length) {
                        // it means its add new book scenario as we have not found our id in already present subgenres
                        this.genreData.genres[i].subgenres.push(genre.currentSubgenre);
                        return Promise.resolve("Book Added Successfully!");
                        // break;
                    }
                }
            }
            return Promise.reject("Error");
        }

        this.getLastSubgenreId = function() {
            return this.genreData.genres[this.genreData.genres.length - 1].subgenres[this.genreData.genres[this.genreData.genres.length - 1].subgenres.length-1].id;
        }

        this.getGenreData = function() {
            return this.genreData;
        }
        
    }