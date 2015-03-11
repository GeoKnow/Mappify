(function () {
    'use strict';

    angular.module('mappifyApp.sidebar', [
        'ui.router',
        'mappifyApp.sidebar.layout',
        'mappifyApp.sidebar.configService',
        'mappifyApp.sidebar.load',
        'mappifyApp.sidebar.sponate',
        'mappifyApp.sidebar.mapSettings',
        'mappifyApp.sidebar.popups',
        'mappifyApp.sidebar.download',
        'mappifyApp.sidebar.tileLayer',
        'mappifyApp.sidebar.dataSource',
        'mappifyApp.sidebar.markerStyle',
        'mappifyApp.models.dataSourceService',
        'mappifyApp.models.markerStyleModel',
        'mappifyApp.models.mapConfigModel',
        'mappifyApp.models.tileLayer',
        'mappifyApp.models.scaffoldingConfigModel',
        'mappifyApp.generator'

    ])
        .controller('SidebarController', SidebarController);

    function SidebarController(scaffoldingConfigModel, configService, generatorService) {

        var sidebar = this;

        sidebar.availableConfigs = configService.availableConfigs;

        sidebar.getConfigModel = scaffoldingConfigModel.getCurrentConfig;

        sidebar.generateApp = generatorService.generateApp;
    }


})();