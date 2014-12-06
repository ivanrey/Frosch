angular.module('Frosch')
    .controller('NotificacionCtrl',
    function ($scope, $state, config, $timeout, jugador, chico) {

        $scope.jugador = jugador;


        var timer = $timeout(function () {
            if (chico.termino)
                $state.go('jugar.chico.principal.termino');
            else
                $state.go('jugar.chico.principal')
        }, 3000);

        $scope.$on("$destroy",
            function (event) {
                $timeout.cancel(timer);
            }
        );

    });