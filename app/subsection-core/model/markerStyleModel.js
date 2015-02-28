(function () {
    'use strict';

    angular.module('mappifyApp.models.markerStyleModel', [])
        .service('markerStyleModel', markerStyleModel);

    function markerStyleModel($http, $q) {
        var model = this;

        var markerStyle;
        var URLS = {
                FETCH: 'data/markerStyle.json'
            };
        
        function extract(result) {
            return result.data;
        }

        function cacheMarkerStyle(result) {
            markerStyle = extract(result);
            return cacheMarkerStyle;
        }

        model.getMarkerStyles = function () {
            return (markerStyle)
                ? $q.when(markerStyle)
                : $http.get(URLS.FETCH).then(cacheMarkerStyle);
        };
    }

})();

