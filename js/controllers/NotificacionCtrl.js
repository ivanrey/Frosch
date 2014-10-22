angular.module('Frosch')
    .controller('NotificacionCtrl',
    function ($scope, $state, config, $timeout, jugador) {

        $scope.jugador = jugador;


        var timer = $timeout(function () {
            $state.go('jugar.chico.principal')
        }, 5000);

        $scope.$on("$destroy",
            function (event) {
                $timeout.cancel(timer);
            }
        );

    });