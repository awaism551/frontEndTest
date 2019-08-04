'use strict';

angular.module('myApp.books')
.service("genreService", ["$http", genreService]);

function genreService($http) {
   
    var vm = this;

    this.getDataFromFile = function () {
        $http.get('data/genre.json').then(function(response) {
            vm.genreData = response.data;
        })
    }

    this.updateGenres = function (genre, id) {

        var filteredGenres = this.genreData.genres.filter(function (el) {
            return el.id === id;
        });

        if (filteredGenres.length > 0) {
            // we have found our genre 
            var filteredSubgenres = filteredGenres[0].subgenres.filter(function (el) {
                return el.id === genre.currentSubgenre.id;              
            });
            if (filteredSubgenres.length === 0) {
                // add new subgenre scenario
                filteredGenres[0].subgenres.push(genre.currentSubgenre);
            }
            return Promise.resolve();
        } else {
            // genre not found
            return Promise.reject("Error");
        }
    }

    this.getLastSubgenreId = function() {
        return vm.genreData.genres[vm.genreData.genres.length - 1].subgenres[vm.genreData.genres[vm.genreData.genres.length - 1].subgenres.length-1].id;
    }

    this.getGenreData = function() {
        return vm.genreData;
    }
    
}