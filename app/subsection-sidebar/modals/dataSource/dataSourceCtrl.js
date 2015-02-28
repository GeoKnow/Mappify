(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.dataSource', ['zenubu.input'])
        .controller('DataSourceCtrl', DataSourceCtrl);

    function DataSourceCtrl($modalInstance, availableServices) {

        var modal = this;
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

        modal.cancel = function(){
            $modalInstance.dismiss();
        };

        modal.close = function(){
            appendSelectedServiceToDataSource();
            $modalInstance.close(modal.ds);
        };
    }

})();