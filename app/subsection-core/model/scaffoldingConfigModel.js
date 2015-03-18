(function () {
    'use strict';

    angular.module('mappifyApp.models.scaffoldingConfigModel', [])
        .service('scaffoldingConfigModel', scaffoldingConfigModel);

    function scaffoldingConfigModel() {
        var model = this;


        var data =
        {
            layout: {
                viewCenter: {
                    latitude:  51.339018,
                    longitude: 12.3797776
                },
                zoom: 6
            },
            tileLayer: {
                google: {
                    hybrid: false
                }
            }
        };

        // in alphabetical order
        var allowedConfigKeys =  ['dataSources', 'layout', 'mapOption', 'markers',  'tileLayer'];

        // the public api / public methods
        model.getCurrentConfig = getCurrentConfig;
        model.getCurrentConfigForMapOptions = getCurrentConfigForMapOptions;
        model.loadConfigModelFromJSON = loadConfigModelFromJSON;
        model.hasConfigValueFor = hasConfigValueFor;
        model.setMapOptions = setMapOptions;
        model.setMarkerStyle = setMarkerStyle;
        model.setSetDataSource = setSetDataSource;
        model.setTileLayer = setTileLayer;
        model.setViewCenter = setViewCenter;
        model.setViewCenter = setViewCenter;
        model.setZoom = setZoom;

        // @important we return an copy to prevent the map from changed while working on one
        // part of the config
        function getCurrentConfig(key) {

            if (key) {
                if(data.hasOwnProperty(key)){
                    return angular.copy(data[key]);
                } else if (_.indexOf(allowedConfigKeys, key) > -1) {
                    return [];
                } else {
                    throw new Error(createUnSupportedKeyErrorMessage(key));
                }
            }

            return angular.copy(data);
        }

        function hasConfigValueFor(key) {

            // check if the passed key is a valid one
            if (_.indexOf(allowedConfigKeys, key) === -1) {
                throw new Error(createUnSupportedKeyErrorMessage(key));
            }

            return (data.hasOwnProperty(key));
        }

        function createUnSupportedKeyErrorMessage(key) {
            return 'scaffoldingConfigModel: unsupported config key (' + key.toString() + '). check the allowedConfigKeys array.';
        }

        function getCurrentConfigForMapOptions() {
            if (! data.hasOwnProperty('mapOption')) {
                return {};
            }

            return angular.copy(data.mapOption);
        }

        function setZoom(newZoom) {
            data.layout.zoom = newZoom;
        }

        function setViewCenter(lat, lng) {
            data.layout.viewCenter.latitude = lat;
            data.layout.viewCenter.longitude = lng;
        }

        function loadConfigModelFromJSON(json) {
            data = JSON.parse(json);
        }

        function setTileLayer(tileLayer) {
            data.tileLayer = tileLayer;
        }

        function setMarkerStyle(markerStyle) {
            data.markers = markerStyle;
        }

        // the display name is used as key and must be unique
        function setSetDataSource(newDataSource) {

            data.dataSources = data.dataSources || [];
            var index = getDataSourceIndexInSet(newDataSource);

            // handle as create
            if (-1 === index) {
                data.dataSources.push(newDataSource);
            }
            // handle as update
            else {
                data.dataSources[index] = newDataSource;
            }
        }


        function setMapOptions(options) {
            data.mapOption = options;
        }

        // return the index if a dataSource with the same unique identifier is already present
        // or -1 if not
        function getDataSourceIndexInSet(newDataSource) {
            return _.findIndex(data.dataSources, function (dataSource) {
                return dataSource.displayName === newDataSource.displayName;
            });
        }

        return model;
    }

})();