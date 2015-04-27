(function () {
    'use strict';

    angular.module('mappifyApp.models.exampleContainerModel', [])
        .service('exampleContainerModel', exampleContainerModel);

    function exampleContainerModel($http, $q) {
        var model = this;

        // an object containing the example configurations
        var exampleContainer;

        var URLS = {
            FETCH: 'data/examples.json'
        };

        function extract(result) {
            return result.data;
        }

        function cacheExamples(result) {
            exampleContainer = extract(result);
            return exampleContainer;
        }

        model.getContainer = function () {
            return (exampleContainer) ? $q.when(exampleContainer) : $http.get(URLS.FETCH).then(cacheExamples);
        };
    }

})();