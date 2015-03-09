angular.module('Frosch')
    .factory('TandaCls', function (ChicoCls, ParticipanteCls) {

        var tandaCls = function (ConfiguracionService) {
            var me = this;
            this.configuracion = ConfiguracionService;
            this.participantes = [];
            this.chicos = [];

            this.configuracion.then(function (value) {
                me.configuracion = value;
                return me.configuracion;
            })

            Object.defineProperty(this, 'chicoActual', {
                get: function () {
                    if (this.chicos.length == 0)
                        this.nuevoChico();
                    return this.chicos[this.chicos.length - 1];
                }
            })
        };

        tandaCls.prototype.nuevoChico = function () {

            var chico = new ChicoCls(this.configuracion);
            this.chicos.push(chico);
            return chico;
        };

        tandaCls.prototype.finalizarChico = function (chico) {

            for (var i = 0; i < chico.jugadores.length; i++) {
                if (i >= this.participantes.length)
                    this.participantes.push(new ParticipanteCls(i + 1));

                var participante = this.participantes[i];

                participante.acumularChico(chico.jugadores[i]);
            }
        };

        return tandaCls;
    });