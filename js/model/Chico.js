angular.module('Frosch')
    .factory('ChicoCls', function (JugadorCls) {

        /**
         * @param config ConfiguracionCls
         */
        var chicoCls = function (config) {
            this.configuracion = config;
            this.jugadores = [];
            this.turno = 1;
            this.ronda = 1;
            this.termino = false;

        };

        chicoCls.prototype.initJugadores = function () {
            for (var i = 0; i < this.configuracion.numJugadores; i++)
                this.jugadores.push(new JugadorCls(i + 1, this.configuracion));

            this.jugadorActual = this.jugadores[0];
        };

        chicoCls.prototype.getJugadores = function () {
            this.initJugadores();
            return this.jugadores;
        };

        chicoCls.prototype.verificarTurno = function () {
            if (this.jugadorActual.gano)
                this.ganadores.push(jugadorActual);

            var activos = 0;
            for (var i = 0; i < this.jugadores.length; i++) {
                if (this.jugadores[i].enJuego()) {
                    activos++
                }
            }

            if (activos < 2) // mínimo 2 jugadores para seguir el chico
                this.termino = true;

        };

        chicoCls.prototype.cambiarTurno = function (turno) {
            //busqueda del nuevo jugador
            for (var i = 0; i < this.jugadores.length; i++) {
                if (this.jugadores[i] === this.jugadorActual) {
                    this.jugadorAnterior = this.jugadorActual;
                    do {
                        this.jugadorActual = this.jugadores[(i + 1) % this.jugadores.length]
                    } while (!this.jugadorActual.enJuego() && this.jugadorAnterior != this.jugadorActual);
                    break;
                }
            }


            this.jugadorAnterior.desactivar();

            this.jugadorActual.activar();

        };

        return chicoCls;
    }
)
;