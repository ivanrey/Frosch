angular.module('Frosch')
    .controller('FinChicoCtrl', function ($scope, $state, hotkeys, chico, tanda) {

        $scope.numChico = tanda.chicos.length;


    });