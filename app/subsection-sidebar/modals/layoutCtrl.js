(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.layout', [])

        .controller('LayoutCtrl', LayoutCtrl);

    function LayoutCtrl($modalInstance, layout) {

        var modal = this;

        modal.layout = layout;

        modal.cancel = function(){
            $modalInstance.dismiss();
        };

        modal.close = function(){
            $modalInstance.close(modal.layout);
        };

    }

})();