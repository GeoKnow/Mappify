(function () {
    'use strict';

    angular.module('mappifyApp.sidebar', ['ui.router', 'mappifyApp.sidebar.layout', 'mappifyApp.sidebar.load', 'mappifyApp.sidebar.tileLayer'])

        .factory('configService', configService)
        .factory('configModel', configModel)
        .factory('mapConfigModel', mapConfigModel)
        .controller('SidebarController', SidebarController);

    function SidebarController(configService, configModel) {

        var sidebar = this;

        sidebar.changeLayout = configService.changeLayout;
        sidebar.getConfigModel = configModel.getCurrentConfig;
        sidebar.loadConfig = configService.loadConfig;
        sidebar.changeTileLayers = configService.changeTileLayers;
    }

    // the map config
    function mapConfigModel(configModel) {

        var data = {}

        var mapConfig = {};
        mapConfig.createMapConfigFromScafoldingConfig = createMapConfigFromScaffoldingConfig;

        return mapConfig;

        function createMapConfigFromScaffoldingConfig() {

            // todo - move te separate service
            var currentScaffoldingConfig = configModel.getCurrentConfig();
            data.zoom = currentScaffoldingConfig.layout.zoom;
            data.viewCenter = currentScaffoldingConfig.layout.viewCenter;

            return data;
        }
    }

    function configModel() {
        var data =
        {
            layout: {
                zoom: 5,
                viewCenter: {
                    longitude: 12,
                    latitude: 51.12
                }
            },
            tileLayer: {
                google: {
                    roadmap: false,
                    hybrid: false,
                    satellite: true,
                    terrain: false
                },
                osm: {
                    standard: false
                },
                mapbox: {
                    road: false
                },
                custom: {
                    tileUrl: null
                }
            }
        };

        var model = {};

        model.setZoom = setZoom;
        model.setViewCenter = setViewCenter;
        model.getCurrentConfig = getCurrentConfig;
        model.loadConfigModelFromJSON = loadConfigModelFromJSON;
        model.setTileLayer = setTileLayer;

        // @important we return an copy to prevent the card from changed while working on one
        // part of the config
        function getCurrentConfig(key) {
            if(key && data.hasOwnProperty(key)){
                return angular.copy(data[key]);
            }

            return angular.copy(data);
        }

        function setZoom(newZoom) {
            data.layout.zoom = newZoom;
        }

        function setViewCenter(lat, lng) {
            data.layout.viewCenter.latitude = lat;
            data.layout.viewCenter.longitude = lng;
        }

        function loadConfigModelFromJSON(json){
            data = JSON.parse(json);
        }

        function setTileLayer(tileLayer) {
            data.tileLayer = tileLayer;
        }

        return model;
    }

    function configService($modal, configModel) {

        var service = {};

        service.changeLayout = changeLayout;
        service.loadConfig = loadConfig;
        service.changeTileLayers = changeTileLayers;

        return service;

        function wizard(){
            changeLayout().then(changeTileLayers);
        }

        function loadConfig(){
            return openModal({
                template: '/subsection-sidebar/modals/load.tpl.html',
                controller: 'LoadCtrl',
                controllerAs: 'modal'
            }).then(function (data) {
                configModel.loadConfigModelFromJSON(data);
            });
        }

        function changeLayout() {
            return openModal({
                template: '/subsection-sidebar/modals/layout.tpl.html',
                controller: 'LayoutCtrl',
                controllerAs: 'modal',
                resolve: {
                    layout: function (configModel) {
                        var currentLayout = configModel.getCurrentConfig('layout');
                        return {
                            zoom: currentLayout.zoom,
                            lat: currentLayout.viewCenter.latitude,
                            lng: currentLayout.viewCenter.longitude
                        };
                    }
                }
            }).then(function (data) {
                configModel.setZoom(data.zoom);
                configModel.setViewCenter(data.lat, data.lng);
            });
        }

        function changeTileLayers() {
            return openModal({
                template: '/subsection-sidebar/modals/tileLayer.tpl.html',
                controller: 'TileLayerCtrl',
                controllerAs: 'modal',
                resolve: {
                    tileLayer: function (configModel) {
                        var currentLayoutTileLayer = configModel.getCurrentConfig('tileLayer');
                        return {
                            tileLayer: currentLayoutTileLayer
                        };
                    }
                }
            }).then(function (data) {
                // validation point ?
                console.log(data);

                configModel.setTileLayer(data);
            });
        }

        function openModal(options){
            return $modal.open(options).then(function (modalInstance) {
                return modalInstance.result;
            });
        }
    }


})();