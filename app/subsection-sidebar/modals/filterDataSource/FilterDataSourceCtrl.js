(function () {
    'use strict';

    var title = 'Filter DataSource';

    angular.module('mappifyApp.sidebar.filterDataSource', [
        'mappifyApp.sidebar.configService'
    ])

        .config(function (configServiceProvider) {
            var description = {
                id: 'filterDataSource',
                order: 25,
                title: title,
                fileName: 'filterDataSource',
                icon: 'filter',
                ctrl: FilterDataSourceCtrl
            };

            configServiceProvider.registerConfig(description);
        });

    /*@ngInject*/
    function FilterDataSourceCtrl($modalInstance, mapService) {

        var modal = this;
        modal.title = title;



        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function () {
            $modalInstance.close(modal.popups);
            mapService.triggerAutoRefreshConfig();
        };

    }

})();