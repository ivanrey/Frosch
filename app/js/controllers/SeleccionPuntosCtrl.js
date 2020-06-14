angular.module('Frosch')
    .controller('SeleccionPuntosCtrl',
    function ($scope, $state, config) {

        $scope.seleccionado = 0;

        $scope.puntajes = config.configuracion.puntajes;
        $scope.config = config;

        $scope.callback = {
            configurar: function configurar(opcion) {
                config.puntos = config.configuracion.puntajes[opcion - 1];
                $state.go('jugar.chico.seleccionJugadores')

            }
        };

        $scope.getNumber = function(number){
            return new Array(number);
        };

    });