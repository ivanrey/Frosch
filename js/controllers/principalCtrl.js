angular.module('Frosch')
    .controller('PrincipalCtrl',
    function ($scope, $state, chico, config, hotkeys, audio) {

        var lanzamientoAudio = new audio("assets/sounds/lanzamiento.ogg");
        var keymap = config.configuracion.keymap;
        $scope.jugadores = chico.getJugadores();
        $scope.config = config;
        $scope.chico = chico;

        $scope.jugadores[0].activar();


        function rotar(orificio) {
            $('.orificios .argollas .argolla:eq(' + (orificio - 1) + ')').addClass('rotar')
                .on('webkitTransitionEnd', function () {
                    $(this).removeClass('rotar');
                });
            lanzamientoAudio.play();
        }

        $scope.sumarPuntos = function (orificio) {
            if (!chico.jugadorActual.terminoTurno) {
                rotar(orificio);

                chico.jugadorActual.sumarPuntos(config.configuracion.orificios[orificio - 1]);

                if (orificio == config.configuracion.orificioRana)
                    $state.go('jugar.chico.principal.rana');

                if (orificio == config.configuracion.orificioRanita)
                    $state.go('jugar.chico.principal.ranita');

                if (chico.jugadorActual.monona)
                    $state.go('jugar.chico.principal.monona');

                chico.verificarTurno();

                if (chico.termino)
                    $state.go('jugar.chico.termino');
            }
        };

        $scope.cambiarTurno = function (turno) {
            try {
                this.chico.cambiarTurno(turno);
                if (this.chico.jugadorAnterior.blanqueado) {
                    $state.go('jugar.chico.principal.blanqueado');
                }
            }
            catch (e) {
                console.error(e)
            }
        };


        // Hotkeys para los orificios
        var sumarPuntosCk = function sumarPuntosCk(orificio) {
            return function () {
                return $scope.sumarPuntos(orificio);
            }
        };

        var hotkeysBound = hotkeys.bindTo($scope);
        angular.forEach(config.configuracion.orificios, function (orificio, indice) {
            var numOrificio = indice + 1;
            hotkeysBound.add({
                combo: keymap['orificio' + numOrificio],
                callback: sumarPuntosCk(numOrificio)
            })
        });

        var cambiarTurnoCk = function cambiarTurnoCk(turno) {
            return function () {
                $scope.cambiarTurno(turno);
                $state.go('jugar.chico.principal'); //por si esta en rana, ranita o blanqueado
            }
        };

        // Hotkeys para cambios de turno
        for (var i = 1; i <= 6; i++) {
            hotkeysBound.add({
                combo: keymap['jugador' + i],
                callback: cambiarTurnoCk(i)
            })
        }

    });
