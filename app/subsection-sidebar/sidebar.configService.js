(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.configService', [
            'mappifyApp.models.scaffoldingConfigModel'
        ])
        .factory('configService', configService);

    function configService($modal, scaffoldingConfigModel) {

        var service = {};

        service.changeLayout = changeLayout;
        service.changeTileLayers = changeTileLayers;
        service.changeDataSource = changeDataSource;
        service.downloadConfig = downloadConfig;
        service.loadConfig = loadConfig;
        service.selectMarkerStyle = selectMarkerStyle;

        return service;

        function downloadConfig(){
            return openModal({
                template: '/subsection-sidebar/modals/download/download.tpl.html',
                controller: 'DownloadCtrl',
                controllerAs: 'modal',
                resolve: {
                    config: /*@ngInject*/ function(scaffoldingConfigModel) {
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
                    layout: /*@ngInject*/ function (scaffoldingConfigModel) {
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
                   availableServices: /*@ngInject*/ function(dataSourceServiceModel) {
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
                    tileLayer: /*@ngInject*/ function (scaffoldingConfigModel) {
                        var currentLayoutTileLayer = scaffoldingConfigModel.getCurrentConfig('tileLayer');
                        return {
                            tileLayer: currentLayoutTileLayer
                        };
                    },
                    availableTileLayer: /*@ngInject*/ function(tileLayerModel) {
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
                    availableMarkerStyles: /*@ngInject*/ function(markerStyleModel) {
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