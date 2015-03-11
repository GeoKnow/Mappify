(function () {
    'use strict';

    angular.module('mappifyApp.generator.jassa', [])
        .service('jassaStrategyService', jassaStrategyService);

    // the jassa strategy used
    //
    //   lodash templates

    /* @ngInject */
    function jassaStrategyService($http)  {

        var service = this;

        var baseUrl = '/template/jassa/'

        var templateFileSet = [{
                templateValueProviderKey: 'app',
                url: baseUrl + 'app.js.tpl',
                fileName: 'app.js'
            }, {
                templateValueProviderKey: 'index',
                url: baseUrl + 'index.html.tpl',
                fileName: 'app.html'
            }, {
                templateValueProviderKey: 'jassa',
                url: baseUrl + 'jassaDataSourceFactory.js.tpl',
                fileName: 'jassaDataSourceFactory.js'
            }
        ];

        function appTemplateValueProvider() {
            return {
                appName: 'myApp',
                dataSourceDefinitionObject: {},
                getMappifyMapConfig: {}
            }
        }

        function indexTemplateValueProvider() {
            return {
                appName: 'myApp',
                mappify: '<mappify></mappify>'
            }
        }

        function extract(result) {
            return result.data;
        }

        function render(data) {

            var compiled = _.template(data);
            return {
                fileContent: compiled(config),
                fileName: 'adas'
            };
        }

        // load all template file
        function load() {

            var promises = templateFileSet.map(function(templateFile) {

                var promise = $http.get(templateFile.url)
                    .then(extract())
                    .then(render(data, templateFile.templateValueProviderKey));
            });

            return $q.all(promises);
        }





    }
})();
