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

        main.datasource = {
            fetchData: function () {
                return [];
            }
        };

        main.config = getMappifyMapConfig();

        main.getMapConfig = function () {
            return getMappifyMapConfig();
        };

        function init() {
            main.datasource = jassaDataSourceFactory
                .createDataSource(dataSourceDefinitionObject);
        }

        init();
    }

})();