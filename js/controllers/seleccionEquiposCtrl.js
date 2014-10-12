angular.module('Frosch')
    .controller('SeleccionEquposCtrl',
    function ($scope, $state, hotkeys, config) {

        $scope.callback = {
            configurar: function configurar(opcion) {
                config.setMaxPorEquipo(opcion);
                $state.go('jugar.seleccionPuntos')
            }
        };


    });