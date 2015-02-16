(function () {
    'use strict';

    angular.module('mappifyApp.models.dataSourceService', [])
        .service('dataSourceServiceModel', dataSourceServiceModel);

    function dataSourceServiceModel($http, $q) {
        var model = this,
            URLS = {
                FETCH: 'data/dataSourceService.json'
            },
            dataSourceServices;

        function extract(result) {
            return result.data;
        }

        function cacheDataSourceServices(result) {
            dataSourceServices = extract(result);
            return dataSourceServices;
        }

        model.getDataSourceServices = function () {
            return (dataSourceServices)
                ? $q.when(dataSourceServices)
                : $http.get(URLS.FETCH).then(cacheDataSourceServices);
        };

        model.getDataSourceServiceByName = function (displayName) {
            var deferred = $q.defer();

            function findByDisplayName(){
                return _.find(dataSourceServices, function(singleDataSourceService){
                    return singleDataSourceService.displayName == displayName;
                })
            }

            if (dataSourceServices) {
                deferred.resolve(findByDisplayName(displayName))
            } else {
                model.getDataSourceServices().then(function () {
                    deferred.resolve(findByDisplayName(displayName))
                })
            }

            return deferred.promise;
        };
    }

})();