(function () {
    'use strict';

    angular.module('mappifyApp.models.mapSettingOptionModel', [])
        .service('mapSettingOptionModel', mapSettingOptionModel);

    function mapSettingOptionModel($http, $q) {
        var model = this;

        // an object containing the available map options
        var mapSettingOptionSet;

        var URLS = {
            FETCH: 'data/mapSetting.json'
        };

        function extract(result) {
            return result.data;
        }

        function cache(result) {
            mapSettingOptionSet = extract(result);
            return mapSettingOptionSet;
        }

        model.getOptions = function () {
            return (mapSettingOptionSet) ? $q.when(mapSettingOptionSet) : $http.get(URLS.FETCH).then(cache);
        };
    }

})();