angular.module('Frosch')
    .controller('SeleccionJugadoresCtrl',
    function ($scope, $state, $rootScope, config, audio) {

        var monedaAudio = new audio('assets/sounds/moneda.mp3');


        $scope.agregarCredito = function () {
            $rootScope.creditos++;

            monedaAudio.play();
        }
    });