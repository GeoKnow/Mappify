(function () {
    'use strict';

    angular.module('mappifyApp.generator.jassa.templateValueProvider', [
            'mappifyApp.models.dataSourceConfigModel'
        ])
        .service('jassaTemplateValueProvider', jassaTemplateValueProvider);

    function jassaTemplateValueProvider(dataSourceConfigModel)  {

        var provider = this;

        // public function
        provider.getTemplateValueProviderByKey = function(key) {
            switch(key) {
                case ('app'):
                    return appTemplateValueProvider();

                case ('index'):
                    return indexTemplateValueProvider();

                case ('default'):
                    return defaultTemplateValueProvider();

                default:
                    new Error('jassaStrategyService: no TemplateValueProvider found for key ' + key.toString());
            }
        };

        // private functions
        function defaultTemplateValueProvider() {
            return {
                appName: 'myApp'
            };
        }

        function appTemplateValueProvider() {
            return {
                appName: 'myApp',
                dataSourceDefinitionObject: generateDataSourceDefinitionObject(dataSourceConfigModel),
                mapConfig: '{ foo: 121212}'
            };
        }

        function generateDataSourceDefinitionObject(dataSourceConfigModel) {
            var dataSourceDefinitionObject = dataSourceConfigModel.createFromScaffoldingConfig();

            return JSON.stringify(
                dataSourceDefinitionObject, null, 2
            );
        }

        function indexTemplateValueProvider() {
            return {
                appName: 'myApp',
                mappify: ' <mappify id="map" datasource="main.datasource" config="main.config"></mappify>',
                googleMaps: ''
            };
        }

    }
})();
