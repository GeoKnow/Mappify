(function () {
    'use strict';

    var title = 'Generate Angular App';

    angular.module('mappifyApp.sidebar.generator', [
            'mappifyApp.sidebar.configService',
            'mappifyApp.generator'
        ])
        .config(function (configServiceProvider) {

            var description = {
                id: 'generator',
                order: 1000,
                fileName: 'generator',
                title: title ,
                icon: 'cogs',
                ctrl: GeneratorCtrl
            };

            var resolve = {
                layout: /*@ngInject*/ function (scaffoldingConfigModel) {
                    var currentLayout = scaffoldingConfigModel.getCurrentConfig('layout');
                    return {
                        zoom: currentLayout.zoom,
                        lat: currentLayout.viewCenter.latitude,
                        lng: currentLayout.viewCenter.longitude
                    };
                }
            };

            console.log('lkadsjlkdjslkfjjldflkjsflkjsljkf   generatir');

            configServiceProvider.registerConfig(description, resolve);
        });

    /*@ngInject*/
    function GeneratorCtrl($modalInstance, generatorService) {

        var modal = this;

        var selectedTemplateId = 'jassa';

        modal.title = title;
        modal.availableTemplates = generatorService.getAllRegisteredStrategies();
        modal.zipIsReady = false;
        modal.zipBlobURL = null;

        modal.generateApp = function() {

            try {
                generatorService.generateApp(selectedTemplateId).then(function(zip) {
                    modal.zipBlobURL  = createZipAsBlobUrl(zip);
                    modal.zipIsReady  = true;
                });
            } catch (e) {
                console.log('lskdjvlkjds');
                console.log('lskdjvlkjds');
                console.log('lskdjvlkjds');
                console.log('lskdjvlkjds');
                console.log('lskdjvlkjds');
                console.log('lskdjvlkjds');
                console.log('lskdjvlkjds');

            }
        };

        modal.selectTemplate = function(templateId) {
            selectedTemplateId = templateId;
        };

        modal.isSelected = function(templateId) {
            return selectedTemplateId === templateId;
        };

        modal.cancel = function () {
            $modalInstance.dismiss();
        };

        modal.close = function () {
            $modalInstance.close(modal.layout);
        };
    }

    function createZipAsBlobUrl(zip) {

        var content;
        if (JSZip.support.uint8array) {
            content = zip.generate({type : 'uint8array'});
        } else {
            content = zip.generate({type : 'string'});
        }

        var blob = new Blob([content], {type: 'application/zip'});
        return URL.createObjectURL(blob);
    }

})();