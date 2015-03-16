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

            configServiceProvider.registerConfig(description);
        });

    /*@ngInject*/
    function MapSettingsCtrl($modalInstance) {

        var modal = this;

        modal.title = title;

        modal.mapSettings = '';

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function () {
            $modalInstance.close(modal.mapSettings);
        };

    }

})();