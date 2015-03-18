(function () {
    'use strict';

    var title = 'Change Zoom/Center';

    angular.module('mappifyApp.sidebar.layout', [
            'leaflet-directive',
            'mappifyApp.sidebar.configService',
            'mappifyApp.service.mapService'
        ])
        /*@ngInject*/
        .config(function (configServiceProvider) {

            var description = {
                id: 'layout',
                order: 61,
                fileName: 'layout',
                title: title ,
                icon: 'location-arrow',
                ctrl: LayoutCtrl
            };

            var resolve = {
                layout: /*@ngInject*/ function (scaffoldingConfigModel) {
                    var currentLayout = scaffoldingConfigModel.getCurrentConfig('layout');
                    return {
                        zoom: currentLayout.zoom,
                        lat: currentLayout.viewCenter.latitude,
                        lng: currentLayout.viewCenter.longitude
                    };
                }
            };

            configServiceProvider.registerConfig(description, resolve);
        });

    /*@ngInject*/
    function LayoutCtrl($modalInstance, layout, scaffoldingConfigModel, mapService) {

        var modal = this;

        modal.title = title;

        modal.layout = layout;

        modal.validation = {
            lat: {
                required: true,
                type: 'number',
                min: '-90',
                max: '90'
            },
            lng: {
                required: true,
                type: 'number',
                min: '-180',
                max: '180'
            },

            zoom: {
                required: true,
                type: 'number',
                min: '1',
                max: '22'
            }
        };

        modal.mapDefaults = {
            keyboard: false,
            dragging: false,
            zoomControl: false,
            doubleClickZoom: false,
            scrollWheelZoom: false,
            tap: false,
            attributionControl: false,
            zoomAnimation: false,
            fadeAnimation: false,
            markerZoomAnimation: false
        };

        modal.layers = {
            baselayers: {
                googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                }
            }
        };

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        modal.close = function () {
            scaffoldingConfigModel.setZoom(modal.layout.zoom);
            scaffoldingConfigModel.setViewCenter(modal.layout.lat, modal.layout.lng);
            $modalInstance.close(modal.layout);

            mapService.triggerAutoRefreshConfig();
        };

    }

})();