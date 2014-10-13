angular.module('Frosch')
    .factory('JugadorCls', function () {

        var jugadorCls = function (numero, numIntegrantes) {

            this.numero = numero;
            this.numIntegrantes = numIntegrantes;
            this.blanqueadas = 3;
            this.puntos = 130;
            this.activo = false;
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