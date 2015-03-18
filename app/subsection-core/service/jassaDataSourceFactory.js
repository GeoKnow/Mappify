(function () {
    'use strict';

    angular.module('mappifyApp.service.jassaDataSourceFactory', [])
        .service('jassaDataSourceFactory', jassaDataSourceFactory);

    function jassaDataSourceFactory() {

        var factory = this;

        // default value overwritable via the definition object
        var paginateValue = 1500;

        // default value overwritable via the definition object
        var pageExpand = 100;

        // default value overwritable via the definition object
        var wktMapFactoryOptions = {
            wktPredicateName:   'http://www.w3.org/2003/01/geo/wgs84_pos#geometry',
            intersectsFnName:   'bif:st_intersects',
            geomFromTextFnName: 'bif:st_geomFromText'
        };

        function createMapDataSource(sparqlService, geoMapFactory, concept) {
            return jassa.geo.GeoDataSourceUtils
                .createGeoDataSourceLabels(sparqlService, geoMapFactory, concept, {});
        }

        function createConcept(conceptString) {
            return jassa.sparql.ConceptUtils.createTypeConcept(conceptString);
        }

        function createSparqlService(url, graphUris) {
            return jassa.service.SparqlServiceBuilder.http(url, graphUris, {type: 'POST'})
                .cache().virtFix().paginate(paginateValue).pageExpand(pageExpand).create();
        }

        function createGeoMapFactory(type)
        {
            type = type.toLowerCase();

            if (type === 'wgs84')    {
                return jassa.geo.GeoMapFactoryUtils
                    .wgs84MapFactory;
            } else if (type === 'wkt') {
                return jassa.geo.GeoMapFactoryUtils.createWktMapFactory(
                    wktMapFactoryOptions.wktPredicateName,
                    wktMapFactoryOptions.intersectsFnName,
                    wktMapFactoryOptions.geomFromTextFnName
                );
            } else {
                throw new Error('unsupported GeoMapFactory type: ' + type);
            }
        }

        // @improvement move this to a tool belt library
        // returns true if the passed value is an positive integer or zero
        function isNormalInteger(str) {
            var n = Math.floor(Number(str));
            return String(n) === str && n >= 0;
        }

        // checks if the provided definition object contains any value with
        // should over right a default value
        function handlePassConfigValues(definition) {

            if (definition.hasOwnProperty('paginateValue') && isNormalInteger(definition.paginateValue)) {
                paginateValue = definition.paginateValue;
            }

            if (definition.hasOwnProperty('pageExpand') && isNormalInteger(definition.pageExpand)) {
                paginateValue = definition.pageExpand;
            }

            // @note interfaces in js would be awesome
            if (definition.hasOwnProperty('wktMapFactoryOptions')) {
                wktMapFactoryOptions =  definition.pageExpand;
            }
        }

        // public methods
        factory.createDataSource = function(definition) {

            handlePassConfigValues(handlePassConfigValues);

            return createMapDataSource(
                createSparqlService(definition.service, definition.graphUriSet)    ,
                createGeoMapFactory(definition.geoMapType),
                createConcept(definition.concept)
            );
        };

    }
})();