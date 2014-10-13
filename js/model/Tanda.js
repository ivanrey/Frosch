angular.module('Frosch')
    .factory('TandaCls', function (ConfiguracionCls, ChicoCls) {

        var tandaCls = function () {
            var me = this;
            this.configuracion = new ConfiguracionCls();
            this.participantes = [];
            this.chicos = [];

            this.configuracion.then(function (value) {
                me.configuracion = value;
                return me.configuracion;
            })
        };

        tandaCls.prototype.nuevoChico = function () {

            var chico = new ChicoCls(this.configuracion);
            this.chicos.push(chico);
            return chico;
        };

        return tandaCls;
    });