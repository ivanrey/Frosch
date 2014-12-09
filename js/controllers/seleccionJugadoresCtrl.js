angular.module('Frosch')
    .controller('SeleccionJugadoresCtrl',
    function ($scope, $rootScope, $state, config, hotkeys) {


        $scope.iniciar = function () {
            if ($scope.creditosExactos()) {
                config.setNumJugadores($scope.numJugadores());
                $rootScope.creditos -= $scope.numJugadores() * config.creditosPorJugador();
                $state.go('jugar.chico.principal');
            }
        };

        hotkeys.bindTo($scope)
            .add({
                combo: config.configuracion.keymap.enter,
                callback: $scope.iniciar
            });

        if (!config.puntos)
            $state.go('jugar.chico.seleccionPuntos');

        $scope.config = config;

        $scope.numJugadores = function () {
            return Math.min($scope.creditos / config.creditosPorJugador(), 6);
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