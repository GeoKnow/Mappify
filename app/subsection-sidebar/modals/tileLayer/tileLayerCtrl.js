(function () {
    'use strict';

    var title = 'Change TileLayers';

    angular.module('mappifyApp.sidebar.tileLayer', [
            'mappifyApp.sidebar.configService'
        ])
        .config(function (configServiceProvider) {
            var description = {
                id: 'tileLayer',
                order: 70,
                title: title,
                fileName: 'tileLayer',
                icon: 'globe',
                ctrl: TileLayerCtrl
            };

            var resolve = {
                tileLayer: /*@ngInject*/ function (scaffoldingConfigModel) {
                    var currentLayoutTileLayer = scaffoldingConfigModel.getCurrentConfig('tileLayer');
                    return {
                        tileLayer: currentLayoutTileLayer
                    };
                },
                availableTileLayer: /*@ngInject*/ function (tileLayerModel) {
                    return tileLayerModel.getTileLayers();
                }
            };

            configServiceProvider.registerConfig(description, resolve);

        });

    /*@ngInject*/
    function TileLayerCtrl($modalInstance, tileLayer, availableTileLayer, scaffoldingConfigModel) {

        var modal = this;

        modal.title = title;

        modal.tl = tileLayer.tileLayer;
        modal.availableTileLayer = availableTileLayer;


        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        modal.close = function () {
            scaffoldingConfigModel.setTileLayer(modal.tl);
            $modalInstance.close(modal.tl);
        };
    }

})();