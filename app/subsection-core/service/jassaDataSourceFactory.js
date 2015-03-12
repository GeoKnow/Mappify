(function () {
    'use strict';

    angular.module('mappifyApp.service.jassaDataSourceFactory', [])
        .service('jassaDataSourceFactory', jassaDataSourceFactory);

    function jassaDataSourceFactory() {

        var factory = this;

        factory.create = function() {

            var sparqlService = createSparqlService('http://dbpedia.org/sparql', ['http://dbpedia.org']);
            var geoMapFactory = createGeoMapFactory('wkt');
            var concept = createConcept('http://dbpedia.org/ontology/University');

            var dataSource = createMapDataSource(sparqlService, geoMapFactory, concept);

            return dataSource;
        };

        function createMapDataSource(sparqlService, geoMapFactory, concept) {
            return jassa.geo.GeoDataSourceUtils.createGeoDataSourceLabels(sparqlService, geoMapFactory, concept, {});
        }

        function createConcept(conceptString) {
            return jassa.sparql.ConceptUtils.createTypeConcept(conceptString);
        }

        function createSparqlService(url, graphUris) {

            var sparqlService = jassa.service.SparqlServiceBuilder.http(url, graphUris, {type: 'POST'})
                .cache().virtFix().paginate(1000).pageExpand(100).create();

            return sparqlService;
        }


        function createGeoMapFactory(type)
        {
            type = type.toLowerCase();

            if (type === 'wgs84')    {
                return jassa.geo.GeoMapFactoryUtils
                    .wgs84MapFactory;
            } else if (type === 'wkt') {
                return jassa.geo.GeoMapFactoryUtils
                    .createWktMapFactory('http://www.w3.org/2003/01/geo/wgs84_pos#geometry', 'bif:st_intersects', 'bif:st_geomFromText');
            } else {
                throw new Error('unsupported GeoMapFactory type');
            }
        }
    }

})();