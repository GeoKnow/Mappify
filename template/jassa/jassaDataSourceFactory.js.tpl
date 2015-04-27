(function () {
    'use strict';

    angular.module('<%= appName %>.service.jassaDataSourceFactory', [])
        .service('jassaDataSourceFactory', jassaDataSourceFactory);

    function jassaDataSourceFactory() {

        var factory = this;

        var paginateValue = 1000;
        var pageExpand = 100;

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
                return jassa.geo.GeoMapFactoryUtils
                    .createWktMapFactory(
                        wktMapFactoryOptions.wktPredicateName,
                        wktMapFactoryOptions.intersectsFnName,
                        wktMapFactoryOptions.geomFromTextFnName
                    );
            } else {
                throw new Error('unsupported GeoMapFactory type: ' + type);
            }
        }

        // public methods
        factory.createDataSource = function(definition) {
            return createMapDataSource(
                createSparqlService(definition.service, definition.graphUriSet)    ,
                createGeoMapFactory(definition.geoMapType),
                createConcept(definition.concept)
            );
        };
    }
})();