(function () {
    'use strict';

    var title = 'Map Settings';

    angular.module('mappifyApp.sidebar.mapSettings', [
            'mappifyApp.sidebar.configService'
        ])
        .config(function (configServiceProvider) {
            var description = {
                id: 'mapSetting',
                order: 95,
                title: title,
                fileName: 'mapSettings',
                icon: 'cog',
                ctrl: MapSettingsCtrl
            };

            var resolve = {
                availableMapOptions: /*@ngInject*/ function (mapSettingOptionModel) {
                    return mapSettingOptionModel.getOptions();
                }
            };

            configServiceProvider.registerConfig(description, resolve);
        });

    /*@ngInject*/
    function MapSettingsCtrl($modalInstance, availableMapOptions, scaffoldingConfigModel, mapService) {

        var modal = this;
        var providedConfigValues = scaffoldingConfigModel.getCurrentConfigForMapOptions();

        modal.title = title;
        modal.mapSettings = extractValuesFromDefaultAndProvidedConfig(availableMapOptions, providedConfigValues);

        modal.getDescriptionForOption = function (optionKey) {
            // @improvement - handle existence check
            return availableMapOptions[optionKey].description;
        };

        modal.setOption = function(key, value) {
            modal.mapSettings[key] = value;
        };

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function () {
            scaffoldingConfigModel.setMapOptions(modal.mapSettings);
            $modalInstance.close(modal.mapSettings);

            mapService.triggerAutoRefreshConfig();
        };

        // private functions
        function extractValuesFromDefaultAndProvidedConfig(defaultOptionSet, providedConfig) {

            var data = {};

            // apply all default values
            _.each(defaultOptionSet, function (option) {
                data[option.key] = option.default;
            });

            // over write default values the provided config values ( sub set )
            _.each(providedConfig, function (value, key) {
                data[key] = value;
            });


            return data;
        }
    }

})();