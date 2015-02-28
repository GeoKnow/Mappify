(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.download', [])

        .controller('DownloadCtrl', DownLoadCtrl);

    function DownLoadCtrl($modalInstance, config) {

        var modal = this;

        modal.config = config;

        modal.getBlobURL = function () {
            var blob = new Blob([modal.config], {type: 'application/json'});
            return URL.createObjectURL(blob);
        };

        modal.cancel = function(){
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function(){
            $modalInstance.close(modal.json);
        };

    }

})();