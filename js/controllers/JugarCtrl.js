angular.module('Frosch')
  .controller('JugarCtrl',
  function ($scope, $state, config, $timeout, audio) {

    $scope.configurarAudio = new audio("assets/sounds/configurar.ogg");
    //$scope.configurarAudio.audio.loop = true;
    $scope.configurarAudio.play();

  });