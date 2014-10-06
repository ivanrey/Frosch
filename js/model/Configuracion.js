/**
 * Created by ivan on 10/5/14.
 */
angular.module('Frosch')
    .factory('ConfiguracionCls', function () {

        var clase = function () {

            this.equipos = false;
            this.maxPorEquipo = 1;

        };

        clase.prototype.setMaxPorEquipo = function (cantidad) {
            this.maxPorEquipo = cantidad;
            if (this.maxPorEquipo > 1)
                this.equipos = true;
        };

        return clase;
    });