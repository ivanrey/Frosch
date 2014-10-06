angular.module('Frosch')
    .directive('botonera', function () {

        return {
            restrict: 'E',
            transclude: true,
            controller: 'BotonesCtrl',
            template: '<div ng-transclude></div>',

            scope: {
                seleccionado: '=',
                max: '=',
                onSelected: '&'
            }
        }
    });