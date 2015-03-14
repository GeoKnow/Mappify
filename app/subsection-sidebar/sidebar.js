(function () {
    'use strict';

    angular.module('mappifyApp.sidebar', [
            'ui.router',

            'mappifyApp.generator',

            'mappifyApp.models.dataSourceService',
            'mappifyApp.models.exampleContainerModel',
            'mappifyApp.models.mapConfigModel',
            'mappifyApp.models.markerStyleModel',
            'mappifyApp.models.scaffoldingConfigModel',
            'mappifyApp.models.tileLayer',

            'mappifyApp.sidebar.configService',
            'mappifyApp.sidebar.dataSource',
            'mappifyApp.sidebar.download',
            'mappifyApp.sidebar.layout',
            'mappifyApp.sidebar.load',
            'mappifyApp.sidebar.mapSettings',
            'mappifyApp.sidebar.markerStyle',
            'mappifyApp.sidebar.popups',
            'mappifyApp.sidebar.sponate',
            'mappifyApp.sidebar.tileLayer',
            'mappifyApp.service.mapService'
        ])
        .controller('SidebarController', SidebarController);

    /* @ngInject */
    function SidebarController(scaffoldingConfigModel, configService, generatorService, mapService) {

        var sidebar = this;

        sidebar.availableConfigs = configService.availableConfigs;
        sidebar.getConfigModel   = scaffoldingConfigModel.getCurrentConfig;
        sidebar.generateApp      = function(name) {
            generatorService.generateApp(name).then(function(result) {

                var zip = result;

                var content = null;
                if (JSZip.support.uint8array) {
                    content = zip.generate({type : "uint8array"});
                } else {
                    content = zip.generate({type : "string"});
                }

                var blob = new Blob([content], {type: ' application/zip'});
                sidebar.zipBlobURL =  URL.createObjectURL(blob);

                sidebar.zipIsReady  = true;
            });
        };

        sidebar.zipBlobURL = null;
        sidebar.zipIsReady  = false;
        sidebar.autoRefresh = false;

        sidebar.refreshConfig = mapService.refreshConfig;

        sidebar.toggleAutoRefresh = function() {
            sidebar.autoRefresh = !sidebar.autoRefresh;
        }

    }

})();