(function () {
    'use strict';

    var title = 'Change Sponate Mapping';

    angular.module('mappifyApp.sidebar.sponate', [
        'mappifyApp.sidebar.configService'
    ])

        .config(function (configServiceProvider) {
            var description = {
                id: 'sponate',
                order: 30,
                title: title,
                fileName: 'sponate',
                icon: 'random',
                ctrl: SponateCtrl
            };

            configServiceProvider.registerConfig(description);
        });

    /*@ngInject*/
    function SponateCtrl($modalInstance) {

        var modal = this;

        modal.title = title;

        modal.sponate = '';

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function () {
            $modalInstance.close(modal.sponate);
        };

    }

})();