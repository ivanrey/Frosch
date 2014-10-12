/**
 * Created by ivan on 10/5/14.
 */
angular.module('Frosch')
    .factory('ConfiguracionCls', function ($http) {

        var clase = function () {
            var me = this;
            this.equipos = false;
            this.maxPorEquipo = 1;

            var httpPromise = $http.get('config/config.json');
            return httpPromise.then(function (httpResponse) {
                me.configuracion = httpResponse.data;
                return me;
            });
        };

        clase.prototype.setMaxPorEquipo = function (cantidad) {
            this.maxPorEquipo = cantidad;
            if (this.maxPorEquipo > 1)
                this.equipos = true;
        };

        return clase;
    });