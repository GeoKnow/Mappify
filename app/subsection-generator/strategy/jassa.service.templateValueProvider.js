(function () {
    'use strict';

    angular.module('mappifyApp.generator.jassa.templateValueProvider', [
            'mappifyApp.models.dataSourceConfigModel',
            'mappifyApp.models.scaffoldingConfigModel'
        ])
        .service('jassaTemplateValueProvider', jassaTemplateValueProvider);

    function jassaTemplateValueProvider(dataSourceConfigModel, mapConfigModel)  {

        var provider = this;

        var appName = 'myApp';

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
                appName: appName
            };
        }

        function appTemplateValueProvider() {
            return {
                appName: appName,
                dataSourceDefinitionObject: generateDataSourceDefinitionObject(dataSourceConfigModel),
                mapConfig: generateMapConfig()
            };
        }

        function generateDataSourceDefinitionObject(dataSourceConfigModel) {
            return toJson(dataSourceConfigModel.createFromScaffoldingConfig());
        }

        function generateMapConfig() {
            return toJson(mapConfigModel.createFromScafoldingConfig());
        }

        function toJson(element) {
            return JSON.stringify(
                element, null, 2
            ).replace(/"/g, '\'');
        }

        // @notice it works but should be improved
        function indexTemplateValueProvider() {
            return {
                appName: appName,
                mappify: ' <mappify id="map" datasource="main.datasource" config="main.config"></mappify>',
                googleMaps: ''
            };
        }

    }
})();
