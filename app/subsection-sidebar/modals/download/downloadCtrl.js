(function () {
    'use strict';

    angular.module('mappifyApp.sidebar.download', [])

        .controller('DownloadCtrl', DownLoadCtrl)
        .config(function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
        })
    ;

    function DownLoadCtrl($modalInstance, config) {

        var modal = this;

        modal.config = config;

        function getBlobURL() {
            var blob = new Blob([modal.config], {type: 'application/json'});
            return URL.createObjectURL(blob);
        }

        modal.blobURL = getBlobURL();

        modal.cancel = function(){
            $modalInstance.dismiss();
        };

        // modalInstance resolves the promise
        modal.close = function(){
            $modalInstance.close(modal.json);
        };

    }

})();