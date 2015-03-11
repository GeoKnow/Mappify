(function () {
    'use strict';

    angular.module('mappifyApp.generator', [
            'ui.router',
            'mappifyApp.service.jassaDataSourceFactory',
        ])
        .service('generatorService', generatorService);

    function generatorService()  {

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

            console.log(strategyName);
            console.log(strategyName);
            console.log(strategyName);
            console.log(strategyName);
            console.log(strategyName);
            console.log(strategyName);
            console.log(strategyName);
            console.log(strategyName);


            if (! strategySet.hasOwnProperty(strategyName)) {
                throw new Error('the provided generator strategy is not supported');
            }

            // todo: fix later - solve with lodash
            return strategySet.jassa;
        }

        // public methods
        service.getAllRegisteredStrategies = function() {
            return strategySet;
        }

        service.generateApp = function (strategyName) {

            // check if strategy exists
            var strategy = getStrategyNameAndHandleExistenceCheck(strategyName);

            // if it does execute it
            // var createFileContent = strategy.generate();

            // take the response and create the zip file with js zip
            console.log('hallo KEILER');


            return {};
        }

    }
})();




