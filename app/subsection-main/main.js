(function () {
    'use strict';

    angular.module('mappifyApp.main', ['ui.router'])
        .controller('MainController', MainController);

    function MainController(mapConfigModel, $timeout) {

        var main = this;

        main.showMap = true;

        main.getMapConfig = function() {
            return mapConfigModel.createMapConfigFromScafoldingConfig();
        };


        main.refreshConfig = function(){
            main.showMap = false;
            main.config = main.getMapConfig();
            console.warn(main.config);
            $timeout(function(){
                main.showMap = true;
            },500)
        };


        main.config = {
            viewCenter: {
                latitude:  51.5286416,
                longitude: -0.1015987
            },
            zoom: 6
        };

        main.datasource = {};
        main.datasource.fetchData = function () {
            return [
                {
                    "key": "castles",
                    "val": [
                        {
                            "id": "http://dbpedia.org/resource/Ackland_Art_Museum",
                            "name": "Ackland Art Museum",
                            "latitude": 35.9124,
                            "longitude": -79.0544,
                            "pic": "http://commons.wikimedia.org/wiki/Special:FilePath/Ackland_Art_Museum.jpg"
                        },
                        {
                            "id": "http://dbpedia.org/resource/Audubon_House_and_Tropical_Gardens",
                            "name": "Audubon House and Tropical Gardens",
                            "latitude": 24.5583,
                            "longitude": -81.8061,
                            "pic": "http://commons.wikimedia.org/wiki/Special:FilePath/Key_West_FH010012.jpg"
                        },
                        {
                            "id": "http://dbpedia.org/resource/Buckingham_Old_Gaol",
                            "name": "Buckingham Old Gaol",
                            "latitude": 52.0005,
                            "longitude": 0.98752,
                            "pic": "http://commons.wikimedia.org/wiki/Special:FilePath/Buckingham_OldCountyGaol02.JPG"
                        },
                        {
                            "id": "http://dbpedia.org/resource/Clark_County_Heritage_Center",
                            "name": "Clark County Heritage Center",
                            "latitude": 39.9237,
                            "longitude": -83.8107,
                            "pic": "http://commons.wikimedia.org/wiki/Special:FilePath/Former_municipal_building_in_Springfield,_Ohio.jpg"
                        },
                        {
                            "id": "http://dbpedia.org/resource/Collings_Foundation",
                            "name": "Collings Foundation",
                            "latitude": 42.4033,
                            "longitude": -71.5078,
                            "pic": "http://commons.wikimedia.org/wiki/Special:FilePath/909_just_after_take_off_-Marana_Az_2012.jpg"
                        }]
                }
            ];
        }
    }

})();