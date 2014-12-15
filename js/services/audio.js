angular.module('Frosch')
  .factory('audio', function () {


    var audioClass = function (audio) {
      this.audio = new Audio();
      this.audio.src = audio;
      this.audio.preload = true;
    };

    audioClass.prototype.play = function () {
      this.audio.currentTime = 0;

      this.audio.pause();
      this.audio.play();
    };

    audioClass.prototype.stop = function () {
      this.audio.currentTime = 0;
      this.audio.pause();
    };

    return audioClass;

  });