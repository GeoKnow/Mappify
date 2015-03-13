(function () {
    'use strict';

    angular.module('mappifyApp.models.tileLayer', [])
        .service('tileLayerModel', tileLayerModel);

    function tileLayerModel($http, $q) {
        var model = this,
            URLS = {
                FETCH: 'data/tileLayer.json'
            },
            tileLayer;

        function extract(result) {
            return result.data;
        }

        function cacheTileLayer(result) {
            tileLayer = extract(result);
            return tileLayer;
        }

        model.getTileLayers = function () {
            return (tileLayer) ? $q.when(tileLayer) : $http.get(URLS.FETCH).then(cacheTileLayer);
        };
    }

})();