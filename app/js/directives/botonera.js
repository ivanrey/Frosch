angular.module('Frosch')
    .directive('botonera', function () {

        return {
            restrict: 'E',
            transclude: true,
            controller: 'BotonesCtrl',
            template: '<div class="botones" ng-transclude></div>',

            scope: {
                seleccionado: '=',
                max: '=',
                callback: '=',
                keymap: '='
            }
        }
    });