angular.module('Frosch')
    .directive('jugador', function () {

        return {
            restrict: 'E',
            templateUrl: 'html/jugador.html',
            scope: {
                'jugador': '=',
                'maximo': '='
            }
        }
    });