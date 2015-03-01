(function () {
    'use strict';

    var title = 'Select Marker Style';

    angular.module('mappifyApp.sidebar.markerStyle', [
        'mappifyApp.sidebar.configService'
    ])

        .config(function (configServiceProvider) {
            var description = {
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

    /*@ngInject*/
    function MarkerStyleCtrl($modalInstance, availableMarkerStyles, layout) {

        var modal = this;

        modal.title = title;

        modal.search = {};

        modal.availableMarkerStyles = availableMarkerStyles;

        modal.availableColors = ['red', 'blue', 'green', 'purple', 'orange', 'darkred', 'lightred', 'beige', 'darkblue', 'darkgreen', 'cadetblue', 'darkpurple', 'white', 'pink', 'lightblue', 'lightgreen', 'gray', 'black', 'lightgray'];

        modal.unSelectedColor = 'blue';
        modal.selectedColor = 'red';
        modal.icon = 'star';

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

        modal.layout = layout;

        modal.markers = {
            m1: {
                lat: layout.lat,
                lng: layout.lng - 0.03,
                focus: false,
                clickable: false,
                draggable: false,
                icon: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: modal.icon,
                    markerColor: modal.unSelectedColor
                }
            },
            m2: {
                lat: layout.lat,
                lng: layout.lng + 0.03,
                focus: false,
                clickable: false,
                draggable: false,
                icon: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: modal.icon,
                    markerColor: modal.selectedColor
                }
            }
        };

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        modal.close = function () {
            // ToDo
            //scaffoldingConfigModel.setSetDataSource(data);
            $modalInstance.close(
                {
                    marker: modal.markers.m1.icon.icon,
                    selected: modal.markers.m2.icon.markerColor,
                    unselected: modal.markers.m1.icon.markerColor
                }
            );
        };
    }

})
();