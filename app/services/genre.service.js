'use strict';

angular.module('myApp.books')
.service("genreService", ["$http", genreService]);

function genreService($http) {
   
    var vm = this;

    this.getDataFromFile = function () {
        return Promise.resolve($http.get('data/genre.json').then(function(response) {
            vm.genreData = response.data;
        }));
    }

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
        // return Promise.resolve($http.get('data/genre.json').then(function(response) {
        //     vm.genreData = response.data;
        //     return vm.genreData.genres[vm.genreData.genres.length - 1].subgenres[vm.genreData.genres[vm.genreData.genres.length - 1].subgenres.length-1].id;
        //     // return Promise.resolve(vm.genreData.genres[vm.genreData.genres.length - 1].subgenres[vm.genreData.genres[vm.genreData.genres.length - 1].subgenres.length-1].id);
        // }));
        return vm.genreData.genres[vm.genreData.genres.length - 1].subgenres[vm.genreData.genres[vm.genreData.genres.length - 1].subgenres.length-1].id;
    }

    this.getGenreData = function() {
        return vm.genreData;
        // return Promise.resolve(vm.genreData);
        // return Promise.resolve($http.get('data/genre.json').then(function(response) {
        //     vm.genreData = response.data;
        //     return vm.genreData;
        // }));
    }
    
}