(function () {
    'use strict';

    angular.module('mappifyApp.models.mapConfigModel', [
            'mappifyApp.models.scaffoldingConfigModel',
        ])
        .service('mapConfigModel', mapConfigModel);

    // the map config
    function mapConfigModel(scaffoldingConfigModel) {

        var mapConfig = this;
        mapConfig.createFromScafoldingConfig = createFromScaffoldingConfig;

        function createFromScaffoldingConfig() {

            var data = {};
            var currentScaffoldingConfig = scaffoldingConfigModel.getCurrentConfig();

            data.zoom = currentScaffoldingConfig.layout.zoom;
            data.viewCenter = currentScaffoldingConfig.layout.viewCenter;

            data.marker = currentScaffoldingConfig.markers;

            return data;
        }
    }
})();