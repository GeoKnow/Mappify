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
            $timeout(function(){
                main.showMap = true;
            },500);
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
            ];
        };
    }

})();