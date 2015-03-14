(function () {
    'use strict';

    angular.module('mappifyApp.generator', [
            'mappifyApp.generator.jassa'
        ])
        .service('generatorService', generatorService);

    // @improvement write meaningful error messages
    function generatorService($q, jassaStrategyService)  {

        var service = this;

        var strategySet = {
            jassa: {
                id: 'jassa',
                displayName: 'Jassa strategy',
                description:
                    'create angular app using jassa as datasource' +
                    'and the mappify map component to visualize the data'
            }
        };

        function getStrategyNameAndHandleExistenceCheck(strategyName) {

            if (! strategySet.hasOwnProperty(strategyName)) {
                throw new Error('generatorService: the provided generator strategy is not supported');
            }

            // @improvement move to separate container
            if (strategyName === 'jassa') {
                return jassaStrategyService;
            }

            throw new Error('generatorService: no service found');
        }

        function createJsZip(data) {

            var zip = new JSZip();

            _.each(data, function(file){
                if (file.hasOwnProperty('folder')) {
                    zip.folder(file.folder).file(file.fileName, file.fileContent);
                } else {
                    zip.file(file.filename, file.fileContent);
                }
            });

            return zip;
        }

        // public methods / public api
        service.getAllRegisteredStrategies = function() {
            return strategySet;
        };

        service.generateApp = function (strategyName) {

            // check if strategy exists
            var strategy = getStrategyNameAndHandleExistenceCheck(strategyName);

            // if it does execute it
            return strategy.generate().then(function(data) {
                return createJsZip(data);
            });
        };

    }
})();




