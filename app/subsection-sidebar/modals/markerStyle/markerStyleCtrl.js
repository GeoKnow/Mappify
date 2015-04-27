(function () {
    'use strict';

    var title = 'Select Marker Style';

    angular.module('mappifyApp.sidebar.markerStyle', [
        'mappifyApp.sidebar.configService'
    ])

        .config(function (configServiceProvider) {
            var description = {
                id: 'marker',
                order: 80,
                title: title,
                fileName: 'markerStyle',
                icon: 'map-marker',
                ctrl: MarkerStyleCtrl
            };

            var resolve = {
                availableMarkerStyles: /*@ngInject*/ function (markerStyleModel) {
                    return markerStyleModel.getMarkerStyles();
                },
                layout: /*@ngInject*/ function (scaffoldingConfigModel) {
                    var currentLayout = scaffoldingConfigModel.getCurrentConfig('layout');
                    return {
                        zoom: 11,
                        lat: currentLayout.viewCenter.latitude,
                        lng: currentLayout.viewCenter.longitude
                    };
                }
            };

            configServiceProvider.registerConfig(description, resolve);
        });

    function getLeafletMapDefaults() {
        return {
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
    }

    function getLeafletLayers() {
        return {
            baselayers: {
                googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                }
            }
        };
    }

    function getAvailableMarkerColors() {
        return ['red', 'blue', 'green', 'purple', 'orange',
            'darkred', 'lightred', 'beige', 'darkblue', 'darkgreen',
            'cadetblue', 'darkpurple', 'white', 'pink', 'lightblue',
            'lightgreen', 'gray', 'black', 'lightgray'
        ];
    }

    /*@ngInject*/
    function MarkerStyleCtrl($modalInstance, scaffoldingConfigModel, availableMarkerStyles, layout, mapService) {

        var modal = this;
        var scaffoldingConfigKey = 'markers';

        modal.title = title;

        modal.search = {};
        modal.availableMarkerStyles = availableMarkerStyles;
        modal.layout                = layout;

        modal.unSelectedColor       = null;
        modal.selectedColor         = null;
        modal.icon                  = null;
        modal.availableColors       = null;
        modal.mapDefaults           = null;

        init(scaffoldingConfigModel);

        // we handle two configuration source
        //  - the defaults
        //  - the provided config
        function init(scaffoldingConfigModel) {
            modal.availableColors       = getAvailableMarkerColors();
            modal.mapDefaults           = getLeafletMapDefaults();
            modal.layers                = getLeafletLayers();

            // marker
            initMarker(scaffoldingConfigModel);

            // apply
            modal.icon            = modal.markers.m1.icon.icon;
            modal.unSelectedColor = modal.markers.m1.icon.markerColor;
            modal.selectedColor   = modal.markers.m2.icon.markerColor;
        }

        function initMarker(scaffoldingConfigModel) {

            var config;

            // nothing passed -> use defaults
            if (! scaffoldingConfigModel.hasConfigValueFor(scaffoldingConfigKey)) {
                config = {
                    unSelectedColor: 'blue',
                    selectedColor: 'red',
                    icon: 'star'
                };
            } else {
                var unMappedConfig = scaffoldingConfigModel.getCurrentConfig(scaffoldingConfigKey);
                config = {
                    unSelectedColor: unMappedConfig.unselected.markerColor,
                    selectedColor:   unMappedConfig.selected.markerColor,
                    icon: unMappedConfig.selected.icon
                };
            }

            modal.markers = unMap(config);
        }

        // map from mappify to leaflet directive
        function unMap(config) {

            var unSelectedMarker = {
                lat: layout.lat,
                lng: layout.lng - 0.03,
                focus: false,
                clickable: false,
                draggable: false,
                icon: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: config.icon,
                    markerColor: config.unSelectedColor
                }
            };

            var selectedMarker = {
                lat: layout.lat,
                lng: layout.lng + 0.03,
                focus: false,
                clickable: false,
                draggable: false,
                icon: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: config.icon,
                    markerColor: config.selectedColor
                }
            };

            return {
                m1: unSelectedMarker,
                m2: selectedMarker
            };
        }

        // map from leafet directive to mappify
        function map() {
            var result = {};

            result.unselected = {
                prefix: 'fa',
                icon:  modal.markers.m1.icon.icon,
                markerColor: modal.markers.m1.icon.markerColor,
                iconColor: 'white'
            };

            result.selected = {
                prefix: 'fa',
                icon:  modal.markers.m2.icon.icon,
                markerColor: modal.markers.m2.icon.markerColor
            };

            return result;
        }

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        modal.close = function () {
            scaffoldingConfigModel.setMarkerStyle(map(modal.markers));

            $modalInstance.close({
                    marker: modal.markers.m1.icon.icon,
                    selected: modal.markers.m2.icon.markerColor,
                    unselected: modal.markers.m1.icon.markerColor
                }
            );

            mapService.triggerAutoRefreshConfig();
        };
    }

})
();