(function () {
    'use strict';

    angular.module('mappifyApp.sidebar', [
            'ui.router',

            'mappifyApp.generator',

            // model and option provider
            'mappifyApp.models.dataSourceService',
            'mappifyApp.models.exampleContainerModel',
            'mappifyApp.models.mapConfigModel',
            'mappifyApp.models.markerStyleModel',
            'mappifyApp.models.mapSettingOptionModel',
            'mappifyApp.models.scaffoldingConfigModel',
            'mappifyApp.models.tileLayer',

            'mappifyApp.sidebar.configService',

            // all modals
            'mappifyApp.sidebar.dataSource',
            'mappifyApp.sidebar.download',
            'mappifyApp.sidebar.generator',
            'mappifyApp.sidebar.layout',
            'mappifyApp.sidebar.load',
            'mappifyApp.sidebar.mapSettings',
            'mappifyApp.sidebar.markerStyle',
            'mappifyApp.sidebar.popups',
            'mappifyApp.sidebar.sponate',
            'mappifyApp.sidebar.tileLayer',
            'mappifyApp.sidebar.filterDataSource',

            'mappifyApp.service.mapService'
        ])
        .controller('SidebarController', SidebarController);

    /* @ngInject */
    function SidebarController($rootScope, configService, mapService) {

        var sidebar = this;

        sidebar.availableModals     = configService.availableConfigs;
        sidebar.generatorModal      = configService.getGeneratorModal;

        sidebar.refreshConfig       = mapService.refreshConfig;
        sidebar.autoRefresh         = mapService.autoRefresh;
        sidebar.currentlyRefreshing = false;

        sidebar.toggleAutoRefresh = function() {
            sidebar.autoRefresh    = !sidebar.autoRefresh;
            mapService.autoRefresh = sidebar.autoRefresh;
        };

        $rootScope.$on('mapVisibilityChanged', function(event, visibility) {
            sidebar.currentlyRefreshing = ! visibility;
        });
    }

})();