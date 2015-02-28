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
            return mapConfigModel.createMapConfigFromScafoldingConfig();
        };

        // @notice add other data source here
        // we only handle jassa
        main.getDataSource = function() {
            return handleJassaDataSource(main.getMapConfig(), jassaDataSourceFactory);
        };

        main.refreshConfig = function(){
            main.showMap = false;
            main.config = main.getMapConfig();
            main.datasource = main.getDataSource();


            $timeout(function(){
                main.showMap = true;
            },500);
        };

        main.config = {
            viewCenter: {
                latitude:  51.339018,
                longitude: 12.3797776
            },
            zoom: 15
        };

        main.datasource = {};
        main.datasource.fetchData = function () {
            return [
            ];
        };
    }

    function handleJassaDataSource(dataSourceConfig, jassaDataSourceFactory) {

        var dataSource = jassaDataSourceFactory.create(dataSourceConfig);

        return [
            dataSource
        ];
    }

})();