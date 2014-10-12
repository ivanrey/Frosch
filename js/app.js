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
                    config: function (ConfiguracionCls) {
                        return new ConfiguracionCls();
                    }
                }
            })
            .state('jugar.seleccionEquipos', {
                url: "/equipos",
                controller: 'SeleccionEquposCtrl',
                templateUrl: "html/seleccionEquipos.html"
            })
            .state('jugar.seleccionPuntos', {
                url: "/puntos",
                controller: 'SeleccionPuntosCtrl',
                templateUrl: "html/seleccionPuntos.html"
            })
            .state('jugar.seleccionBlanqueada', {
                url: "/blanqueadas",
                controller: 'SeleccionBlanqueadaCtrl',
                templateUrl: "html/seleccionBlanqueada.html"
            })
            .state('jugar.seleccionJugadores', {
                url: "/jugadores",
                controller: 'SeleccionJugadoresCtrl',
                templateUrl: "html/seleccionJugadores.html"
            });


        hotkeysProvider.includeCheatSheet = false;
    }).
    run(function ($rootScope) {

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
    });