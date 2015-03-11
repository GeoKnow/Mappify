(function () {
    'use strict';

    angular.module('<%= appName %>',
        [
            'mappify',
            '<%= appName %>.service.jassaDataSourceFactory'
        ])
        .controller('AppCtrl', AppCtrl);

    // this object contains your specified map configuration
    function getMappifyMapConfig() {
        return {};
    }

    var dataSourceDefinitionObject = {
        service: '',
        graphUris: [''],
        geoMapType: 'wkt'

    };

    /* @ngInject */
    function AppCtrl(jassaDataSourceFactory) {
        var main = this;

        main.getDataSource = function() {
            return jassaDataSourceFactory
                .createJassaDataSource(dataSourceDefinitionObject);
        }

        main.dataSource = main.getDataSource();

        main.getMapConfig = function() {
            return getMappifyMapConfig();
        }
    }

})();