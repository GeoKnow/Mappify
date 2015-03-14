(function () {
    'use strict';

    angular.module('mappifyApp.main', [
            'ui.router',
            'mappifyApp.service.jassaDataSourceFactory',
            'mappifyApp.service.mapService'
        ])
        .controller('MainController', MainController);

    // two way data-binding can by expansive. the sidebarController, mainController
    // and the mapService use event to propagated visibility-, config and datasource-
    // changes.
    function MainController($rootScope, mapService) {

        var main = this;

        main.showMap    = mapService.showMap;
        main.config     = mapService.initialtMapConfig;
        main.datasource = mapService.initialDatasource;

        // the mapService emits change notifications if one of it's properties
        // changes. This controller listens for those events and updates
        // its values accordingly
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