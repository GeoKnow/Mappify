(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.tileLayer', [])

        .controller('TileLayerCtrl', TileLayerCtrl);

    function TileLayerCtrl($modalInstance, tileLayer, availableTileLayer) {

        var modal = this;
        modal.tl = tileLayer.tileLayer;
        modal.availableTileLayer = availableTileLayer;


        modal.cancel = function(){
            $modalInstance.dismiss();
        };

        modal.close = function(){
            $modalInstance.close(modal.tl);
        };
    }

})();