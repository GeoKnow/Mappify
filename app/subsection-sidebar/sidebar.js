(function () {
    'use strict';

    angular.module('mappifyApp.sidebar', [
            'ui.router',
            'mappifyApp.sidebar.layout',
            'mappifyApp.sidebar.load',
            'mappifyApp.sidebar.download',
            'mappifyApp.sidebar.tileLayer',
            'mappifyApp.sidebar.dataSource',
            'mappifyApp.sidebar.markerStyle',
            'mappifyApp.models.dataSourceService',
            'mappifyApp.models.markerStyleModel',
            'mappifyApp.models.tileLayer',
            'mappifyApp.models.scaffoldingConfigModel'
        ])
        .factory('configService', configService)
        .factory('mapConfigModel', mapConfigModel)
        .controller('SidebarController', SidebarController);

    function SidebarController(configService, scaffoldingConfigModel) {

        var sidebar = this;

        sidebar.changeDataSource  = configService.changeDataSource;
        sidebar.changeLayout      = configService.changeLayout;
        sidebar.changeTileLayers  = configService.changeTileLayers;
        sidebar.downloadConfig    = configService.downloadConfig;
        sidebar.getConfigModel    = scaffoldingConfigModel.getCurrentConfig;
        sidebar.loadConfig        = configService.loadConfig;
        sidebar.selectMarkerStyle = configService.selectMarkerStyle;
    }

    // the map config
    function mapConfigModel(scaffoldingConfigModel) {

        var data = {};

        var mapConfig = {};
        mapConfig.createMapConfigFromScafoldingConfig = createMapConfigFromScaffoldingConfig;

        return mapConfig;

        function createMapConfigFromScaffoldingConfig() {

            // todo - move te separate service
            var currentScaffoldingConfig = scaffoldingConfigModel.getCurrentConfig();
            data.zoom = currentScaffoldingConfig.layout.zoom;
            data.viewCenter = currentScaffoldingConfig.layout.viewCenter;

            // next

            return data;
        }
    }

    function configService($modal, scaffoldingConfigModel) {

        var service = {};

        service.changeLayout = changeLayout;
        service.changeTileLayers = changeTileLayers;
        service.changeDataSource = changeDataSource;
        service.downloadConfig = downloadConfig;
        service.loadConfig = loadConfig;
        service.selectMarkerStyle = selectMarkerStyle;

        changeTileLayers();


        return service;

        function downloadConfig(){
            return openModal({
                template: '/subsection-sidebar/modals/download/download.tpl.html',
                controller: 'DownloadCtrl',
                controllerAs: 'modal',
                resolve: {
                    config: function(scaffoldingConfigModel) {
                        return scaffoldingConfigModel.getCurrentConfig();
                    }
                }
            }).then(function () {
                // intentionally left blank
            });
        }

        function loadConfig(){
            return openModal({
                template: '/subsection-sidebar/modals/load/load.tpl.html',
                controller: 'LoadCtrl',
                controllerAs: 'modal'
            }).then(function (data) {
                scaffoldingConfigModel.loadConfigModelFromJSON(data);
            });
        }

        function changeLayout() {
            return openModal({
                template: '/subsection-sidebar/modals/layout/layout.tpl.html',
                controller: 'LayoutCtrl',
                controllerAs: 'modal',
                resolve: {
                    layout: function (scaffoldingConfigModel) {
                        var currentLayout = scaffoldingConfigModel.getCurrentConfig('layout');
                        return {
                            zoom: currentLayout.zoom,
                            lat: currentLayout.viewCenter.latitude,
                            lng: currentLayout.viewCenter.longitude
                        };
                    }
                }
            }).then(function (data) {
                scaffoldingConfigModel.setZoom(data.zoom);
                scaffoldingConfigModel.setViewCenter(data.lat, data.lng);
            });
        }

        function changeDataSource() {
            return openModal({
                template: '/subsection-sidebar/modals/dataSource/dataSource.tpl.html',
                controller: 'DataSourceCtrl',
                controllerAs: 'modal',
                resolve: {
                   availableServices: function(dataSourceServiceModel) {
                        return dataSourceServiceModel.getDataSourceServices();
                   }
                }
            }).then(function (data) {
                scaffoldingConfigModel.setSetDataSource(data);
            });
        }

        function changeTileLayers() {
            return openModal({
                template: '/subsection-sidebar/modals/tileLayer/tileLayer.tpl.html',
                controller: 'TileLayerCtrl',
                controllerAs: 'modal',
                resolve: {
                    tileLayer: function (scaffoldingConfigModel) {
                        var currentLayoutTileLayer = scaffoldingConfigModel.getCurrentConfig('tileLayer');
                        return {
                            tileLayer: currentLayoutTileLayer
                        };
                    },
                    availableTileLayer: function(tileLayerModel) {
                        return tileLayerModel.getTileLayers();
                    }
                }
            }).then(function (data) {
                // validation point ?

                scaffoldingConfigModel.setTileLayer(data);
            });
        }

        function selectMarkerStyle() {
            return openModal({
                template: '/subsection-sidebar/modals/markerStyle/markerStyle.tpl.html',
                controller: 'MarkerStyleCtrl',
                controllerAs: 'modal',
                resolve: {
                    availableMarkerStyles: function(markerStyleModel) {
                        return markerStyleModel.getMarkerStyles();
                    }
                }
            }).then(function () {
                // ToDo
                //scaffoldingConfigModel.setSetDataSource(data);
            });
        }

        function openModal(options){
            return $modal.open(options).then(function (modalInstance) {
                return modalInstance.result;
            });
        }
    }


})();