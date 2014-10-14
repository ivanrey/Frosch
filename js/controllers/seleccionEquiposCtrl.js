angular.module('Frosch')
    .controller('SeleccionEquposCtrl',
    function ($scope, $state, config) {

        $scope.callback = {
            configurar: function configurar(opcion) {
                config.setMaxPorEquipo(opcion);
                $state.go('jugar.chico.seleccionBlanqueada')
            }
        };

        $scope.config = config;

    });