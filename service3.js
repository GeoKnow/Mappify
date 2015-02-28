var app = angular.module('app', []);

app.provider('config', function () {
    var geoVocabulary = 'wgs84';
    return {
        setGeoVocabulary: function(value) {
            geoVocabulary = value
        },
        $get: function() {
            return {
                geoVocabulary: geoVocabulary
            }
        }
    }
});

app.config(function(configProvider) {
    configProvider.setGeoVocabulary('geoSparql')
});

app.controller('AppCtrl', function($scope, config) {
    $scope.geoVocabulary = config.geoVocabulary;
});


