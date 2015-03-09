angular.module('Frosch')
    .controller('PrincipalCtrl',
  function ($scope, $state, chico, config, hotkeys, audio, $timeout) {

        if ($scope.configurarAudio) //en pruebas arranca aca de una entonces no esta el audio activo
            $scope.configurarAudio.stop();

        var lanzamientoAudio = new audio("lanzamiento.ogg", false);
        var cambioJugadorAudio = new audio("c_jugador.ogg", true);

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

                else if (orificio == config.configuracion.orificioRanita)
                    $state.go('jugar.chico.principal.ranita');

                else if (chico.jugadorActual.monona)
                    $state.go('jugar.chico.principal.monona');

                else if (chico.jugadorActual.gano)
                    $state.go('jugar.chico.principal.ganaste');


                chico.verificarTurno();
            }
        };

        $scope.cambiarTurno = function (turno) {

            if ($state.current.name != 'jugar.chico.principal')
                return; //por ahora no se cambia de turno en notificaciones

            try {
                this.chico.cambiarTurno(turno);
              $timeout(function () {
                cambioJugadorAudio.play();
              }, this.chico.jugadorAnterior.blanqueado ? 3000 : 0);

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
            }
        };

        // Hotkeys para cambios de turno
        for (var i = 1; i <= 6; i++) {
            hotkeysBound.add({
                combo: keymap['jugador' + i],
                callback: cambiarTurnoCk(i)
            })
        }

        //para poder terminar temprano el juego
        hotkeysBound
            .add({
                combo: keymap.arriba+' '+keymap.abajo + ' ' + keymap.arriba+' '+keymap.abajo + ' ' + keymap.arriba+' '+keymap.abajo+' '+keymap.enter,
                callback: function(){
                    $state.go('inicio');
                }
            })

    });
