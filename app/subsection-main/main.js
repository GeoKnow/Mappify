(function () {
    'use strict';

    angular.module('mappifyApp.main',
        [
            'ui.router',
            'mappifyApp.service.jassaDataSourceFactory',
            'mappifyApp.service.mapService'
        ])
        .controller('MainController', MainController);

    function MainController($rootScope, mapService) {

        var main = this;

        main.showMap    = mapService.showMap;
        main.config     = mapService.config;
        main.datasource = mapService.datasource;

        $rootScope.$on('mapVisibilityChanged', function(event, visibility) {
            main.showMap = visibility;
        });

        $rootScope.$on('mapConfigChanged', function() {
            main.config = mapService.getMapConfig();
        });

        $rootScope.$on('mapDatSourceConfigChanged', function() {
            main.datasource = mapService.getDataSource();

            console.log(main.datasource);
            console.log(main.datasource);
            console.log(main.datasource);
            console.log(main.datasource);
            console.log(main.datasource);
            console.log(main.datasource);

        });
    }

})();