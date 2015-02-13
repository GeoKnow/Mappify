(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.load', [])

        .controller('LoadCtrl', LoadCtrl);

    function LoadCtrl($modalInstance) {

        var modal = this;

        modal.json = '';

        modal.cancel = function(){
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function(){
            $modalInstance.close(modal.json)
        }

    }

})();