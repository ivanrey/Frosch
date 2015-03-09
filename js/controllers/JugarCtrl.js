angular.module('Frosch')
    .controller('JugarCtrl',
    function ($scope, $state, config, audio) {

        $scope.configurarAudio = new audio("configurar.ogg",false);
        $scope.configurarAudio.audio.loop = true;

        $scope.configurarAudio.play();


        $scope.$on('$destroy', function () {
            $scope.configurarAudio.stop();

        })
    });