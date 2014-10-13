angular.module('Frosch')
    .controller('PrincipalCtrl',
    function ($scope, chico, config) {

        $scope.jugadores = chico.getJugadores();
        $scope.config = config;
        $scope.chico = chico;

        $scope.jugadores[0].activar();
    });
