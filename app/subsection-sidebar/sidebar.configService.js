(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.configService', [])
        .provider('configService', configServiceProvider);

    function configServiceProvider() {

        var configs = {};

        return {
            registerConfig: registerConfig,
            $get: configService
        };

        function registerConfig(description, resolveFunctions, callbackFunction) {
            if (_.isFunction(resolveFunctions)) {
                callbackFunction = resolveFunctions;
                resolveFunctions = {};
            }

            if (!_.isFunction(callbackFunction)) {
                callbackFunction = function () {
                };
            }

            configs[description.order + description.fileName] = {
                description: description,
                resolveFunctions: resolveFunctions,
                callbackFunction: callbackFunction
            };
        }

        /*@ngInject*/
        function configService($modal) {
            var service = {};

            service.availableConfigs = [];

            _(configs)
                .sortBy(function (config) {
                    return config.description.order;
                })
                .forEach(function (config) {
                    createConfig(config.description, config.resolveFunctions, config.callbackFunction);
                })
                .value();

            service.getGeneratorModal = function() {
                return _.find(service.availableConfigs, function(modal) {
                    return modal.id === 'generator';
                });
            };

            return service;

            function createConfig(description, resolveFunctions, callbackFunction) {

                service.availableConfigs.push({
                    id: description.id,
                    title: description.title,
                    icon: description.icon,
                    open: function () {
                        return openModal({
                            template: '/subsection-sidebar/modals/' + description.fileName + '/' + description.fileName + '.tpl.html',
                            controller: description.ctrl,
                            controllerAs: 'modal',
                            resolve: resolveFunctions
                        }).then(callbackFunction);
                    }
                });
            }

            function openModal(options) {
                return $modal.open(options).then(function (modalInstance) {
                    return modalInstance.result;
                });
            }

        }

    }


})();