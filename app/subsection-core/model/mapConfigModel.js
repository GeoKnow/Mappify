(function () {
    'use strict';

    angular.module('mappifyApp.models.mapConfigModel', [
        'mappifyApp.models.scaffoldingConfigModel'
    ])
        .factory('mapConfigModel', mapConfigModel);

    // the map config
    function mapConfigModel(scaffoldingConfigModel) {

        var data = {};

        var mapConfig = {};
        mapConfig.createMapConfigFromScafoldingConfig = createMapConfigFromScaffoldingConfig;

        return mapConfig;

        function createMapConfigFromScaffoldingConfig() {

            // todo - move te separate service
            var currentScaffoldingConfig = scaffoldingConfigModel.getCurrentConfig();



            //data.zoom = currentScaffoldingConfig.layout.zoom;
            data.zoom = 1;

            data.viewCenter = currentScaffoldingConfig.layout.viewCenter;

            // next

            return data;
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }
    }


})();