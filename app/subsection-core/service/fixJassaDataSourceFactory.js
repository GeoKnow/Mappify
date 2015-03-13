(function () {
    'use strict';

    angular.module('mappifyApp.service.mock', [])
        .service('fixJassaDataSourceFactory', fixJassaDataSourceFactory);

    function fixJassaDataSourceFactory() {

        var factory = this;

        var wktMapFactoryOptions = {
            wktPredicateName: 'http://www.w3.org/2003/01/geo/wgs84_pos#geometry',
            intersectsFnName:  'bif:st_intersects',
            geomFromTextFnName: 'bif:st_geomFromText'
        };

        factory.createDataSource = function() {

            var sparqlService = createSparqlService('http://dbpedia.org/sparql', ['http://dbpedia.org']);
            var geoMapFactory = createGeoMapFactory('wkt');
            var concept = createConcept('http://dbpedia.org/ontology/University');

            return createMapDataSource(sparqlService, geoMapFactory, concept);
        };

        function createMapDataSource(sparqlService, geoMapFactory, concept) {

            return jassa.geo.GeoDataSourceUtils.createGeoDataSourceLabels(sparqlService, geoMapFactory, concept, {});

        }

        function createConcept(conceptString) {
            return jassa.sparql.ConceptUtils.createTypeConcept(conceptString);
        }

        function createSparqlService(url, graphUris) {

            return jassa.service.SparqlServiceBuilder.http(url, graphUris, {type: 'POST'})
                .cache().virtFix().paginate(1000).pageExpand(100).create();
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
                throw new Error('unsupported GeoMapFactory type');
            }
        }
    }

})();