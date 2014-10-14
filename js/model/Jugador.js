angular.module('Frosch')
    .factory('JugadorCls', function () {

        var jugadorCls = function (numero, config) {
            this.numero = numero;
            this.config = config;
            this.blanqueadas = 3;
            this.puntos = 170;
            this.activo = false;

            this.ultimasArgollas = [140, 30, null, null, null, null];

            this.tiros = {1: 50, 2: -10, 3: 12, 4: 12, 5: 34, 6: 55, 7: 66, 8: 77, 9: 88, 10: 99};

            this.turno = 3;
        };

        jugadorCls.prototype.activar = function () {
            this.activo = true;
        };

        jugadorCls.prototype.desactivar = function () {
            this.activo = false;
        };

        jugadorCls.prototype.getBlanqueadasArray = function () {
            return new Array(this.blanqueadas);
        };


        jugadorCls.prototype.sumarPuntos = function (puntos) {

            var i = 0;
            for (; i < this.ultimasArgollas.length; i++) {
                if (this.ultimasArgollas[i] == null) {
                    this.ultimasArgollas[i] = puntos;
                    break;
                }
            }

            this.puntos += puntos;

            this.puntos = Math.min(this.puntos, this.config.puntos); // no podemos pasarnos del maximo

            this.monona = this.validarMonona();
            if (this.monona) {
                this.puntos = this.config.puntos;
            }

            if (i == this.ultimasArgollas.length - 1 || this.puntos == this.config.puntos)
                this.terminoTurno = true;

            if (this.puntos == this.config.puntos || this.monona)
                this.gano = true;

        };

        jugadorCls.prototype.validarMonona = function (puntos) {
            var ranaORanita = false;
            for (var i = 0; i < this.ultimasArgollas.length; i++) {
                if (this.ultimasArgollas[i] == null) {
                    return false;
                }
                if (this.ultimasArgollas[i] == this.config.configuracion.orificios[this.config.configuracion.orificioRana - 1]
                    || this.ultimasArgollas[i] == this.config.configuracion.orificios[this.config.configuracion.orificioRanita - 1])
                    ranaORanita = true;
            }
            //si no retorno todas estan llenas
            return ranaORanita;

        };

        return jugadorCls;
    }
)
;