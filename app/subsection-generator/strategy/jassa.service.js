(function () {
    'use strict';

    angular.module('mappifyApp.generator.jassa', [
            'mappifyApp.generator.jassa.templateValueProvider'
        ])
        .service('jassaStrategyService', jassaStrategyService);


    // the jassa strategy used
    //
    //   lodash templates

    /* @ngInject */
    function jassaStrategyService($http, $q, jassaTemplateValueProvider)  {

        var service = this;

        var baseUrl = '/template/jassa/';

        var templateFileSet = [{
                templateValueProviderKey: 'app',
                url: baseUrl + 'app.js.tpl',
                fileName: 'app.js',
                folder: 'app'
            }, {
                templateValueProviderKey: 'index',
                url: baseUrl + 'index.html.tpl',
                fileName: 'app.html',
                folder: 'app'
            }, {
                templateValueProviderKey: 'jassa',
                url: baseUrl + 'jassaDataSourceFactory.js.tpl',
                fileName: 'jassaDataSourceFactory.js',
                folder: 'app'
            }
        ];

        // @improvement check http status code should be 200
        function extract(result) {
            return result.data;
        }

        function render(template, templateFile) {

            var compiled = _.template(template);
            var values   = jassaTemplateValueProvider.getTemplateValueProviderByKey(templateFile.templateValueProviderKey);

            var result = {
                fileContent: compiled(values),
                fileName: templateFile.fileName
            };

            if (templateFile.hasOwnProperty('folder')) {
                result.folder = templateFile.folder;
            }

            return result;
        }

        // load all template file
        service.generate = function() {

            var promises = templateFileSet.map(function(templateFile) {
                return $http.get(templateFile.url)
                    .then(extract)
                    .then(function(result) {
                        return render(result, templateFile);
                    });
            });

            return $q.all(promises);
        };
    }
})();
