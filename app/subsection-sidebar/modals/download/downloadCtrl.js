(function () {
    'use strict';

    var title = 'Download Config';

    angular.module('mappifyApp.sidebar.download', [
        'mappifyApp.sidebar.configService'
    ])

        .config(function (configServiceProvider) {
            var description = {
                order: 100,
                title: title,
                fileName: 'download',
                icon: 'cloud-download',
                ctrl: DownLoadCtrl
            };

            var resolve = {
                config: /*@ngInject*/ function (scaffoldingConfigModel) {
                    return scaffoldingConfigModel.getCurrentConfig();
                }
            };

            configServiceProvider.registerConfig(description, resolve);
        })
        .config(function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
        });

    function DownLoadCtrl($modalInstance, config) {

        var modal = this;

        modal.title = title;
        modal.config = config;

        function getBlobURL() {
            var json = JSON.stringify(modal.config, null, 2);
            var blob = new Blob([json], {type: 'application/json'});
            return URL.createObjectURL(blob);
        }

        modal.blobURL = getBlobURL();

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function () {
            $modalInstance.close(modal.json);
        };

    }

})();