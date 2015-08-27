angular.module('Frosch')
    .controller('SeleccionJugadoresCtrl',
    function ($scope, $rootScope, $state, config, hotkeys) {


        $scope.iniciar = function () {
            if ($scope.creditosExactos()) {
                config.setNumJugadores($scope.numJugadores());
                $rootScope.restarCreditos($scope.numJugadores() * config.creditosPorJugador());
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


        $scope.sonido = function(){
            var creditos = 'credito'+config.creditosPorJugador();
            if(config.equipos)
                creditos += '_equipo';

            return creditos + '.ogg';
        };

        var keymap = config.configuracion.keymap;
        //para poder terminar temprano el juego
        hotkeys.bindTo($scope)
            .add({
                combo: keymap.arriba + ' ' + keymap.abajo + ' ' + keymap.arriba + ' ' + keymap.abajo + ' ' + keymap.arriba + ' ' + keymap.abajo + ' ' + keymap.enter,
                callback: function () {
                    $state.go('inicio');
                }
            })
            .add({
                combo: keymap.arriba,
                callback: function(){
                    if($rootScope.creditos > 0) {
                        $rootScope.creditosExcedente++;
                        $rootScope.creditos--;
                        $rootScope.guardarCreditos();
                    }
                }
            })
            .add({
                combo: keymap.abajo,
                callback: function(){
                    if($rootScope.creditosExcedente > 0) {
                        $rootScope.creditosExcedente--;
                        $rootScope.creditos++;
                        $rootScope.guardarCreditos();
                    }
                }
            })


    });