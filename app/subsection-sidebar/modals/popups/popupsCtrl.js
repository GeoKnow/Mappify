(function () {
    'use strict';

    var title = 'Change Popup Template';

    angular.module('mappifyApp.sidebar.popups', [
        'mappifyApp.sidebar.configService'
    ])

        .config(function (configServiceProvider) {
            var description = {
                order: 90,
                title: title,
                fileName: 'popups',
                icon: 'share-square-o',
                ctrl: PopupCtrl
            };

            configServiceProvider.registerConfig(description);
        });

    /*@ngInject*/
    function PopupCtrl($modalInstance) {

        var modal = this;

        modal.title = title;

        modal.popups = '';

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function () {
            $modalInstance.close(modal.popups);
        };

    }

})();