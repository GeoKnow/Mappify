(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.markerStyle', [])

        .controller('MarkerStyleCtrl', MarkerStyleCtrl);

    function MarkerStyleCtrl($modalInstance, availableMarkerStyles) {

        var modal = this;

        modal.search = {};

        modal.availableMarkerStyles = availableMarkerStyles;

        modal.unSelectedColor = '#3887be';
        modal.selectedColor   = '#56b881';
        modal.icon = 'flask';

        modal.cancel = function(){
            $modalInstance.dismiss();
        };

        modal.close = function(){
            $modalInstance.close(modal.tl);
        };
    }

})();