(function () {
    'use strict';

    angular.module('mappifyApp.generator.jassa', [
            'mappifyApp.generator.jassa.templateValueProvider'
        ])
        .service('jassaStrategyService', jassaStrategyService);

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

        // renders the template and return an object
        //
        // var createFile = {
        //    fileContent: '',
        //    fileName: '',
        //    folder: ''
        // };
        //
        function renderTemplate(template, templateFile) {

            // we use lodash template functionality
            var compiled = _.template(template);
            var values   = jassaTemplateValueProvider.getTemplateValueProviderByKey(templateFile.templateValueProviderKey);

            var createFile = {
                fileContent: compiled(values),
                fileName: templateFile.fileName
            };

            if (templateFile.hasOwnProperty('folder')) {
                createFile.folder = templateFile.folder;
            }

            return createFile;
        }

        // load all template file
        service.generate = function() {

            var promises = templateFileSet.map(function(templateFile) {
                return $http.get(templateFile.url)
                    .then(extract)
                    .then(function(result) {
                        return renderTemplate(result, templateFile);
                    });
            });

            return $q.all(promises);
        };
    }
})();
