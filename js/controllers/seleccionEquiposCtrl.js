angular.module('Frosch')
    .controller('SeleccionEquposCtrl',
    function ($scope, hotkeys, config) {

        $scope.configurar = function configurar(opcion) {
            config.setMaxPorEquipo(opcion);
            console.log('opcion ' + opcion);
        }
    });