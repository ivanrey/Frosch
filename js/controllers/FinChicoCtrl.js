angular.module('Frosch')
    .controller('FinChicoCtrl', function ($scope, $state, hotkeys, chico, tanda) {

        $scope.numChico = tanda.chicos.length;
        tanda.finalizarChico(chico);

        $scope.tanda = tanda;

        $scope.config = chico.configuracion;

        $scope.primerGanador = chico.ganadores[0];
        $scope.callback = {
            configurar: function configurar(opcion) {

                if (opcion == '1') {
                    $state.go('jugar.nuevoChico');

                } else if (opcion == '2')
                    $state.go('inicio')
            }
        }

    });