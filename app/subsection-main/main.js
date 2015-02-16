(function () {
    'use strict';

    angular.module('mappifyApp.main',
        [
            'ui.router',
            'mappifyApp.service.jassaDataSourceFactory'
        ])
        .controller('MainController', MainController);

    function MainController(mapConfigModel, $timeout, jassaDataSourceFactory) {

        var main = this;

        main.showMap = true;

        main.getMapConfig = function() {
            // todo: should we cache=
            return mapConfigModel.createMapConfigFromScafoldingConfig();
        };

        // todo - add other data source
        // we only handle jassa
        main.getDataSource = function() {
            return handleJassaDataSource(main.getMapConfig(), jassaDataSourceFactory)
        }

        main.refreshConfig = function(){
            main.showMap = false;
            main.config = main.getMapConfig();
            main.datasource = main.getDataSource();

            console.log(main.config);


            $timeout(function(){
                main.showMap = true;
            },500);
        };

        main.config = {
            viewCenter: {
                latitude:  51.5286416,
                longitude: -0.1015987
            },
            zoom: 6
        };


        main.datasource = {};
        main.datasource.fetchData = function () {
            return [
            ];
        };
    }

    function handleJassaDataSource(dataSourceConfig, jassaDataSourceFactory) {

        console.log('FUCK YEAH!!!!');
        console.log('FUCK YEAH!!!!');
        console.log('FUCK YEAH!!!!');
        console.log('FUCK YEAH!!!!');
        console.log('FUCK YEAH!!!!');
        console.log('FUCK YEAH!!!!');
        console.log(dataSourceConfig);

        var dataSource = jassaDataSourceFactory.create(dataSourceConfig);

        return [
            dataSource
        ];
    }

})();