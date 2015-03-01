(function () {
    'use strict';

    angular.module('mappifyApp.sidebar', [
        'ui.router',
        'mappifyApp.sidebar.layout',
        'mappifyApp.sidebar.configService',
        'mappifyApp.sidebar.load',
        'mappifyApp.sidebar.download',
        'mappifyApp.sidebar.tileLayer',
        'mappifyApp.sidebar.dataSource',
        'mappifyApp.sidebar.markerStyle',
        'mappifyApp.models.dataSourceService',
        'mappifyApp.models.markerStyleModel',
        'mappifyApp.models.mapConfigModel',
        'mappifyApp.models.tileLayer',
        'mappifyApp.models.scaffoldingConfigModel'
    ])
        .controller('SidebarController', SidebarController);

    function SidebarController(scaffoldingConfigModel, configService) {

        var sidebar = this;

        sidebar.changeDataSource = configService.changeDataSource;
        sidebar.changeLayout = configService.changeLayout;
        sidebar.changeTileLayers = configService.changeTileLayers;
        sidebar.downloadConfig = configService.downloadConfig;
        sidebar.getConfigModel = scaffoldingConfigModel.getCurrentConfig;
        sidebar.loadConfig = configService.loadConfig;
        sidebar.selectMarkerStyle = configService.selectMarkerStyle;

        sidebar.selectMarkerStyle();

    }


})();