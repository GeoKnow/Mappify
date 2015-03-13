(function () {
    'use strict';

    var title = 'Change DataSource';

    angular.module('mappifyApp.sidebar.dataSource', [
            'zenubu.input',
            'mappifyApp.sidebar.configService'
        ])
        .config(function (configServiceProvider) {
            var description = {
                order: 20,
                title: title,
                fileName: 'dataSource',
                icon: 'database',
                ctrl: DataSourceCtrl
            };

            var resolve = {
                availableServices: /*@ngInject*/ function (dataSourceServiceModel) {
                    return dataSourceServiceModel.getDataSourceServices();
                }
            };

            configServiceProvider.registerConfig(description, resolve);

        });

    /*@ngInject*/
    function DataSourceCtrl($modalInstance, availableServices, scaffoldingConfigModel) {

        var modal = this;

        modal.title = title;

        modal.ds = {};
        modal.selectedService = null;
        modal.availableServices = availableServices;

        function appendSelectedServiceToDataSource() {
            // we use serviceIdentifier insteadof serviceId to highlight the fact
            // that the identifier can be form type int or string
            function findService(serviceIdentifier) {
                return _.find(availableServices, function (service) {
                    return service.id === serviceIdentifier;
                });
            }

            if (null !== modal.selectedService) {
                modal.ds.service = findService(modal.selectedService);
            }
        }

        modal.toggleServiceSelection = function (serviceId) {
            if (serviceId === modal.selectedService) {
                modal.selectedService = null;
            } else {
                modal.selectedService = serviceId;
            }
        };

        modal.isServiceSelected = function (serviceId) {
            return (serviceId === modal.selectedService);
        };

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        modal.close = function () {
            appendSelectedServiceToDataSource();

            scaffoldingConfigModel.setSetDataSource(modal.ds);
            $modalInstance.close(modal.ds);
        };
    }

})();