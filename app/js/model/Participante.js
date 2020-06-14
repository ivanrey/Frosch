angular.module('Frosch')
    .factory('ParticipanteCls', function () {

        var participanteCls = function (numero) {
            this.chicosPerdidos = 0;
            this.jugadores = [];
            this.numero = numero;
        };

        participanteCls.prototype.acumularChico = function (jugador) {
            this.jugadores.push(jugador);
            this.chicosPerdidos += !jugador.gano;

        };

        return participanteCls;
    });