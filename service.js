var app = angular.module('app', []);

// factory is an function which return creates and returns an function
app.factory('config', function () {
    return {
        geoVocabulary: 'wgs84'
    }
});

app.controller('AppCtrl', function($scope, config) {
    $scope.geoVocabulary = config.geoVocabulary;
});