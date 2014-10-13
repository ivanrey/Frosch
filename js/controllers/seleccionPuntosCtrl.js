angular.module('Frosch')
    .controller('SeleccionPuntosCtrl',
    function ($scope, $state, config) {

        $scope.seleccionado = 0;

        $scope.puntajes = config.configuracion.puntajes;

        $scope.callback = {
            configurar: function configurar(opcion) {
                config.puntos = config.configuracion.puntajes[opcion - 1];
                $state.go('jugar.chico.seleccionJugadores')

            }
        }
    });