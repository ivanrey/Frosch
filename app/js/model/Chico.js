angular.module('Frosch')
    .factory('ChicoCls', function (JugadorCls) {

        /**
         * @param config ConfiguracionService
         */
        var chicoCls = function (config) {
            this.configuracion = config;
            this.jugadores = [];
            this.ganadores = [];
            this.termino = false;

            this.buscarSiguienteJugador = function buscarSiguienteJugador() {
                var i = this.numJugadorActual;
                var nuevoJugador = null;
                do {
                    nuevoJugador = this.jugadores[(i + 1) % this.jugadores.length];
                    i++;
                } while (!nuevoJugador.enJuego() && nuevoJugador != this.jugadorActual);
                return nuevoJugador;
            };

            Object.defineProperty(this, 'numJugadorActual', {
                get: function () {
                    return this.jugadorActual.numero - 1;
                }
            });

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

            if (this.jugadorActual.gano) {
                this.ganadores.push(this.jugadorActual);
            }

            var activos = 0;
            for (var i = 0; i < this.jugadores.length; i++) {
                if (this.jugadores[i].enJuego()) {
                    activos++
                }
            }

            if (activos < 2) // mínimo 2 jugadores para seguir el chico
            {
                this.termino = true;
            }

        };

        chicoCls.prototype.cambiarTurno = function (turno) {
            //busqueda del nuevo jugador


            var siguiente = this.buscarSiguienteJugador();
            if (turno === true || this.jugadores[turno - 1] == siguiente) {
                this.jugadorAnterior = this.jugadorActual;
                this.jugadorActual = siguiente;

            } else {
                throw new Error("El siguiente turno no es " + turno)
            }

            this.jugadorAnterior.desactivar();

            this.jugadorActual.activar();

            this.verificarTurno();

        };

        return chicoCls;
    }
)
;