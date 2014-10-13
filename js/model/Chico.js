angular.module('Frosch')
    .factory('ChicoCls', function (JugadorCls) {

        /**
         * @param config ConfiguracionCls
         */
        var chicoCls = function (config) {
            this.configuracion = config;
            this.jugadores = [];
            this.turno = 1;

        };

        chicoCls.prototype.initJugadores = function () {
            for (var i = 0; i < this.configuracion.numJugadores; i++)
                this.jugadores.push(new JugadorCls(i + 1, this.configuracion.maxPorEquipo));

            this.jugadorActual = this.jugadores[0];
        };

        chicoCls.prototype.getJugadores = function () {
            this.initJugadores();
            return this.jugadores;
        };

        return chicoCls;
    });