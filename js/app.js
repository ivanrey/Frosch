/**
 * Created by ivan on 10/5/14
 * Archivo principal de la aplicación
 */

angular.module('Frosch', ['ui.router', 'translate', 'cfp.hotkeys'])
    .config(
    function ($stateProvider, $urlRouterProvider, hotkeysProvider) {
        $urlRouterProvider.otherwise("/inicio");


        //Definicion de los estados
        $stateProvider.
            state('inicio', {
                url: "/inicio",
                controller: 'InicioCtrl',
                templateUrl: "html/inicio.html"
            })
            .state('jugar', {
                url: '/jugar',
                template: '<ui-view/>',
                resolve: {
                    tanda: function (TandaCls) {
                        return new TandaCls();
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
                controller: function ($state, tanda) {
                    tanda.nuevoChico();
                    $state.go('jugar.chico.seleccionBlanqueada');
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
            .state('jugar.chico.principal.termino', {
                url: "/fin",
                controller: 'FinChicoCtrl',
                templateUrl: "html/finChico.html"
            })
        ;


        hotkeysProvider.includeCheatSheet = false;
    }).
    run(function ($rootScope, hotkeys, audio) {

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

        $rootScope.creditos = 0; // así no deben perderse nunca créditos

        var monedaAudio = new audio('assets/sounds/moneda.ogg');

        hotkeys.bindTo($rootScope)
            .add({
                combo: 's s s',
                callback: function () {
                    // Cargar node-webkit
                    var gui = require('nw.gui');

                    // Salir
                    gui.App.quit();

                }
            })
            .add({
                combo: 'c',
                callback: function () {
                    $rootScope.creditos++;

                    monedaAudio.play();
                }
            })
            .add({
                combo: 'backspace',
                callback: function (event) {
                    event.preventDefault();
                }
            })
    });