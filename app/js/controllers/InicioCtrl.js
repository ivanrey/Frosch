angular.module('Frosch')
    .controller('InicioCtrl', function ($scope, $state, hotkeys, config, $http, $interval) {

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
            let videoURL = 'assets/videos/video' + numero + '.webm';
            let promise = $http.head(videoURL);
            console.log(promise);
            if(promise)
                promise.then(function () {
                    $scope.videos.push([{
                        src: videoURL,
                        type: "video/webm"
                    }]);
                    cargarVideo(numero + 1);
                });
        }

        cargarVideo(1);

        var timerVideo = $interval( function () {
            if($scope.videos.length > 0) {
                $scope.mostrandoVideo = true;
                $scope.numVideo = Math.floor(Math.random() * ($scope.videos.length));
            }
        }, config.configuracion.minutosEntreVideos * 60 * 1000);


        $scope.quitarVideo = function(){
            $scope.mostrandoVideo = false;
        };

        $scope.$on('$destroy', function () {
            $interval.cancel(timerVideo);
        })
    });
