'use strict';

angular.module('myApp.books')
.service("genreService", [genreService]);

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