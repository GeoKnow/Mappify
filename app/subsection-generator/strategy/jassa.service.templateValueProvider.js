(function () {
    'use strict';

    angular.module('mappifyApp.generator.jassa.templateValueProvider', [])
        .service('jassaTemplateValueProvider', jassaTemplateValueProvider);

    function jassaTemplateValueProvider()  {

        var provider = this;

        // public function
        provider.getTemplateValueProviderByKey = function(key) {
            switch(key) {
                case ('app'):
                    return appTemplateValueProvider();
                    break;
                case ('index'):
                    return indexTemplateValueProvider();
                    break;
                case ('jassa'):
                    return jassaTemplateValueProvider();
                    break;
                default:
                    new Error('jassaStrategyService: no TemplateValueProvider found for key ' + key.toString());

            }
        };

        // private functions
        function appTemplateValueProvider() {
            return {
                appName: 'myApp',
                dataSourceDefinitionObject: '{ foo: 12}',
                getMappifyMapConfig: '{ foo: 121212}'
            }
        }

        function indexTemplateValueProvider() {
            return {
                appName: 'myApp',
                mappify: '<mappify></mappify>',
                googleMaps: ''
            }
        }

        function jassaTemplateValueProvider() {
            return {
                appName: 'myApp'
            }
        }

    }
})();
