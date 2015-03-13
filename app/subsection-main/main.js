(function () {
    'use strict';

    angular.module('mappifyApp.main', [
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

        // the mapService emits change notifications if one of it's properties
        // changes. This controller listens for those events and updates
        // it values accordingly
        $rootScope.$on('mapVisibilityChanged', function(event, visibility) {
            main.showMap = visibility;
        });

        $rootScope.$on('mapConfigChanged', function() {
            main.config = mapService.getMapConfig();
        });

        $rootScope.$on('mapDataSourceConfigChanged', function() {
            main.datasource = mapService.getDataSource();



        });
    }

})();