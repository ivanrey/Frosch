angular.module('Frosch')
    .controller('SeleccionJugadoresCtrl',
    function ($scope, $rootScope, $state, config, hotkeys) {

        hotkeys.bindTo($scope)
            .add({
                combo: config.configuracion.keymap.enter,
                callback: function () {
                    if ($scope.creditosExactos()) {
                        config.setNumJugadores($scope.numJugadores());
                        $rootScope.creditos = 0;
                        $state.go('jugar.chico.principal');
                    }
                }
            });

        if (!config.puntos)
            $state.go('jugar.chico.seleccionPuntos');

        $scope.config = config;

        $scope.numJugadores = function () {
            return $scope.creditos / config.creditosPorJugador();
        };

        $scope.creditosJugador = function (numJugador) {
            return $scope.numJugadores() - (numJugador - 1);
        };

        $scope.creditosExactos = function () {
            return $scope.creditos && Math.round($scope.numJugadores()) === $scope.numJugadores() && $scope.numJugadores() > 1;
        };

        $scope.creditosFaltantes = function () {
            if ($scope.numJugadores() == 6)
                return false;

            return config.creditosPorJugador() - ($scope.creditos % config.creditosPorJugador());
        };

        $scope.siguienteJugador = function () {
            return Math.floor($scope.numJugadores() + 1);
        };


    });