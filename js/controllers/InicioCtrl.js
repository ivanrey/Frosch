angular.module('Frosch')
    .controller('InicioCtrl', function ($scope, $state, hotkeys, $interval, config) {

        $scope.iniciar = function () {
            $state.go('jugar.seleccionEquipos');
            $interval.cancel(timeoutVideo);
        };

        $scope.minutosProximoVideo = Math.floor((Math.random() * (config.configuracion.tiempoEntreVideos[1] - config.configuracion.tiempoEntreVideos[0])) + config.configuracion.tiempoEntreVideos[0]);
        $scope.minutosSinVideo = 0;

        var timeoutVideo = $interval(function () {

            if ($scope.minutosSinVideo >= $scope.minutosProximoVideo) {
                $state.go('inicio.video');
            }else{
                $scope.minutosSinVideo++;
            }


        }, 1000); //corre cada minuto



        hotkeys.bindTo($scope)
            .add({
                combo: 'enter',
                description: 'Iniciar',
                callback: $scope.iniciar
            });

        $scope.$on('destroy', function () {
            $interval.cancel(timeoutVideo);
        }); //por si se va a otro estado.

    });