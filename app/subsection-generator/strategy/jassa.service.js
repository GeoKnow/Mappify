(function () {
    'use strict';

    angular.module('mappifyApp.generator.jassa', [
            'mappifyApp.generator.jassa.templateFileProvider',
            'mappifyApp.generator.jassa.templateValueProvider'
        ])
        .service('jassaStrategyService', jassaStrategyService);

    /* @ngInject */
    function jassaStrategyService($http, $q, jassaTemplateValueProvider, jassaStrategyTemplateFileProvider)  {

        var service = this;

        var templateFileSet = jassaStrategyTemplateFileProvider.getTemplateFileSet();

        // @improvement check http status code should be 200
        function extract(result) {

            // $http uses Response transformations - If JSON response is detected, deserialize it using a JSON parser.
            if (_.isObject(result.data)) {
                return JSON.stringify(result.data , null, 2);
            }

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

            // we use lodash's template functionality
            var compiled = _.template(template);
            var values   = jassaTemplateValueProvider.getTemplateValueProviderByKey(templateFile.templateValueProviderKey);

            var createdFile = {
                fileContent: compiled(values),
                fileName: templateFile.fileName
            };

            if (templateFile.hasOwnProperty('folder')) {
                createdFile.folder = templateFile.folder;
            }

            return createdFile;
        }

        function loadTemplateFiles(url) {
            return $http.get(url);
        }

        // load all template file
        service.generate = function() {

            var promises = templateFileSet.map(function(templateFile) {
                return loadTemplateFiles(templateFile.url)
                    .then(extract)
                    .then(function(result) {
                        return renderTemplate(result, templateFile);
                    });
            });

            return $q.all(promises);
        };
    }
})();
