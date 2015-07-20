angular.module('Frosch')
    .controller('InicioCtrl', function ($scope, $state, hotkeys, config, $sce, $http, $interval) {

        $scope.iniciar = function () {
            $state.go('jugar.seleccionEquipos');
        };

        hotkeys.bindTo($scope)
            .add({
                combo: 'enter',
                description: 'Iniciar',
                callback: $scope.iniciar
            });

        $scope.videos = [];

        function cargarVideo(numero) {
            var videoURL = 'assets/videos/video' + numero + '.webm';
            $http.head(videoURL)
                .success(function () {
                    $scope.videos.push([{
                        src: $sce.trustAsResourceUrl(videoURL),
                        type: "video/webm"
                    }]);
                    cargarVideo(numero + 1);
                });
        }

        cargarVideo(1);

        var timerVideo = $interval( function () {
            $scope.mostrandoVideo = true;
            $scope.numVideo = Math.floor(Math.random() * ($scope.videos.length))
        }, config.configuracion.minutosEntreVideos * 60 * 1000);


        $scope.quitarVideo = function(){
            $scope.mostrandoVideo = false;
        };

        $scope.$on('$destroy', function () {
            $interval.cancel(timerVideo);
        })
    });