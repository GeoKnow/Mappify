(function () {
    'use strict';

    angular.module('<%= appName %>',
        [
            'mappify',
            '<%= appName %>.service.jassaDataSourceFactory'
        ])
        .controller('AppCtrl', AppCtrl);

    // this function return an object containing your specified map configuration
    function getMappifyMapConfig() {
        return <%= mapConfig %>;
    }

    var dataSourceDefinitionObject = <%= dataSourceDefinitionObject %>;

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