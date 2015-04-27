(function () {
    'use strict';

    angular.module('mappifyApp.service.dddiContainer', [
            'dddi'
        ])
        .service('dddiContainer', dddiContainer);

    function dddiContainer($rootScope, $dddi) {

        var service = this;

        $rootScope.langs = ['en','de'];




        var $scope = $rootScope;

        $scope.selectFacet = function(path) {};

        $scope.ObjectUtils = jassa.util.ObjectUtils;

        $rootScope.active = {
            services: {},
            config: {
                breadcrumb: {},
                dataService: {
                    serviceIri: 'http://fp7-pp.publicdata.eu/sparql',
                    defaultGraphIris: ['http://fp7-pp.publicdata.eu/']
                },
                facetTreeConfig: new jassa.facete.FacetTreeConfig()
            }
        };

        // @see https://github.com/GeoKnow/Facete2/blob/master/facete2-webapp/src/main/webapp/scripts/js/home.js#L673
        var dddi = $dddi($rootScope);


        // Objects being wired up here
        // - sparqlCache
        // - services.sparqlService
        // - services.conceptPathFinder
        // - services.tableGeoLink
        // - lookupServiceNodeLabels
        // - lookupServicePathLabels
        // - lookupServiceConstraintLabels
        // -

        dddi.register('active.services.labelLiteralPreference', [ '=langs',
            function(langs) {
                var r = new jassa.sparql.LiteralPreference(langs);
                return r;
            }]);

        dddi.register('active.services.sparqlService', [ '=active.config.dataService',
            function(serviceConfig, sparqlProxyUrl) {

                var base = sparqlProxyUrl == null
                        ? jassa.service.SparqlServiceBuilder.http(serviceConfig.serviceIri, serviceConfig.defaultGraphIris, {type: 'POST'})
                        : jassa.service.SparqlServiceBuilder.http(sparqlProxyUrl, serviceConfig.defaultGraphIris, {type: 'POST'}, {'service-uri': serviceConfig.serviceIri})
                    ;

                //if(sparqlCache) {
                // TODO Reuse prior request cache?
                var requestCache = null; //new jassa.service.RequestCache(null, sparqlCache);
                base = base.cache(requestCache);
                //}

                var r = base.virtFix().paginate(1000).pageExpand(100).create();

                //console.log('Sparql service', serviceIri, defaultGraphIris);
                return r;
            }]);

        dddi.register('active.services.lookupServiceNodeLabels', [ 'active.services.sparqlService', 'active.services.labelLiteralPreference',
            function(sparqlService, literalPreference) {
                var r = jassa.sponate.LookupServiceUtils.createLookupServiceNodeLabels(sparqlService, literalPreference, 20 /* predicates */);
                return r;
            }]);

        dddi.register('active.services.lookupServicePathLabels', [ 'active.services.lookupServiceNodeLabels',
            function(lookupServiceNodeLabels) {
                var r = new jassa.facete.LookupServicePathLabels(lookupServiceNodeLabels);
                return r;
            }]);

        dddi.register('active.services.lookupServiceConstraintLabels', [ 'active.services.lookupServiceNodeLabels', 'active.services.lookupServicePathLabels',
            function(lookupServiceNodeLabels, lookupServicePathLabels) {
                var r = new jassa.facete.LookupServiceConstraintLabels(lookupServiceNodeLabels, lookupServicePathLabels);
                return r;
            }]);

        dddi.register('active.services.listServiceConstraintLabels', ['active.services.lookupServiceConstraintLabels', 'ObjectUtils.hashCode(active.config.facetTreeConfig.getFacetConfig().getConstraintManager())',
            function(lookupServiceConstraintLabels) {

                var cm = $scope.active.config.facetTreeConfig.getFacetConfig().getConstraintManager();
                var constraints = cm != null ? cm.getConstraints() : [];

                var promise = lookupServiceConstraintLabels.lookup(constraints).then(function(map) {

                    var entries = constraints.map(function(constraint) {
                        var label = map.get(constraint);

                        var r = {
                            key: constraint,
                            val: {
                                constraint: constraint,
                                displayLabel: label
                            }
                        };

                        return r;
                    });

                    var filterSupplierFn = function(searchString) {
                        var result;

                        if(searchString != null) {
                            var re = new RegExp(searchString, 'mi');

                            result = function(entry) {
                                var m1 = re.test(entry.val.displayLabel);
                                return m1;
                            };
                        } else {
                            result = function(entry) { return true; };
                        }

                        return result;
                    };

                    var r = new jassa.service.ListServiceArray(entries, filterSupplierFn);
                    return r;
                });

                return promise;
            }]);

        dddi.register('active.services.facetService', [ 'active.services.sparqlService', 'ObjectUtils.hashCode(active.config.facetTreeConfig.getFacetConfig())', 'active.services.labelLiteralPreference',
            function(sparqlService, facetConfigHash, labelLiteralPreference) {
                var facetConfig = $scope.active.config.facetTreeConfig.getFacetConfig();

                var r = jassa.facete.FacetServiceBuilder
                    .core(sparqlService, facetConfig)
                    .labelConfig(labelLiteralPreference)
                    .index()
                    //.pathToTags(pathToTags)
                    //.tagFn(tagFn)
                    .create();

                return r;
            }]);

        // TODO We could actually depend on the nodeLabel lookupService
        // But maybe its ok to just depend on the labelLiteralPreference
        dddi.register('active.services.facetValueService', [ 'active.services.sparqlService', 'ObjectUtils.hashCode(active.config.facetTreeConfig.getFacetConfig())', 'active.services.labelLiteralPreference',
            function(sparqlService, facetConfigHash, labelLiteralPreference) {
                var facetConfig = $scope.active.config.facetTreeConfig.getFacetConfig();

                var facetValueServiceRowLimit = 5000000;

                //var constraintManager = facetConfig.getConstraintManager();

                var r = jassa.facete.FacetValueServiceBuilder
                    .core(sparqlService, facetConfig, facetValueServiceRowLimit)
                    .labelConfig(labelLiteralPreference)
                    .constraintTagging()
                    .create();

                return r;
            }]);

    }

})();