(function () {
    'use strict';

    angular.module('mappifyApp.service.mapService', [
            'mappifyApp.service.jassaDataSourceFactory'
        ])
        .service('mapService', mapService);

    function mapService($rootScope, $timeout, mapConfigModel, jassaDataSourceFactory) {

        var service = this;

        // public methods
        service.showMap = true;

        service.getMapConfig = function() {
            service.config =  mapConfigModel.createMapConfigFromScafoldingConfig();
            return service.config;
        };

        service.getDataSource = function() {
            service.datasource = handleJassaDataSource(service.getMapConfig(), jassaDataSourceFactory);
            return service.datasource;
        };

        service.refreshConfig = function() {
            emitMapVisibilityChangedToEvent($rootScope, false);
            emitMapConfigChanged($rootScope);
            emitDatSourceConfigChanged($rootScope);

            $timeout(function(){
                emitMapVisibilityChangedToEvent($rootScope, true);
            },1500);
        }

        // start values
        service.config = {
            viewCenter: {
                latitude:  51.339018,
                longitude: 12.3797776
            },
            zoom: 7
        };

        service.datasource = {};
        service.datasource.fetchData = function () {
            return [
            ];
        };
    }

    function emitMapVisibilityChangedToEvent($rootScope, value) {
        $rootScope.$emit('mapVisibilityChanged', value);
    }

    function emitMapConfigChanged($rootScope) {
        $rootScope.$emit('mapConfigChanged');
    }

    function emitDatSourceConfigChanged($rootScope) {
        $rootScope.$emit('mapDatSourceConfigChanged');
    }

    function handleJassaDataSource(dataSourceConfig, jassaDataSourceFactory) {

        var dataSource = jassaDataSourceFactory.create(dataSourceConfig);

        return [
            dataSource
        ];
    }
})();