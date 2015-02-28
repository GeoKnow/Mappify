var app = angular.module('app', []);

app.config(function($provide) {
    $provide.provider('config', function () {
        return {
            $get: function() {
                return {
                    geoVocabulary: 'wgs84'
                }
            }
        }
    })
});

app.controller('AppCtrl', function($scope, config) {
    $scope.geoVocabulary = config.geoVocabulary;
});