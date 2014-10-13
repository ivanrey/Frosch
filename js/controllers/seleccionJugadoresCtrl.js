angular.module('Frosch')
    .controller('SeleccionJugadoresCtrl',
    function ($scope, $state, config, audio, hotkeys) {

        var monedaAudio = new audio('assets/sounds/moneda.ogg');

        hotkeys.bindTo($scope)
            .add({
                combo: 'enter',
                callback: function () {
                    if ($scope.creditosExactos()) {
                        config.setNumJugadores($scope.numJugadores());
                        $state.go('jugar.principal');
                    }
                }
            });

        if (!config.puntos)
            $state.go('jugar.seleccionPuntos');


        $scope.agregarCredito = function () {
            $scope.creditos++;

            monedaAudio.play();

        };

        $scope.numJugadores = function () {
            return $scope.creditos / config.creditosPorJugador();
        };

        $scope.creditosJugador = function (numJugador) {
            return $scope.numJugadores() - (numJugador - 1);
        };

        $scope.creditosExactos = function () {
            return $scope.creditos && Math.round($scope.numJugadores()) === $scope.numJugadores();
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