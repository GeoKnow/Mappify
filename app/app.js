(function () {
    'use strict';

    angular.module('mappifyApp', [
        'mappifyApp.sidebar',
        'mappifyApp.main',
        'zenubu.ngStrap',
        'mappify',
        'ui.router'
    ])
        .controller('AppCtrl', AppCtrl)
        .filter('translate', translateFilter)
        .config(stateProviderConfig);

    function translateFilter(){
        return function(string){
            return string;
        };
    }

    function stateProviderConfig($stateProvider, $urlRouterProvider) {
        $stateProvider.state('root', {
            url: '/',
            views: {
                sidebar: {
                    controller: 'SidebarController',
                    controllerAs: 'sidebar',
                    templateUrl: '/subsection-sidebar/sidebar.tpl.html'
                },
                map: {
                    controller: 'MainController',
                    controllerAs: 'main',
                    templateUrl: '/subsection-main/main.tpl.html'

                }
            }
        });

        $urlRouterProvider.otherwise('/');
    }

    /* @ngInject */
    function AppCtrl() {

    }

})();