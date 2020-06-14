angular.module('Frosch')
    .controller('SeleccionBlanqueadaCtrl',
    function ($scope, $state, config) {

        $scope.seleccionado = 0;

        $scope.blanqueadas = config.configuracion.blanqueadas;
        $scope.config = config;

        $scope.callback = {
            configurar: function configurar(opcion) {
                config.blanqueada = config.configuracion.blanqueadas[opcion - 1];
                $state.go('jugar.chico.seleccionPuntos')
            }
        }

    });