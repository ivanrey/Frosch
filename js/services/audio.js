angular.module('Frosch')
    .factory('audio', function () {


      var audioClass = function (audio) {
        this.audio = new Audio();
        this.audio.src = audio;
        this.audio.preload = true;
      };

      audioClass.prototype.doPlay = function(){
        this.audio.currentTime = 0;

        this.audio.pause();
        this.audio.play();
      };

      audioClass.prototype.play = function () {
        var me = this;
        if(this.audio.readyState == 0) {
          this.audio.onloadedmetadata = function () {
                me.doPlay();
          };
        }else{
          me.doPlay();
        }


      };

      audioClass.prototype.stop = function(){
        this.audio.pause();

        this.audio.currentTime = 0;
      };

      return audioClass;

    });
