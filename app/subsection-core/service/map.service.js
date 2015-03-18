(function () {
    'use strict';

    angular.module('mappifyApp.service.mapService', [
        'mappifyApp.service.jassaDataSourceFactory',
        'mappifyApp.models.dataSourceConfigModel',
        'mappifyApp.models.mapConfigModel'
    ])
        .service('mapService', mapService);

    function mapService($rootScope, $timeout, mapConfigModel, dataSourceConfigModel, jassaDataSourceFactory) {

        var service = this;

        // public properties
        service.config = {};
        service.datasource = {};
        service.showMap = true;
        service.autoRefresh = true;
        service.initialtMapConfig = getInitialMapConfig();
        service.initialDatasource = getInitialDatasource();

        // public methods

        service.getMapConfig = getMapConfig;
        service.getDataSource = getDataSource;
        service.triggerAutoRefreshConfig = autoRefreshConfig;
        service.refreshConfig = refreshConfig;

        function getMapConfig() {
            service.config = mapConfigModel.createFromScafoldingConfig();

            return service.config;
        }

        // todo there are two cases 1) jassa 2) sponate
        function getDataSource() {
            service.datasource = handleJassaDataSource(
                dataSourceConfigModel.createFromScaffoldingConfig(),
                jassaDataSourceFactory
            );

            return service.datasource;
        }

        function autoRefreshConfig() {
            if (true === service.autoRefresh) {
                service.refreshConfig()
            }
        }

        function refreshConfig() {
            emitMapVisibilityChangedToEvent($rootScope, false);
            emitMapConfigChanged($rootScope);
            emitDatSourceConfigChanged($rootScope);

            $timeout(function () {
                emitMapVisibilityChangedToEvent($rootScope, true);
            }, 1500);
        }

        // the default map config values
        function getInitialMapConfig() {
            return {
                viewCenter: {
                    latitude: 51.339018,
                    longitude: 12.3797776
                },
                zoom: 12
            }
        };

        function getInitialDatasource() {
            return {
                fetchData: function () {
                    return [];

                }
            };
        };
    }

    function emitMapVisibilityChangedToEvent($rootScope, value) {
        $rootScope.$emit('mapVisibilityChanged', value);
    }

    function emitMapConfigChanged($rootScope) {
        $rootScope.$emit('mapConfigChanged');
    }

    function emitDatSourceConfigChanged($rootScope) {
        $rootScope.$emit('mapDataSourceConfigChanged');
    }

    function handleJassaDataSource(dataSourceConfig, factory) {

        // check if the passed factory provides a createDataSource method
        if (typeof factory.createDataSource !== 'function') {
            throw new Error('mapService: the passed datasourcefactory does not provide the required createDataSource method');
        }

        var dataSource = factory.createDataSource(dataSourceConfig);

        return [
            dataSource
        ];
    }
})();