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
                zoom: 15
            },
            tileLayer: {
                google: {
                    true: false
                }
            }
        };

        model.setZoom = setZoom;
        model.setViewCenter = setViewCenter;
        model.getCurrentConfig = getCurrentConfig;
        model.loadConfigModelFromJSON = loadConfigModelFromJSON;
        model.setTileLayer = setTileLayer;
        model.setSetDataSource = setSetDataSource;

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

        function loadConfigModelFromJSON(json) {
            data = JSON.parse(json);
        }

        function setTileLayer(tileLayer) {
            data.tileLayer = tileLayer;
        }

        // the display name is used as key and must be unique
        function setSetDataSource(newDataSource) {

            data.dataSources = data.dataSources || [];

            // todo change to id
            var index = _.findIndex(data.dataSources, function (dataSource) {
                return dataSource.displayName === newDataSource.displayName;
            });

            // handle as create
            if (-1 === index) {
                data.dataSources.push(newDataSource);
            }
            // handle as update
            else {
                data.dataSources[index] = newDataSource;
            }
        }

        return model;
    }

})();