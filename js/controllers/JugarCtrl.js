angular.module('Frosch')
    .controller('JugarCtrl',
    function ($scope, $state, config, audio) {

        $scope.configurarAudio = new audio("assets/sounds/configurar.ogg");
        $scope.configurarAudio.audio.loop = true;

        $scope.configurarAudio.play();


        $scope.$on('$destroy', function () {
            $scope.configurarAudio.stop();

        })
    });