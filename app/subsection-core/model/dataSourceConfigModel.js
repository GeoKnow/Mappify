(function () {
    'use strict';

    angular.module('mappifyApp.models.dataSourceConfigModel', [
            'mappifyApp.models.scaffoldingConfigModel'
        ])
        .service('dataSourceConfigModel', dataSourceConfigModel);

    // the map dataSource Config
    function dataSourceConfigModel(scaffoldingConfigModel) {

        var dataSourceConfig = this;
        dataSourceConfig.createFromScaffoldingConfig = createFromScaffoldingConfig;

        function createFromScaffoldingConfig() {

            var config = scaffoldingConfigModel.getCurrentConfig();

            if (! config.hasOwnProperty('dataSources') && _.isArray(config.dataSources)) {
                throw new Error('dataSourceConfigModel: the config contains no dataSource definitions');
            }

            if (1 === config.dataSources.length) {
                return handleSingleDataSource(config.dataSources[0]);
            }

            throw new Error('dataSourceConfigModel: currently supports only single dataSource definitions');
        }

        function handleSingleDataSource(firstDataSource) {

            if (! firstDataSource.hasOwnProperty('service')) {
                throw new Error('dataSourceConfigModel: the config contains not data source service');
            }

            var data = {};

            data.concept = firstDataSource.concept;

            data.graphUriSet = firstDataSource.service.defaultGraphUris;
            data.service     = firstDataSource.service.serviceUrl;
            data.geoMapType  = firstDataSource.service.geoMapFactory;

            return data;
        }

    }
})();