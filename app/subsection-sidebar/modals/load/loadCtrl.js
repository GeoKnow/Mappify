(function () {
    'use strict';

    var title = 'Load Config';

    angular.module('mappifyApp.sidebar.load', [
            'mappifyApp.sidebar.configService'
        ])
        .config(function (configServiceProvider) {
            var description = {
                order: 0,
                title: title,
                fileName: 'load',
                icon: 'cloud-upload',
                ctrl: LoadCtrl
            };

            var resolve = {
                exampleContainer: /*@ngInject*/ function (exampleContainerModel) {
                    return exampleContainerModel.getContainer();
                }
            };

            configServiceProvider.registerConfig(description, resolve);
        });


    /*@ngInject*/
    function LoadCtrl($modalInstance, scaffoldingConfigModel, exampleContainer) {

        var modal = this;

        modal.title = title;
        modal.json = '';
        modal.exampleContainer = exampleContainer;

        modal.selectExample = function(selectedExample) {
            modal.json = JSON.stringify(selectedExample.config, null, 2);
            console.log(selectedExample);
        };

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function () {
            scaffoldingConfigModel.loadConfigModelFromJSON(modal.json);
            $modalInstance.close(modal.json);
        };

    }

})();