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
                fileName: 'index.html',
                folder: 'app'
            }, {
                templateValueProviderKey: 'default',
                url: baseUrl + 'jassaDataSourceFactory.js.tpl',
                fileName: 'jassaDataSourceFactory.js',
                folder: 'app'
            },  {
                templateValueProviderKey: 'default',
                url: baseUrl + 'package.tpl',
                fileName: 'package.json'
            }, {
                templateValueProviderKey: 'default',
                url: baseUrl + 'bower.tpl',
                fileName: 'bower.json'
            }

        ];

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

            // we use lodash template functionality

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
