/**
 * Created by ivan on 10/5/14
 * Archivo principal de la aplicación
 */

angular.module('Frosch', ['ui.router', 'translate', 'cfp.hotkeys', 'com.2fdevs.videogular'])
  .config(
    function ($stateProvider, $urlRouterProvider, hotkeysProvider, $compileProvider) {

      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|chrome-extension|file|blob:chrome-extension:):/);
      $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|chrome-extension|file|blob:chrome-extension:):/);
      //Definicion de los estados
      $stateProvider.state('inicio', {
        url: "/inicio",
        controller: 'InicioCtrl',
        templateUrl: "html/inicio.html",
        resolve: {
          config: function (ConfiguracionService) {
            return ConfiguracionService; // se usa para obtener el idioma del sonido en el filter
          }
        }
      })
        .state('jugar', {
          url: '/jugar',
          template: '<ui-view/>',
          controller: 'JugarCtrl',
          resolve: {
            tanda: function (TandaCls, ConfiguracionService) {
              return new TandaCls(ConfiguracionService);
            },
            config: function (tanda) {
              return tanda.configuracion;
            }
          }
        })
        .state('jugar.seleccionEquipos', {
          url: "/equipos",
          controller: 'SeleccionEquposCtrl',
          templateUrl: "html/seleccionEquipos.html"
        })
        .state('jugar.nuevoChico', {
          url: "/nuevo",
          controller: function ($scope, $state, tanda) {
            tanda.nuevoChico();
            $state.go('jugar.chico.seleccionBlanqueada');
            if ($scope.configurarAudio)
              $scope.configurarAudio.play();
          },
          template: ""
        })
        .state('jugar.chico', {
          url: "/chico",
          template: '<ui-view/>',
          resolve: {
            chico: function (tanda, config) {
              return tanda.chicoActual;
            }
          }
        }).state('jugar.chico.seleccionPuntos', {
        url: "/puntos",
        controller: 'SeleccionPuntosCtrl',
        templateUrl: "html/seleccionPuntos.html"
      })
        .state('jugar.chico.seleccionBlanqueada', {
          url: "/blanqueadas",
          controller: 'SeleccionBlanqueadaCtrl',
          templateUrl: "html/seleccionBlanqueada.html"
        })
        .state('jugar.chico.seleccionJugadores', {
          url: "/jugadores",
          controller: 'SeleccionJugadoresCtrl',
          templateUrl: "html/seleccionJugadores.html"
        })
        .state('jugar.chico.principal', {
          url: "/frosch",
          controller: 'PrincipalCtrl',
          templateUrl: "html/principal.html"
        })
        .state('jugar.chico.principal.rana', {
          url: "/rana",
          controller: 'NotificacionCtrl',
          templateUrl: "html/rana.html",
          resolve: {
            jugador: function (chico) {
              return chico.jugadorActual;
            }
          }
        })
        .state('jugar.chico.principal.ranita', {
          url: "/ranita",
          controller: 'NotificacionCtrl',
          templateUrl: "html/ranita.html",
          resolve: {
            jugador: function (chico) {
              return chico.jugadorActual;
            }
          }
        })
        .state('jugar.chico.principal.monona', {
          url: "/monona",
          controller: 'NotificacionCtrl',
          templateUrl: "html/monona.html",
          resolve: {
            jugador: function (chico) {
              return chico.jugadorActual;
            }
          }
        })
        .state('jugar.chico.principal.ganaste', {
          url: "/ganaste",
          controller: 'NotificacionCtrl',
          templateUrl: "html/ganaste.html",
          resolve: {
            jugador: function (chico) {
              return chico.jugadorActual;
            }
          }
        })
        .state('jugar.chico.principal.blanqueado', {
          url: "/blanqueado",
          controller: 'NotificacionCtrl',
          templateUrl: "html/blanqueado.html",
          resolve: {
            jugador: function (chico) {
              return chico.jugadorAnterior;
            }
          }
        })
        .state('jugar.chico.principal.maxBlanqueadas', {
          url: "/maxBlanqueadas",
          controller: 'NotificacionCtrl',
          templateUrl: "html/maxBlanqueadas.html",
          resolve: {
            jugador: function (chico) {
              return chico.jugadorAnterior;
            }
          }
        })
        .state('jugar.chico.principal.termino', {
          url: "/fin",
          controller: 'FinChicoCtrl',
          templateUrl: "html/finChico.html"
        })
      ;


      hotkeysProvider.includeCheatSheet = false;
    }).run(function ($rootScope, hotkeys, audio) {

  /**
   * Debugging Tools
   *
   * Allows you to execute debug functions from the view
   */
  $rootScope.log = function (variable) {
    console.log(variable);
  };
  $rootScope.alert = function (text) {
    alert(text);
  };

  $rootScope.guardarCreditos = function () {
    localStorage.creditos = $rootScope.creditos;
    localStorage.creditosExcedente = $rootScope.creditosExcedente;
  };

  $rootScope.cargarCreditos = function () {
    $rootScope.creditos = localStorage.creditos ? localStorage.creditos : 0;// así no deben perderse nunca créditos
    $rootScope.creditosExcedente = localStorage.creditosExcedente ? localStorage.creditosExcedente : 0;
  };

        $rootScope.restarCreditos = function(creditosUsados){
            $rootScope.creditos -= creditosUsados;
            $rootScope.guardarCreditos();
        };

        $rootScope.cargarCreditos();

  var monedaAudio = new audio('moneda.ogg');

  hotkeys.bindTo($rootScope)
    .add({
      combo: 's s s',
      callback: function () {
        window.close();

      }
    })
    .add({
      combo: 'c',
      callback: function () {
        $rootScope.creditos++;

        monedaAudio.play();
        $rootScope.guardarCreditos();
      }
    })
    .add({
      combo: 'backspace',
      callback: function (event) {
        event.preventDefault();
      }
    })

});
