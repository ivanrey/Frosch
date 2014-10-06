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
            .state('jugar',{
                url: '/jugar',
                template: '<ui-view/>',
                resolve:{
                    config: function(ConfiguracionCls){
                        return new ConfiguracionCls();
                    }
                }
            })
            .state('jugar.seleccionEquipos',{
                url: "/equipos",
                controller: 'SeleccionEquposCtrl',
                templateUrl: "html/seleccionEquipos.html"
            });


        hotkeysProvider.includeCheatSheet = false;
    });