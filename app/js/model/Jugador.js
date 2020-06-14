angular.module('Frosch')
    .factory('JugadorCls', function () {

        var jugadorCls = function (numero, config) {
            this.numero = numero;
            this.config = config;
            this.blanqueadas = 0;
            this.puntos = 0;
            this.activo = false;

            this.ultimasArgollas = new Array(this.config.configuracion.maxArgollas);

            this.tiros = [];

            this.turno = 0;

            this.equipo = config.equipos;

            if (this.equipo) {
                this.ronda = -1; //al activarse la primera vez queda en 0
            }
        };

        jugadorCls.prototype.puntosTurno = function () {
            var suma = 0;
            for (var i = 0; i < this.ultimasArgollas.length; i++) {
                if (this.ultimasArgollas[i] == null) {
                    break;
                }
                suma += this.ultimasArgollas[i];

            }
            return suma;
        };

        jugadorCls.prototype.getBlanqueadasArray = function () {
            return new Array(this.blanqueadas);
        };

        jugadorCls.prototype.enJuego = function () {
            return (!this.perdio && !this.gano);
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

            if (this.puntos == this.config.puntos || this.monona) {
                this.gano = true;
                this.desactivar();
            }


        };

        jugadorCls.prototype.validarMonona = function () {

            if (!this.config.configuracion.monona)
                return false; //moñona no activada

            var ranaORanita = false;
            for (var i = 0; i < this.ultimasArgollas.length; i++) {
                if (this.ultimasArgollas[i] == null) {
                    return false;
                }
                if (this.ultimasArgollas[i] == this.config.configuracion.orificios[this.config.configuracion.orificioRana - 1]
                    || this.ultimasArgollas[i] == this.config.configuracion.orificios[this.config.configuracion.orificioRanita - 1])
                    ranaORanita = true;
                else if (this.config.configuracion.mononaSinRepetirOrificio && this.ultimasArgollas.indexOf(this.ultimasArgollas[i]) != i)
                    return false; //orificio repetido
            }
            //si no retorno todas estan llenas
            return ranaORanita;

        };

        jugadorCls.prototype.verificarBlanqueada = function () {
            if (this.ultimasArgollas[0] == null) {
                //no metió ninguna
                this.blanqueado = true;
                this.blanqueadas++;
                this.puntos += this.config.blanqueada * 1;

                if (this.config.blanqueada && this.blanqueadas >= this.config.configuracion.maxBlanqueadas) {
                    //perdió por blanqueadas
                    this.perdio = true;
                }
            }
        };

        jugadorCls.prototype.blanqueadasRestantes = function(){
            return this.config.configuracion.maxBlanqueadas - this.blanqueadas;
        };

        jugadorCls.prototype.activar = function () {

            this.blanqueado = false;
            this.terminoTurno = false;

            var puntosTurno = 0;
            for (var i = 0; i < this.ultimasArgollas.length; i++)
                if (this.ultimasArgollas[i])
                    puntosTurno += this.ultimasArgollas[i];

            if (!puntosTurno)
                puntosTurno = this.config.blanqueada * 1;

            if (this.turno) {
                this.tiros.push(puntosTurno);
                this.ultimasArgollas = new Array(this.config.configuracion.maxArgollas);
            }
            this.turno++;
            this.activo = true;

            if (this.equipo) {
                this.ronda = (this.ronda + 1) % this.config.maxPorEquipo;
            }

        };

        jugadorCls.prototype.desactivar = function () {
            this.activo = false;
            this.terminoTurno = true;
            this.verificarBlanqueada();
        };

        jugadorCls.prototype.codigoRonda = function () {
            return String.fromCharCode(this.ronda + 65);
        };

        return jugadorCls;
    }
)
;