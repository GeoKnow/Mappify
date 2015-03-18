(function () {
    'use strict';

    angular.module('mappifyApp.generator.jassa.templateFileProvider', [])
        .service('jassaStrategyTemplateFileProvider', jassaStrategyTemplateFileProvider);

    /* @ngInject */
    function jassaStrategyTemplateFileProvider() {

        var service = this;

        var baseUrl = 'template/jassa/';

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
            }, {
                templateValueProviderKey: 'default',
                url: baseUrl + 'package.tpl',
                fileName: 'package.json'
            }, {
                templateValueProviderKey: 'default',
                url: baseUrl + 'bower.tpl',
                fileName: 'bower.json'
            }, {
                templateValueProviderKey: 'default',
                url: baseUrl + 'jshintrc.tpl',
                fileName: '.jshintrc'
            }, {
                templateValueProviderKey: 'default',
                url: baseUrl + 'gulpfile.js.tpl',
                fileName: 'gulpfile.js'
            } , {
                templateValueProviderKey: 'default',
                url: baseUrl + 'readme.md',
                fileName: ' readme.md'
            }
        ];

        // public api
        service.getTemplateFileSet = function () {
            return templateFileSet;
        };

        service.setBaseUrl = function (newBaseUrl) {
            baseUrl = newBaseUrl;
        };

        service.getBaseUrl = function () {
            return baseUrl;
        };

    }
})();