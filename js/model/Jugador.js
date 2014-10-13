angular.module('Frosch')
    .factory('JugadorCls', function () {

        var jugadorCls = function (numero, numIntegrantes) {

            this.numero = numero;
            this.numIntegrantes = numIntegrantes;
            this.blanqueadas = 3;
            this.puntos = 130;
            this.activo = false;

            this.ultimasArgollas = [140, 30, 40, 120, null, null];

            this.tiros = {1: 50, 2: -10, 3: 12, 4: 12, 5: 12, 6: 12, 7: 12, 8: 12, 9: 12, 10: 12};

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

        return jugadorCls;
    });